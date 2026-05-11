import Image from 'next/image';
import { PackageSearch } from 'lucide-react';
import type { Division } from '@/data/divisions';
import { divisionTheme, getDivisionLabel, hasUsableImage } from '@/lib/content';

interface ProductArtworkProps {
  name: string;
  image?: string;
  division: Division;
  priority?: boolean;
  className?: string;
}

export function ProductArtwork({
  name,
  image,
  division,
  priority = false,
  className = '',
}: ProductArtworkProps) {
  const theme = divisionTheme[division];

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-slate-50 ${className}`}>
      {hasUsableImage(image) ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 280px"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          priority={priority}
        />
      ) : (
        <div className={`flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center ${theme.bg}`}>
          <PackageSearch className={`h-10 w-10 ${theme.text}`} aria-hidden="true" />
          <span className={`text-xs font-semibold uppercase ${theme.text}`}>
            {getDivisionLabel(division)}
          </span>
          <span className="max-w-[14rem] text-sm font-semibold leading-snug text-slate-700">
            Product image coming soon
          </span>
        </div>
      )}
    </div>
  );
}
