import { dbFind, dbFindOne } from '../../lib/dbService.js';
import { HiStar, HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { RiDoubleQuotesL } from 'react-icons/ri';

export const metadata = {
  title: 'Client Reviews & Testimonials | Frequent Posters',
  description:
    'Trust is built through every experience. Read genuine client testimonials and feedback for Frequent Posters Hyderabad.',
};

export const revalidate = 0;

export default async function ReviewsPage() {
  const [testimonials, settings] = await Promise.all([
    dbFind('testimonials', { isPublished: true }),
    dbFindOne('settings'),
  ]);

  return (
    <div className="py-16 sm:py-24 bg-transparent">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <span
            className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2 animate-mask-rise"
            style={{ animationDelay: '80ms' }}
          >
            CLIENT FEEDBACK
          </span>
          <h1
            className="text-4xl sm:text-6xl font-black text-[#071957] tracking-tight leading-tight animate-mask-rise"
            style={{ animationDelay: '180ms' }}
          >
            Trust Is Built Through Every Experience.
          </h1>
          <p
            className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed animate-mask-rise"
            style={{ animationDelay: '280ms' }}
          >
            We don’t believe in invented metrics or inflated ratings. Every testimonial below comes from real collaborations with founders and business owners.
          </p>

          <div
            className="mt-6 flex flex-wrap items-center gap-4 animate-mask-rise"
            style={{ animationDelay: '340ms' }}
          >
            <a
              href={settings?.googleReviewsUrl || 'https://g.page/r/frequentposters/review'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F5F8FF] hover:bg-blue-100/70 border border-blue-200 text-[#071957] text-xs font-extrabold px-5 py-3 rounded-xl transition-all"
            >
              <HiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Review Us on Google Business Profile</span>
              <HiArrowTopRightOnSquare className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-mask-rise"
        style={{ animationDelay: '380ms' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials && testimonials.length > 0 ? (
            testimonials.map((review, idx) => (
              <div
                key={review._id || idx}
                className="bg-[#F5F8FF] border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between hover:border-blue-300 transition-all card-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <HiStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <RiDoubleQuotesL className="w-6 h-6 text-blue-200" />
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic mb-8">
                    &ldquo;{review.content}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#2855CE] to-[#36C6A0] p-0.5 shadow-sm shrink-0">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#2855CE] font-black text-sm">
                      {review.clientName?.charAt(0) || 'C'}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#071957] text-sm leading-tight">
                      {review.clientName}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium block mt-0.5">
                      {review.clientCompany || 'Verified Business Partner'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
}
