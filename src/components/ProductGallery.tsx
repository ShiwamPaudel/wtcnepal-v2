'use client';

import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import type { Division } from '@/data/divisions';
import { ProductArtwork } from '@/components/ui/ProductArtwork';
import { hasUsableImage } from '@/lib/content';

type ProductGalleryProps = {
  name: string;
  images: string[];
  division: Division;
  priority?: boolean;
};

export function ProductGallery({ name, images, division, priority = false }: ProductGalleryProps) {
  const usableImages = useMemo(() => images.filter(hasUsableImage), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lens, setLens] = useState({ visible: false, x: 50, y: 50 });
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    if (usableImages.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % usableImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [usableImages.length]);

  if (usableImages.length === 0) {
    return (
      <ProductArtwork
        name={name}
        image=""
        division={division}
        priority={priority}
        className="aspect-[4/3] rounded-lg border border-slate-200 bg-white shadow-sm"
      />
    );
  }

  const safeActiveIndex = usableImages[activeIndex] ? activeIndex : 0;
  const activeImage = usableImages[safeActiveIndex];
  const hasMultipleImages = usableImages.length > 1;

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + usableImages.length) % usableImages.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % usableImages.length);
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setLens({ visible: true, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }

  return (
    <div className="space-y-4">
      <div
        className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setLens((current) => ({ ...current, visible: true }))}
        onMouseLeave={() => setLens((current) => ({ ...current, visible: false }))}
      >
        <Image
          src={activeImage}
          alt={name}
          fill
          sizes="(max-width: 1024px) 92vw, 520px"
          className="object-contain p-6"
          priority={priority}
          unoptimized={activeImage.startsWith('/api/media/')}
        />

        {lens.visible && (
          <div
            className="pointer-events-none absolute hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-white shadow-2xl ring-1 ring-slate-200 md:block"
            style={{
              left: `${lens.x}%`,
              top: `${lens.y}%`,
              backgroundImage: `url("${activeImage}")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '220%',
              backgroundPosition: `${lens.x}% ${lens.y}%`,
            }}
          />
        )}

        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          className="absolute right-4 top-4 inline-flex h-11 w-11 cursor-zoom-in items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-lg ring-1 ring-slate-200 transition hover:bg-[var(--color-primary)] hover:text-white"
          aria-label="Zoom product image"
        >
          <Search className="h-5 w-5" />
        </button>

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white"
              aria-label="Previous product image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white"
              aria-label="Next product image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {usableImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg border bg-white transition ${
                index === safeActiveIndex ? 'border-[var(--color-primary)] ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-400'
              }`}
              aria-label={`Show product image ${index + 1}`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="96px"
                className="object-contain p-2"
                unoptimized={image.startsWith('/api/media/')}
              />
            </button>
          ))}
        </div>
      )}

      {zoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="relative h-[min(82vh,760px)] w-full max-w-5xl rounded-lg bg-white">
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-[var(--color-primary)]"
              aria-label="Close zoomed image"
            >
              <X className="h-5 w-5" />
            </button>
            <Image
              src={activeImage}
              alt={name}
              fill
              sizes="90vw"
              className="object-contain p-8"
              unoptimized={activeImage.startsWith('/api/media/')}
            />
          </div>
        </div>
      )}
    </div>
  );
}
