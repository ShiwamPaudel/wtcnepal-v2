import Image from 'next/image';
import { Quote } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';
import { TestimonialVideo } from '@/components/ui/TestimonialVideo';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial: t }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-20px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-20px_rgba(23,76,255,0.25)]">
      <TestimonialVideo url={t.youtube} title={`${t.name} testimonial`} />

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between gap-4">
          <div className="flex h-12 items-center">
            <Image
              src={t.institutionLogo}
              alt={t.institution}
              width={160}
              height={48}
              className="h-full w-auto max-w-[10rem] object-contain object-left"
              loading="lazy"
            />
          </div>
          <Quote className="h-9 w-9 shrink-0 fill-blue-50 text-blue-100" aria-hidden="true" />
        </div>

        <blockquote className="mt-6 flex-1 text-lg font-medium leading-relaxed text-slate-800">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <figcaption className="mt-7 flex items-center gap-4 border-t border-slate-100 pt-6">
          <Image
            src={t.image}
            alt={t.name}
            width={112}
            height={112}
            className="h-14 w-14 shrink-0 rounded-full object-cover object-[center_25%] ring-2 ring-[var(--color-accent)] ring-offset-2"
            loading="lazy"
          />
          <div className="min-w-0">
            <div className="font-semibold leading-snug text-slate-950">{t.name}</div>
            <div className="mt-0.5 text-sm leading-snug text-slate-500">{t.designation}</div>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
