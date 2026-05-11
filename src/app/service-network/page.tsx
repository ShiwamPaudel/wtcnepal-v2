import type { Metadata } from 'next';
import { MapPin, Phone } from 'lucide-react';
import { serviceStations } from '@/data/serviceStations';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Service Network | Medical Equipment Support Across Nepal',
  description:
    'Find WTC Nepal medical equipment service locations and technical support coverage for diagnostics, disinfection, and care equipment across Nepal.',
  path: '/service-network',
});

export default function ServiceNetworkPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 py-20">
        <div className="container-xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold text-[var(--color-primary)]">Service network</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              Medical equipment service support across Nepal
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              WTC Nepal supports installation, preventive maintenance, troubleshooting, and user
              training through headquarters and regional service touchpoints.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="grid gap-6 md:grid-cols-3">
            {serviceStations.map((station) => (
              <article
                key={station.id}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-[var(--color-primary)]">
                  <MapPin className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-slate-950">
                  {station.city}
                  {station.isHQ ? ' Headquarters' : ''}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{station.address}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Phone className="h-4 w-4" />
                  {station.phone}
                </p>
                <p className="mt-2 text-sm text-slate-500">{station.hours}</p>
                <a
                  href={station.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]"
                >
                  Open map
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-950">Support built around uptime</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              For critical healthcare equipment, fast support matters. WTC Nepal helps facilities
              plan service schedules, training, consumables, and escalation paths before downtime
              becomes disruptive.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
