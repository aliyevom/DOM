import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

interface AuthWrapperProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function AuthWrapper({ children, allowedRoles }: AuthWrapperProps) {
  const router = useRouter();
  const { user, loading, userRole } = useAuth();

  useEffect(() => {
    if (!loading) {
      // If user is not logged in and trying to access protected routes
      if (!user) {
        router.push('/login');
        return;
      }

      // If user is logged in and trying to access login page
      if (user && window.location.pathname === '/login') {
        router.push('/portal/main');
        return;
      }

      // Role-based access control
      if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
        // Redirect to appropriate portal based on role
        const rolePathMap: Record<string, string> = {
          admin: '/portal/main',
          teacher: '/portal/teacher',
          student: '/portal/profile'
        };
        router.push(rolePathMap[userRole] || '/login');
      }
    }
  }, [user, loading, userRole, router, allowedRoles]);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
} 