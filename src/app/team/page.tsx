import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { getPageAsset, getPublishedTeam } from '@/lib/server-content';

export const metadata: Metadata = constructMetadata({
  title: 'Team | Web Trading Concern Pvt. Ltd.',
  description:
    'Team - Web Trading Concern Pvt. Ltd. | The professionals behind Operations, Management & Quality Service',
  path: '/team',
});

export default async function TeamPage() {
  const [team, teamHero] = await Promise.all([getPublishedTeam(), getPageAsset('team-hero')]);

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 py-20">
        <div className="container-xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
            <div className="max-w-4xl">
              <p className="text-sm font-bold text-[var(--color-primary)]"></p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
                Our Team
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Meet the team of Professionals.
              </p>
            </div>

            {teamHero?.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
                <Image
                  src={teamHero.image}
                  alt={teamHero.alt || teamHero.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 420px, 100vw"
                  priority
                  unoptimized={teamHero.image.startsWith('/api/media/')}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {team.map((member) => (
              <article key={member.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-square bg-slate-50">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain p-3"
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      unoptimized={member.image.startsWith('/api/media/')}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-sky-50 text-3xl font-bold text-[var(--color-primary)]">
                      {member.name
                        .split(' ')
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-bold text-slate-950" style={{ fontSize: 15, lineHeight: 1.25 }}>{member.name}</h2>
                  <p className="mt-1 font-semibold text-[var(--color-primary)]" style={{ fontSize: 13, lineHeight: 1.25 }}>{member.title}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to about Web Trading Concern Pvt. Ltd.
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
