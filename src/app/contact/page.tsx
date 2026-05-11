import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { serviceStations } from '@/data/serviceStations';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Contact WTC Nepal | Medical Equipment Service and Support',
  description:
    'Contact WTC Nepal for medical equipment consultation, diagnostics, disinfection, care products, technical service, and nationwide support in Nepal.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 py-20">
        <div className="container-xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold text-[var(--color-primary)]">Get in touch</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              Contact WTC Nepal
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Reach out for equipment consultation, product demonstrations, service support, or
              partner enquiries across diagnostics, disinfection, and care divisions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">Start a conversation</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Share the equipment category, facility type, expected workload, and service
                location. The right WTC Nepal team member will follow up.
              </p>

              <div className="mt-10 grid gap-5">
                {[
                  {
                    title: 'Office',
                    body: 'Kumari Marga, Tripureshwor, Kathmandu, Nepal',
                    icon: MapPin,
                  },
                  {
                    title: 'Phone',
                    body: '+977 01 536 2654, 410 0634',
                    icon: Phone,
                  },
                  {
                    title: 'Email',
                    body: 'info@wtcnepal.com',
                    icon: Mail,
                  },
                  {
                    title: 'Business hours',
                    body: 'Sunday-Friday: 9:00 AM-5:30 PM',
                    icon: Clock,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex gap-4 rounded-lg border border-slate-200 p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[var(--color-primary)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-950">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{item.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[var(--color-primary)]">Service reach</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">Service locations</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              WTC Nepal supports healthcare providers through Kathmandu headquarters and regional
              service touchpoints.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {serviceStations.map((station) => (
              <article key={station.id} className="rounded-lg border border-slate-200 bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[var(--color-primary)]">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {station.city}
                  {station.isHQ ? ' HQ' : ''}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{station.address}</p>
                <p className="mt-3 text-sm font-medium text-slate-500">{station.phone}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
