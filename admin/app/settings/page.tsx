'use client';

import { useEffect, useState } from 'react';
import { Loader2, Save, User } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const userEmail = user?.email || '';
  const fallbackFromEmail = (email: string) =>
    email
      .split('@')[0]
      .replace(/[._-]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      if (!user?.id) {
        if (active) setLoading(false);
        return;
      }

      const response = await fetch('/api/admin/profile', { credentials: 'same-origin' });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        profile?: { fullName?: string; phone?: string | null };
      } | null;

      if (!active) return;

      if (!response.ok) {
        setError(payload?.error || 'Unable to load your profile.');
      } else if (payload?.profile) {
        setFullName(payload.profile.fullName || '');
        setPhone(payload.profile.phone || '');
      } else {
        const defaultName = user?.name || (userEmail ? fallbackFromEmail(userEmail) : '');
        setFullName(defaultName);
      }

      setLoading(false);
    };

    void loadProfile();
    return () => {
      active = false;
    };
  }, [user?.id, user?.name, userEmail]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    if (!user?.id) {
      setError('You must be logged in.');
      setSaving(false);
      return;
    }

    try {
      const updatePayload = {
        fullName: fullName.trim(),
        phone: phone.trim() || null,
      };

      const response = await fetch('/api/admin/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(updatePayload),
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(payload?.error || 'Unable to save your profile.');
        setSaving(false);
        return;
      }

      setMessage('Profile saved.');
      setSaving(false);
    } catch {
      setError('Network error. Please retry.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="w-7 h-7 text-[#a56f1b] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#383836]">Settings</h1>
        <p className="text-sm text-[#6f6d68] mt-1">Manage your Mansa OS profile information.</p>
      </div>

      <form onSubmit={onSave} className="bg-white border border-[#ded8cf] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-[#e5dfd6]">
          <div className="w-10 h-10 rounded-full bg-[#e7efe5] flex items-center justify-center">
            <User className="w-5 h-5 text-[#a56f1b]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#383836]">{user?.email}</p>
            <p className="text-xs text-[#77736c]">Authenticated Mansa OS account</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-[#77736c] mb-2">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            className="w-full h-11 rounded-xl border border-[#ded8cf] px-3 text-sm text-[#383836] outline-none focus:border-[#fbb040]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-[#77736c] mb-2">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+255 ..."
            className="w-full h-11 rounded-xl border border-[#ded8cf] px-3 text-sm text-[#383836] outline-none focus:border-[#fbb040]"
          />
        </div>

        {error && <p className="text-sm text-[#be4c42]">{error}</p>}
        {message && <p className="text-sm text-[#8a641f]">{message}</p>}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-[#383836] hover:bg-[#2f302e] text-white text-sm font-semibold disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Profile
        </button>
      </form>
    </div>
  );
}
