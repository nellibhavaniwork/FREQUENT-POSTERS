'use client';

import { usePathname } from 'next/navigation';
import Iridescence from './Iridescence';

export default function GlobalBackground() {
  const pathname = usePathname();

  // Exclude admin dashboard from the background animation to keep workspace clean
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 0. Instant CSS Iridescent Silk Gradient - Paints on frame 0 with 0ms delay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(at 85% 15%, rgba(147, 197, 253, 0.72) 0px, transparent 55%), ' +
            'radial-gradient(at 15% 65%, rgba(103, 232, 249, 0.68) 0px, transparent 50%), ' +
            'radial-gradient(at 75% 85%, rgba(199, 210, 254, 0.65) 0px, transparent 50%), ' +
            'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 35%, #c7d2fe 70%, #dbeafe 100%)',
        }}
      />

      {/* 1. Fluid Iridescence WebGL Canvas */}
      <Iridescence
        color={[0.145, 0.388, 0.922]}
        hueShift={-30}
        saturation={1}
        brightness={1.8}
        contrast={1.15}
        speed={0.65}
        scale={1.1}
        detail={6}
        warp={0.9}
        rotation={10}
        mouseReact={true}
        amplitude={0.09}
        stir={0.45}
        sheen={0.3}
        clickSwirl={true}
        grain={0}
        fade={0}
        opacity={0.65}
        resolution={0.85}
      />

      {/* 2. Soft Luminous Frosted Gradient for Pristine Typography Contrast & Luxury Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40 pointer-events-none" />
    </div>
  );
}
