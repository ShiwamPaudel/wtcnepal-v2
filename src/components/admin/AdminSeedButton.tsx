'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database, Loader2 } from 'lucide-react';

async function readJsonResponse(response: Response) {
  try {
    return await response.json();
  } catch {
    return { message: response.ok ? '' : 'Request failed without a JSON response.' };
  }
}

export function AdminSeedButton({ disabled }: { disabled: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function seed() {
    if (!window.confirm('Seed local JSON content into the CMS? Existing IDs will not be overwritten.')) return;

    setBusy(true);
    setMessage('');
    const response = await fetch('/api/admin/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'seed' }),
    });
    const result = await readJsonResponse(response);

    if (response.ok) {
      setMessage('Seed complete.');
      router.refresh();
    } else {
      setMessage(result.message ?? 'Seed failed.');
    }

    setBusy(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={seed}
        disabled={disabled || busy}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary)] disabled:bg-slate-300"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
        Seed local content
      </button>
      {message && <p className="mt-2 text-sm font-semibold text-slate-600">{message}</p>}
    </div>
  );
}
