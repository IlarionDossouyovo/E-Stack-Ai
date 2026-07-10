'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface FounderRouteProps {
  children: React.ReactNode;
}

export default function FounderRoute({ children }: FounderRouteProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkFounder = () => {
      const userStr = localStorage.getItem('user');
      
      if (!userStr) {
        router.push(`/login?redirect=${pathname}`);
        return false;
      }

      try {
        const user = JSON.parse(userStr);
        // Only founder can access these routes
        if (user.role !== 'founder') {
          router.push('/');
          return false;
        }
        return true;
      } catch {
        router.push(`/login?redirect=${pathname}`);
        return false;
      }
    };

    checkFounder();
  }, [router, pathname]);

  const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  let isFounder = false;

  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      isFounder = user.role === 'founder';
    } catch {
      isFounder = false;
    }
  }

  if (!isFounder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Vérification des droits d'accès...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
