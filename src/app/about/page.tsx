import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Building2, HeartPulse, ShieldCheck, Users } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'About WTC Nepal | Healthcare Solutions Provider Since 2001',
  description:
    "Learn about WTC Nepal, Nepal's medical equipment service provider for diagnostics, disinfection, and care solutions since 2001.",
  path: '/about',
});

const values = [
  {
    title: 'Service-led supply',
    description:
      'We pair equipment supply with installation, operator training, preventive maintenance, and responsive technical support.',
    icon: ShieldCheck,
  },
  {
    title: 'Clinical confidence',
    description:
      'Our application specialists help healthcare teams adopt technology with practical workflow guidance.',
    icon: HeartPulse,
  },
  {
    title: 'Nationwide reach',
    description:
      'WTC Nepal supports hospitals, clinics, laboratories, and care providers through a growing service network.',
    icon: Users,
  },
];

export default function AboutPage() {
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
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold text-[var(--color-primary)]">Mission</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">Raise equipment reliability</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Our mission is to help healthcare facilities access appropriate medical technology
                and keep it running through dependable technical support and clear user training.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold text-[var(--color-primary)]">Vision</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">Be Nepal&apos;s trusted partner</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                We aim to be the healthcare technology partner institutions can rely on for product
                selection, implementation, uptime, and long-term lifecycle support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[var(--color-primary)]">Our approach</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">A practical partner for critical equipment</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Medical equipment decisions are not just procurement decisions. They affect clinical
              workflows, service readiness, consumable availability, and patient care continuity.
              WTC Nepal brings product knowledge and field service experience into the same conversation.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article key={value.title} className="rounded-lg border border-slate-200 bg-white p-6">
                  <Icon className="h-7 w-7 text-[var(--color-primary)]" />
                  <h3 className="mt-5 text-xl font-bold text-slate-950">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{value.description}</p>
                </article>
              );
            })}
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
