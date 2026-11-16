'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  HiOutlineHome,
  HiOutlinePaintBrush,
  HiOutlineBriefcase,
  HiOutlineUsers,
  HiOutlineCreditCard,
  HiOutlineStar,
  HiOutlineDocumentText,
  HiOutlineInbox,
  HiOutlineCog6Tooth,
  HiArrowRightOnRectangle,
  HiBars3,
  HiXMark,
  HiArrowTopRightOnSquare,
} from 'react-icons/hi2';

export default function AdminSidebar({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard Overview', href: '/admin/dashboard', icon: HiOutlineHome },
    { name: 'Services Management', href: '/admin/dashboard/services', icon: HiOutlinePaintBrush },
    { name: 'Portfolio Projects', href: '/admin/dashboard/portfolio', icon: HiOutlineBriefcase },
    { name: 'Clients Showcase', href: '/admin/dashboard/clients', icon: HiOutlineUsers },
    { name: 'Packages & Pricing', href: '/admin/dashboard/pricing', icon: HiOutlineCreditCard },
    { name: 'Client Reviews', href: '/admin/dashboard/testimonials', icon: HiOutlineStar },
    { name: 'Blog & Insights', href: '/admin/dashboard/blog', icon: HiOutlineDocumentText },
    { name: 'Enquiries & Leads', href: '/admin/dashboard/enquiries', icon: HiOutlineInbox },
    { name: 'Website Settings', href: '/admin/dashboard/settings', icon: HiOutlineCog6Tooth },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-72 bg-[#06143D] text-white flex-col justify-between p-6 shrink-0 border-r border-slate-800">
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-2 inline-block">
            <img
              src="/logo.png"
              alt="Frequent Posters Logo"
              className="h-9 w-auto object-contain"
            />
          </div>

          <div className="pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block px-3 mb-2">
              Management CMS
            </span>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#2855CE] text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="space-y-3 pt-6 border-t border-slate-800">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            <span>View Live Website</span>
            <HiArrowTopRightOnSquare className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <HiArrowRightOnRectangle className="w-4 h-4 shrink-0" />
            <span>Logout CMS</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <header className="lg:hidden bg-[#06143D] text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="bg-white rounded-lg p-1.5 inline-block">
            <img src="/logo.png" alt="Logo" className="h-6 w-auto object-contain" />
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300"
          >
            {mobileOpen ? <HiXMark className="w-5 h-5" /> : <HiBars3 className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#06143D] border-b border-slate-800 p-4 space-y-2 text-white">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                    isActive ? 'bg-[#2855CE] text-white' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <Link href="/" target="_blank" className="text-xs text-slate-400">
                Live Website ↗
              </Link>
              <button onClick={handleLogout} className="text-xs text-rose-400 font-bold">
                Logout
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
