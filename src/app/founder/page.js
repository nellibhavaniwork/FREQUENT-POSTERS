import Link from 'next/link';
import { dbFindOne } from '../../lib/dbService.js';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi2';
import { RiDoubleQuotesL } from 'react-icons/ri';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6';

export const metadata = {
  title: 'Meet The Founder — Nelli Bhavani | Frequent Posters',
  description:
    'Meet Nelli Bhavani, Founder of Frequent Posters Hyderabad. Passionate visual designer, branding consultant, and digital trainer.',
};

export const revalidate = 0;

export default async function FounderPage() {
  const settings = await dbFindOne('settings');

  const founderImage =
    settings?.founderImage ||
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop';

  return (
    <div className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hero Card */}
        <div className="bg-gradient-to-tr from-[#071957] via-[#0d2a7a] to-[#0759d0] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-teal-400/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Founder Photo */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-44 h-44 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-[#2855CE] to-[#36C6A0] p-2 shadow-2xl shrink-0 relative overflow-hidden group">
                <img
                  src={founderImage}
                  alt={settings?.founderName || 'Nelli Bhavani'}
                  className="w-full h-full object-cover object-top rounded-full shadow-inner transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
              </div>
            </div>

            {/* Founder Quote & Bio */}
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <RiDoubleQuotesL className="w-8 h-8 text-[#36C6A0]" />
              </div>
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-snug !text-white"
                style={{ color: '#ffffff' }}
              >
                &ldquo;Every business has a unique identity. My passion is helping that identity come to life through creativity.&rdquo;
              </h1>
              <div className="pt-2">
                <span className="font-extrabold text-xl block !text-white" style={{ color: '#ffffff' }}>
                  {settings?.founderName || 'Nelli Bhavani'}
                </span>
                <span className="text-sm text-[#36C6A0] font-bold block uppercase tracking-wider mt-0.5">
                  {settings?.founderTitle || 'Founder — Frequent Posters, Hyderabad'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
                THE STORY &amp; VISION
              </span>
              <h2 className="text-3xl font-black text-[#071957] tracking-tight">
                Empowering Businesses to Stand Out and Communicate With Confidence.
              </h2>
            </div>

            <p>
              Frequent Posters was created with a clear conviction: ambitious businesses, local entrepreneurs, and emerging startups deserve world-class visual design without intimidation or excessive complexity.
            </p>

            <p>
              Based in the vibrant commercial hub of Hyderabad, we partner with founders who want consistent branding, high-aesthetic social media creatives, and hands-on digital support to establish their online authority.
            </p>

            <p>
              Our philosophy is simple: understand your brand&apos;s heart, communicate your message with absolute visual clarity, and design creatives that your customers recognize and remember.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://wa.me/917780271948?text=Hi%20Bhavani,%20I%20would%20like%20to%20connect%20regarding%20my%20brand."
                target="_blank"
                rel="noopener noreferrer"
                className="brand-gradient text-white text-xs font-black px-6 py-3.5 rounded-xl shadow-md inline-flex items-center gap-2 hover:scale-105 transition-all"
              >
                <FaWhatsapp className="w-4 h-4 text-white" />
                <span>Connect with Bhavani</span>
              </a>
              <Link
                href="/workshops"
                className="bg-[#F5F8FF] border border-blue-200 text-[#071957] text-xs font-black px-6 py-3.5 rounded-xl hover:bg-blue-100 transition-all inline-flex items-center gap-2"
              >
                <span>Explore Live Workshops</span>
                <HiArrowRight className="w-4 h-4 text-[#2855CE]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F5F8FF] border border-slate-200/90 rounded-3xl p-8 space-y-6 card-shadow">
            <h3 className="text-xl font-black text-[#071957]">Core Founder Focus</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <HiCheckCircle className="w-5 h-5 text-[#36C6A0] shrink-0 mt-0.5" />
                <span><strong>Strategic Brand Identity:</strong> Logos, visual themes, palettes, and brand typography that speak directly to your target demographic.</span>
              </li>
              <li className="flex items-start gap-3">
                <HiCheckCircle className="w-5 h-5 text-[#36C6A0] shrink-0 mt-0.5" />
                <span><strong>Impactful Social Creatives:</strong> Daily carousels, reel covers, and promotional flyers engineered to convert viewers into clients.</span>
              </li>
              <li className="flex items-start gap-3">
                <HiCheckCircle className="w-5 h-5 text-[#36C6A0] shrink-0 mt-0.5" />
                <span><strong>Accessible Digital Training:</strong> 1-to-1 live Zoom sessions empowering small business owners to master Canva and social platforms comfortably.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

