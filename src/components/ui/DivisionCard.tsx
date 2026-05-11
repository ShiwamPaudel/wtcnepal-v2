import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, HeartPulse, Microscope, ShieldCheck } from 'lucide-react';
import type { Division, DivisionInfo } from '@/data/divisions';
import { partners } from '@/data/partners';

interface DivisionCardProps {
  division: DivisionInfo;
}

const iconMap: Record<Division, typeof Microscope> = {
  diagnostics: Microscope,
  disinfection: ShieldCheck,
  care: HeartPulse,
};

export function DivisionCard({ division }: DivisionCardProps) {
  const divisionPartners = partners.filter((partner) => partner.division === division.id);
  const Icon = iconMap[division.id];

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
      style={{ borderTopColor: division.color, borderTopWidth: 4 }}
    >
      <div className="flex flex-1 flex-col p-6">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-lg"
          style={{ backgroundColor: division.lightBg, color: division.color }}
        >
          <Icon className="h-7 w-7" />
        </div>

        <h3 className="mt-6 text-2xl font-bold text-slate-950 transition group-hover:text-[var(--color-primary)]">
          {division.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{division.description}</p>

        <ul className="mt-6 space-y-3">
          {division.offerings.slice(0, 3).map((offering) => (
            <li key={offering} className="flex gap-2 text-sm leading-6 text-slate-600">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: division.color }} />
              {offering}
            </li>
          ))}
        </ul>

        <Link
          href={`/divisions/${division.id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition"
          style={{ color: division.color }}
        >
          Explore division
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>

      {divisionPartners.length > 0 && (
        <div className="border-t border-slate-100 bg-slate-50 p-4">
          <p className="mb-3 text-xs font-semibold uppercase text-slate-500">Partner brands</p>
          <div className="flex flex-wrap gap-2">
            {divisionPartners.slice(0, 4).map((partner) => (
              <Link
                key={partner.id}
                href={`/partners/${partner.id}`}
                className="flex h-10 w-16 items-center justify-center rounded-md bg-white p-2 ring-1 ring-slate-200 transition hover:ring-slate-300"
                aria-label={partner.name}
              >
                <Image
                  src={partner.image}
                  alt=""
                  width={64}
                  height={32}
                  className="max-h-7 object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
