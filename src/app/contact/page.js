import { Suspense } from 'react';
import { dbFindOne } from '../../lib/dbService.js';
import ContactForm from './ContactForm.js';
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope } from 'react-icons/hi2';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';

export const metadata = {
  title: 'Contact Us | Frequent Posters — Hyderabad Creative Studio',
  description:
    'Have an idea? Let’s make it happen. Reach out to Frequent Posters via enquiry form, direct phone or WhatsApp at +91 7780271948.',
};

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await dbFindOne('settings');

  return (
    <div className="py-16 sm:py-24 bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
            START YOUR CONVERSATION
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-[#071957] tracking-tight leading-tight">
            Have an Idea? <br />
            <span className="brand-gradient-text">Let&apos;s Make It Happen.</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Whether you need a fresh brand identity, monthly social media creatives, a done-for-you business online setup, or practical training, we are here to help your business stand out.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F5F8FF] border border-blue-100 rounded-3xl p-8 space-y-6 card-shadow">
              <h3 className="text-xl font-black text-[#071957]">
                Studio Direct Contact
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    <HiOutlineMapPin className="w-5 h-5 text-[#2855CE]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">
                      Location
                    </span>
                    <span className="font-extrabold text-[#071957]">
                      {settings?.location || 'Hyderabad, Telangana, India'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    <HiOutlinePhone className="w-5 h-5 text-[#2855CE]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">
                      Phone &amp; WhatsApp
                    </span>
                    <a
                      href="tel:+917780271948"
                      className="font-extrabold text-[#071957] hover:text-[#2855CE] transition-colors"
                    >
                      {settings?.phone || '+91 7780271948'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    <HiOutlineEnvelope className="w-5 h-5 text-[#2855CE]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">
                      Email
                    </span>
                    <a
                      href="mailto:frequentposters@gmail.com"
                      className="font-extrabold text-[#071957] hover:text-[#2855CE] transition-colors"
                    >
                      {settings?.email || 'frequentposters@gmail.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    <FaInstagram className="w-5 h-5 text-[#2855CE]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">
                      Instagram
                    </span>
                    <a
                      href="https://instagram.com/frequentposters"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-extrabold text-[#071957] hover:text-[#2855CE] transition-colors"
                    >
                      {settings?.instagram || '@frequentposters'}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Box */}
              <div className="pt-4 border-t border-slate-200">
                <a
                  href="https://wa.me/917780271948?text=Hi%20Frequent%20Posters,%20I%20would%20like%20to%20discuss%20my%20branding%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <FaWhatsapp className="w-5 h-5 text-white" />
                  <span>Instant WhatsApp Chat (+91 7780271948)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
