'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BedDouble,
  Building,
  Building2,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Contact,
  FileText,
  ListTree,
  Loader2,
  LogOut,
  Map,
  Menu,
  Plane,
  Settings,
  Truck,
  X,
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'CRM & Sales',
    items: [
      { href: '/operations/customers', label: 'Customers', icon: Contact },
      { href: '/operations/inquiries', label: 'Inquiries', icon: ClipboardList },
      { href: '/operations/trips', label: 'Trips', icon: Plane },
      { href: '/operations/quotations', label: 'Quotations', icon: CircleDollarSign },
      { href: '/operations/quotation-items', label: 'Quote Items', icon: ListTree },
    ],
  },
  {
    title: 'Partner Network',
    items: [
      { href: '/operations/suppliers', label: 'Suppliers', icon: Truck },
      { href: '/operations/hotels', label: 'Hotels', icon: Building },
      { href: '/operations/room-types', label: 'Room Types', icon: BedDouble },
    ],
  },
  {
    title: 'Travel Design',
    items: [
      { href: '/itineraries', label: 'Itineraries', icon: Map },
      { href: '/operations/trip-days', label: 'Trip Days', icon: CalendarDays },
      { href: '/operations/itinerary-items', label: 'Live Items', icon: ListTree },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { href: '/logs', label: 'Activity Logs', icon: FileText },
      { href: '/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, displayName, authorized, loading, signOut } = useAuth();

  if (pathname === '/login') return <>{children}</>;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-dark">
        <div className="text-center">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-accent" />
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/50">
            Starting Mansa OS
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center bg-surface-light px-6 py-16 text-text-primary">
        <div className="os-panel mx-auto max-w-lg p-8 md:p-10">
          <p className="os-kicker">Access restricted</p>
          <h1 className="mt-5 text-3xl leading-tight md:text-4xl">
            Mansa OS access is not provisioned.
          </h1>
          <p className="mt-5 text-sm leading-7 text-text-secondary">
            Your identity is valid, but it is not linked to an approved Mansa OS profile. A
            super administrator must provision access before you can enter the workspace.
          </p>
          <button type="button" onClick={signOut} className="btn-primary mt-7">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-light text-text-primary">
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-surface-dark/45 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[292px] shrink-0 transform flex-col border-r border-white/10 bg-surface-dark text-white shadow-[24px_0_80px_rgba(22,22,21,0.18)] transition-transform duration-500 ease-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
          <Link href="/itineraries" className="group">
            <span className="font-heading text-xl tracking-[0.18em] text-white transition group-hover:text-accent">
              MANSA OS
            </span>
            <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/42">
              Travel operating system
            </p>
          </Link>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
            className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 pb-2 pt-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
            <Building2 className="h-4 w-4 text-accent" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.11em] text-white/86">Mansa</p>
              <p className="mt-0.5 text-[10px] text-white/42">Tours & Travel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-4 py-3" aria-label="Mansa OS">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="px-3 pb-2 text-[9px] font-bold uppercase tracking-[0.24em] text-white/34">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/itineraries' && pathname.startsWith(`${item.href}/`));
                  return (
                    <Link
                      key={`${section.title}-${item.label}`}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition duration-300 ${
                        isActive
                          ? 'bg-accent text-surface-dark shadow-[0_10px_24px_rgba(251,176,64,0.18)]'
                          : 'text-white/62 hover:bg-white/[0.07] hover:text-white'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-bold">{item.label}</span>
                      {isActive ? <ChevronRight className="ml-auto h-4 w-4" /> : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.05] px-3 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/35 bg-accent/10 text-sm font-bold text-accent">
              {user.email?.[0]?.toUpperCase() || 'M'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white/90">{displayName}</p>
              <p className="truncate text-[10px] text-white/40">
                {user.email || 'admin@mansa.travel'}
              </p>
            </div>
            <button
              type="button"
              onClick={signOut}
              title="Sign out"
              aria-label="Sign out"
              className="rounded-full p-2 text-white/40 transition hover:bg-white/10 hover:text-accent"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center border-b border-surface-border bg-surface-lighter/80 px-5 py-4 backdrop-blur-xl lg:hidden">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setSidebarOpen(true)}
            className="mr-4 rounded-full border border-surface-border bg-white p-2 text-text-primary"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="font-heading text-base tracking-[0.14em]">MANSA OS</p>
            <p className="text-[9px] uppercase tracking-[0.24em] text-text-muted">Operations</p>
          </div>
        </header>

        <main key={pathname} className="os-page-enter flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
