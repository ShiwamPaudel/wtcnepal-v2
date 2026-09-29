'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface TestimonialVideoProps {
  url: string;
  title: string;
}

function getYouTubeId(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function TestimonialVideo({ url, title }: TestimonialVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-slate-100 text-sm font-semibold text-slate-500">
        Video coming soon
      </div>
    );
  }

  if (isPlaying) {
    return (
      <div className="aspect-video w-full bg-slate-950">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group/video relative block aspect-video w-full overflow-hidden bg-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[var(--color-accent)]"
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition duration-500 group-hover/video:scale-105"
        loading="lazy"
        unoptimized
      />
      <span className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent transition group-hover/video:from-slate-950/80" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[var(--color-primary)] shadow-xl ring-8 ring-white/20 transition duration-300 group-hover/video:scale-110 group-hover/video:bg-white">
          <Play className="ml-1 h-6 w-6 fill-current" />
        </span>
      </span>
      <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        Watch video
      </span>
    </button>
  );
}
