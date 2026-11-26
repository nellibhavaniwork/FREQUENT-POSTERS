'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal
 * High-performance scroll-triggered reveal wrapper using IntersectionObserver.
 * Triggers GPU-accelerated entrance transitions when elements scroll into view.
 */
export default function ScrollReveal({
  children,
  variant = 'fade-up', // 'fade-up' | 'fade-left' | 'fade-right' | 'scale-up'
  delay = 0,
  threshold = 0.15,
  className = '',
  as = 'div',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);
  const Component = as;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, [threshold]);

  const variantClassMap = {
    'fade-up': 'scroll-reveal-init',
    'fade-left': 'scroll-reveal-left',
    'fade-right': 'scroll-reveal-right',
    'scale-up': 'scroll-reveal-scale',
  };

  const variantClass = variantClassMap[variant] || 'scroll-reveal-init';

  return (
    <Component
      ref={domRef}
      className={`${variantClass} ${isVisible ? 'scroll-reveal-visible' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Component>
  );
}
