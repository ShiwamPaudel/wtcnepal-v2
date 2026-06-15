'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, LockKeyhole } from 'lucide-react';

export function AdminLoginForm({ loginConfigured }: { loginConfigured: boolean }) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      setMessage(result.message ?? 'Login failed.');
      setBusy(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <form onSubmit={login} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
        <LockKeyhole className="h-5 w-5" />
      </div>
      <h2 className="mt-5 text-2xl font-bold text-slate-950">Sign in</h2>
      <label className="mt-6 block">
        <span className="text-sm font-semibold text-slate-700">Email</span>
        <input name="email" type="email" required autoComplete="username" className="admin-input" />
      </label>
      <label className="mt-6 block">
        <span className="text-sm font-semibold text-slate-700">Password</span>
        <input name="password" type="password" required autoComplete="current-password" className="admin-input" />
      </label>
      <button
        type="submit"
        disabled={busy || !loginConfigured}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary)] disabled:bg-slate-300"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" />}
        Login
      </button>
      {!loginConfigured && (
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-800">
          Sign-in is not configured yet. Add the required credentials and bootstrap the first user once.
        </p>
      )}
      {message && <p className="mt-4 text-sm font-semibold text-red-700">{message}</p>}
    </form>
  );
}
