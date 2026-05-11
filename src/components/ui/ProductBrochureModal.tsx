'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { X } from 'lucide-react';

interface ProductBrochureModalProps {
  brochure: string;
  productName: string;
}

export default function ProductBrochureModal({ brochure, productName }: ProductBrochureModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', institution: '', email: '', phone: '' });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const subject = encodeURIComponent(`Brochure request: ${productName}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Institution: ${form.institution}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Product: ${productName}`,
        `Brochure: ${brochure}`,
      ].join('\n'),
    );

    window.location.href = `mailto:info@wtcnepal.com?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <button
        type="button"
        className="rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
        onClick={() => setOpen(true)}
      >
        Request brochure
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              onClick={() => setOpen(false)}
              aria-label="Close brochure request"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="pr-10 text-xl font-bold text-slate-950">Request brochure</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Submit your details to open an email request for {productName}.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <input
                required
                name="name"
                placeholder="Your name"
                className="h-11 rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                value={form.name}
                onChange={handleChange}
              />
              <input
                required
                name="institution"
                placeholder="Institution name"
                className="h-11 rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                value={form.institution}
                onChange={handleChange}
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                className="h-11 rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                value={form.email}
                onChange={handleChange}
              />
              <input
                required
                name="phone"
                placeholder="Phone number"
                className="h-11 rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                value={form.phone}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
              >
                Open email request
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
