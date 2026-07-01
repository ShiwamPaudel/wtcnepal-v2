import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { getDivisionLabel } from '@/lib/content';
import { getPublishedNewsArticles } from '@/lib/server-content';

export const metadata: Metadata = constructMetadata({
  title: 'News and Events | Web Trading Concern Pvt. Ltd. | Trusted Medical Equipment Service Provider in Nepal',
  description:
    'Read Web Trading Concern Pvt. Ltd. news, events, product updates, service expansion notes, and healthcare equipment support updates in Nepal.',
  path: '/news-and-events',
});

export default async function NewsAndEventsPage() {
  const newsArticles = await getPublishedNewsArticles();

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-white py-20">
        <div className="container-xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold text-[var(--color-primary)]">News and events</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              News & Events
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          {newsArticles.length > 0 ? (
            <div className="grid gap-8">
              {newsArticles.map((article) => (
                <article
                  key={article.id}
                  className="grid gap-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center"
                >
                  <Link
                    href={`/news-and-events/${article.slug}`}
                    className="flex aspect-[16/10] items-center justify-center rounded-md bg-gradient-to-br from-blue-50 via-slate-50 to-sky-50 p-6 text-center"
                  >
                    <span className="text-sm font-semibold text-[var(--color-primary)]">
                      Web Trading Concern Pvt. Ltd. Update
                    </span>
                  </Link>

                  <div>
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

                    <h2 className="mt-4 text-2xl font-bold leading-snug text-slate-950">
                      <Link href={`/news-and-events/${article.slug}`} className="hover:text-[var(--color-primary)]">
                        {article.title}
                      </Link>
                    </h2>
                    <p className="mt-3 max-w-4xl text-base leading-7 text-slate-600">
                      {article.excerpt}
                    </p>

                    <Link
                      href={`/news-and-events/${article.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent)]"
                    >
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <h2 className="text-2xl font-bold text-slate-950">Updates coming soon</h2>
              <p className="mt-2 text-slate-600">
                Web Trading Concern Pvt. Ltd. news and events will appear here once published.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-950">Stay close to new updates</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              For product demonstrations, partner announcements, and service updates, contact the
              Web Trading Concern Pvt. Ltd. team directly.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
            >
              Contact Web Trading Concern Pvt. Ltd.
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
