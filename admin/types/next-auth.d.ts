import type { DefaultSession } from 'next-auth';
import type { AdminRole } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    role: AdminRole;
    companyId: string;
  }

  interface Session {
    user: {
      id: string;
      role: AdminRole;
      companyId: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: AdminRole;
    companyId: string;
  }
}
