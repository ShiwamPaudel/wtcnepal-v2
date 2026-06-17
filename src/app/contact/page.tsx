import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Contact Web Trading Concern Pvt. Ltd. | Medical Equipment Service and Support',
  description:
    'Contact Web Trading Concern Pvt. Ltd. for medical equipment consultation, diagnostics, disinfection, care products, technical service, and nationwide support in Nepal.',
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
              Contact us | Web Trading Concern Pvt. Ltd.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              
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
                location. The right Web Trading Concern Pvt. Ltd. team member will follow up.
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

      <section className="pb-16">
        <div className="container-xl">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Find us on Google Maps</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Kumari Marga, Tripureshwor, Kathmandu, Nepal
                </p>
              </div>
              <a
                href="https://maps.app.goo.gl/yfk9hScy2VantbaVA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="relative h-[360px] bg-slate-100 md:h-[460px]">
              <iframe
                title="WTC Nepal office location on Google Maps"
                src="https://www.google.com/maps?q=Kumari%20Marga%2C%20Tripureshwor%2C%20Kathmandu%2C%20Nepal&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
