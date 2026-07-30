import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import type { AdminRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { canAuthenticateAdmin } from '@/lib/admin-authorization.mjs';

const allowedRoles = new Set(['manager', 'admin', 'super_admin']);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },
  // Version the cookie so a secret change cannot leave an undecryptable
  // session looping the user between the login and workspace pages.
  cookies: {
    sessionToken: {
      name: 'mansa-os.session-token.v2',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const email =
          typeof credentials.email === 'string' ? credentials.email.trim().toLowerCase() : '';
        const password = typeof credentials.password === 'string' ? credentials.password : '';
        if (!email || !password) return null;

        let user;
        try {
          user = await prisma.user.findUnique({
            where: { email },
            include: { adminProfile: true },
          });
        } catch {
          // Keep missing local Railway configuration from becoming an Auth.js 500.
          return null;
        }

        if (
          !canAuthenticateAdmin(user) ||
          !user?.passwordHash ||
          !user.adminProfile ||
          !allowedRoles.has(user.adminProfile.role)
        ) {
          return null;
        }

        if (!(await compare(password, user.passwordHash))) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.adminProfile.displayName,
          role: user.adminProfile.role,
          companyId: user.adminProfile.companyId,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.companyId = user.companyId;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.role = token.role as AdminRole;
        session.user.companyId = String(token.companyId);
      }
      return session;
    },
  },
});
