import { dbFind } from '../../lib/dbService.js';
import PortfolioClient from './PortfolioClient.js';

export const metadata = {
  title: 'Portfolio | Ideas Brought to Life — Frequent Posters',
  description:
    'Browse our creative agency portfolio: Brand Identities, Social Media Grid Creatives, Marketing Posters, Company Profiles, and Digital Branding.',
};

export const revalidate = 0;

export default async function PortfolioPage() {
  const projects = await dbFind('portfolio', { isPublished: true });

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
            CREATIVE PORTFOLIO
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-[#071957] tracking-tight leading-tight">
            Ideas Brought to Life.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Every project represents a tailored journey of strategy, visual harmony, and deliberate execution. Explore selected brand identities, social campaigns, and corporate designs below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioClient initialProjects={projects || []} />
      </div>
    </div>
  );
}

