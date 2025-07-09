"use client";

import { useEffect, useLayoutEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

// Create a safe useLayoutEffect that falls back to useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Handle browser history
  useIsomorphicLayoutEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle authentication
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Handle role-based access
  useEffect(() => {
    if (!loading && user) {
      const path = pathname?.toLowerCase();
      if (!path) return;

      const isCorrectPath = (
        (user.role === 'admin' && path.startsWith('/portal/main')) ||
        (user.role === 'teacher' && path.startsWith('/portal/teacher')) ||
        (user.role === 'student' && path.startsWith('/portal/student'))
      );

      if (!isCorrectPath) {
        const correctPath = user.role === 'admin' 
          ? '/portal/main'
          : user.role === 'teacher'
          ? '/portal/teacher'
          : '/portal/student';
        
        router.push(correctPath);
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
} 