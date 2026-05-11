import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'WTC Nepal Content Manager',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-white">
      <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" strategy="afterInteractive" />
      <noscript>
        <div className="p-6 text-slate-900">
          JavaScript is required to use the WTC Nepal content manager.
        </div>
      </noscript>
    </main>
  );
}
