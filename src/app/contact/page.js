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
    <div className="py-16 sm:py-24 bg-transparent">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <span
            className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2 animate-mask-rise"
            style={{ animationDelay: '80ms' }}
          >
            START YOUR CONVERSATION
          </span>
          <h1
            className="text-4xl sm:text-6xl font-black text-[#071957] tracking-tight leading-tight animate-mask-rise"
            style={{ animationDelay: '180ms' }}
          >
            Have an Idea? <br />
            <span className="brand-gradient-text">Let&apos;s Make It Happen.</span>
          </h1>
          <p
            className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed animate-mask-rise"
            style={{ animationDelay: '280ms' }}
          >
            Whether you need a fresh brand identity, monthly social media creatives, a done-for-you business online setup, or practical training, we are here to help your business stand out.
          </p>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-mask-rise"
        style={{ animationDelay: '380ms' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/80 backdrop-blur-md border border-slate-200/90 rounded-3xl p-8 space-y-6 card-shadow">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2855CE] block mb-1">
                  DIRECT CONTACT
                </span>
                <h3 className="text-2xl font-black text-[#071957]">
                  Studio Direct Contact
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2855CE] flex items-center justify-center shrink-0">
                    <HiOutlineMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                      Location
                    </span>
                    <span className="font-extrabold text-[#071957] text-sm">
                      {settings?.location || 'Hyderabad, Telangana, India'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2855CE] flex items-center justify-center shrink-0">
                    <HiOutlinePhone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                      Direct Calling Phone
                    </span>
                    <a
                      href={`tel:${(settings?.phone || '+91 7780271948').replace(/\s+/g, '')}`}
                      className="font-extrabold text-[#071957] text-sm hover:text-[#2855CE] transition-colors"
                    >
                      {settings?.phone || '+91 7780271948'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                      WhatsApp Messaging
                    </span>
                    <a
                      href={`https://wa.me/${(settings?.whatsapp || '917780271948').replace(/\D/g, '')}?text=Hi%20Frequent%20Posters,%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-extrabold text-[#071957] text-sm hover:text-[#25D366] transition-colors"
                    >
                      {settings?.whatsapp || settings?.phone || '+91 7780271948'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2855CE] flex items-center justify-center shrink-0">
                    <HiOutlineEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${settings?.email || 'frequentposters@gmail.com'}`}
                      className="font-extrabold text-[#071957] text-sm hover:text-[#2855CE] transition-colors"
                    >
                      {settings?.email || 'frequentposters@gmail.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-pink-50 text-[#E1306C] flex items-center justify-center shrink-0">
                    <FaInstagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                      Instagram Studio
                    </span>
                    <a
                      href="https://instagram.com/frequentposters"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-extrabold text-[#071957] text-sm hover:text-[#2855CE] transition-colors"
                    >
                      {settings?.instagram || '@frequentposters'}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Box */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${(settings?.whatsapp || '917780271948').replace(/\D/g, '')}?text=Hi%20Frequent%20Posters,%20I%20would%20like%20to%20discuss%20my%20branding%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs py-4 px-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all"
                >
                  <FaWhatsapp className="w-5 h-5 text-white" />
                  <span>Instant WhatsApp Chat ({settings?.whatsapp || settings?.phone || '+91 7780271948'})</span>
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
