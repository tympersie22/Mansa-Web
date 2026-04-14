import type { Metadata } from 'next';
import './globals.css';
import AdminLayout from '@/components/AdminLayout';
import { AuthProvider } from '@/lib/AuthContext';

export const metadata: Metadata = {
  title: 'Mansa Admin',
  description: 'Itinerary builder and journey planning admin for Mansa Tours & Travel',
  icons: {
    icon: '/icon',
    shortcut: '/icon',
    apple: '/icon',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AdminLayout>{children}</AdminLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
