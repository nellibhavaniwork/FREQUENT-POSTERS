'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import AnimatedMenuButton from '../common/AnimatedMenuButton';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Optimistic active tab so pill glides immediately on click while page loads
  const [activeTab, setActiveTab] = useState(pathname || '/');
  // Subtle hover state
  const [hoveredTab, setHoveredTab] = useState(null);

  // Sync activeTab when pathname changes
  useEffect(() => {
    if (pathname) {
      setActiveTab(pathname);
      setMobileMenuOpen(false);
    }
  }, [pathname]);

  // Handle scroll detection to elevate header subtly
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open so page content doesn't move or bleed through
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // If in admin area, Navbar is not shown
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Workshops', href: '/workshops' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-none shadow-none bg-transparent">
      {/* Seamless Feathered Backdrop - Zero lines, pure organic fade & mix */}
      <div
        className="absolute inset-x-0 top-0 h-32 sm:h-36 -z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.98) 57%, rgba(255, 255, 255, 0.88) 70%, rgba(255, 255, 255, 0.55) 82%, rgba(255, 255, 255, 0.2) 92%, rgba(255, 255, 255, 0) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          maskImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 57%, rgba(0, 0, 0, 0.85) 70%, rgba(0, 0, 0, 0.5) 82%, rgba(0, 0, 0, 0.18) 92%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 57%, rgba(0, 0, 0, 0.85) 70%, rgba(0, 0, 0, 0.5) 82%, rgba(0, 0, 0, 0.18) 92%, rgba(0, 0, 0, 0) 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-21 flex items-center justify-between relative">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => setActiveTab('/')}
          className="flex items-center group shrink-0"
        >
          <img
            src="/logo.png"
            alt="Frequent Posters Logo"
            className="h-11 sm:h-13 w-auto object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center p-1.5 rounded-full bg-slate-900/[0.04] backdrop-blur-md relative"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {navLinks.map((link) => {
            const isSelected = activeTab === link.href;
            const isHovered = hoveredTab === link.href && !isSelected;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.href)}
                onMouseEnter={() => setHoveredTab(link.href)}
                className={`relative px-5 py-2.5 text-[15px] select-none rounded-full flex items-center justify-center transition-colors duration-150 ${
                  isSelected
                    ? 'font-bold text-[#071957]'
                    : isHovered
                    ? 'font-semibold text-[#071957] bg-slate-900/[0.04]'
                    : 'font-medium text-slate-600 hover:text-[#071957]'
                }`}
              >
                {/* Active Liquid Pill (moves simultaneously on click while content loads) */}
                {isSelected && (
                  <motion.div
                    layoutId="active-liquid-pill"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 rounded-full bg-white shadow-[0_4px_16px_rgba(7,25,87,0.1),0_1px_3px_rgba(0,0,0,0.05)] border border-slate-200/90 z-0"
                    style={{ borderRadius: 9999 }}
                  >
                    {/* Subtle liquid glass reflection sheen */}
                    <span className="absolute inset-x-3 top-0.5 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-90" />
                  </motion.div>
                )}

                {/* Visible, high-contrast label without any dot */}
                <span className="relative z-10 flex items-center justify-center pointer-events-none">
                  <span
                    className={isSelected ? 'text-[#071957] font-bold' : ''}
                    style={isSelected ? { color: '#071957' } : undefined}
                  >
                    {link.name}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/contact"
            onClick={() => setActiveTab('/contact')}
            className="relative group overflow-hidden bg-[#071957] hover:bg-[#0f2878] text-white text-[13px] sm:text-[13.5px] font-semibold px-4.5 py-2 sm:px-5 sm:py-2.2 rounded-full shadow-[0_2px_8px_rgba(7,25,87,0.15)] hover:shadow-[0_4px_14px_rgba(7,25,87,0.22)] active:scale-95 transition-all duration-200 flex items-center gap-1.5 border border-[#071957]"
          >
            {/* Liquid shine highlight on hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
            <span>Let&apos;s Build Your Brand</span>
            <HiArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center">
          <AnimatedMenuButton
            isOpen={mobileMenuOpen}
            onToggle={(nextState) => setMobileMenuOpen(nextState)}
            ariaLabel="Toggle menu"
          />
        </div>
      </div>

      {/* Mobile Right-to-Left 70% Column Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop dim overlay for area outside drawer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Right Column Drawer - 70% Screen Height, Slides from Right to Left */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                duration: 0.42,
                ease: [0.16, 1, 0.3, 1], // Smooth luxury Apple/iOS cubic bezier
              }}
              className="fixed top-0 right-0 z-50 lg:hidden w-[84vw] max-w-[340px] border-none rounded-bl-[2.25rem] shadow-[-20px_25px_60px_rgba(7,25,87,0.22)] overflow-hidden flex flex-col justify-between"
              style={{
                backgroundColor: '#ffffff',
                height: '70vh',
                minHeight: '480px',
                maxHeight: '640px',
              }}
            >
              {/* Drawer Top Bar with Brand Logo & Close Button */}
              <div className="h-20 px-5 flex items-center justify-between shrink-0 border-b border-slate-100/80">
                <Link
                  href="/"
                  onClick={() => {
                    setActiveTab('/');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center group shrink-0"
                >
                  <img
                    src="/logo.png"
                    alt="Frequent Posters Logo"
                    className="h-10 w-auto object-contain mix-blend-multiply"
                  />
                </Link>

                <AnimatedMenuButton
                  isOpen={true}
                  onToggle={() => setMobileMenuOpen(false)}
                  ariaLabel="Close navigation menu"
                />
              </div>

              {/* Navigation Links - Column layout generously spaced */}
              <div className="flex-1 flex flex-col justify-evenly px-5 py-3 overflow-y-auto">
                {navLinks.map((link, idx) => {
                  const isSelected = activeTab === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + idx * 0.035,
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setActiveTab(link.href);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[16.5px] transition-all ${
                          isSelected
                            ? 'text-[#071957] bg-slate-100/90 font-bold'
                            : 'text-slate-700 hover:text-[#071957] hover:bg-slate-50 font-semibold'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isSelected ? (
                          <span className="w-2 h-2 rounded-full bg-[#071957]" />
                        ) : (
                          <HiArrowUpRight className="w-4 h-4 text-slate-300" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer Bottom Action Section */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="px-5 pb-5 pt-3 border-t border-slate-100/80 space-y-3 shrink-0"
              >
                <Link
                  href="/contact"
                  onClick={() => {
                    setActiveTab('/contact');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#071957] hover:bg-[#0f2878] active:scale-[0.99] text-white text-center font-bold text-[15px] py-3.5 rounded-full shadow-[0_4px_16px_rgba(7,25,87,0.18)] transition-all flex items-center justify-center gap-2 block"
                >
                  <span>Let&apos;s Build Your Brand</span>
                  <HiArrowUpRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between px-2 text-[11px] font-semibold text-slate-400">
                  <span>Hyderabad, India</span>
                  <span className="text-[#071957]/80">hello@frequentposters.com</span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
