'use client';

/**
 * WaveDotsLoader
 * Premium agency wave dots loading animation:
 * - 5 staggered bouncing dots in Frequent Posters brand gradient colors
 * - Synchronized ground shadow contraction/expansion
 * - Adaptable sizes: sm, md, lg, or fullScreen
 */
export default function WaveDotsLoader({
  size = 'md',
  fullScreen = false,
  showLogo = true,
  caption = 'Loading experiences...',
  className = '',
}) {
  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const shadowSizes = {
    sm: 'w-2 h-1',
    md: 'w-3 h-1.5',
    lg: 'w-4 h-2',
  };

  const gaps = {
    sm: 'gap-1.5',
    md: 'gap-2.5',
    lg: 'gap-3.5',
  };

  const dots = [
    { color: '#2855CE', delay: '0ms' },
    { color: '#2E77D7', delay: '140ms' },
    { color: '#36A9DB', delay: '280ms' },
    { color: '#36B8BD', delay: '420ms' },
    { color: '#36C6A0', delay: '560ms' },
  ];

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-5 ${className}`}>
      {showLogo && (
        <div className="relative flex items-center justify-center mb-1 animate-pulse" style={{ animationDuration: '2.5s' }}>
          <img
            src="/logo.png"
            alt="Frequent Posters"
            className="h-9 w-auto object-contain drop-shadow-sm"
          />
        </div>
      )}

      {/* Wave Dots Row */}
      <div className={`flex items-center justify-center ${gaps[size]} py-2`}>
        {dots.map((dot, index) => (
          <div key={index} className="flex flex-col items-center justify-center space-y-1.5">
            {/* Bouncing Dot */}
            <span
              className={`${dotSizes[size]} rounded-full animate-wave-dot shadow-sm`}
              style={{
                backgroundColor: dot.color,
                animationDelay: dot.delay,
                boxShadow: `0 0 10px ${dot.color}40`,
              }}
            />
            {/* Ground Shadow */}
            <span
              className={`${shadowSizes[size]} rounded-full bg-slate-300/60 animate-wave-shadow`}
              style={{
                animationDelay: dot.delay,
              }}
            />
          </div>
        ))}
      </div>

      {caption && (
        <span className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono animate-pulse">
          {caption}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-md transition-opacity duration-300">
        {content}
      </div>
    );
  }

  return content;
}
