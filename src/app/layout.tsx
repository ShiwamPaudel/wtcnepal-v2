import type { Metadata } from 'next';
import Script from 'next/script';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { constructMetadata } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = constructMetadata({
  title: "Nepal's Medical Equipment Service Provider",
  description:
    'WTC Nepal supplies diagnostics, disinfection, and care medical equipment with consultation, installation, training, and nationwide service support.',
  path: '/',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />

        <Script
          src="https://acmfu-zgfh.maillist-manage.net/js/optin.min.js"
          strategy="afterInteractive"
        />
        <Script id="zoho-web-optin" strategy="afterInteractive">
          {`window.addEventListener('load', function() {
            if (typeof setupSF === 'function') {
              setupSF('sf3z7a188b7b81aeb9120afceb229b82f051836a69e950eec8899d6bea09d7828572','ZCFORMVIEW',false,'light',false,'0');
            }
          });
          function runOnFormSubmit_sf3z7a188b7b81aeb9120afceb229b82f051836a69e950eec8899d6bea09d7828572() {}`}
        </Script>
      </body>
    </html>
  );
}
