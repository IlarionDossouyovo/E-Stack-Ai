'use client';

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      const publicPaths = ['/login', '/register', '/forgot-password'];
      const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
      
      if (!user && !isPublicPath) {
        router.push('/login');
      } else if (user && (pathname === '/login' || pathname === '/register')) {
        router.push('/');
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const publicPaths = ['/login', '/register', '/forgot-password'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  if (!user && !isPublicPath) {
    return null;
  }

  return <>{children}</>;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>{children}</AuthGuard>
  );
}
