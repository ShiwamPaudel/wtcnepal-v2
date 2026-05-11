import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Clock, GraduationCap, MapPin, Wrench } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Careers at WTC Nepal | Healthcare Technology Team',
  description:
    'Explore career opportunities at WTC Nepal for biomedical service, healthcare technology, business development, and customer support roles.',
  path: '/career',
});

const benefits = [
  {
    title: 'Healthcare impact',
    description:
      'Support equipment and services that help hospitals, clinics, laboratories, and care providers operate with confidence.',
    icon: Wrench,
  },
  {
    title: 'Field learning',
    description:
      'Work with healthcare facilities, clinical users, and global partner technologies across practical service settings.',
    icon: GraduationCap,
  },
  {
    title: 'Nationwide exposure',
    description:
      'Collaborate with teams and customers across Nepal as the service and product network continues to grow.',
    icon: MapPin,
  },
];

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 py-20">
        <div className="container-xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold text-[var(--color-primary)]">Careers</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              Build a career in healthcare technology
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Join a team focused on medical equipment, service reliability, product training, and
              customer support for healthcare providers in Nepal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article key={benefit.title} className="rounded-lg border border-slate-200 bg-white p-6">
                  <Icon className="h-7 w-7 text-[var(--color-primary)]" />
                  <h2 className="mt-5 text-xl font-bold text-slate-950">{benefit.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-xl">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold text-[var(--color-primary)]">Current opening</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">Field Service Engineer</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                We are looking for biomedical engineers or technicians who can support equipment
                installation, maintenance, troubleshooting, and user training.
              </p>
            </div>

            <article className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-950">Field Service Engineer</h3>
                  <p className="mt-2 text-slate-600">Technical support and maintenance</p>
                  <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      Kathmandu with travel
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      Full-time
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
                >
                  Apply now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-5 border-t border-slate-200 pt-6 md:grid-cols-2">
                <div>
                  <h4 className="font-bold text-slate-950">Responsibilities</h4>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    <li>Install, inspect, and maintain medical equipment.</li>
                    <li>Support customers with troubleshooting and operator guidance.</li>
                    <li>Coordinate service reports, spare parts, and follow-up visits.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-950">Helpful experience</h4>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    <li>Biomedical engineering, electronics, or related technical training.</li>
                    <li>Hands-on experience with medical equipment service workflows.</li>
                    <li>Clear communication and willingness to travel for field support.</li>
                  </ul>
                </div>
              </div>
            </article>

            <div className="mt-10 text-center">
              <p className="text-slate-600">
                Do not see a matching role? Send your profile and area of interest to the WTC Nepal team.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Share your profile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
