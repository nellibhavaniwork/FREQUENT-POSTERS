import Link from 'next/link';
import { dbFind } from '../../lib/dbService.js';
import { HiArrowRight, HiOutlineClock } from 'react-icons/hi2';

export const metadata = {
  title: 'Blog & Design Insights | Frequent Posters',
  description:
    'Fresh ideas, practical design guides, and creative branding inspiration by Frequent Posters Hyderabad.',
};

export const revalidate = 0;

export default async function BlogPage() {
  const blogs = await dbFind('blog', {});

  return (
    <div className="py-16 sm:py-24 bg-transparent">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
            KNOWLEDGE &amp; INSPIRATION
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-[#071957] tracking-tight leading-tight">
            Fresh Ideas. Practical Guides. <br />
            <span className="brand-gradient-text">Creative Inspiration.</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Practical insights on building brand recognition, structuring company profiles, mastering Instagram algorithms, and executing digital marketing with clarity.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs && blogs.length > 0 ? (
            blogs.map((post, idx) => (
              <div
                key={post._id || idx}
                className="bg-[#F5F8FF] border border-slate-200/90 rounded-3xl p-7 hover:border-blue-300 card-shadow transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 text-xs font-bold">
                    <span className="text-[#2855CE] bg-white px-3 py-1 rounded-full border border-blue-100">
                      {post.category || 'Creative Insights'}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <HiOutlineClock className="w-3.5 h-3.5" />
                      {post.readTime || '4 min read'}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-[#071957] mb-3 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-bold">
                    By {post.author || 'Frequent Posters'}
                  </span>
                  <Link
                    href={`/contact?requirement=${encodeURIComponent(`Enquiring regarding article: ${post.title}`)}`}
                    className="text-xs font-bold text-[#2855CE] hover:text-[#071957] inline-flex items-center gap-1"
                  >
                    <span>Read Guide</span>
                    <HiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-400">
              No blog posts published yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
