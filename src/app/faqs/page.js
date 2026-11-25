'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiPlus, HiMinus } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What services does Frequent Posters provide?',
      a: 'We provide end-to-end creative solutions: Brand Identity & Logo Design, Social Media Management, Digital Business Setup (Instagram, Google Maps, Meta Suite), Marketing & Advertising Creatives, Corporate Profiles, and Hands-on Live Training Workshops.',
    },
    {
      q: 'How do your Live Zoom Workshops work?',
      a: 'Our workshops are 100% live, interactive, and screen-shared via Zoom. You can choose between beginner-friendly group masterclasses or private 1-to-1 sessions with Bhavani, tailored specifically to your industry and brand speed.',
    },
    {
      q: 'Do I need design experience or technical skills to learn?',
      a: 'Not at all! Over 80% of our workshop learners have zero design background. We teach practical Canva skills, simple branding rules, and real-world tools that any business owner can comfortably use.',
    },
    {
      q: 'What is included in the Complete Business Setup package?',
      a: 'We create and configure your Instagram Business page, Facebook Business page, Google Business Profile with map pin, LinkedIn Company page, WhatsApp Business catalog & automated replies, plus starter branded avatars, banners, and 3 launch posts.',
    },
    {
      q: 'How long does a brand identity project usually take?',
      a: 'Standard brand identity & logo design packages typically take between 5 to 10 business days, with iterative review cycles and direct communication to ensure your brand personality shines through.',
    },
    {
      q: 'How can I discuss my specific brand requirements?',
      a: 'You can directly message us on WhatsApp or submit an enquiry on our Contact page. We usually review and respond within a few hours with clear timelines and customized options.',
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2855CE] block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#071957] tracking-tight">
            Got Questions? We Have Answers.
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Everything you need to know about our creative design services, workshops, deliverables, and partnership process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white card-shadow transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-extrabold text-[#071957] text-base hover:text-[#2855CE] transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#2855CE] text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {isOpen ? <HiMinus className="w-4 h-4" /> : <HiPlus className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-[#F5F8FF] border border-blue-100 rounded-3xl p-8 sm:p-10 text-center space-y-4">
          <h3 className="text-xl font-black text-[#071957]">Still have questions?</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Can&apos;t find what you&apos;re looking for? Chat directly with our team on WhatsApp for an immediate response.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/917780271948?text=Hi%20Frequent%20Posters,%20I%20have%20a%20question%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

