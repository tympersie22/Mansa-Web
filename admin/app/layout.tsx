import type { Metadata } from 'next';
import { Cinzel, Lato } from 'next/font/google';
import './globals.css';
import AdminLayout from '@/components/AdminLayout';
import { AuthProvider } from '@/lib/AuthContext';
import { SessionProvider } from 'next-auth/react';

const headingFont = Cinzel({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
});

const bodyFont = Lato({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: {
    default: 'Mansa OS',
    template: '%s | Mansa OS',
  },
  description: 'The travel operations system for Mansa Tours & Travel',
  icons: {
    icon: '/icon',
    shortcut: '/icon',
    apple: '/icon',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#383836" />
      </head>
      <body className={`${headingFont.variable} ${bodyFont.variable} font-body antialiased`}>
        <SessionProvider>
          <AuthProvider>
            <AdminLayout>{children}</AdminLayout>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
