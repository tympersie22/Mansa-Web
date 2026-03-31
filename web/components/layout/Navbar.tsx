'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const primaryLinks = [
  { href: '/', label: 'Home' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/journeys', label: 'Journeys' },
  { href: '/about', label: 'About' },
];

const mobileGroups = [
  {
    title: 'Explore',
    links: [
      { href: '/experiences', label: 'Experiences' },
      { href: '/journeys', label: 'Journeys' },
      { href: '/destinations', label: 'Destinations' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/corporate-dmc', label: 'Corporate & DMC' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/faqs', label: 'FAQs' },
      { href: '/plan-your-trip', label: 'Plan Your Trip' },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-surface-dark/88 py-3 backdrop-blur-xl'
          : mobileOpen
          ? 'bg-surface-dark py-4'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div>
              <span className="font-heading text-xl tracking-[0.18em] text-white md:text-2xl">
                MANSA
              </span>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/58">
                Tours and Travel
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-[0.16em] transition-colors duration-200 ${
                  pathname === link.href ? 'text-accent' : 'text-white/72 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex">
            <Link href="/plan-your-trip" className="btn-primary px-6 py-3">
              Plan Your Trip
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div id="mobile-nav-menu" className="mt-6 border-t border-white/10 pb-8 pt-6 md:hidden">
            <div className="grid gap-8">
              {mobileGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-accent">
                    {group.title}
                  </p>
                  <div className="flex flex-col gap-3">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`text-xl transition-colors ${
                          pathname === link.href ? 'text-accent' : 'text-white/78 hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/plan-your-trip"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-2 justify-center text-center"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
