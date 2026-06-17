import React from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  duration?: number;
}

export function ScrollReveal({ 
  children, 
  className = '',
}: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
