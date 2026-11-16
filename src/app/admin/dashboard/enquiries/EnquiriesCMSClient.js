'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Phone, Mail, CheckCircle2, Clock } from 'lucide-react';

export default function EnquiriesCMSClient({ initialEnquiries }) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState(initialEnquiries || []);
  const [filter, setFilter] = useState('all');

  const filtered =
    filter === 'all' ? enquiries : enquiries.filter((e) => e.status === filter);

  const handleStatusChange = async (id, status) => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setEnquiries(
        enquiries.map((e) => (e._id === id ? { ...e, status } : e))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      setEnquiries(enquiries.filter((e) => e._id !== id));
      router.refresh();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#071957]">Client Enquiries & Leads</h1>
          <p className="text-xs text-slate-500">
            Real-time contact submissions and WhatsApp chat leads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['all', 'new', 'in_progress', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                filter === st
                  ? 'bg-[#071957] text-white shadow'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((enq) => (
          <div
            key={enq._id}
            className="bg-white border border-slate-200 rounded-2xl p-6 card-shadow flex flex-col sm:flex-row sm:items-start justify-between gap-6"
          >
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <h3 className="font-extrabold text-base text-[#071957]">{enq.name}</h3>
                {enq.businessName && (
                  <span className="text-xs text-slate-500 font-semibold">
                    ({enq.businessName})
                  </span>
                )}
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    enq.status === 'new'
                      ? 'bg-blue-50 text-[#2855CE]'
                      : enq.status === 'in_progress'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {enq.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {enq.whatsappNumber}
                </span>
                {enq.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {enq.email}
                  </span>
                )}
                <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
                  {enq.service}
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                <p className="font-semibold text-slate-400 text-[10px] uppercase mb-1">
                  Requirement:
                </p>
                {enq.requirement}
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-2 shrink-0">
              <a
                href={`https://wa.me/${enq.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0dbf83] hover:bg-[#0aa672] text-white text-xs font-extrabold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Chat on WhatsApp</span>
              </a>

              <select
                value={enq.status}
                onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-2.5 py-1.5 text-slate-700"
              >
                <option value="new">Mark New</option>
                <option value="in_progress">Mark In Progress</option>
                <option value="completed">Mark Completed</option>
              </select>

              <button
                onClick={() => handleDelete(enq._id)}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 pt-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center py-12 text-xs text-slate-400">No enquiries found.</p>
        )}
      </div>
    </div>
  );
}

