import Link from 'next/link';
import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { team } from '@/data/team';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'WTC Nepal Team | Healthcare Technology and Service Specialists',
  description:
    'Meet the WTC Nepal team supporting medical equipment consultation, product training, business development, and service operations across Nepal.',
  path: '/team',
});

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 py-20">
        <div className="container-xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold text-[var(--color-primary)]">Our people</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              Meet the WTC Nepal team
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Our team combines product knowledge, clinical application support, service
              coordination, and customer communication for healthcare providers across Nepal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <article key={member.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-50 text-xl font-bold text-[var(--color-primary)]">
                  {member.name
                    .split(' ')
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <h2 className="mt-5 text-xl font-bold text-slate-950">{member.name}</h2>
                <p className="mt-1 font-semibold text-[var(--color-primary)]">{member.title}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{member.bio}</p>
                <a
                  href={`mailto:${member.email}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[var(--color-primary)]"
                >
                  <Mail className="h-4 w-4" />
                  {member.email}
                </a>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to about WTC Nepal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
