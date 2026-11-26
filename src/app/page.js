import Link from 'next/link';
import Image from 'next/image';
import {
  HiArrowRight,
  HiSparkles,
  HiCheckCircle,
  HiPhone,
  HiArrowTopRightOnSquare,
  HiStar,
} from 'react-icons/hi2';
import {
  RiPaletteLine,
  RiShareForwardLine,
  RiGlobalLine,
  RiAdvertisementLine,
  RiBriefcaseLine,
  RiGraduationCapLine,
  RiDoubleQuotesL,
} from 'react-icons/ri';
import { FaWhatsapp } from 'react-icons/fa6';
import { dbFind, dbFindOne } from '../lib/dbService.js';
import { getClientLogo } from '../lib/clientLogoHelper.js';
import ScrollReveal from '../components/common/ScrollReveal';
import HeroStack from '../components/common/HeroStack.jsx';
import MobilePricingCarousel from '../components/common/MobilePricingCarousel.jsx';
import GenZClientsShowcase from '../components/common/GenZClientsShowcase.jsx';

export const revalidate = 0; // Dynamic server-rendered with real-time updates

export default async function HomePage() {
  const [settings, services, pricing, clients, portfolio, testimonials, blogs] = await Promise.all([
    dbFindOne('settings'),
    dbFind('services', { isPublished: true }),
    dbFind('pricing', { isPublished: true }),
    dbFind('clients', { isPublished: true }),
    dbFind('portfolio', { isPublished: true }),
    dbFind('testimonials', { isPublished: true }),
    dbFind('blog', {}),
  ]);

  const serviceIconMap = {
    Palette: <RiPaletteLine className="w-6 h-6 text-[#2855CE]" />,
    Share2: <RiShareForwardLine className="w-6 h-6 text-[#2855CE]" />,
    Globe: <RiGlobalLine className="w-6 h-6 text-[#2855CE]" />,
    Megaphone: <RiAdvertisementLine className="w-6 h-6 text-[#2855CE]" />,
    Briefcase: <RiBriefcaseLine className="w-6 h-6 text-[#2855CE]" />,
    GraduationCap: <RiGraduationCapLine className="w-6 h-6 text-[#2855CE]" />,
  };

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-4 pb-16 sm:pt-9 sm:pb-20 lg:pt-14 lg:pb-24 bg-gradient-to-b from-slate-50/60 via-[#f8fafc]/40 to-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Content (order-2 on mobile so cards appear first, order-1 on desktop) */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1 pt-2">
              {/* Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-[#071957] tracking-tight leading-[1.12] animate-mask-rise"
                style={{ animationDelay: '180ms' }}
              >
                We Make Brands <br className="hidden sm:inline" />
                <span className="brand-gradient-text">Impossible to Ignore.</span>
              </h1>

              {/* Subheading */}
              <h2
                className="text-xl sm:text-2xl font-bold text-[#1e40af] animate-mask-rise"
                style={{ animationDelay: '280ms' }}
              >
                {settings?.heroSubheading || "Your Vision. Our Creativity. Your Brand's Next Chapter."}
              </h2>

              {/* Paragraph Description */}
              <p
                className="text-slate-600 text-lg sm:text-[19px] leading-[1.7] max-w-2xl animate-mask-rise font-normal"
                style={{ animationDelay: '380ms' }}
              >
                {settings?.heroDescription ||
                  'Great businesses deserve more than ordinary designs. At Frequent Posters, we transform ideas into meaningful visual experiences. From striking brand identities and social media creatives to professional digital presence and hands-on training, we help businesses stand out, communicate better and move forward with confidence.'}
              </p>

              {/* CTA Buttons - flex layout */}
              <div
                className="flex flex-wrap items-center gap-4 pt-2 animate-mask-rise"
                style={{ animationDelay: '480ms' }}
              >
                <Link
                  href="/portfolio"
                  className="relative group overflow-hidden bg-[#071957] hover:bg-[#0f2878] text-white font-bold text-base px-8 py-4 rounded-xl shadow-[0_4px_16px_rgba(7,25,87,0.18)] hover:shadow-[0_8px_24px_rgba(7,25,87,0.26)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 shrink-0 border border-[#071957]"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                  <span>Explore Our Work</span>
                  <HiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className="bg-white border-2 border-slate-200 hover:border-[#071957] text-[#071957] hover:bg-slate-50 font-bold text-base px-8 py-4 rounded-xl transition-all shrink-0 shadow-xs hover:shadow-sm"
                >
                  Let&apos;s Build Your Brand
                </Link>
              </div>

              {/* Supporting Credibility Strip */}
              <div
                className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-500 animate-mask-rise"
                style={{ animationDelay: '580ms' }}
              >
                <span>Creative Branding</span>
                <span className="text-slate-300">•</span>
                <span>Social Media</span>
                <span className="text-slate-300">•</span>
                <span>Digital Presence</span>
                <span className="text-slate-300">•</span>
                <span>Business Training</span>
              </div>
            </div>

            {/* Right Creative Visual Mockup - Interactive Card Stack (order-1 on mobile to sit on top, order-2 on desktop) */}
            <div className="lg:col-span-5 relative animate-mask-rise order-1 lg:order-2" style={{ animationDelay: '150ms' }}>
              <HeroStack
                cards={settings?.heroStackCards}
                layout={settings?.heroStackLayout || 'pile'}
                autoplay={settings?.heroStackAutoplay !== false}
                autoplayDelay={settings?.heroStackDelay || 2500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT TEASER SECTION */}
      <section className="py-20 bg-white/70 backdrop-blur-xs border-b border-slate-100/60">
        <ScrollReveal variant="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden brand-navy-gradient p-10 text-white min-h-[360px] flex flex-col justify-between shadow-xl">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-[#36C6A0] uppercase">
                      Brand Philosophy
                    </span>
                    <h3
                      className="text-2xl sm:text-3xl font-black text-white !text-white mt-3 leading-snug"
                      style={{ color: '#ffffff' }}
                    >
                      More than design. <br />
                      It’s your identity.
                    </h3>
                  </div>
                  <div className="space-y-2 border-l-2 border-[#36C6A0] pl-4">
                    <p
                      className="text-sm text-slate-100 italic !text-white"
                      style={{ color: '#ffffff' }}
                    >
                      &ldquo;We don’t just create designs. We create impressions that last.&rdquo;
                    </p>
                    <span
                      className="text-xs font-bold text-teal-200 block"
                      style={{ color: '#36C6A0' }}
                    >
                      — Nelli Bhavani, Founder
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#2855CE]">
                  MORE THAN DESIGN. IT’S YOUR IDENTITY.
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071957] leading-tight">
                  Your Brand Has a Story. <br />
                  <span className="brand-gradient-text">We Make It Unforgettable.</span>
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                  <p>
                    Every successful brand begins with an idea. What makes it memorable is how that idea is presented.
                  </p>
                  <p>
                    At Frequent Posters, we combine creativity, strategy and thoughtful design to give your business a distinct identity.
                  </p>
                  <p>
                    Whether you&apos;re a startup finding your voice, an established business refreshing your image, or an entrepreneur entering the digital world, we help turn your vision into something people recognize and remember.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 font-bold text-[#2855CE] hover:text-[#071957] transition-colors"
                  >
                    <span>Learn more about our journey and values</span>
                    <HiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-24 bg-[#F5F8FF]/70 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
                WHAT WE DO
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#071957] tracking-tight">
                Everything Your Brand Needs. <br />
                <span className="brand-gradient-text">Under One Creative Roof.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8">
            {services && services.length > 0 ? (
              services.map((service, idx) => (
                <div
                  key={service._id || idx}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-8 hover:border-blue-300 card-shadow card-shadow-hover transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-50 to-teal-50 flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-110 transition-transform">
                      {serviceIconMap[service.icon] || <HiSparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#2855CE]" />}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#1e40af] block mb-1">
                      {service.tagline}
                    </span>
                    <h3 className="text-base sm:text-xl font-bold text-[#071957] mb-2 sm:mb-3 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-4 sm:mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/services"
                      className="text-xs sm:text-sm font-bold text-[#071957] hover:text-[#1e40af] inline-flex items-center gap-1 sm:gap-1.5 transition-colors"
                    >
                      <span>Explore service</span>
                      <HiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE APPROACH (4 Pillars) */}
      <section className="py-20 bg-white/70 backdrop-blur-xs">
        <ScrollReveal variant="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#1e40af] block mb-2">
                OUR SIGNATURE APPROACH
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071957]">
                Creativity That Looks Good. <br />
                <span className="brand-gradient-text">Communication That Makes Sense.</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
              <div className="p-4 sm:p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                <div className="text-2xl sm:text-3xl font-black text-slate-300 group-hover:text-[#071957] transition-colors mb-2 sm:mb-3">01</div>
                <h3 className="text-base sm:text-lg font-bold text-[#071957] mb-1 sm:mb-2">Made for Your Brand</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  No templates or cookie-cutter solutions. Everything is thoughtfully customized to your business goals.
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                <div className="text-2xl sm:text-3xl font-black text-slate-300 group-hover:text-[#071957] transition-colors mb-2 sm:mb-3">02</div>
                <h3 className="text-base sm:text-lg font-bold text-[#071957] mb-1 sm:mb-2">Consistent Across Platforms</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Seamless visual consistency across Instagram, Facebook, Google Maps, print collaterals, and decks.
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                <div className="text-2xl sm:text-3xl font-black text-slate-300 group-hover:text-[#071957] transition-colors mb-2 sm:mb-3">03</div>
                <h3 className="text-base sm:text-lg font-bold text-[#071957] mb-1 sm:mb-2">Creativity With Purpose</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Visuals crafted not just to look pretty, but engineered to build trust and generate real customer actions.
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                <div className="text-2xl sm:text-3xl font-black text-slate-300 group-hover:text-[#071957] transition-colors mb-2 sm:mb-3">04</div>
                <h3 className="text-base sm:text-lg font-bold text-[#071957] mb-1 sm:mb-2">Digital Made Simple</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  No jargon or complexity. We handle the technical setup and guide you with practical knowledge.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. TRAINING HIGHLIGHT: FREQUENT POSTERS ACADEMY */}
      <section className="py-24 bg-gradient-to-b from-[#F5F8FF]/70 to-white/70 border-y border-slate-200/70 backdrop-blur-xs">
        <ScrollReveal variant="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Visual Showcase Split Card */}
          <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-6 sm:p-10 card-shadow mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center backdrop-blur-md">
            {/* Left Blueprint Card - Redesigned Ultra-Premium Studio Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#06143D] via-[#092265] to-[#0c318f] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl border border-white/15 group">
              {/* Subtle Ambient Glowing Mesh Orbs */}
              <div className="absolute -top-16 -right-16 w-52 h-52 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-teal-400/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              {/* Status Header */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold text-[#36C6A0]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#36C6A0] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#36C6A0]" />
                  </span>
                  <span>LIVE BATCH OPEN</span>
                </div>
                <span className="text-[10px] font-bold tracking-wider text-blue-200 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                  LIVE ZOOM SESSIONS
                </span>
              </div>

              {/* Headline */}
              <h3 className="relative z-10 text-2xl sm:text-3xl font-black text-white leading-tight mb-3 !text-white tracking-tight" style={{ color: '#ffffff' }}>
                Take Your <br />
                Business Online. <br />
                <span className="text-[#36C6A0]">With Confidence.</span>
              </h3>

              <p className="relative z-10 text-xs sm:text-sm text-blue-100/90 leading-relaxed mb-6 font-normal">
                Master the exact digital design &amp; branding skills needed to transform your business presence into an unforgettable digital brand.
              </p>

              {/* Interactive Tool Capsules */}
              <div className="relative z-10 flex flex-wrap gap-2 pt-3 border-t border-white/15 mb-6">
                {[
                  { name: 'Instagram', color: 'bg-pink-500/15 border-pink-400/30 text-pink-200' },
                  { name: 'Canva Pro', color: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-200' },
                  { name: 'Meta Ads', color: 'bg-blue-500/15 border-blue-400/30 text-blue-200' },
                  { name: 'Google Business', color: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-200' },
                  { name: 'LinkedIn', color: 'bg-sky-500/15 border-sky-400/30 text-sky-200' },
                  { name: 'WhatsApp', color: 'bg-teal-500/15 border-teal-400/30 text-teal-200' },
                  { name: 'YouTube', color: 'bg-red-500/15 border-red-400/30 text-red-200' },
                ].map((tag) => (
                  <span
                    key={tag.name}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all hover:scale-105 cursor-default ${tag.color}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* Bottom Credibility Pill */}
              <div className="relative z-10 p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-between text-[11px] font-semibold text-white/90">
                <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                  ★ 4.9/5 Rating
                </span>
                <span className="text-white/40">•</span>
                <span>100+ Founders Trained</span>
                <span className="text-white/40">•</span>
                <span className="text-[#36C6A0] font-bold">100% Practical</span>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 space-y-5 sm:pl-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2855CE] block">
                PRACTICAL GUIDANCE • FREQUENT POSTERS ACADEMY
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#071957] tracking-tight leading-tight">
                You Run the Business. <br />
                <span className="brand-gradient-text">We&apos;ll Show You the Tools.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Social media doesn&apos;t have to feel complicated or intimidating. Our beginner-friendly live workshops introduce the everyday tools, templates, and essentials of creating, managing, and maintaining your own thriving digital presence.
              </p>

              {/* Feature Grid with Modern Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-xs flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#36C6A0] shadow-[0_0_8px_rgba(54,198,160,0.6)] shrink-0" />
                  <span className="text-xs font-bold text-[#071957]">Live Zoom Q&amp;A Screen Shares</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-xs flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#36C6A0] shadow-[0_0_8px_rgba(54,198,160,0.6)] shrink-0" />
                  <span className="text-xs font-bold text-[#071957]">Beginner-Friendly &amp; Hands-On</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-xs flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#36C6A0] shadow-[0_0_8px_rgba(54,198,160,0.6)] shrink-0" />
                  <span className="text-xs font-bold text-[#071957]">Recorded for Lifetime Review</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-xs flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#36C6A0] shadow-[0_0_8px_rgba(54,198,160,0.6)] shrink-0" />
                  <span className="text-xs font-bold text-[#071957]">Ready-to-Use Brand Templates</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/workshops"
                  className="bg-[#071957] hover:bg-[#0f2878] text-white font-bold text-sm sm:text-[15px] px-8 py-4 rounded-xl shadow-md inline-flex items-center gap-2.5 active:scale-95 transition-all group"
                >
                  <span>Explore Training Options</span>
                  <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-10">
            <div className="lg:col-span-8">
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#2855CE] mb-2">
                WORKSHOPS &amp; PRICING
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#071957] tracking-tight">
                Your Business. Your Social Media. <br />
                <span className="brand-gradient-text">Your Control.</span>
              </h2>
              <p className="text-xl font-bold text-[#2855CE] mt-3">
                Stop Guessing. Start Learning.
              </p>
              <p className="text-slate-600 mt-3 text-base max-w-2xl leading-relaxed">
                Discover how to create, manage and scale your business social media presence through beginner-friendly, hands-on live Zoom sessions.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/workshops"
                className="bg-[#071957] hover:bg-[#0f2878] text-white font-bold text-sm sm:text-[15px] px-7 py-3.5 rounded-xl shadow-md inline-flex items-center gap-2 active:scale-95 transition-all"
              >
                <span>View All Workshops</span>
                <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Expansive Panoramic Horizon Carousel (Unboxed, Full-Breathing Stage) */}
        <div className="w-full max-w-[1520px] mx-auto px-2 sm:px-4 lg:px-6">
          <MobilePricingCarousel pricing={pricing} />
        </div>
        </ScrollReveal>
      </section>

      {/* 6. PORTFOLIO PREVIEW */}
      <section className="py-24 bg-white/70 backdrop-blur-xs">
        <ScrollReveal variant="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
                PORTFOLIO SHOWCASE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#071957] tracking-tight">
                Ordinary Is Easy. <br />
                <span className="brand-gradient-text">Memorable Takes Creativity.</span>
              </h2>
            </div>
            <div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#2855CE] hover:text-[#071957]"
              >
                <span>View Full Portfolio</span>
                <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {portfolio && portfolio.length > 0 ? (
              portfolio.slice(0, 4).map((item, idx) => (
                <div
                  key={item._id || idx}
                  className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div className="relative h-32 sm:h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-[#071957] text-xs sm:text-base group-hover:text-[#2855CE] transition-colors line-clamp-1 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* 7. CLIENTS SHOWCASE (GEN-Z DUAL-TRACK MARQUEE) */}
      <section className="py-24 bg-[#F5F8FF]/70 backdrop-blur-xs overflow-hidden">
        <ScrollReveal variant="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
                FEATURED CLIENTS &bull; CREATIVE NETWORK
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071957]">
                Different Businesses. Different Stories. <br />
                <span className="brand-gradient-text">One Creative Connection.</span>
              </h2>
            </div>
          </div>

          {/* Full-Bleed Edge-to-Edge Stream (Unboxed, Screen-Wide) */}
          <div className="w-full">
            <GenZClientsShowcase clients={clients} />
          </div>
        </ScrollReveal>
      </section>

      {/* 8. CLIENT REVIEWS / TESTIMONIALS */}
      <section className="py-20 bg-white/70 backdrop-blur-xs border-t border-slate-100">
        <ScrollReveal variant="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
                CLIENT FEEDBACK
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071957]">
                Trust Is Built Through Every Experience.
              </h2>
            </div>
            <Link
              href="/reviews"
              className="text-xs font-extrabold text-[#2855CE] hover:text-[#071957] inline-flex items-center gap-1"
            >
              <span>View all client reviews</span>
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {testimonials && testimonials.length > 0 ? (
              testimonials.slice(0, 2).map((review, idx) => (
                <div
                  key={review._id || idx}
                  className="bg-[#F5F8FF] border border-slate-200/90 rounded-2xl p-7 flex flex-col justify-between card-shadow"
                >
                  <div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <HiStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                      &ldquo;{review.content}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#2855CE] to-[#36C6A0] flex items-center justify-center text-white font-black text-xs">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-[#071957]">{review.name}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold">
                        {review.designation} • {review.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* 9. BLOG & INSIGHTS PREVIEW */}
      <section className="py-20 bg-[#F5F8FF]/70 backdrop-blur-xs border-t border-slate-200/70">
        <ScrollReveal variant="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
                INSIGHTS & GUIDES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071957]">
                Fresh Ideas. Creative Inspiration.
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-extrabold text-[#2855CE] hover:text-[#071957] inline-flex items-center gap-1"
            >
              <span>Explore all articles</span>
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs && blogs.length > 0 ? (
              blogs.slice(0, 3).map((post, idx) => (
                <div
                  key={post._id || idx}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between card-shadow hover:border-blue-300 transition-all"
                >
                  <div>
                    <span className="text-[10px] font-extrabold text-[#2855CE] uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md inline-block mb-3">
                      {post.category}
                    </span>
                    <h3 className="font-extrabold text-base text-[#071957] mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                      {post.summary}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#2855CE]">
                    <span>Read Guide</span>
                    <HiArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* 10. FOUNDER SPOTLIGHT */}
      <section className="py-20 bg-white/70 backdrop-blur-xs border-b border-slate-100">
        <ScrollReveal variant="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-tr from-[#071957] via-[#0d2a7a] to-[#0759d0] rounded-3xl p-6 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Ambient Background Circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-teal-400/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-4 flex justify-center">
                <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[#2855CE] to-[#36C6A0] p-1.5 shadow-2xl shrink-0 relative overflow-hidden group">
                  <img
                    src={
                      settings?.founderImage ||
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop'
                    }
                    alt={settings?.founderName || 'Nelli Bhavani'}
                    className="w-full h-full object-cover object-top rounded-full shadow-inner transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
                </div>
              </div>

              <div className="md:col-span-8 space-y-3 sm:space-y-4 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <RiDoubleQuotesL className="w-7 h-7 sm:w-9 sm:h-9 text-[#36C6A0]" />
                </div>
                <h3
                  className="text-lg sm:text-2xl font-bold leading-relaxed font-sans !text-white"
                  style={{ color: '#ffffff' }}
                >
                  &ldquo;Every business has a unique identity. My passion is helping that identity come to life through creativity.&rdquo;
                </h3>
                <div className="pt-1">
                  <span
                    className="font-extrabold text-base sm:text-lg block !text-white"
                    style={{ color: '#ffffff' }}
                  >
                    {settings?.founderName || 'Nelli Bhavani'}
                  </span>
                  <span className="text-xs sm:text-sm text-[#36C6A0] font-bold block uppercase tracking-wider mt-0.5">
                    {settings?.founderTitle || 'Founder — Frequent Posters, Hyderabad'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-br from-[#061239] via-[#091d59] to-[#0d287a] text-white text-center relative overflow-hidden">
        <ScrollReveal variant="fade-up">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-200 block">
              CREATIVE DIRECTION &amp; DESIGN
            </span>
            <h2
              className="text-3xl sm:text-5xl font-black text-white tracking-tight !text-white"
              style={{ color: '#ffffff' }}
            >
              Your Next Big Impression <br />
              Starts Here.
            </h2>
            <p
              className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: '#dbeafe' }}
            >
              Whether you&apos;re seeking a fresh brand identity, compelling social media campaigns, or accessible digital training, we help your business move forward.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="bg-white text-[#071957] font-bold text-base px-8 py-4 rounded-xl shadow-xl hover:bg-slate-100 active:scale-95 transition-all"
              >
                Get In Touch With Us
              </Link>
              <a
                href={`https://wa.me/${(settings?.whatsapp || '917780271948').replace(/\D/g, '')}?text=Hi%20Frequent%20Posters,%20I%20would%20like%20to%20start%20a%20project%20with%20you!`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/60 hover:border-white text-white font-bold text-base px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm transition-all flex items-center gap-2.5"
              >
                <FaWhatsapp className="w-5 h-5 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
