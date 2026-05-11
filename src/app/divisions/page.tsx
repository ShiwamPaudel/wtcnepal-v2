import Link from 'next/link';
import { divisions } from '@/data/divisions';
import { constructMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Healthcare Divisions | Diagnostics, Disinfection & Care Solutions',
  description: 'Explore WTC Nepal\'s three core divisions: Diagnostics, Disinfection, and Care. Discover our comprehensive healthcare solutions and medical equipment services across Nepal.',
  path: '/divisions',
});

export default function DivisionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 py-20">
        <div className="container-xl">
          <p className="text-sm font-bold text-[var(--color-primary)]">Healthcare divisions</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-950 md:text-5xl">Our divisions</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            WTC Nepal organizes its portfolio around diagnostics, disinfection, and care so
            healthcare providers can quickly find the right product and support team.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {divisions.map((division) => (
              <article
                key={division.id}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="h-1 w-16 rounded-full"
                  style={{ backgroundColor: division.color }}
                />
                <h2 className="mt-6 text-2xl font-bold text-slate-950">{division.name}</h2>
                <p className="mt-2 font-semibold" style={{ color: division.color }}>
                  {division.tagline}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{division.description}</p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href={`/divisions/${division.id}`}
                    className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]"
                  >
                    Explore division
                  </Link>
                  <Link
                    href={`/divisions/${division.id}/categories`}
                    className="text-sm font-semibold text-slate-600 hover:text-[var(--color-primary)]"
                  >
                    View categories and partners
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
