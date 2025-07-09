import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut as firebaseSignOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { User } from '@/types';
import Cookies from 'js-cookie';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log('Setting up auth listener');
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
      console.log('Auth state changed:', {
        email: firebaseUser?.email,
        uid: firebaseUser?.uid,
        emailVerified: firebaseUser?.emailVerified
      });

      if (firebaseUser) {
        try {
          // Get the ID token
          const idToken = await firebaseUser.getIdToken();
          // Set the session cookie
          Cookies.set('session', idToken, { secure: true, sameSite: 'strict' });

          // Query Firestore for user data by email
          const usersRef = collection(db, 'users');
          console.log('Querying Firestore for user:', firebaseUser.email);
          
          const q = query(usersRef, where('email', '==', firebaseUser.email));
          const querySnapshot = await getDocs(q);
          
          console.log('Firestore query result:', {
            empty: querySnapshot.empty,
            size: querySnapshot.size,
            docs: querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
          });

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data() as DocumentData;
            console.log('Found user data:', userData);
            
            // Set user role cookie and state
            const role = userData.role as string;
            Cookies.set('user_role', role, { secure: true, sameSite: 'strict' });
            setUserRole(role);
            
            setUser({
              id: querySnapshot.docs[0].id,
              email: userData.email as string,
              role: role as 'admin' | 'teacher' | 'student',
              name: userData.name as string,
              createdAt: userData.createdAt?.toDate(),
              updatedAt: userData.updatedAt?.toDate()
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // Clear user data and cookies when logged out
        setUser(null);
        setUserRole(null);
        Cookies.remove('session');
        Cookies.remove('user_role');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      Cookies.set('session', idToken, { secure: true, sameSite: 'strict' });
      
      // Query Firestore for user role
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const role = userData.role;
        
        // Redirect based on role
        switch (role) {
          case 'admin':
            router.push('/portal/main');
            break;
          case 'teacher':
            router.push('/portal/teacher');
            break;
          case 'student':
            router.push('/portal/student');
            break;
          default:
            router.push('/login');
        }
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setIsLoggingOut(true);
      
      // Clear history state to prevent back navigation
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', '/login');
      }

      // Add a delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await firebaseSignOut(auth);
      Cookies.remove('session');
      Cookies.remove('user_role');
      
      // Force reload to clear any cached state
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out:', error);
      setIsLoggingOut(false);
      throw error;
    }
  };

  return {
    user,
    loading,
    userRole,
    signIn,
    signOut,
    isLoggingOut
  };
} 