'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { HiCheckCircle, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

export default function MobilePricingCarousel({ pricing = [] }) {
  // Find featured package or default to index 1 or 0
  const initialIndex = Math.max(
    0,
    pricing.findIndex((p) => p.isFeatured)
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const autoPlayRef = useRef(null);

  const count = pricing.length;

  // Track responsive screen width safely post-hydration to prevent SSR mismatch
  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
  };

  // Automatic horizontal auto-sliding every 3.5 seconds (pauses on hover)
  useEffect(() => {
    if (count <= 1 || isHovered) return;

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
    }, 3500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [count, isHovered]);

  if (!pricing || count === 0) return null;

  return (
    <div
      className="relative w-full select-none py-4 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Edge-aligned Floating Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous package"
        className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/80 hover:bg-white text-[#071957] border border-white/80 shadow-[0_8px_24px_rgba(7,25,87,0.12)] hover:shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xl"
      >
        <HiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next package"
        className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/80 hover:bg-white text-[#071957] border border-white/80 shadow-[0_8px_24px_rgba(7,25,87,0.12)] hover:shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xl"
      >
        <HiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Cards 3D Interactive Carousel Horizon Stage */}
      <div className="relative h-[550px] sm:h-[570px] flex items-center justify-center">
        {pricing.map((tier, idx) => {
          let offset = idx - activeIndex;

          // Wrap offsets for circular continuity when many cards
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;

          const isCenter = offset === 0;
          const isImmediate = Math.abs(offset) === 1;
          const isSecondary = Math.abs(offset) === 2;

          // Responsive coordinate offsets: generous 380px spread on desktop for open panoramic feel
          const xStep = isDesktop ? 380 : 285;
          const xOffset = offset * xStep;

          const scale = isCenter ? 1.03 : isImmediate ? 0.92 : isSecondary ? 0.8 : 0.68;
          const opacity = isCenter ? 1 : isImmediate ? 0.72 : isSecondary ? 0.35 : 0;
          const blurAmount = isCenter ? 0 : isImmediate ? 1.5 : 3.5;
          const zIndex = isCenter ? 25 : isImmediate ? 15 : isSecondary ? 8 : 1;

          return (
            <motion.div
              key={tier._id || idx}
              initial={false}
              animate={{
                x: xOffset,
                scale,
                opacity,
                filter: `blur(${blurAmount}px)`,
                zIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 26,
              }}
              drag={isCenter ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset: dragOffset, velocity }) => {
                if (Math.abs(dragOffset.x) > 35 || Math.abs(velocity.x) > 250) {
                  if (dragOffset.x < 0 || velocity.x < -250) {
                    handleNext();
                  } else {
                    handlePrev();
                  }
                }
              }}
              onClick={() => {
                if (!isCenter) setActiveIndex(idx);
              }}
              style={{
                width: isDesktop ? '330px' : '290px',
                height: '520px',
                position: 'absolute',
                pointerEvents: isCenter || isImmediate ? 'auto' : 'none',
                cursor: isCenter ? 'grab' : 'pointer',
              }}
              className={`rounded-[30px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.isFeatured
                  ? 'bg-white/85 backdrop-blur-2xl border-2 border-blue-500/80 shadow-[0_25px_60px_rgba(37,99,235,0.18)] ring-4 ring-blue-500/10'
                  : 'bg-white/65 hover:bg-white/85 backdrop-blur-xl border border-white/80 hover:border-blue-400/60 shadow-[0_12px_36px_rgba(7,25,87,0.06)]'
              }`}
            >
              {/* Badge for Featured Plan */}
              {tier.isFeatured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2855CE] text-white text-[10px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md shrink-0 whitespace-nowrap">
                  Most Popular Session
                </div>
              )}

              {/* Plan Header & Features */}
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2855CE] block">
                  {tier.name}
                </span>

                <div className="mt-3.5 mb-2 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-[#071957]">{tier.price}</span>
                  <span className="text-xs text-slate-500 font-semibold">{tier.period}</span>
                </div>

                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-5 line-clamp-2">
                  {tier.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-200/50">
                  {tier.features?.slice(0, 5).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <HiCheckCircle className="w-4 h-4 text-[#36C6A0] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-5 mt-4 border-t border-slate-200/50">
                <a
                  href={tier.ctaLink || '/contact'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center block text-xs sm:text-sm font-extrabold py-3.5 rounded-xl transition-all shadow-sm active:scale-95 ${
                    tier.isFeatured
                      ? 'brand-gradient text-white shadow-md hover:shadow-lg'
                      : 'bg-white/80 hover:bg-[#2855CE] hover:text-white text-[#071957] border border-slate-200/60 shadow-xs'
                  }`}
                >
                  {tier.ctaText || 'Enquire Now'}
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Dot Indicators for All Seeded Cards */}
      <div className="mt-6 flex items-center justify-center gap-2" aria-label="Carousel pagination">
        {pricing.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeIndex === i
                ? 'w-8 h-2.5 bg-[#2855CE] shadow-sm'
                : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
