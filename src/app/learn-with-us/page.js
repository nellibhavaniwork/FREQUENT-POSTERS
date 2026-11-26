import Link from 'next/link';
import { dbFind } from '../../lib/dbService.js';
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi2';
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaGoogle,
} from 'react-icons/fa6';
import { RiVideoOnLine, RiMacbookLine, RiLayoutGridLine, RiPaletteLine } from 'react-icons/ri';

export const metadata = {
  title: 'Frequent Posters Academy | Learn Social Media & Design Skills',
  description:
    'No Technical Background? No Problem. Learn digital skills, Canva design, Instagram growth, and Meta Business Suite through live Zoom sessions.',
};

export const revalidate = 0;

export default async function LearnWithUsPage() {
  const pricing = await dbFind('pricing', { isPublished: true });

  const modules = [
    { name: 'Instagram Business', desc: 'Optimize bio, highlights, grid layouts, reels, and analytics.', icon: <FaInstagram className="w-5 h-5 text-pink-600" /> },
    { name: 'Facebook Business Page', desc: 'Setup business page, automated messaging, and group connections.', icon: <FaFacebookF className="w-5 h-5 text-blue-600" /> },
    { name: 'LinkedIn Company Page', desc: 'B2B executive presence, showcase pages, and thought leadership.', icon: <FaLinkedinIn className="w-5 h-5 text-sky-700" /> },
    { name: 'Google Business Profile', desc: 'Local Hyderabad map presence, reviews management, and call leads.', icon: <FaGoogle className="w-5 h-5 text-red-500" /> },
    { name: 'YouTube Channel Basics', desc: 'Branded channel art, video tags, thumbnails, and descriptions.', icon: <FaYoutube className="w-5 h-5 text-red-600" /> },
    { name: 'Canva Design Mastery', desc: 'Hands-on design for non-designers: fonts, colors, templates, and exports.', icon: <RiPaletteLine className="w-5 h-5 text-teal-600" /> },
    { name: 'Meta Business Suite', desc: 'Unified scheduling, inbox synchronization, and multi-platform publishing.', icon: <RiLayoutGridLine className="w-5 h-5 text-blue-700" /> },
    { name: 'WhatsApp Business', desc: 'Catalog creation, quick replies, broadcast lists, and greeting automations.', icon: <FaWhatsapp className="w-5 h-5 text-emerald-600" /> },
  ];

  return (
    <div className="py-16 sm:py-24 bg-transparent">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2855CE] text-xs font-black uppercase tracking-wider mb-3 animate-mask-rise"
            style={{ animationDelay: '80ms' }}
          >
            FREQUENT POSTERS ACADEMY
          </div>
          <h1
            className="text-4xl sm:text-6xl font-black text-[#071957] tracking-tight leading-tight animate-mask-rise"
            style={{ animationDelay: '180ms' }}
          >
            Learn Digital Skills. <br />
            <span className="brand-gradient-text">Take Control of Your Business Online.</span>
          </h1>
          <p
            className="text-lg text-slate-600 mt-4 leading-relaxed animate-mask-rise"
            style={{ animationDelay: '280ms' }}
          >
            No technical background? No problem. Practical, hands-on, live training to help you master social media, design, and digital tools at your own pace.
          </p>
        </div>
      </div>

      {/* Curriculum Modules Grid */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 animate-mask-rise"
        style={{ animationDelay: '380ms' }}
      >
        <div className="mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
            PRACTICAL CURRICULUM
          </span>
          <h2 className="text-3xl font-extrabold text-[#071957]">
            What You Can Learn with Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 hover:border-blue-300 transition-all card-shadow hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
                {m.icon}
              </div>
              <h3 className="font-extrabold text-[#071957] text-base mb-1.5">{m.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mode of Learning */}
      <div className="bg-[#071957] text-white py-20 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#36C6A0] block mb-2">
              HOW WE TEACH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold !text-white" style={{ color: '#ffffff' }}>
              Designed for Comfort, Clarity &amp; Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <RiVideoOnLine className="w-8 h-8 text-[#36C6A0] mb-4" />
              <h3 className="text-lg font-bold !text-white mb-2" style={{ color: '#ffffff' }}>Live Zoom Sessions</h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Interactive real-time learning where you share your screen and ask questions naturally.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <RiMacbookLine className="w-8 h-8 text-[#36A9DB] mb-4" />
              <h3 className="text-lg font-bold !text-white mb-2" style={{ color: '#ffffff' }}>1-to-1 Personal Attention</h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Step-by-step guidance tailored directly to your brand category, target audience, and speed.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <RiLayoutGridLine className="w-8 h-8 text-[#36C6A0] mb-4" />
              <h3 className="text-lg font-bold !text-white mb-2" style={{ color: '#ffffff' }}>Templates &amp; Practice</h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Walk away with ready-to-use brand templates, practical shortcuts, and direct WhatsApp support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Pricing Tiers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
            TRANSPARENT TUITION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071957]">
            Workshop Packages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing && pricing.length > 0 ? (
            pricing.map((tier, idx) => (
              <div
                key={tier._id || idx}
                className={`bg-white border rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
                  tier.isFeatured
                    ? 'border-[#2855CE] shadow-xl ring-2 ring-[#2855CE]/20'
                    : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {tier.isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2855CE] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    Recommended
                  </div>
                )}

                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#2855CE] block">
                    {tier.name}
                  </span>
                  <div className="mt-4 mb-2 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-[#071957]">{tier.price}</span>
                    <span className="text-xs text-slate-500 font-semibold">{tier.period}</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    {tier.features?.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <HiCheckCircle className="w-4 h-4 text-[#36C6A0] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-100">
                  <a
                    href={tier.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center block text-sm font-bold py-3.5 rounded-xl transition-all ${
                      tier.isFeatured
                        ? 'bg-[#071957] hover:bg-[#0f2878] text-white shadow-md hover:shadow-lg'
                        : 'bg-slate-100 hover:bg-[#071957] hover:text-white text-[#071957]'
                    }`}
                  >
                    {tier.ctaText}
                  </a>
                </div>
              </div>
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
}
