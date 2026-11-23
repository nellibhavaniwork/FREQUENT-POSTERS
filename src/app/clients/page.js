import Link from 'next/link';
import { dbFind } from '../../lib/dbService.js';
import { HiArrowRight } from 'react-icons/hi2';
import { getClientLogo } from '../../lib/clientLogoHelper.js';

export const metadata = {
  title: 'Our Clients | Frequent Posters',
  description:
    'Brands We’ve Had the Pleasure of Working With: Ekranfix, Traditions, Newline Show Production, Swift Digitals, Sri Durga Ladies Tailor, Golden Eye Security, Kernel Masters, i-Leaf Doors, and Christiva Ministries.',
};

export const revalidate = 0;

export default async function ClientsPage() {
  const clients = await dbFind('clients', { isPublished: true });

  return (
    <div className="py-16 sm:py-24 bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
            PROUD PARTNERSHIPS
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-[#071957] tracking-tight leading-tight">
            Brands We&apos;ve Had the Pleasure of Working With.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            We value genuine relationships and tangible creative outcomes. Below are real businesses and entrepreneurs who trust Frequent Posters for their visual branding and social media execution.
          </p>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients && clients.length > 0 ? (
            clients.map((client, idx) => (
              <div
                key={client._id || idx}
                className="bg-[#F5F8FF] border border-slate-200/90 rounded-3xl p-8 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-16 sm:h-20 flex items-center justify-start mb-6">
                    {getClientLogo(client) ? (
                      <img
                        src={getClientLogo(client)}
                        alt={`${client.name} official logo`}
                        className="max-h-full max-w-[240px] object-contain drop-shadow-sm"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#2855CE] font-black text-xl shadow-sm">
                        {client.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-extrabold text-[#071957] mb-2">
                    {client.name}
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {client.description || 'Valued brand partner collaborating with Frequent Posters.'}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>Verified Client</span>
                  <span className="text-[#36C6A0]">● Active Engagement</span>
                </div>
              </div>
            ))
          ) : null}
        </div>
      </div>

      {/* CTA Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-r from-[#071957] to-[#2855CE] rounded-3xl p-10 text-white text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black mb-3">
            Want your brand featured among our trusted clients?
          </h3>
          <p className="text-sm text-blue-100 max-w-xl mx-auto mb-6">
            Let&apos;s build an unforgettable visual presence tailored specifically for your target audience.
          </p>
          <Link
            href="/contact"
            className="brand-gradient text-white font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-lg inline-flex items-center gap-2"
          >
            <span>Start Your Collaboration</span>
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

