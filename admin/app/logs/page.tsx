'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

type Log = { id: string; action: string; entityType: string; entityId: string; actor: { displayName?: string; email?: string }; metadata: unknown; createdAt: string };

export default function LogsPage() {
  const [records, setRecords] = useState<Log[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/admin/logs?page=${page}&pageSize=25&q=${encodeURIComponent(query)}`, { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to load logs');
        setRecords(data.records || []);
        setTotal(data.pagination?.total || 0);
        setPages(data.pagination?.pages || 1);
        setError('');
      })
      .catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message); });
    return () => controller.abort();
  }, [page, query]);

  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      <header>
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#a56f1b]">Workspace</p>
        <h1 className="mt-2 text-[38px] font-semibold leading-none text-[#383836]">Activity Logs</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#716e68]">A searchable record of changes made inside Mansa OS.</p>
      </header>
      <div className="flex items-center gap-3 rounded-2xl border border-[#ded8cf] bg-white px-4 py-3">
        <Search className="h-4 w-4 text-[#88837b]" />
        <input value={query} onChange={(event) => { setPage(1); setQuery(event.target.value); }} placeholder="Search action, resource, or record ID" className="flex-1 bg-transparent text-sm outline-none" />
        <span className="text-xs text-[#88837b]">{total} events</span>
      </div>
      {error ? <div role="alert" className="rounded-2xl border border-[#ebcbc5] bg-[#fff7f5] px-4 py-3 text-sm text-[#a84739]">{error}</div> : null}
      <section className="overflow-hidden rounded-[24px] border border-[#ded8cf] bg-white shadow-[0_8px_22px_rgba(39,53,43,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-[#f8f3ec] text-[10px] uppercase tracking-[0.14em] text-[#88837b]"><tr><th className="px-5 py-3">Action</th><th className="px-5 py-3">Resource</th><th className="px-5 py-3">Actor</th><th className="px-5 py-3">Time</th><th className="px-5 py-3">Details</th></tr></thead>
            <tbody>{records.length ? records.map((record) => <tr key={record.id} className="border-t border-[#eee8df]"><td className="px-5 py-4 font-semibold text-[#383836]">{record.action}</td><td className="px-5 py-4 text-[#716e68]">{record.entityType}<br /><span className="text-xs text-[#aaa39a]">{record.entityId.slice(0, 8)}…</span></td><td className="px-5 py-4 text-[#716e68]">{record.actor?.displayName || record.actor?.email || 'System'}</td><td className="whitespace-nowrap px-5 py-4 text-[#716e68]">{new Date(record.createdAt).toLocaleString()}</td><td className="max-w-[280px] truncate px-5 py-4 text-xs text-[#88837b]" title={JSON.stringify(record.metadata)}>{JSON.stringify(record.metadata)}</td></tr>) : <tr><td colSpan={5} className="px-5 py-16 text-center text-sm text-[#77736c]">No activity recorded yet.</td></tr>}</tbody>
          </table>
        </div>
        {pages > 1 ? <div className="flex items-center justify-between border-t border-[#e5dfd6] px-5 py-3"><span className="text-xs text-[#88837b]">Page {page} of {pages}</span><div className="flex gap-2"><button type="button" disabled={page === 1} onClick={() => setPage((value) => value - 1)} className="rounded-lg border p-2 disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button><button type="button" disabled={page === pages} onClick={() => setPage((value) => value + 1)} className="rounded-lg border p-2 disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button></div></div> : null}
      </section>
    </div>
  );
}
