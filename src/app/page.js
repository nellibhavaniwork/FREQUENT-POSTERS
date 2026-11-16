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
import { dbFind, dbFindOne } from '../lib/dbService.js';

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
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-[radial-gradient(ellipse_at_90%_20%,rgba(54,198,160,0.15),transparent_40%),linear-gradient(#ffffff,#f4f8ff)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-100 bg-blue-50/70 text-[#2855CE] text-xs font-extrabold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#36C6A0] shadow-[0_0_8px_#36C6A0]" />
                {settings?.heroEyebrow || 'CREATIVE DESIGN & DIGITAL BRANDING STUDIO'}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#071957] tracking-tight leading-[1.12]">
                We Make Brands <br className="hidden sm:inline" />
                <span className="brand-gradient-text">Impossible to Ignore.</span>
              </h1>

              <h2 className="text-lg sm:text-xl font-bold text-[#2855CE]">
                {settings?.heroSubheading || "Your Vision. Our Creativity. Your Brand's Next Chapter."}
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                {settings?.heroDescription ||
                  'Great businesses deserve more than ordinary designs. At Frequent Posters, we transform ideas into meaningful visual experiences. From striking brand identities and social media creatives to professional digital presence and hands-on training, we help businesses stand out, communicate better and move forward with confidence.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/portfolio"
                  className="brand-gradient text-white font-extrabold text-sm px-7 py-4 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Explore Our Work</span>
                  <HiArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="bg-white border-2 border-slate-200 hover:border-[#2855CE] text-[#071957] font-extrabold text-sm px-7 py-4 rounded-xl hover:bg-slate-50 transition-all"
                >
                  Let&apos;s Build Your Brand
                </Link>
              </div>

              {/* Supporting Credibility Strip */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
                <span>Creative Branding</span>
                <span className="text-slate-300">•</span>
                <span>Social Media</span>
                <span className="text-slate-300">•</span>
                <span>Digital Presence</span>
                <span className="text-slate-300">•</span>
                <span>Business Training</span>
              </div>
            </div>

            {/* Right Creative Visual Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                {/* Decorative Glowing Rings */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

                {/* Primary Agency Composition Card */}
                <div className="relative bg-white border border-slate-200/90 rounded-3xl p-5 shadow-[0_25px_60px_rgba(7,25,87,0.12)] rotate-[-2deg] hover:rotate-0 transition-transform duration-500 animate-float-slow">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Frequent Posters Studio
                    </span>
                  </div>

                  {/* Artwork Showcase Box */}
                  <div className="relative h-60 rounded-2xl brand-navy-gradient overflow-hidden p-6 text-white flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                        Visual Identity
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm text-[10px] font-bold">
                        Hyderabad, IN
                      </span>
                    </div>

                    <div>
                      <p className="text-2xl sm:text-3xl font-black leading-tight">
                        DESIGN • BRAND <br />
                        <span className="text-teal-300">CREATE • GROW</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#36C6A0] animate-pulse" />
                      <span className="text-xs text-slate-200 font-semibold">
                        Crafting distinct business identities
                      </span>
                    </div>
                  </div>

                  {/* Micro Visual Indicators */}
                  <div className="grid grid-cols-3 gap-2.5 mt-3.5">
                    <div className="h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      ⚡ Brand Strategy
                    </div>
                    <div className="h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      🎯 Social Creatives
                    </div>
                    <div className="h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      🎓 Live Academy
                    </div>
                  </div>
                </div>

                {/* Floating Metric Badge 1 */}
                <div className="absolute -top-4 -right-2 sm:-right-4 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xl flex items-center gap-3 rotate-[4deg] animate-float-reverse">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="text-sm font-black text-[#071957] block">100% Genuine</span>
                    <span className="text-[10px] text-slate-500 font-bold">Client Success</span>
                  </div>
                </div>

                {/* Floating Metric Badge 2 */}
                <div className="absolute -bottom-6 -left-2 sm:-left-4 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xl flex items-center gap-3 rotate-[-3deg] animate-float-slow">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2855CE] flex items-center justify-center font-bold">
                    ★
                  </div>
                  <div>
                    <span className="text-sm font-black text-[#071957] block">Hyderabad&apos;s Best</span>
                    <span className="text-[10px] text-slate-500 font-bold">Creative Agency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT TEASER SECTION */}
      <section className="py-20 bg-white border-b border-slate-100">
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
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-24 bg-[#F5F8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
              WHAT WE DO
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#071957] tracking-tight">
              Everything Your Brand Needs. <br />
              <span className="brand-gradient-text">Under One Creative Roof.</span>
            </h2>
          </div>

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
                    <span className="text-[10px] sm:text-xs font-bold text-[#2855CE] block mb-1 line-clamp-1">
                      {service.tagline}
                    </span>
                    <h3 className="text-sm sm:text-xl font-extrabold text-[#071957] mb-2 sm:mb-3 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/services"
                      className="text-[11px] sm:text-xs font-bold text-[#2855CE] hover:text-[#071957] inline-flex items-center gap-1 sm:gap-1.5"
                    >
                      <span>Explore</span>
                      <HiArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE APPROACH (4 Pillars) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
              OUR SIGNATURE APPROACH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071957]">
              Creativity That Looks Good. <br />
              <span className="brand-gradient-text">Communication That Makes Sense.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            <div className="p-4 sm:p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
              <div className="text-2xl sm:text-3xl font-black text-blue-200 group-hover:text-[#2855CE] transition-colors mb-2 sm:mb-3">01</div>
              <h3 className="text-sm sm:text-lg font-bold text-[#071957] mb-1 sm:mb-2">Made for Your Brand</h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed">
                No templates or cookie-cutter solutions. Everything is thoughtfully customized to your business goals.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
              <div className="text-2xl sm:text-3xl font-black text-blue-200 group-hover:text-[#2855CE] transition-colors mb-2 sm:mb-3">02</div>
              <h3 className="text-sm sm:text-lg font-bold text-[#071957] mb-1 sm:mb-2">Consistent Across Platforms</h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed">
                Seamless visual consistency across Instagram, Facebook, Google Maps, print collaterals, and decks.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
              <div className="text-2xl sm:text-3xl font-black text-blue-200 group-hover:text-[#2855CE] transition-colors mb-2 sm:mb-3">03</div>
              <h3 className="text-sm sm:text-lg font-bold text-[#071957] mb-1 sm:mb-2">Creativity With Purpose</h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed">
                Visuals crafted not just to look pretty, but engineered to build trust and generate real customer actions.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
              <div className="text-2xl sm:text-3xl font-black text-blue-200 group-hover:text-[#2855CE] transition-colors mb-2 sm:mb-3">04</div>
              <h3 className="text-sm sm:text-lg font-bold text-[#071957] mb-1 sm:mb-2">Digital Made Simple</h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed">
                No jargon or complexity. We handle the technical setup and guide you with practical knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRAINING HIGHLIGHT: FREQUENT POSTERS ACADEMY */}
      <section className="py-24 bg-gradient-to-b from-[#F5F8FF] to-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-8">
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#2855CE] mb-2">
                INTRODUCING — LEARN WITH FREQUENT POSTERS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#071957] tracking-tight">
                Your Business. Your Social Media. <br />
                <span className="brand-gradient-text">Your Control.</span>
              </h2>
              <p className="text-xl font-bold text-[#2855CE] mt-3">
                Stop Guessing. Start Learning.
              </p>
              <p className="text-slate-600 mt-3 text-base max-w-2xl leading-relaxed">
                Discover how to create, manage and scale your business social media presence through beginner-friendly, hands-on live Zoom sessions. No prior design or technical background required.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/learn-with-us"
                className="brand-gradient text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md inline-flex items-center gap-2"
              >
                <span>Explore Academy Details</span>
                <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing && pricing.length > 0 ? (
              pricing.map((tier, idx) => (
                <div
                  key={tier._id || idx}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
                    tier.isFeatured
                      ? 'bg-white border-2 border-[#2855CE] shadow-2xl relative scale-105 z-10'
                      : 'bg-white border border-slate-200 card-shadow'
                  }`}
                >
                  {tier.isFeatured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2855CE] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular Session
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
                      className={`w-full text-center block text-xs font-extrabold py-3.5 rounded-xl transition-all ${
                        tier.isFeatured
                          ? 'brand-gradient text-white shadow-md hover:shadow-lg'
                          : 'bg-slate-100 hover:bg-[#2855CE] hover:text-white text-[#071957]'
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
      </section>

      {/* 6. PORTFOLIO PREVIEW */}
      <section className="py-24 bg-white">
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
                    <div className="absolute top-2 left-2 right-2 flex justify-start">
                      <span className="bg-[#071957]/90 text-white backdrop-blur-md text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md shadow max-w-full truncate">
                        {item.category}
                      </span>
                    </div>
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
      </section>

      {/* 7. CLIENTS LOGO GRID */}
      <section className="py-20 bg-[#F5F8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
              FEATURED CLIENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071957]">
              Different Businesses. Different Stories. <br />
              <span className="brand-gradient-text">One Creative Connection.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-6">
            {clients && clients.length > 0 ? (
              clients.map((client, idx) => (
                <div
                  key={client._id || idx}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 flex flex-col justify-between items-center text-center hover:border-blue-400 card-shadow hover:shadow-lg transition-all group"
                >
                  <div className="w-full h-14 sm:h-16 flex items-center justify-center shrink-0 mb-3 px-2">
                    <img
                      src={`/clients/${
                        client.name.toLowerCase().includes('christiva')
                          ? 'christiva.svg'
                          : client.name.toLowerCase().includes('leaf')
                          ? 'ileaf.svg'
                          : client.name.toLowerCase().includes('kernel')
                          ? 'kernelmasters.svg'
                          : client.name.toLowerCase().includes('golden')
                          ? 'goldeneye.svg'
                          : client.name.toLowerCase().includes('durga')
                          ? 'sridurga.svg'
                          : client.name.toLowerCase().includes('swift')
                          ? 'swiftdigitals.svg'
                          : client.name.toLowerCase().includes('newline')
                          ? 'newline.svg'
                          : client.name.toLowerCase().includes('tradition')
                          ? 'traditions.svg'
                          : 'ekranfix.svg'
                      }`}
                      alt={`${client.name} official logo`}
                      className="max-h-full max-w-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="w-full flex-1 flex flex-col justify-center">
                    <h3 className="font-extrabold text-[#071957] text-xs sm:text-sm mb-1 line-clamp-2">
                      {client.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {client.description}
                    </p>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
      </section>

      {/* 8. CLIENT REVIEWS / TESTIMONIALS */}
      <section className="py-20 bg-white border-t border-slate-100">
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
      </section>

      {/* 9. BLOG & INSIGHTS PREVIEW */}
      <section className="py-20 bg-[#F5F8FF] border-t border-slate-200/70">
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
      </section>

      {/* 10. FOUNDER SPOTLIGHT */}
      <section className="py-20 bg-white border-b border-slate-100">
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
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-r from-[#06144c] via-[#0744a4] to-[#0099c1] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Your Brand Deserves More Than Ordinary. <br />
            Let&apos;s Create Something People Remember.
          </h2>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to establish a standout brand identity, revamp your social media creatives, or master digital tools? Let&apos;s start today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="bg-white text-[#071957] font-extrabold text-sm px-8 py-4 rounded-xl shadow-xl hover:bg-slate-100 active:scale-95 transition-all"
            >
              Start Your Project
            </Link>
            <a
              href="https://wa.me/917780271948?text=Hi%20Frequent%20Posters,%20I%20would%20like%20to%20start%20a%20project%20with%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/60 hover:border-white text-white font-extrabold text-sm px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#36C6A0] animate-ping" />
              Chat on WhatsApp (+91 7780271948)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
