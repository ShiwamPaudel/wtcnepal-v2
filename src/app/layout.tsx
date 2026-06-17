import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import { SiteChrome } from '@/components/SiteChrome';
import { constructMetadata } from '@/lib/seo';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = constructMetadata({
  title: "Nepal's Medical Equipment Service Provider",
  description:
    'Web Trading Concern Pvt. Ltd. supplies diagnostics, disinfection, and care medical equipment with consultation, installation, training, and nationwide service support.',
  path: '/',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased">
        <SiteChrome>{children}</SiteChrome>

        <Script
          src="https://acmfu-zgfh.maillist-manage.net/js/optin.min.js"
          strategy="lazyOnload"
        />
        <Script id="zoho-web-optin" strategy="lazyOnload">
          {`window.addEventListener('load', function() {
            if (typeof setupSF === 'function') {
              setupSF('sf3z7a188b7b81aeb9120afceb229b82f051836a69e950eec8899d6bea09d7828572','ZCFORMVIEW',false,'light',false,'0');
            }
          });
          function runOnFormSubmit_sf3z7a188b7b81aeb9120afceb229b82f051836a69e950eec8899d6bea09d7828572() {}`}
        </Script>
        <Script id="chatbase-widget" strategy="lazyOnload">
          {`(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="m7oqdvaihYHu8iKv2Z4Vd";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`}
        </Script>
      </body>
    </html>
  );
}
