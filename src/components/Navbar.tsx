'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { divisions } from '@/data/divisions';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Divisions', href: '/divisions' },
  { label: 'Products', href: '/products' },
  { label: 'Product Categories', href: '/products', type: 'categories' },
  { label: 'News and Events', href: '/news-and-events' },
  { label: 'Career', href: '/career' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'pt-3' : 'pt-4'
      }`}
    >
      <div className="container-xl">
        <div
          className={`flex h-16 items-center justify-between rounded-2xl border px-4 transition-all duration-300 ${
            isScrolled
              ? 'border-white/70 bg-white/85 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl'
              : 'border-white/60 bg-white/75 shadow-[0_10px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl'
          }`}
        >
        <Link href="/" className="flex items-center" aria-label="Web Trading Concern Pvt. Ltd. home">
          <Image
            src="/images/logo.png"
            alt="Web Trading Concern Pvt. Ltd."
            width={160}
            height={63}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-0.5 rounded-full bg-slate-100/70 p-1 xl:flex" aria-label="Primary navigation">
          {navLinks.map((link) =>
            link.type === 'categories' ? (
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                    pathname.startsWith('/divisions/') && pathname.endsWith('/categories')
                      ? 'bg-white text-[var(--color-primary)] shadow-sm'
                      : 'text-slate-600 hover:bg-white/70 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                </Link>

                <div className="invisible absolute left-1/2 top-full z-50 w-[390px] -translate-x-1/2 pt-4 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_22px_70px_rgba(15,23,42,0.16)]">
                    <div className="grid gap-2">
                      {divisions.map((division) => (
                        <Link
                          key={division.id}
                          href={`/divisions/${division.id}/categories`}
                          className="group/item flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-slate-50"
                        >
                          <span
                            className="h-9 w-1.5 rounded-full"
                            style={{ backgroundColor: division.color }}
                          />
                          <span
                            className="font-semibold text-slate-900 transition group-hover/item:text-[var(--color-primary)]"
                          >
                            {division.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                  isActive(link.href)
                    ? 'bg-white text-[var(--color-primary)] shadow-sm'
                    : 'text-slate-600 hover:bg-white/70 hover:text-slate-950'
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden xl:block">
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(15,23,42,0.22)] transition hover:bg-[var(--color-primary)]"
          >
            Get in touch
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 xl:hidden"
          aria-label="Open menu"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm xl:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(88vw,340px)] flex-col bg-white shadow-2xl transition-transform duration-300 xl:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <span className="font-bold text-slate-950">Menu</span>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-5" aria-label="Mobile navigation">
          {navLinks.map((link) =>
            link.type === 'categories' ? (
              <div key={link.label} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-semibold text-slate-700 transition hover:bg-white hover:text-slate-950"
                >
                  {link.label}
                </Link>
                <div className="mt-1 grid gap-1">
                  {divisions.map((division) => (
                    <Link
                      key={division.id}
                      href={`/divisions/${division.id}/categories`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                    >
                      <span
                        className="h-6 w-1 rounded-full"
                        style={{ backgroundColor: division.color }}
                      />
                      {division.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-base font-semibold transition ${
                  isActive(link.href)
                    ? 'bg-blue-50 text-[var(--color-primary)]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="border-t border-slate-200 p-5">
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex w-full items-center justify-center rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </header>
  );
}
