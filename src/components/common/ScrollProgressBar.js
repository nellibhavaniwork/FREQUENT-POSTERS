'use client';

import { useEffect, useState } from 'react';

/**
 * ScrollProgressBar
 * A luxury brand-gradient scroll progress bar fixed at the very top of the window
 * that fills from 0% to 100% as the user scrolls through the page.
 */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setProgress(pct);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none bg-transparent">
      <div
        className="h-full brand-gradient transition-all duration-100 ease-out shadow-[0_1px_8px_rgba(40,85,206,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
