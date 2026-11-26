import Link from 'next/link';
import { dbFind, dbFindOne } from '../../../lib/dbService.js';
import {
  Palette,
  Briefcase,
  Users,
  CreditCard,
  Star,
  FileText,
  Mail,
  ArrowRight,
  Clock,
  Sparkles,
  Layers,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardOverview() {
  const [services, portfolio, clients, pricing, testimonials, blogs, enquiries, settings] =
    await Promise.all([
      dbFind('services', {}),
      dbFind('portfolio', {}),
      dbFind('clients', {}),
      dbFind('pricing', {}),
      dbFind('testimonials', {}),
      dbFind('blog', {}),
      dbFind('enquiries', {}),
      dbFindOne('settings'),
    ]);

  const stats = [
    { name: 'Total Services', count: services.length, href: '/admin/dashboard/services', icon: Palette, color: 'text-blue-600 bg-blue-50' },
    { name: 'Portfolio Items', count: portfolio.length, href: '/admin/dashboard/portfolio', icon: Briefcase, color: 'text-purple-600 bg-purple-50' },
    { name: 'Featured Clients', count: clients.length, href: '/admin/dashboard/clients', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Pricing Packages', count: pricing.length, href: '/admin/dashboard/pricing', icon: CreditCard, color: 'text-amber-600 bg-amber-50' },
    { name: 'Testimonials', count: testimonials.length, href: '/admin/dashboard/testimonials', icon: Star, color: 'text-rose-600 bg-rose-50' },
    { name: 'Blog Articles', count: blogs.length, href: '/admin/dashboard/blog', icon: FileText, color: 'text-indigo-600 bg-indigo-50' },
    { name: 'Hero Stack Cards', count: settings?.heroStackCards?.length || 5, href: '/admin/dashboard/settings#hero-stack', icon: Layers, color: 'text-cyan-600 bg-cyan-50' },
    { name: 'Client Enquiries', count: enquiries.length, href: '/admin/dashboard/enquiries', icon: Mail, color: 'text-teal-600 bg-teal-50' },
  ];

  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Title & Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#071957] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Real-time management for Frequent Posters public content and inbound leads.
          </p>
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            MongoDB & CMS Online
          </span>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.name}
              href={s.href}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-[#071957]">{s.count}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-600 block">{s.name}</span>
                <span className="text-[10px] text-[#2855CE] font-extrabold flex items-center gap-1 mt-1">
                  Manage module <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries Preview */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-black text-[#071957]">
              Recent Inbound Enquiries
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Leads received through the website contact forms.
            </p>
          </div>
          <Link
            href="/admin/dashboard/enquiries"
            className="text-xs font-extrabold text-[#2855CE] hover:underline"
          >
            View All Enquiries
          </Link>
        </div>

        {recentEnquiries.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {recentEnquiries.map((enq) => (
              <div key={enq._id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#071957]">{enq.name}</span>
                    {enq.businessName && (
                      <span className="text-xs text-slate-500">({enq.businessName})</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>📱 {enq.whatsappNumber}</span>
                    {enq.email && <span>✉️ {enq.email}</span>}
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#2855CE] font-semibold">
                      {enq.service}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${enq.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-colors"
                  >
                    WhatsApp Reply
                  </a>
                  <span className="text-[10px] uppercase font-extrabold px-2 py-1 rounded bg-slate-100 text-slate-600">
                    {enq.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-6 text-center">No enquiries received yet.</p>
        )}
      </div>
    </div>
  );
}

