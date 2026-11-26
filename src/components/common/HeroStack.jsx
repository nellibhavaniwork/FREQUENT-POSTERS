'use client';

import { useState } from 'react';
import Stack from './Stack';

const DEFAULT_STACK_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=600&auto=format',
    title: 'Brand Visual Identity',
  },
  {
    url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format',
    title: 'City Brand Identity',
  },
  {
    url: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=600&auto=format',
    title: 'Modern Architecture',
  },
  {
    url: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=600&auto=format',
    title: 'Creative Studio Assets',
  },
  {
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format',
    title: 'Digital Gradient Creatives',
  },
];

export default function HeroStack({
  cards,
  layout = 'pile',
  autoplay = true,
  autoplayDelay = 2500,
  sendToBackOnClick = true,
  spread = 0.65,
  tilt = 17,
  speed = 0.8,
  visible = 6,
  pauseOnHover = true,
  className = '',
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Normalize cards from settings: can be array of strings or array of objects
  const rawCards = Array.isArray(cards) && cards.length > 0 ? cards : DEFAULT_STACK_IMAGES;

  const cardElements = rawCards.map((item, i) => {
    const src = typeof item === 'string' ? item : item?.url;
    const title = typeof item === 'object' ? item?.title : '';
    const alt = title || `Card ${i + 1}`;

    return (
      <div key={src || i} className="relative w-full h-full select-none overflow-hidden rounded-[16px]">
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="w-full h-full object-cover pointer-events-none"
          loading={i < 2 ? 'eager' : 'lazy'}
        />
        {title && (
          <div className="absolute inset-x-0 bottom-0 px-3.5 py-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none text-white">
            <p className="text-xs font-bold truncate drop-shadow-sm">{title}</p>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`.trim()}>
      {/* Decorative Ambient Glowing Orbs */}
      <div className="absolute -top-12 -right-12 w-64 h-64 sm:w-80 sm:h-80 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 sm:w-80 sm:h-80 bg-teal-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

      {/* Interactive Stack Canvas */}
      <div className="relative w-[280px] h-[340px] sm:w-[340px] sm:h-[400px] lg:w-[360px] lg:h-[420px] max-w-full z-10">
        <Stack
          layout={layout}
          sendToBackOnClick={sendToBackOnClick}
          cards={cardElements}
          visible={visible}
          spread={spread}
          tilt={tilt}
          speed={speed}
          autoplay={autoplay}
          autoplayDelay={autoplayDelay}
          pauseOnHover={pauseOnHover}
          onChange={(newTop) => setActiveIndex(newTop)}
        />
      </div>

      {/* Simple Premium Black & White Dots */}
      <div className="mt-10 sm:mt-12 z-10 flex items-center justify-center gap-2.5 select-none" aria-label="Card stack indicators">
        {rawCards.map((_, i) => {
          const isActive = activeIndex === i;
          return (
            <span
              key={i}
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? 'w-2 h-2 bg-black shadow-xs'
                  : 'w-2 h-2 bg-white border border-neutral-400/80 shadow-2xs'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
