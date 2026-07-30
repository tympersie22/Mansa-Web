'use client';

async function requestJson<T>(url: string, method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', body?: Record<string, unknown>): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: body ? JSON.stringify(body) : undefined });
    const payload = (await res.json().catch(() => null)) as (T & { error?: string }) | null;
    if (!res.ok) return { data: null, error: payload?.error || 'Request failed' };
    return { data: payload, error: null };
  } catch {
    return { data: null, error: 'Network error' };
  }
}

export const adminApi = {
  saveItinerary(slug: string, payload: Record<string, unknown>) {
    return requestJson<{ ok: boolean; slug: string; published: boolean; status: string }>(`/api/admin/itineraries/${slug}`, 'PUT', payload);
  },
  listItineraries(query = '') {
    return requestJson<{ ok: boolean; itineraries: Array<Record<string, unknown>> }>(`/api/admin/itineraries${query ? `?q=${encodeURIComponent(query)}` : ''}`, 'GET');
  },
  listOperations(resource: string, params: { q?: string; page?: number; pageSize?: number } = {}) {
    const query = new URLSearchParams();
    if (params.q) query.set('q', params.q);
    if (params.page) query.set('page', String(params.page));
    if (params.pageSize) query.set('pageSize', String(params.pageSize));
    return requestJson<{ ok: boolean; records: Array<Record<string, unknown>>; pagination?: { page: number; pageSize: number; total: number; pages: number } }>(`/api/admin/operations/${resource}${query.size ? `?${query}` : ''}`, 'GET');
  },
  createOperation(resource: string, payload: Record<string, unknown>) { return requestJson<{ ok: boolean; record: Record<string, unknown> }>(`/api/admin/operations/${resource}`, 'POST', payload); },
  updateOperation(resource: string, id: string, payload: Record<string, unknown>) { return requestJson<{ ok: boolean; record: Record<string, unknown> }>(`/api/admin/operations/${resource}/${id}`, 'PATCH', payload); },
  deleteOperation(resource: string, id: string) { return requestJson<{ ok: boolean }>(`/api/admin/operations/${resource}/${id}`, 'DELETE'); },
};
