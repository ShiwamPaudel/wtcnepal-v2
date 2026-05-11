import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import type { NewsArticle } from '@/data/news';
import { DivisionBadge } from './DivisionBadge';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const dateObj = new Date(article.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/news/${article.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-slate-100">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 90vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-sky-50 p-6 text-center">
            <span className="text-sm font-semibold text-[var(--color-primary)]">WTC Nepal Update</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          {article.division !== 'general' && <DivisionBadge division={article.division} />}
          <time className="ml-auto flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </time>
        </div>

        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-950 transition group-hover:text-[var(--color-primary)]">
          <Link href={`/news/${article.slug}`}>{article.title}</Link>
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">{article.excerpt}</p>

        <Link
          href={`/news/${article.slug}`}
          className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent)]"
        >
          Read article
          <ArrowRight className="ml-1.5 h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
