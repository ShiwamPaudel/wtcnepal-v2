import { partnerTestimonials, customerTestimonials } from '@/data/testimonials';
import type { Product } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { HomeBannerSlider } from '@/components/HomeBannerSlider';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { StatCounter } from '@/components/ui/StatCounter';
import { CTABanner } from '@/components/ui/CTABanner';
import { ProductArtwork } from '@/components/ui/ProductArtwork';
import { constructMetadata } from '@/lib/seo';
import { getOrganizationSchema, getLocalBusinessSchema } from '@/lib/structured-data';
import type { Metadata } from 'next';

import { NewsCard } from '@/components/ui/NewsCard';
import { divisions } from '@/data/divisions';
import { partners } from '@/data/partners';
import { getHomeBanners, getPublishedNewsArticles, getProducts } from '@/lib/server-content';
import { ShieldCheck, Users, Map as MapIcon, ArrowRight } from 'lucide-react';

function normalizeYouTubeUrl(url: string) {
  if (!url) return url;
  if (url.includes('watch?v=')) {
    return url.replace('watch?v=', 'embed/');
  }
  if (url.includes('youtu.be/')) {
    return url.replace('youtu.be/', 'www.youtube.com/embed/');
  }
  return url;
}

function hasUsableYouTubeUrl(url: string) {
  return Boolean(url);
}

export const metadata: Metadata = constructMetadata({
  title: "Nepal's Most Trusted Medical Equipment Service Provider | Web Trading Concern Pvt. Ltd.",
  description: "Best Medical Equipment Service Provider in Nepal. Trusted by 25+ MNCs since 2001.",
  path: '/',
});

export default async function Home() {
  const [products, newsArticles, homeBanners] = await Promise.all([
    getProducts(),
    getPublishedNewsArticles(),
    getHomeBanners(),
  ]);
  const featuredProducts = products.filter((product) => product.featured).slice(0, 6);

  return (
    <>
      <HomeBannerSlider banners={homeBanners} />

      {/* 2. TRUST BAR */}
      <div className="bg-white border-b border-gray-100 py-10 relative z-20 shadow-sm">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter end={15} suffix="+" label="Global Partners" />
            <StatCounter end={7} label="Provinces Covered" />
            <StatCounter end={25} suffix="" label="Years Experience" />
          </div>
        </div>
      </div>

      <SectionWrapper id="divisions" className="py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)]">
          <ScrollReveal>
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-[var(--color-primary)]">
              Divisions we serve
            </span>
            <h2 className="mt-6 max-w-2xl text-4xl font-bold text-slate-950 md:text-5xl">
              OUR CORE FOCUS
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Web Trading Concern Pvt. Ltd. has been dedicated to serving the Healthcare Sector in Nepal since its establishment in 2001 A.D. We specialize in Diagnostics, Disinfection & Care and are proud to be the core channel partners of over 15 Multinational Companies from around the world.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {divisions.map((division) => (
                <Link
                  key={division.id}
                  href={`/divisions/${division.id}`}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span
                    className="block h-2 w-12 rounded-full"
                    style={{ backgroundColor: division.color }}
                  />
                  <strong className="mt-4 block text-slate-950">{division.name}</strong>
                </Link>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/divisions"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary)]"
              >
                Explore divisions
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                View Our Products
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[48px] bg-gradient-to-br from-blue-50 via-sky-50 to-amber-50 blur-2xl" />
              <Image
                src="/images/WTC - Infographics 3 Divisions.gif"
                alt="WTC divisions infographic"
                width={760}
                height={660}
                className="w-full object-contain drop-shadow-[0_25px_55px_rgba(15,23,42,0.16)]"
                loading="lazy"
                unoptimized
              />
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* 4. FEATURED PRODUCTS */}
      <SectionWrapper className="py-24">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[var(--color-primary)] font-bold tracking-wider uppercase text-sm mb-2 block"></span>
            <h2 className="mb-6">Featured Products</h2>
            <p className="text-gray-600 text-lg">A selection of Innovative Products.</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product: Product) => (
            <div key={product.id} className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <ProductArtwork
                name={product.name}
                image={product.image}
                division={product.division}
                className="aspect-[4/3]"
              />
              <div className="p-6 flex flex-col gap-2 flex-1 w-full">
                <h3 className="font-bold text-lg mb-1 text-gray-900 text-left group-hover:text-[var(--color-primary)] transition-colors">{product.name}</h3>
                <div className="text-xs text-gray-400 mb-2 text-left">{product.partner}</div>
                <div className="flex-1"></div>
                <Link href={`/products/${product.id}`} className="text-[var(--color-accent)] font-semibold hover:underline mt-2 text-left">View Details &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/products" className="text-sm font-bold text-[var(--color-accent)] hover:underline">Browse All Products &rarr;</Link>
        </div>
      </SectionWrapper>

      {/* 5. ABOUT SNAPSHOT */}
      <SectionWrapper bgAlt className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="right">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] opacity-20"></div>
                <div className="flex h-full w-full flex-col justify-end bg-slate-900 p-8 text-white">
                  <span className="text-sm font-semibold text-[var(--color-accent)]">Since 2001</span>
                  <strong className="mt-3 text-3xl leading-tight">
                    Supporting healthcare teams with product, training, and service.
                  </strong>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl hidden md:block">
                <div className="text-4xl font-bold text-[var(--color-primary)] mb-1">2001</div>
                <div className="text-gray-600 font-medium">Year Established</div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="left">
            <span className="text-[var(--color-primary)] font-bold tracking-wider uppercase text-sm mb-2 block">Who We Are</span>
            <h2 className="mb-6">Pioneering Nepal&apos;s Medical <br />Technology Advancements</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Since 2001, Web Trading Concern Pvt. Ltd. has been dedicated to elevating the healthcare landscape of Nepal by making world-class medical technology accessible across the country.
            </p>
            <p className="text-gray-600 mb-10 text-lg">
              As an exclusive channel partner for over 15 multinational companies, our dedicated team of clinical specialists and biomedical engineers ensure that every piece of equipment we supply is backed by unparalleled service support.
            </p>
            <Link href="/about" className="inline-flex items-center text-[var(--color-primary)] font-bold border-b-2 border-[var(--color-primary)] pb-1 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors">
              Read Our Story <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* 5. GLOBAL PARTNERS (Marquee) */}
      <section className="py-20 border-y border-gray-100 overflow-hidden bg-white">
        <div className="container-xl text-center mb-10">
          <h2 className="text-2xl font-bold mb-3">Our World-Class Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Proud channel partners of 25+ multinational healthcare companies, guaranteeing global standards for local healthcare providers.
          </p>
        </div>
        
        {/* Infinite Marquee with Partner Logos */}
        <div className="relative overflow-hidden">
          <div className="animate-marquee min-w-[200%] flex items-center gap-10 py-6 px-6">
            {[...partners.slice(0, 14), ...partners.slice(0, 14)].map((partner, index) => (
              <div key={`${partner.id}-${index}`} className="min-w-[16rem] flex items-center justify-center px-6 py-4 rounded-[32px] transition-transform duration-300 hover:scale-105">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={264}
                  height={96}
                  className="max-h-24 max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Link href="/partners" className="text-sm font-bold text-[var(--color-accent)] hover:underline">
            View All Partners &rarr;
          </Link>
        </div>
      </section>

      {/* 6. PARTNER TESTIMONIALS */}
      <SectionWrapper className="py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--color-primary)] font-bold tracking-wider uppercase text-sm mb-2 block">What Our Partners Say</span>
          <h2 className="mb-6">Trusted by Principal Companies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {partnerTestimonials.map((t, idx) => (
            <div key={idx} className="flex flex-col md:flex-row bg-white rounded-xl shadow p-8 gap-8 items-center">
              {/* Left: Person Info */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[var(--color-primary)]"
                  loading="lazy"
                />
                <div className="font-bold text-lg mb-1">{t.name}</div>
                <div className="text-sm text-gray-500 mb-1">{t.designation}</div>
                <div className="flex flex-col items-center md:items-start gap-2 mb-4">
                  <Image
                    src={t.institutionLogo}
                    alt={t.institution}
                    width={160}
                    height={64}
                    className="h-16 w-auto object-contain"
                    loading="lazy"
                  />
                  <span className="text-sm text-gray-500">{t.institution}</span>
                </div>
                <blockquote className="italic text-[var(--color-primary)] border-l-4 border-[var(--color-accent)] pl-4 mt-2">&quot;{t.quote}&quot;</blockquote>
              </div>
              {/* Right: Video (Larger) */}
              <div className="flex-1 w-full flex justify-center">
                <div className="aspect-video w-full max-w-xl rounded-xl overflow-hidden shadow-lg">
                  {hasUsableYouTubeUrl(t.youtube) ? (
                    <iframe
                      src={normalizeYouTubeUrl(t.youtube)}
                      title={t.name + ' testimonial'}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-full border-0 rounded-xl"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 p-6 text-center text-sm font-semibold text-slate-500">
                      Video coming soon
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <SectionWrapper className="py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--color-primary)] font-bold tracking-wider uppercase text-sm mb-2 block">Voices of Trust</span>
          <h2 className="mb-6">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {customerTestimonials.map((t, idx) => (
            <div key={idx} className="flex flex-col md:flex-row bg-white rounded-xl shadow p-8 gap-8 items-center">
              {/* Left: Person Info */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[var(--color-primary)]"
                  loading="lazy"
                />
                <div className="font-bold text-lg mb-1">{t.name}</div>
                <div className="text-sm text-gray-500 mb-1">{t.designation}</div>
                <div className="flex flex-col items-center md:items-start gap-2 mb-4">
                  <Image
                    src={t.institutionLogo}
                    alt={t.institution}
                    width={160}
                    height={64}
                    className="h-16 w-auto object-contain"
                    loading="lazy"
                  />
                  <span className="text-sm text-gray-500">{t.institution}</span>
                </div>
                <blockquote className="italic text-[var(--color-primary)] border-l-4 border-[var(--color-accent)] pl-4 mt-2">&quot;{t.quote}&quot;</blockquote>
              </div>
              {/* Right: Video (Larger) */}
              <div className="flex-1 w-full flex justify-center">
                <div className="aspect-video w-full max-w-xl rounded-xl overflow-hidden shadow-lg">
                  {hasUsableYouTubeUrl(t.youtube) ? (
                    <iframe
                      src={normalizeYouTubeUrl(t.youtube)}
                      title={t.name + ' testimonial'}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-full border-0 rounded-xl"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 p-6 text-center text-sm font-semibold text-slate-500">
                      Video coming soon
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* 7. WHY CHOOSE WTC */}
      <SectionWrapper bgAlt className="py-24">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-6">Why Partner With Us?</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal delay={0.1}>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center h-full">
              <div className="w-16 h-16 bg-blue-50 text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Fast & Reliable Service</h3>
              <p className="text-gray-600">
                Guaranteed rapid response times with dedicated service teams for preventive maintenance and corrective support.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center h-full">
              <div className="w-16 h-16 bg-teal-50 text-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Skilled Engineers</h3>
              <p className="text-gray-600">
                Our in-house team of factory-trained biomedical engineers and clinical application specialists ensure full technical and clinical support.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center h-full">
              <div className="w-16 h-16 bg-blue-50 text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-6">
                <MapIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Nationwide Coverage</h3>
              <p className="text-gray-600">
                With service stations logically situated across the country, we are uniquely structured to serve all 7 provinces of Nepal effectively.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* 7. SERVICE NETWORK MAP */}
      <SectionWrapper className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal className="lg:col-span-5">
            <span className="text-[var(--color-primary)] font-bold tracking-wider uppercase text-sm mb-2 block">Our Reach</span>
            <h2 className="mb-6">Always Close To You</h2>
            <p className="text-gray-600 text-lg mb-6">
              Our decentralized service network allows us to act faster than any other provider. With stock and engineers situated in 5 strategic locations, we minimize downtime for critical healthcare equipment.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center font-semibold"><div className="w-2 h-2 rounded-full bg-[var(--color-primary)] mr-3" /> Kathmandu (HQ)</li>
              <li className="flex items-center text-gray-700"><div className="w-2 h-2 rounded-full bg-gray-300 mr-3" /> Biratnagar</li>
              <li className="flex items-center text-gray-700"><div className="w-2 h-2 rounded-full bg-gray-300 mr-3" /> Pokhara</li>
              <li className="flex items-center text-gray-700"><div className="w-2 h-2 rounded-full bg-gray-300 mr-3" /> Chitwan</li>
            </ul>
            <Link href="/service-network" className="text-[var(--color-primary)] font-bold hover:text-[var(--color-accent)] transition-colors flex items-center">
              View Full Network Details <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-lg bg-slate-50 p-6">
              <Image
                src="/images/map-of-nepal-wtc-rays.png"
                alt="Service Reach Map - Web Trading Concern Pvt. Ltd."
                width={900}
                height={640}
                className="h-auto w-full object-contain"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* 9. NEWS PREVIEW */}
      <SectionWrapper className="py-24">
        <div className="flex justify-between items-end mb-12">
          <ScrollReveal>
            <span className="text-[var(--color-primary)] font-bold tracking-wider uppercase text-sm mb-2 block">Latest Updates</span>
            <h2 className="mb-0">News and Events</h2>
          </ScrollReveal>
          <Link href="/news-and-events" className="hidden md:flex items-center font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors">
            View All News and Events <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 md:mb-0">
          {newsArticles.slice(0, 3).map((article, idx) => (
            <ScrollReveal key={article.id} delay={idx * 0.1} className="h-full">
               <NewsCard article={article} />
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/news-and-events" className="inline-flex items-center font-bold text-[var(--color-primary)] border border-gray-200 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors">
            View All News and Events <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </SectionWrapper>

      {/* 10. CTA BANNER */}
      <ScrollReveal direction="none">
        <CTABanner headline={"Ready to partner with Nepal's most trusted healthcare provider?"} />
      </ScrollReveal>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            getOrganizationSchema(),
            getLocalBusinessSchema()
          ])
        }}
      />
    </>
  );
}
