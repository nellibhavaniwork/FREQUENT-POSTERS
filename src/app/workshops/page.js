import Link from 'next/link';
import { dbFind } from '../../lib/dbService.js';
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';

export const metadata = {
  title: 'Live Workshops & Training | Frequent Posters',
  description:
    'Choose the support your business needs. Live workshops, done-for-you business setup, and customized design retainers.',
};

export const revalidate = 0;

export default async function WorkshopsPage() {
  const pricing = await dbFind('pricing', { isPublished: true });

  return (
    <div className="py-16 sm:py-24 bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
            PRACTICAL WORKSHOPS &amp; PRICING
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-[#071957] tracking-tight leading-tight">
            Choose the Support Your Business Needs.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            From affordable live training workshops to complete full-stack agency branding, we offer transparent solutions tailored for measurable business growth.
          </p>
        </div>
      </div>

      {/* Main 3 Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing && pricing.length > 0 ? (
            pricing.map((tier, idx) => (
              <div
                key={tier._id || idx}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
                  tier.isFeatured
                    ? 'bg-white border-2 border-[#2855CE] shadow-2xl relative scale-105 z-10'
                    : 'bg-[#F5F8FF] border border-slate-200 card-shadow'
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
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    {tier.features?.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <HiCheckCircle className="w-4 h-4 text-[#36C6A0] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-200">
                  <a
                    href={tier.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center block text-xs font-extrabold py-3.5 rounded-xl transition-all ${
                      tier.isFeatured
                        ? 'brand-gradient text-white shadow-md hover:shadow-lg'
                        : 'bg-white border border-slate-200 hover:bg-[#2855CE] hover:text-white text-[#071957]'
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

      {/* Custom Enterprise Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#071957] text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#36C6A0]">
            BESPOKE CREATIVE DESIGN PACKAGES
          </span>
          <h2 className="text-2xl sm:text-4xl font-black !text-white" style={{ color: '#ffffff' }}>
            Your Brand Is Unique. Your Requirements Are Too.
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Need monthly creative retainers, 30 social media creatives, high-stakes investor pitch decks, or custom brand architecture? Let&apos;s build a scope together.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="brand-gradient text-white text-xs font-extrabold px-6 py-3.5 rounded-xl shadow-md hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <span>Request Custom Proposal</span>
              <HiArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/917780271948?text=Hi%20Frequent%20Posters,%20I%20would%20like%20a%20custom%20quote%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-5 py-3.5 rounded-xl transition-all inline-flex items-center gap-2"
            >
              <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
              <span>Talk to Nelli Bhavani</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
