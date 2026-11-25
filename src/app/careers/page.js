import Link from 'next/link';
import { HiArrowRight, HiOutlineBriefcase, HiOutlineSparkles } from 'react-icons/hi2';

export const metadata = {
  title: 'Careers & Opportunities | Frequent Posters',
  description: 'Join the Frequent Posters creative team in Hyderabad. Explore graphic design, social media marketing, and visual storytelling roles.',
};

export default function CareersPage() {
  const openings = [
    {
      role: 'Creative Graphic Designer',
      type: 'Full-time / Hybrid (Hyderabad)',
      experience: '1-3 Years',
      description: 'Design high-converting social media creatives, brand identities, pitch decks, and digital campaign collateral.',
    },
    {
      role: 'Social Media Strategist & Manager',
      type: 'Full-time (Hyderabad)',
      experience: '1-2 Years',
      description: 'Plan monthly content calendars, write engaging copy, coordinate client publishing schedules, and track engagement metrics.',
    },
    {
      role: 'Graphic Design & Video Editing Intern',
      type: 'Internship (3-6 Months)',
      experience: 'Freshers / Students welcome',
      description: 'Hands-on live agency mentorship: create carousel layouts, edit short-form reels, and work directly on real client accounts.',
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
            JOIN OUR CREATIVE CREW
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#071957] tracking-tight">
            Build Unforgettable Brands With Us.
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
            We are always on the lookout for hungry visual creators, aesthetic thinkers, and passionate storytellers in Hyderabad who believe in craftsmanship and client delight.
          </p>
        </div>

        <div className="space-y-6">
          {openings.map((job, idx) => (
            <div
              key={idx}
              className="bg-[#F5F8FF] border border-slate-200/90 rounded-3xl p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 card-shadow hover:border-blue-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-3 py-1 rounded-full bg-blue-100/70 text-[#2855CE] text-[10px] font-black uppercase tracking-wider">
                    {job.type}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">Exp: {job.experience}</span>
                </div>
                <h3 className="text-xl font-black text-[#071957]">{job.role}</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {job.description}
                </p>
              </div>

              <a
                href={`mailto:frequentposters@gmail.com?subject=Job%20Application:%20${encodeURIComponent(job.role)}`}
                className="brand-gradient text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md shrink-0 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all text-center"
              >
                <span>Apply via Email</span>
                <HiArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#071957] to-[#2855CE] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <HiOutlineSparkles className="w-10 h-10 text-[#36C6A0] mx-auto mb-3" />
          <h2 className="text-2xl sm:text-3xl font-black mb-3 !text-white" style={{ color: '#ffffff' }}>
            Don&apos;t see a role that fits you?
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-lg mx-auto mb-6 leading-relaxed">
            Send your design portfolio and a short note to <span className="font-bold underline text-white">frequentposters@gmail.com</span>. We review every portfolio that lands in our inbox.
          </p>
          <a
            href="mailto:frequentposters@gmail.com?subject=Spontaneous%20Application%20-%20Portfolio"
            className="bg-white text-[#071957] font-black text-xs px-7 py-3.5 rounded-xl shadow-md inline-block hover:bg-slate-50 transition-all"
          >
            Send General Application
          </a>
        </div>
      </div>
    </div>
  );
}

