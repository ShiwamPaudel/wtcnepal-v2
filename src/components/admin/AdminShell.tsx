'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BriefcaseBusiness,
  FileText,
  Gauge,
  ImageIcon,
  Images,
  ImageUp,
  Inbox,
  LogOut,
  Newspaper,
  Package,
  Users,
} from 'lucide-react';

const links = [
  { href: '/admin', label: 'Overview', icon: Gauge },
  { href: '/admin/content/products', label: 'Products', icon: Package },
  { href: '/admin/content/news', label: 'News and Events', icon: Newspaper },
  { href: '/admin/content/team', label: 'Team', icon: Users },
  { href: '/admin/content/jobs', label: 'Careers', icon: BriefcaseBusiness },
  { href: '/admin/content/home-banners', label: 'Home Banners', icon: Images },
  { href: '/admin/content/page-assets', label: 'Page Assets', icon: ImageIcon },
  { href: '/admin/content/about-page', label: 'About Page', icon: FileText },
  { href: '/admin/media', label: 'Media', icon: ImageUp },
  { href: '/admin/submissions', label: 'Submissions', icon: Inbox },
  { href: '/admin/applications', label: 'Applications', icon: FileText },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white xl:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-200 p-6">
            <Link href="/admin" className="flex items-center gap-3">
              <Image src="/images/logo.png" alt="WTC" width={48} height={48} className="h-12 w-12 object-contain" />
              <div>
                <p className="text-sm font-bold text-slate-950">WTC CMS</p>
                <p className="text-xs text-slate-500">Operations console</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/10' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 p-4">
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <div className="xl:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
          <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-5 py-3 lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase text-[var(--color-primary)]">Private admin</p>
              <h1 className="text-lg font-bold text-slate-950">Content management system</h1>
            </div>
            <div className="flex gap-2 overflow-x-auto xl:hidden">
              {links.map((link) => {
                const active = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(`${link.href}/`));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
                      active ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        <div className="p-5 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
