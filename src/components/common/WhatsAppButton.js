'use client';

import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa6';

export default function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const phone = '917780271948';
  let message = 'Hi Frequent Posters, I would like to enquire about your creative branding and design services.';

  if (pathname?.includes('/learn-with-us')) {
    message = 'Hi Frequent Posters, I am interested in your Live Zoom Social Media Workshops / 1-to-1 training.';
  } else if (pathname?.includes('/pricing')) {
    message = 'Hi Frequent Posters, I am looking to get a custom quote for my business branding & creative requirements.';
  } else if (pathname?.includes('/portfolio')) {
    message = 'Hi Frequent Posters, I saw your portfolio and would like to build something similar for my brand.';
  }

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Frequent Posters"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
    >
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-100"></span>
      </span>
      <FaWhatsapp className="w-7 h-7 text-white" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold px-0 group-hover:px-2">
        Chat with us
      </span>
    </a>
  );
}

