'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { signOut as authSignOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

type AdminRole = 'admin' | 'manager' | 'super_admin';
type AdminUser = {
  id: string;
  email?: string | null;
  name?: string | null;
};

interface AuthContextType {
  user: AdminUser | null;
  role: AdminRole | null;
  displayName: string;
  authorized: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  displayName: 'Admin',
  authorized: false,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const role = session?.user?.role ?? null;
  const authorized =
    session?.user?.companyId === 'mansa' &&
    (role === 'manager' || role === 'admin' || role === 'super_admin');
  const user = session?.user
    ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      }
    : null;

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/login') {
      router.replace('/login');
    }
  }, [pathname, router, status]);

  const signOut = async () => {
    await authSignOut({ callbackUrl: '/login' });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        displayName: session?.user?.name || session?.user?.email || 'Admin',
        authorized,
        loading: status === 'loading',
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
