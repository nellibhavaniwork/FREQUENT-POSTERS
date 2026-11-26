import Link from 'next/link';
import { dbFind } from '../../lib/dbService.js';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';
import {
  RiPaletteLine,
  RiShareForwardLine,
  RiGlobalLine,
  RiAdvertisementLine,
  RiBriefcaseLine,
  RiGraduationCapLine,
} from 'react-icons/ri';

export const metadata = {
  title: 'Creative Services | Frequent Posters',
  description:
    'Explore our creative expertise: Brand Identity & Logo Design, Social Media Management, Digital Business Setup, Marketing Creatives, Corporate Profiles, and Live Workshops.',
};

export const revalidate = 0;

export default async function ServicesPage() {
  const services = await dbFind('services', { isPublished: true });

  const iconComponents = {
    Palette: <RiPaletteLine className="w-8 h-8 text-[#2855CE]" />,
    Share2: <RiShareForwardLine className="w-8 h-8 text-[#2855CE]" />,
    Globe: <RiGlobalLine className="w-8 h-8 text-[#2855CE]" />,
    Megaphone: <RiAdvertisementLine className="w-8 h-8 text-[#2855CE]" />,
    Briefcase: <RiBriefcaseLine className="w-8 h-8 text-[#2855CE]" />,
    GraduationCap: <RiGraduationCapLine className="w-8 h-8 text-[#2855CE]" />,
  };

  return (
    <div className="py-16 sm:py-24 bg-transparent">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-3xl">
          <span
            className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2 animate-mask-rise"
            style={{ animationDelay: '80ms' }}
          >
            OUR CREATIVE EXPERTISE
          </span>
          <h1
            className="text-4xl sm:text-6xl font-black text-[#071957] tracking-tight leading-tight animate-mask-rise"
            style={{ animationDelay: '180ms' }}
          >
            One Brand Partner. <br />
            <span className="brand-gradient-text">Endless Creative Possibilities.</span>
          </h1>
          <p
            className="text-xl font-bold text-[#2855CE] mt-4 animate-mask-rise"
            style={{ animationDelay: '280ms' }}
          >
            Everything You Need to Look Professional and Stay Connected.
          </p>
        </div>
      </div>

      {/* Services List / Detailed Cards */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-mask-rise"
        style={{ animationDelay: '380ms' }}
      >
        {services && services.length > 0 ? (
          services.map((service, idx) => (
            <div
              key={service._id || idx}
              className="bg-white/80 backdrop-blur-md border border-slate-200/90 rounded-3xl p-8 sm:p-12 hover:border-blue-300 transition-all card-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                    {iconComponents[service.icon] || <RiPaletteLine className="w-8 h-8 text-[#2855CE]" />}
                  </div>
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block">
                      {service.tagline}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#071957] mt-1">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="bg-[#071957] hover:bg-[#0f2878] text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <span>Enquire for this service</span>
                      <HiArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={`https://wa.me/917780271948?text=Hi%20Frequent%20Posters,%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(
                        service.title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-slate-200 text-[#071957] text-sm font-bold px-5 py-3.5 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-1.5"
                    >
                      <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#071957] mb-4">
                    Key Deliverables Included:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {service.deliverables?.map((d, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100"
                      >
                        <HiCheckCircle className="w-4 h-4 text-[#36C6A0] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
}
