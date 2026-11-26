'use client';

import { useState, useEffect } from 'react';
import WaveDotsLoader from './WaveDotsLoader';

export default function InitialPageLoader({ minDuration = 600 }) {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Graceful brief wave dots loading animation on initial load / refresh
    const timer = setTimeout(() => {
      setFading(true);
      const exitTimer = setTimeout(() => {
        setLoading(false);
      }, 350);
      return () => clearTimeout(exitTimer);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white/98 backdrop-blur-lg transition-opacity duration-350 pointer-events-none select-none ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <WaveDotsLoader size="lg" showLogo={true} caption="Loading Frequent Posters..." />
    </div>
  );
}
