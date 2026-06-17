import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Globe2, Mail, MapPin, Phone } from 'lucide-react';
import { divisions } from '@/data/divisions';
import { siteConfig } from '@/lib/seo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-navy)] text-white">
      <div className="container-xl py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Image
              src="/images/wtc-white.png"
              alt="Web Trading Concern Pvt. Ltd."
              width={112}
              height={112}
              className="h-24 w-24 object-contain"
            />
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
              Web Trading Concern Pvt. Ltd. supplies and services healthcare technology across
              diagnostics, disinfection, and care divisions in Nepal.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-[var(--color-accent)]"
              >
                <Globe2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-white">Divisions</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {divisions.map((division) => (
                <li key={division.id}>
                  <Link
                    href={`/divisions/${division.id}`}
                    className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: division.color }}
                    />
                    {division.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition hover:text-white"
                >
                  Browse all products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-white">Company</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {[
                ['About us', '/about'],
                ['Our team', '/team'],
                ['Our Partners', '/partners'],
                ['Service Network', '/service-network'],
                ['Careers', '/career'],
                ['News and Events', '/news-and-events'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-300 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-white">Contact</h2>
            <ul className="mt-5 flex flex-col gap-4 text-sm text-slate-300">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                <span>Kumari Marga, Tripureshwor, Kathmandu, Nepal</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                <span>+977 01 536 2654, 410 0634</span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                <span>info@wtcnepal.com</span>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Send an enquiry
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; {currentYear} Web Trading Concern Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy policy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
