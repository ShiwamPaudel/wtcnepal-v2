// src/components/ui/CTABanner.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTABannerProps {
  headline?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CTABanner({ 
  headline = "Ready to partner with Nepal's most trusted healthcare provider?", 
  buttonText = "Get in Touch", 
  buttonHref = "/contact" 
}: CTABannerProps) {
  return (
    <section className="bg-[var(--color-accent)] py-16">
      <div className="container-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold max-w-2xl text-center md:text-left mb-0">
          {headline}
        </h2>
        <Link 
          href={buttonHref} 
          className="inline-flex items-center gap-2 bg-white text-[var(--color-accent)] hover:bg-[var(--color-primary)] hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors whitespace-nowrap shadow-lg flex-shrink-0"
        >
          {buttonText}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
