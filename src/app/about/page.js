import Link from 'next/link';
import { dbFindOne } from '../../lib/dbService.js';
import { HiArrowRight, HiCheckCircle, HiHeart } from 'react-icons/hi2';
import {
  RiFlashlightLine,
  RiMedalLine,
  RiFocus3Line,
  RiShieldCheckLine,
  RiHeart3Line,
} from 'react-icons/ri';

export const metadata = {
  title: 'About Us | Frequent Posters — Hyderabad Creative Studio',
  description: 'Built on Creativity. Driven by Purpose. Discover the story, mission, vision, and core values behind Frequent Posters and founder Nelli Bhavani.',
};

export const revalidate = 0;

export default async function AboutPage() {
  const settings = await dbFindOne('settings');

  const values = [
    {
      title: 'Creativity',
      description: 'Originality that cuts through digital noise and sets new aesthetic benchmarks.',
      icon: <RiFlashlightLine className="w-6 h-6 text-[#2855CE]" />,
    },
    {
      title: 'Consistency',
      description: 'Unified visuals, tone, and identity across every customer touchpoint.',
      icon: <RiMedalLine className="w-6 h-6 text-[#2855CE]" />,
    },
    {
      title: 'Clarity',
      description: 'Clear messaging and straightforward communication that converts viewers into believers.',
      icon: <RiFocus3Line className="w-6 h-6 text-[#2855CE]" />,
    },
    {
      title: 'Professionalism',
      description: 'On-time delivery, meticulous attention to detail, and enterprise-grade design execution.',
      icon: <RiShieldCheckLine className="w-6 h-6 text-[#2855CE]" />,
    },
    {
      title: 'Accessibility',
      description: 'Empowering small business owners and creators through practical, easy-to-learn training.',
      icon: <RiHeart3Line className="w-6 h-6 text-[#2855CE]" />,
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-white">
      {/* 1. Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
            OUR STORY
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-[#071957] tracking-tight leading-tight">
            Built on Creativity. <br />
            <span className="brand-gradient-text">Driven by Purpose.</span>
          </h1>
          <p className="text-xl font-bold text-[#2855CE] mt-4">
            Design Is What We Do. Helping Brands Express Themselves Is Why We Do It.
          </p>
        </div>
      </div>

      {/* 2. Story Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed">
            <p>
              Frequent Posters was founded with a singular conviction: ambitious businesses of all sizes deserve world-class visual branding and the digital confidence to thrive.
            </p>
            <p>
              Located in the vibrant commercial hub of Hyderabad, we bridge the gap between high-end creative design strategy and real-world commercial results. Many businesses struggle with disconnected visuals, generic clip-art templates, and confusing social media algorithms.
            </p>
            <p>
              We solved this by establishing a comprehensive creative studio that provides both complete done-for-you brand design and empowering hands-on training for business owners.
            </p>
            <div className="pt-2">
              <span className="font-bold text-[#071957] block">
                Nelli Bhavani
              </span>
              <span className="text-xs text-[#2855CE] font-semibold">
                Founder, Frequent Posters
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#F5F8FF] border border-blue-100 rounded-3xl p-8 space-y-6 card-shadow">
              <h3 className="text-2xl font-black text-[#071957]">
                Vision & Mission
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-extrabold text-[#2855CE] uppercase tracking-wider mb-1">
                    Our Vision
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {settings?.vision ||
                      'To empower entrepreneurs and businesses with memorable visual identities and digital confidence.'}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <h4 className="text-sm font-extrabold text-[#36C6A0] uppercase tracking-wider mb-1">
                    Our Mission
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {settings?.mission ||
                      'Deliver high-impact branding, creative social media assets, and accessible live digital training under one unified roof.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Values */}
      <div className="bg-[#F5F8FF] py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
              FOUNDATIONAL PILLARS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071957]">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-extrabold text-base text-[#071957] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <div className="bg-gradient-to-r from-[#071957] to-[#2855CE] rounded-3xl p-10 sm:p-14 text-white shadow-xl max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black mb-4">
            Ready to collaborate with Frequent Posters?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto mb-8">
            Let&apos;s build an unforgettable visual brand identity together.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-[#071957] font-bold text-sm px-7 py-3.5 rounded-xl shadow-md hover:bg-slate-50"
            >
              Get in Touch
            </Link>
            <Link
              href="/portfolio"
              className="border border-white/60 text-white font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-white/10"
            >
              View Our Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

