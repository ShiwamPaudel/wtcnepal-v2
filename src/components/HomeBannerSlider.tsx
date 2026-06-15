'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { HomeBanner } from '@/lib/cms';

export function HomeBannerSlider({ banners }: { banners: HomeBanner[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % banners.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-slate-100">
      {banners.map((banner, index) => (
        <Image
          key={banner.id}
          src={banner.image}
          alt={banner.alt || banner.title}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          unoptimized={banner.image.startsWith('/api/media/')}
        />
      ))}

      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-white/70 p-2 backdrop-blur">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              aria-label={`Show banner ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? 'w-8 bg-slate-950' : 'w-2.5 bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
