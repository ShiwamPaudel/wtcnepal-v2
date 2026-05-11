import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getArticleBySlug, newsArticles } from '@/data/news';
import { constructMetadata, siteConfig } from '@/lib/seo';
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/structured-data';
import { getDivisionLabel } from '@/lib/content';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return constructMetadata({
      title: 'Article Not Found',
      description: 'The requested WTC Nepal article could not be found.',
      path: `/news/${slug}`,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: article.title,
    description: article.excerpt,
    image: article.image || siteConfig.ogImage,
    path: `/news/${article.slug}`,
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const paragraphs = article.content.split('\n\n').filter(Boolean);
  const jsonLd = [
    getArticleSchema(article),
    getBreadcrumbSchema([
      { name: 'Home', item: '/' },
      { name: 'News', item: '/news' },
      { name: article.title, item: `/news/${article.slug}` },
    ]),
  ];

  return (
    <main className="min-h-screen bg-white">
      <article>
        <section className="border-b border-slate-200 bg-slate-50 py-16">
          <div className="container-xl">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[var(--color-primary)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to news
            </Link>

            <div className="mt-8 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={article.date}>{article.date}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {article.readingTime} min read
                </span>
                {article.division !== 'general' && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[var(--color-primary)] ring-1 ring-blue-100">
                    {getDivisionLabel(article.division)}
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
                {article.title}
              </h1>
              <p className="mt-6 text-xl leading-8 text-slate-600">{article.excerpt}</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-xl">
            <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
              <div className="prose prose-slate max-w-none">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mb-6 text-lg leading-8 text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </div>

              <aside className="h-fit rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase text-slate-500">Published by</p>
                <p className="mt-2 font-semibold text-slate-950">{article.author}</p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
                >
                  Contact team
                </Link>
              </aside>
            </div>
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
