import Link from 'next/link';
import { ArrowRight, Database, ImageUp, Inbox, Plus } from 'lucide-react';
import { AdminSeedButton } from '@/components/admin/AdminSeedButton';
import { adminCollections } from '@/lib/admin-collections';
import { getAdminCmsCollection, listCareerApplications, listFormSubmissions, listMedia } from '@/lib/cms';
import { isTursoConfigured } from '@/lib/turso';

export default async function AdminOverviewPage() {
  const [products, news, team, jobs, homeBanners, pageAssets, media, submissions, applications] = await Promise.all([
    getAdminCmsCollection('products'),
    getAdminCmsCollection('news'),
    getAdminCmsCollection('team'),
    getAdminCmsCollection('jobs'),
    getAdminCmsCollection('home-banners'),
    getAdminCmsCollection('page-assets'),
    listMedia(),
    listFormSubmissions(),
    listCareerApplications(),
  ]);
  const tursoConfigured = isTursoConfigured();
  const stats = [
    { label: 'Products', value: products.length, href: '/admin/content/products' },
    { label: 'News and Events', value: news.length, href: '/admin/content/news' },
    { label: 'Team', value: team.length, href: '/admin/content/team' },
    { label: 'Careers', value: jobs.length, href: '/admin/content/jobs' },
    { label: 'Home Banners', value: homeBanners.length, href: '/admin/content/home-banners' },
    { label: 'Page Assets', value: pageAssets.length, href: '/admin/content/page-assets' },
  ];

  return (
    <div className="grid gap-8">
      <section className="rounded-3xl bg-slate-950 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <p className="text-sm font-bold text-sky-300">Operational CMS</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-bold">Manage public content, media, career posts, and applicant records.</h2>
            <p className="mt-4 max-w-2xl text-slate-300">
              Manage public pages, content records, media, career posts, and enquiries from one private workspace.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
            <p className="text-sm text-slate-300">Database status</p>
            <p className={`mt-2 text-2xl font-bold ${tursoConfigured ? 'text-emerald-300' : 'text-amber-300'}`}>
              {tursoConfigured ? 'CMS connected' : 'CMS storage missing'}
            </p>
            <div className="mt-5">
              <AdminSeedButton disabled={!tursoConfigured} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
            <p className="mt-3 text-4xl font-bold text-slate-950">{stat.value}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
              Manage
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-950">Quick create</h2>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {Object.entries(adminCollections).map(([collection, config]) => {
              const Icon = config.icon;
              return (
                <Link
                  key={collection}
                  href={`/admin/content/${collection}/new`}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:border-[var(--color-primary)] hover:bg-blue-50/40"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                      <Icon className="h-5 w-5 text-slate-700" />
                    </span>
                    <span>
                      <span className="block font-bold text-slate-950">{config.singular}</span>
                      <span className="block text-sm text-slate-500">Create new</span>
                    </span>
                  </span>
                  <Plus className="h-4 w-4 text-slate-400" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4">
          <Link href="/admin/media" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <ImageUp className="h-6 w-6 text-[var(--color-primary)]" />
            <p className="mt-4 text-3xl font-bold text-slate-950">{media.length}</p>
            <p className="text-sm font-semibold text-slate-500">Media files</p>
          </Link>
          <Link href="/admin/submissions" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <Inbox className="h-6 w-6 text-[var(--color-primary)]" />
            <p className="mt-4 text-3xl font-bold text-slate-950">{submissions.length}</p>
            <p className="text-sm font-semibold text-slate-500">Form submissions</p>
          </Link>
          <Link href="/admin/applications" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <Inbox className="h-6 w-6 text-[var(--color-primary)]" />
            <p className="mt-4 text-3xl font-bold text-slate-950">{applications.length}</p>
            <p className="text-sm font-semibold text-slate-500">Career applications</p>
          </Link>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Database className="h-6 w-6 text-slate-500" />
            <p className="mt-4 text-sm font-bold text-slate-950">Delete behavior</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Delete removes the record permanently. It is not a soft delete.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
