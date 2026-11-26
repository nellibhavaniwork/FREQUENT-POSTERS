'use client';

/**
 * AnimatedMenuButton
 *
 * Clean, borderless mobile navigation toggle:
 * - Borderless & uncluttered to maximize UI/UX and visibility
 * - Wide, prominent hamburger lines that morph into an ✕ when opened
 * - Smooth spring physics with touch feedback
 */
export default function AnimatedMenuButton({
  isOpen = false,
  onToggle,
  className = '',
  ariaLabel = 'Toggle navigation menu',
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onToggle) {
      onToggle(!isOpen);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      className={`relative inline-flex items-center justify-center p-1.5 text-[#071957] hover:text-[#2855CE] focus:outline-none transition-colors select-none cursor-pointer active:scale-90 border-0 bg-transparent shadow-none ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-7 h-7 pointer-events-none transition-transform duration-500"
        style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transitionTimingFunction: isOpen
            ? 'cubic-bezier(0.34, 1.45, 0.64, 1)'
            : 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Bar */}
        <line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-400"
          style={{
            transformOrigin: '12px 6px',
            transform: isOpen
              ? 'translateY(6px) rotate(45deg)'
              : 'translateY(0px) rotate(0deg)',
            transitionTimingFunction: isOpen
              ? 'cubic-bezier(0.34, 1.45, 0.64, 1)'
              : 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Middle Bar */}
        <line
          x1="3"
          y1="12"
          x2="21"
          y2="12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-300"
          style={{
            transformOrigin: '12px 12px',
            transform: isOpen ? 'scaleX(0.2)' : 'scaleX(1)',
            opacity: isOpen ? 0 : 1,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Bottom Bar */}
        <line
          x1="3"
          y1="18"
          x2="21"
          y2="18"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-400"
          style={{
            transformOrigin: '12px 18px',
            transform: isOpen
              ? 'translateY(-6px) rotate(-45deg)'
              : 'translateY(0px) rotate(0deg)',
            transitionTimingFunction: isOpen
              ? 'cubic-bezier(0.34, 1.45, 0.64, 1)'
              : 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </svg>
    </button>
  );
}
