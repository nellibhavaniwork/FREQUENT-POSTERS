'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiArrowRight, HiXMark } from 'react-icons/hi2';

export default function PortfolioClient({ initialProjects }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const categories = [
    'All',
    'Brand Identity',
    'Social Media Creatives',
    'Marketing & Advertising',
    'Business Profiles & Presentations',
    'Digital Branding',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? initialProjects
      : initialProjects.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2.5 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              selectedCategory === cat
                ? 'brand-gradient text-white shadow-md'
                : 'bg-[#F5F8FF] text-[#071957] border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project._id || idx}
            onClick={() => setActiveModalItem(project)}
            className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 bg-white card-shadow hover:shadow-2xl hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/95 backdrop-blur-sm text-[#071957] text-[10px] font-extrabold px-3 py-1 rounded-md shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-extrabold text-[#071957] group-hover:text-[#2855CE] transition-colors line-clamp-1 mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-[#2855CE]">
              <span>View Details & Artwork</span>
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Project Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <HiXMark className="w-5 h-5" />
            </button>

            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-1">
              {activeModalItem.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#071957] mb-4">
              {activeModalItem.title}
            </h2>

            <div className="rounded-2xl overflow-hidden mb-6 max-h-[400px] w-full bg-slate-100">
              <img
                src={activeModalItem.thumbnailUrl}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>{activeModalItem.description}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <Link
                href={`/contact?requirement=${encodeURIComponent(
                  `Interested in a project similar to ${activeModalItem.title}`
                )}`}
                className="brand-gradient text-white text-xs font-extrabold px-6 py-3.5 rounded-xl shadow-md"
              >
                Request Similar Work For Your Brand
              </Link>
              <button
                onClick={() => setActiveModalItem(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

