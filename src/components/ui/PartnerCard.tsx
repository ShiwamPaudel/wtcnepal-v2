import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe2 } from 'lucide-react';
import type { Partner } from '@/data/partners';
import { DivisionBadge } from './DivisionBadge';

interface PartnerCardProps {
  partner: Partner;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const hasWebsite = partner.website && partner.website !== '#';

  return (
    <article className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
          <Globe2 className="h-3.5 w-3.5" />
          {partner.country}
        </span>
        <DivisionBadge division={partner.division} />
      </div>

      <div className="mt-6 flex h-24 items-center justify-center rounded-md bg-slate-50 p-4">
        <Image
          src={partner.image}
          alt={partner.name}
          width={160}
          height={90}
          className="max-h-16 object-contain"
        />
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-950">{partner.name}</h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
        {partner.description}
      </p>

      <Link
        href={hasWebsite ? partner.website : `/partners/${partner.id}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent)]"
        target={hasWebsite ? '_blank' : undefined}
        rel={hasWebsite ? 'noopener noreferrer' : undefined}
      >
        {hasWebsite ? 'Visit website' : 'View partner'}
        <ExternalLink className="h-4 w-4" />
      </Link>
    </article>
  );
}
