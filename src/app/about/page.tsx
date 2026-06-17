import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Building2 } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { getAboutPageContent } from '@/lib/server-content';

export const metadata: Metadata = constructMetadata({
  title: 'About | Web Trading Concern Pvt. Ltd. | Best Medical Equipment Service Provider in Nepal',
  description:
    "Learn about Web Trading Concern Pvt. Ltd., Best Medical Equipment Service Provider in Nepal.",
  path: '/about',
});

export default async function AboutPage() {
  const aboutContent = await getAboutPageContent();
  const directorParagraphs = aboutContent.directorMessage.split('\n\n').filter(Boolean);

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-white py-20">
        <div className="container-xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <div>
              <p className="text-sm font-bold text-[var(--color-primary)]">About WTC Nepal</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
                Building dependable healthcare technology access across Nepal
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Since 2001, Web Trading Concern Pvt. Ltd. has worked with healthcare providers
                to make medical equipment easier to source, operate, and maintain. Our work spans
                diagnostics, disinfection, and care solutions.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
                >
                  Browse products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Contact our team
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <Building2 className="h-10 w-10 text-[var(--color-primary)]" />
              <dl className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-slate-500">Established</dt>
                  <dd className="mt-1 text-2xl font-bold text-slate-950">2001</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500">Coverage</dt>
                  <dd className="mt-1 text-2xl font-bold text-slate-950">Nepal</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500">Divisions</dt>
                  <dd className="mt-1 text-2xl font-bold text-slate-950">3</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500">Focus</dt>
                  <dd className="mt-1 text-2xl font-bold text-slate-950">Service</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold text-[var(--color-primary)]">Mission</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">{aboutContent.missionTitle}</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {aboutContent.mission}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold text-[var(--color-primary)]">Vision</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">{aboutContent.visionTitle}</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {aboutContent.vision}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold text-[var(--color-primary)]">Goals</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">{aboutContent.goalsTitle}</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {aboutContent.goals}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-xl">
          <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-center">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              {aboutContent.directorImage ? (
                <Image
                  src={aboutContent.directorImage}
                  alt={aboutContent.directorImageAlt || aboutContent.directorName || 'Director - Web Trading Concern Pvt. Ltd.'}
                  width={720}
                  height={900}
                  className="aspect-[4/5] w-full object-cover"
                  unoptimized={aboutContent.directorImage.startsWith('/api/media/')}
                />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center bg-white p-8">
                  <Image
                    src="/images/logo.png"
                    alt="Logo - Web Trading Concern Pvt. Ltd."
                    width={220}
                    height={86}
                    className="h-auto w-52 object-contain"
                  />
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)]">Director&apos;s Message</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
                A message from {aboutContent.directorName || 'our leadership'}
              </h2>
              {aboutContent.directorTitle && (
                <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {aboutContent.directorTitle}
                </p>
              )}
              <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
                {directorParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-950">Meet the people behind the work</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Our team brings together business development, application support, service, and
              communications experience for healthcare providers across Nepal.
            </p>
            <Link
              href="/team"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
            >
              View our team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
