'use client';

import { useState } from 'react';
import { getClientLogo } from '../../lib/clientLogoHelper.js';
import { HiCheckBadge } from 'react-icons/hi2';

export default function GenZClientsShowcase({ clients = [] }) {
  const [hoveredClient, setHoveredClient] = useState(null);

  if (!clients || clients.length === 0) return null;

  // Split clients into two rows for dual opposing marquee
  const half = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, half);
  const row2 = clients.slice(half);

  // Repeat items for seamless continuous looping
  const loopedRow1 = [...row1, ...row1, ...row1, ...row1];
  const loopedRow2 = [...row2, ...row2, ...row2, ...row2];

  const getCategoryTag = (name) => {
    const n = (name || '').toLowerCase();
    if (n.includes('tech') || n.includes('master') || n.includes('ekran')) return 'Tech & Hardware';
    if (n.includes('event') || n.includes('show') || n.includes('newline') || n.includes('tradition')) return 'Live Events & Media';
    if (n.includes('tailor') || n.includes('durga') || n.includes('leaf')) return 'Lifestyle & Retail';
    if (n.includes('security') || n.includes('eye')) return 'Enterprise Security';
    if (n.includes('ministr') || n.includes('christiva')) return 'Community & NGO';
    return 'Creative Partner';
  };

  return (
    <div className="relative w-full overflow-hidden select-none py-2">
      <style jsx>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 42s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 45s linear infinite;
        }
        .marquee-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Subtle edge fade that bleeds into the ambient background */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#F5F8FF]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#F5F8FF]/80 to-transparent z-10 pointer-events-none" />

      {/* Marquee Row 1 - Sliding Left */}
      <div className="py-2.5 overflow-hidden">
        <div
          className={`animate-marquee-left flex gap-5 sm:gap-7 items-center ${
            hoveredClient ? 'marquee-paused' : ''
          }`}
        >
          {loopedRow1.map((client, i) => {
            const logo = getClientLogo(client);
            const isHovered = hoveredClient === `r1-${i}`;

            return (
              <div
                key={`r1-${client._id || client.name}-${i}`}
                onMouseEnter={() => setHoveredClient(`r1-${i}`)}
                onMouseLeave={() => setHoveredClient(null)}
                className={`group relative flex items-center gap-3.5 sm:gap-4 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl transition-all duration-300 cursor-pointer w-[280px] sm:w-[320px] shrink-0 ${
                  isHovered
                    ? 'bg-white/95 border-blue-400 shadow-[0_12px_32px_rgba(37,99,235,0.16)] scale-[1.02]'
                    : 'bg-white/60 hover:bg-white/85 border-white/80 hover:border-blue-300 shadow-[0_4px_20px_rgba(7,25,87,0.04)]'
                } border backdrop-blur-md`}
              >
                {/* Logo Box */}
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-tr from-slate-50/80 to-blue-50/50 border border-slate-100/80 flex items-center justify-center p-2 shrink-0">
                  {logo ? (
                    <img
                      src={logo}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain filter drop-shadow-xs"
                    />
                  ) : (
                    <span className="text-[#2855CE] font-black text-base sm:text-lg">
                      {client.name.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#071957] truncate group-hover:text-[#2855CE] transition-colors">
                      {client.name}
                    </h3>
                    <HiCheckBadge className="w-3.5 h-3.5 text-[#36C6A0] shrink-0" />
                  </div>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50/90 text-[#1e40af] border border-blue-100/50 truncate max-w-full">
                    #{getCategoryTag(client.name)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee Row 2 - Sliding Right */}
      <div className="py-2.5 overflow-hidden">
        <div
          className={`animate-marquee-right flex gap-5 sm:gap-7 items-center ${
            hoveredClient ? 'marquee-paused' : ''
          }`}
        >
          {loopedRow2.map((client, i) => {
            const logo = getClientLogo(client);
            const isHovered = hoveredClient === `r2-${i}`;

            return (
              <div
                key={`r2-${client._id || client.name}-${i}`}
                onMouseEnter={() => setHoveredClient(`r2-${i}`)}
                onMouseLeave={() => setHoveredClient(null)}
                className={`group relative flex items-center gap-3.5 sm:gap-4 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl transition-all duration-300 cursor-pointer w-[280px] sm:w-[320px] shrink-0 ${
                  isHovered
                    ? 'bg-white/95 border-blue-400 shadow-[0_12px_32px_rgba(37,99,235,0.16)] scale-[1.02]'
                    : 'bg-white/60 hover:bg-white/85 border-white/80 hover:border-blue-300 shadow-[0_4px_20px_rgba(7,25,87,0.04)]'
                } border backdrop-blur-md`}
              >
                {/* Logo Box */}
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-tr from-slate-50/80 to-blue-50/50 border border-slate-100/80 flex items-center justify-center p-2 shrink-0">
                  {logo ? (
                    <img
                      src={logo}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain filter drop-shadow-xs"
                    />
                  ) : (
                    <span className="text-[#2855CE] font-black text-base sm:text-lg">
                      {client.name.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="text-xs sm:text-[13px] font-black text-[#071957] truncate group-hover:text-[#2855CE] transition-colors">
                      {client.name}
                    </h3>
                    <HiCheckBadge className="w-3.5 h-3.5 text-[#36C6A0] shrink-0" />
                  </div>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50/90 text-[#1e40af] border border-blue-100/50 truncate max-w-full">
                    #{getCategoryTag(client.name)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
