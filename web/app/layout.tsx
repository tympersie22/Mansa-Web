import type { Metadata } from 'next';
import { Cinzel, Lato } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JourneyFab from '@/components/mansa/JourneyFab';

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
  title: 'MANSA TOURS AND TRAVEL | Curated Zanzibar Journeys',
  description:
    'Private experiences, curated journeys, and seamless travel across Zanzibar and mainland Tanzania.',
  keywords:
    'MANSA Tours and Travel, Zanzibar travel, curated journeys, Tanzania travel, private experiences, safari extension',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#383836" />
      </head>
      <body
        suppressHydrationWarning
        className={`${headingFont.variable} ${bodyFont.variable} font-body antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <JourneyFab />
        <Footer />
      </body>
    </html>
  );
}
