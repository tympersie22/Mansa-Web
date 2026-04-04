'use client';

import Link from 'next/link';
import { Activity, ArrowRight, FileText, ShieldCheck } from 'lucide-react';

export default function LogsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-[24px] border border-[#dfe6dd] bg-[#f8faf7] p-6 md:p-8">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#7d907f]">Workspace</p>
        <h1 className="mt-2 text-[34px] font-semibold leading-none text-[#1f2d23]">Activity Logs</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#708072]">
          The admin has been reduced to the MANSA itinerary workspace only. Audit events are now focused on itinerary
          edits, publishing state, and admin profile access rather than property, room, or payment operations.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#dce5db] bg-white p-5">
          <div className="mb-3 inline-flex rounded-xl bg-[#eef3eb] p-2 text-[#567158]">
            <Activity className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-[#243226]">Itinerary-first actions</h2>
          <p className="mt-2 text-sm leading-6 text-[#66776a]">
            Save and publish events are recorded against itinerary records only, keeping the workspace focused on
            journey design.
          </p>
        </div>
        <div className="rounded-2xl border border-[#dce5db] bg-white p-5">
          <div className="mb-3 inline-flex rounded-xl bg-[#fff4da] p-2 text-[#9d6a00]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-[#243226]">Supabase-backed admin</h2>
          <p className="mt-2 text-sm leading-6 text-[#66776a]">
            The save flow depends on authenticated Supabase access plus the server-side
            <code className="mx-1 rounded bg-[#f3f6f1] px-1.5 py-0.5 text-xs">SUPABASE_SERVICE_ROLE_KEY</code>
            environment variable.
          </p>
        </div>
        <div className="rounded-2xl border border-[#dce5db] bg-white p-5">
          <div className="mb-3 inline-flex rounded-xl bg-[#eef1f8] p-2 text-[#556f9f]">
            <FileText className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-[#243226]">Clean workspace</h2>
          <p className="mt-2 text-sm leading-6 text-[#66776a]">
            Legacy Twiga booking, payment, and room management screens have been removed so this admin is now scoped
            to MANSA only.
          </p>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#dce5db] bg-white p-6 md:p-8">
        <h2 className="text-xl font-semibold text-[#243226]">Next checks</h2>
        <div className="mt-4 grid gap-3">
          <Link
            href="/itineraries"
            className="flex items-center justify-between rounded-2xl border border-[#e3e9e1] bg-[#fafcf9] px-4 py-4 text-sm text-[#2f4032] transition hover:border-[#d3ddd2] hover:bg-[#f5f8f4]"
          >
            Open itinerary builder
            <ArrowRight className="h-4 w-4 text-[#718373]" />
          </Link>
          <Link
            href="/settings"
            className="flex items-center justify-between rounded-2xl border border-[#e3e9e1] bg-[#fafcf9] px-4 py-4 text-sm text-[#2f4032] transition hover:border-[#d3ddd2] hover:bg-[#f5f8f4]"
          >
            Verify admin profile and Supabase auth
            <ArrowRight className="h-4 w-4 text-[#718373]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
