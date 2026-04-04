'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { readJourney, subscribeJourney } from '@/lib/journey-storage';

export default function JourneyFab() {
  const pathname = usePathname();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(readJourney().length);
    sync();
    return subscribeJourney(sync);
  }, []);

  const shouldShow =
    pathname.startsWith('/experiences') ||
    pathname.startsWith('/journeys') ||
    pathname === '/your-journey' ||
    pathname === '/plan-your-trip';

  if (!shouldShow) return null;

  return (
    <Link
      href="/your-journey"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-surface-dark px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_18px_45px_rgba(0,0,0,0.24)] transition hover:bg-[#2f2f2d]"
    >
      <span>Your Journey</span>
      <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-accent px-2 text-xs text-surface-dark">
        {count}
      </span>
    </Link>
  );
}
