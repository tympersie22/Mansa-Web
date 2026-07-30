'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Pencil, Plus, RefreshCw, Save, Search, Trash2, X } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { adminApi } from '@/lib/admin-api';
import type { OperationField, OperationPageDefinition } from '@/lib/operations-ui';

type RecordRow = Record<string, unknown> & { id: string };

function displayValue(value: unknown) {
  if (value === null || typeof value === 'undefined' || value === '') return '—';
  if (Array.isArray(value)) return value.join(', ') || '—';
  if (typeof value === 'object') return JSON.stringify(value);
  const text = String(value);
  if (/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(text)) return `${text.slice(0, 8)}…`;
  return text.replaceAll('_', ' ');
}

function editableValue(value: unknown) {
  if (value === null || typeof value === 'undefined') return '';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return String(value);
}

function emptyForm(fields: OperationField[]) {
  return Object.fromEntries(fields.map((field) => [field.name, field.type === 'checkbox' ? false : '']));
}

export default function OperationsCrudPage({ definition }: { definition: OperationPageDefinition }) {
  const { role } = useAuth();
  const [records, setRecords] = useState<RecordRow[]>([]);
  const [form, setForm] = useState<Record<string, unknown>>(() => emptyForm(definition.fields));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [lookups, setLookups] = useState<Record<string, Array<{ id: string; label: string }>>>({});

  const loadRecords = async () => {
    setLoading(true);
    setError('');
    const result = await adminApi.listOperations(definition.resource, { q: query, page, pageSize: 25 });
    if (result.error) setError(result.error);
    setRecords((result.data?.records || []) as RecordRow[]);
    setPages(result.data?.pagination?.pages || 1);
    setTotal(result.data?.pagination?.total || 0);
    setLoading(false);
  };

  useEffect(() => {
    void loadRecords();
    // The resource is stable for each mounted page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [definition.resource, page, query]);

  useEffect(() => {
    fetch('/api/admin/lookups')
      .then((response) => response.json())
      .then((payload) => setLookups({
        customer_id: (payload.customers || []).map((item: { id: string; fullName: string }) => ({ id: item.id, label: item.fullName })),
        inquiry_id: (payload.inquiries || []).map((item: { id: string; fullName: string }) => ({ id: item.id, label: item.fullName })),
        supplier_id: (payload.suppliers || []).map((item: { id: string; name: string }) => ({ id: item.id, label: item.name })),
        hotel_id: (payload.hotels || []).map((item: { id: string; name: string }) => ({ id: item.id, label: item.name })),
        room_type_id: (payload.roomTypes || []).map((item: { id: string; name: string; hotel?: { name: string } }) => ({ id: item.id, label: `${item.hotel?.name || 'Hotel'} / ${item.name}` })),
        trip_id: (payload.trips || []).map((item: { id: string; title: string }) => ({ id: item.id, label: item.title })),
        trip_day_id: (payload.tripDays || []).map((item: { id: string; dayNumber: number; title: string; trip?: { title: string } }) => ({ id: item.id, label: `${item.trip?.title || 'Trip'} / Day ${item.dayNumber}: ${item.title}` })),
        quotation_id: (payload.quotations || []).map((item: { id: string; quotationNumber: string }) => ({ id: item.id, label: item.quotationNumber })),
        itinerary_item_id: (payload.itineraryItems || []).map((item: { id: string; title: string }) => ({ id: item.id, label: item.title })),
      }))
      .catch(() => undefined);
  }, []);

  const resetForm = () => {
    setForm(emptyForm(definition.fields));
    setEditingId(null);
    setError('');
  };

  const startEdit = (record: RecordRow) => {
    setEditingId(record.id);
    setForm(
      Object.fromEntries(
        definition.fields.map((field) => [field.name, editableValue(record[field.name])]),
      ),
    );
    setMessage('');
    setError('');
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    const result = editingId
      ? await adminApi.updateOperation(definition.resource, editingId, form)
      : await adminApi.createOperation(definition.resource, form);

    if (result.error) {
      setError(result.error);
    } else {
      setMessage(`${definition.singular.replace(/\b\w/g, (letter) => letter.toUpperCase())} saved.`);
      resetForm();
      setPage(1);
    }
    setSaving(false);
  };

  const remove = async (record: RecordRow) => {
    if (!window.confirm(`Delete this ${definition.singular}? This cannot be undone.`)) return;
    setError('');
    const result = await adminApi.deleteOperation(definition.resource, record.id);
    if (result.error) {
      setError(result.error);
      return;
    }
    setRecords((current) => current.filter((item) => item.id !== record.id));
  };

  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a56f1b]">
            {definition.eyebrow}
          </p>
          <h1 className="mt-2 text-[38px] font-semibold leading-none text-[#383836]">
            {definition.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#716e68]">
            {definition.description}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadRecords()}
          className="inline-flex items-center gap-2 rounded-xl border border-[#ded8cf] bg-white px-4 py-2.5 text-sm font-medium text-[#383836]"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </header>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#ded8cf] bg-white px-4 py-3">
        <Search className="h-4 w-4 text-[#88837b]" />
        <input
          value={query}
          onChange={(event) => { setPage(1); setQuery(event.target.value); }}
          placeholder={`Search ${definition.title.toLowerCase()}`}
          className="min-w-[220px] flex-1 bg-transparent text-sm outline-none"
        />
        <span className="text-xs text-[#88837b]">{total} total</span>
      </div>

      {error ? (
        <div role="alert" className="rounded-2xl border border-[#ebcbc5] bg-[#fff7f5] px-4 py-3 text-sm text-[#a84739]">
          {error}
        </div>
      ) : null}
      {message ? (
        <div className="rounded-2xl border border-[#d6e5d3] bg-[#fff8e8] px-4 py-3 text-sm text-[#383836]">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="overflow-hidden rounded-[24px] border border-[#ded8cf] bg-white shadow-[0_8px_22px_rgba(39,53,43,0.05)]">
          <div className="flex items-center justify-between border-b border-[#e5dfd6] px-5 py-4">
            <p className="text-sm font-semibold text-[#383836]">
              {total} {total === 1 ? definition.singular : definition.title.toLowerCase()}
            </p>
            {loading ? <Loader2 className="h-4 w-4 animate-spin text-[#77736c]" /> : null}
          </div>
          {pages > 1 ? (
            <div className="flex items-center justify-between border-t border-[#e5dfd6] px-5 py-3">
              <span className="text-xs text-[#88837b]">Page {page} of {pages}</span>
              <div className="flex gap-2">
                <button type="button" disabled={page === 1} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-[#ded8cf] p-2 disabled:opacity-40" aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button>
                <button type="button" disabled={page === pages} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-[#ded8cf] p-2 disabled:opacity-40" aria-label="Next page"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          ) : null}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="bg-[#f8f3ec]">
                <tr>
                  {definition.columns.map((column) => (
                    <th key={column.name} className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#88837b]">
                      {column.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-[#88837b]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading && records.length === 0 ? (
                  <tr>
                    <td colSpan={definition.columns.length + 1} className="px-5 py-14 text-center text-sm text-[#77736c]">
                      No records yet. Add the first {definition.singular} using the form.
                    </td>
                  </tr>
                ) : null}
                {records.map((record) => (
                  <tr key={record.id} className="border-t border-[#eee8df] hover:bg-[#faf7f2]">
                    {definition.columns.map((column, index) => (
                      <td key={column.name} className={`max-w-[260px] px-4 py-3 text-sm ${index === 0 ? 'font-semibold text-[#383836]' : 'text-[#716e68]'}`}>
                        <span className="block truncate" title={String(record[column.name] || '')}>
                          {displayValue(record[column.name])}
                        </span>
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(record)}
                          aria-label={`Edit ${definition.singular}`}
                          className="rounded-lg border border-[#ded8cf] p-2 text-[#716e68] hover:bg-[#faf7f2]"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        {role === 'admin' || role === 'super_admin' ? (
                          <button
                            type="button"
                            onClick={() => void remove(record)}
                            aria-label={`Delete ${definition.singular}`}
                            className="rounded-lg border border-[#eadad6] p-2 text-[#a85749] hover:bg-[#fff4f1]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="self-start rounded-[24px] border border-[#ded8cf] bg-white p-5 shadow-[0_8px_22px_rgba(39,53,43,0.05)] xl:sticky xl:top-0">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#88837b]">
                {editingId ? 'Edit record' : 'New record'}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-[#383836]">
                {editingId ? `Update ${definition.singular}` : `Add ${definition.singular}`}
              </h2>
            </div>
            {editingId ? (
              <button type="button" onClick={resetForm} aria-label="Cancel editing" className="rounded-lg p-2 text-[#77736c] hover:bg-[#f1eeea]">
                <X className="h-4 w-4" />
              </button>
            ) : (
              <span className="rounded-xl bg-[#faf7f2] p-2 text-[#a56f1b]">
                <Plus className="h-4 w-4" />
              </span>
            )}
          </div>

          <form onSubmit={submit} className="grid gap-4">
            {definition.fields.map((field) => (
              <label key={field.name} className="grid gap-1.5 text-xs font-medium text-[#716e68]">
                <span>
                  {field.label}
                  {field.required ? <span className="ml-1 text-[#b55a49]">*</span> : null}
                </span>
                {lookups[field.name] ? (
                  <select
                    value={String(form[field.name] ?? '')}
                    onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                    required={field.required}
                    className="h-11 rounded-xl border border-[#ded8cf] bg-[#faf7f2] px-3 text-sm text-[#383836] outline-none focus:border-[#fbb040]"
                  >
                    <option value="">Select related record</option>
                    {lookups[field.name].map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={String(form[field.name] ?? '')}
                    onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                    required={field.required}
                    placeholder={field.placeholder}
                    rows={3}
                    className="rounded-xl border border-[#ded8cf] bg-[#faf7f2] px-3 py-2.5 text-sm leading-6 text-[#383836] outline-none focus:border-[#fbb040]"
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={String(form[field.name] ?? '')}
                    onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                    required={field.required}
                    className="h-11 rounded-xl border border-[#ded8cf] bg-[#faf7f2] px-3 text-sm text-[#383836] outline-none focus:border-[#fbb040]"
                  >
                    <option value="">Select</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={String(form[field.name] ?? '')}
                    onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                    required={field.required}
                    placeholder={field.placeholder}
                    step={field.type === 'number' ? 'any' : undefined}
                    className="h-11 rounded-xl border border-[#ded8cf] bg-[#faf7f2] px-3 text-sm text-[#383836] outline-none focus:border-[#fbb040]"
                  />
                )}
              </label>
            ))}
            <button
              type="submit"
              disabled={saving}
              className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#383836] px-4 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {editingId ? 'Save changes' : `Create ${definition.singular}`}
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
