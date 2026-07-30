'use client';

import { useEffect, useRef, useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';

type UploadResponse = {
  ok: boolean;
  uploadUrl?: string;
  asset?: {
    id: string;
    url: string;
  };
  error?: string;
};

export function MediaUploadField({
  label,
  value,
  onChange,
  scope = 'itineraries',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  scope?: 'itineraries' | 'hotels' | 'suppliers' | 'customers';
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/admin/media')
      .then((response) => response.json())
      .then((payload: { configured?: boolean }) => { if (active) setConfigured(payload.configured === true); })
      .catch(() => { if (active) setConfigured(false); });
    return () => { active = false; };
  }, []);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          byteSize: file.size,
          scope,
        }),
      });
      const payload = (await response.json()) as UploadResponse;
      if (!response.ok || !payload.asset?.id || !payload.uploadUrl) {
        throw new Error(payload.error || 'Unable to upload image');
      }

      const uploadResponse = await fetch(payload.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
        body: file,
      });
      if (!uploadResponse.ok) {
        await fetch('/api/admin/media', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ assetId: payload.asset.id }),
        }).catch(() => undefined);
        throw new Error('R2 rejected the image upload');
      }

      const confirmationResponse = await fetch('/api/admin/media', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assetId: payload.asset.id }),
      });
      const confirmation = (await confirmationResponse.json()) as UploadResponse;
      if (!confirmationResponse.ok || !confirmation.asset?.url) {
        throw new Error(confirmation.error || 'Unable to verify image upload');
      }
      onChange(confirmation.asset.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Unable to upload image');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="grid gap-2 text-sm text-[#6b6964]">
      <span>{label}</span>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={configured === false ? 'Paste an image URL (R2 upload unavailable)' : 'Paste an image URL or upload to R2'}
          className="min-w-0 flex-1 rounded-xl border border-[#ded8cf] bg-[#faf7f2] px-4 py-3 text-sm outline-none focus:border-[#fbb040]"
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="sr-only"
          onChange={(event) => void handleFile(event.target.files?.[0])}
        />
        <button
          type="button"
          disabled={uploading || configured === false}
          onClick={() => inputRef.current?.click()}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#ded8cf] bg-white px-4 py-3 font-medium text-[#383836] transition hover:border-[#fbb040] disabled:cursor-wait disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          {configured === false ? 'Storage unavailable' : uploading ? 'Uploading' : 'Upload'}
        </button>
      </div>
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
      {configured === false ? <p className="text-xs text-[#a84739]">R2 storage is not configured. Paste a hosted image URL or configure the Mansa OS media bucket.</p> : <p className="text-xs text-[#88837b]">JPG, PNG, WebP, or AVIF. Maximum 10 MB.</p>}
    </div>
  );
}
