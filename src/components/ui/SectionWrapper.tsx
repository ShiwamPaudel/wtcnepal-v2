// src/components/ui/SectionWrapper.tsx
import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bgAlt?: boolean;
}

export function SectionWrapper({ children, className = '', id, bgAlt = false }: SectionWrapperProps) {
  return (
    <section 
      id={id} 
      className={`section-pad ${bgAlt ? 'bg-alt' : 'bg-white'} ${className}`}
    >
      <div className="container-xl">
        {children}
      </div>
    </section>
  );
}
