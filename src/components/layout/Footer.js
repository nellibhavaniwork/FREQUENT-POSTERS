'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiArrowUpRight,
  HiHeart,
} from 'react-icons/hi2';
import { FaInstagram, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="relative z-20 bg-[#06143D] text-white pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block shrink-0">
              <img
                src="/logo-white.png"
                alt="Frequent Posters Logo"
                className="h-10 w-auto object-contain transition-transform duration-200 hover:scale-[1.02]"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium creative design, branding and digital solutions based in Hyderabad. We transform ideas into unforgettable visual identities and hands-on business growth.
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Founder: Nelli Bhavani
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/founder" className="hover:text-white transition-colors text-teal-300 font-bold">
                  Meet the Founder
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Portfolio &amp; Work
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="hover:text-white transition-colors">
                  Workshops &amp; Pricing
                </Link>
              </li>
              <li>
                <Link href="/learn-with-us" className="hover:text-white transition-colors">
                  Learn With Us (Academy)
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers &amp; Internships
                </Link>
              </li>
              <li>
                <Link href="/clients" className="hover:text-white transition-colors">
                  Our Clients
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog &amp; Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <HiOutlineMapPin className="w-5 h-5 text-[#36C6A0] shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlinePhone className="w-5 h-5 text-[#36C6A0] shrink-0" />
                <a href="tel:+917780271948" className="hover:text-white transition-colors">
                  +91 7780271948
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FaWhatsapp className="w-5 h-5 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/917780271948"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +91 7780271948
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlineEnvelope className="w-5 h-5 text-[#36C6A0] shrink-0" />
                <a
                  href="mailto:frequentposters@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  frequentposters@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Business Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-2">
              Follow Our Work
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stay inspired with daily brand strategies, carousels, and creative case studies.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/frequentposters"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 hover:border-transparent transition-all"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/917780271948"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#25D366] hover:border-transparent transition-all"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0077b5] hover:border-transparent transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
            <div className="pt-2">
              <Link
                href="/admin/login"
                className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
              >
                <span>Admin CMS Portal</span>
                <HiArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Frequent Posters. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <HiHeart className="w-3.5 h-3.5 text-rose-500 inline" />
            <span>for brands impossible to ignore</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
