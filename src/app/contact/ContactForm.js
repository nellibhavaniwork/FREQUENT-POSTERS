'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { HiPaperAirplane, HiCheckCircle, HiExclamationCircle, HiPhone } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get('service') || 'General Enquiry';
  const prefilledReq = searchParams.get('requirement') || '';

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    whatsappNumber: '',
    email: '',
    service: prefilledService,
    requirement: prefilledReq,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSuccess(true);
      setFormData({
        name: '',
        businessName: '',
        whatsappNumber: '',
        email: '',
        service: 'General Enquiry',
        requirement: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-[#F5F8FF] border border-blue-200 rounded-3xl p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <HiCheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black text-[#071957]">
          Thank You! Your Enquiry Has Been Sent.
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Nelli Bhavani & the Frequent Posters team will review your requirements and reach out on WhatsApp/phone promptly.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setSuccess(false)}
            className="brand-gradient text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#F5F8FF] border border-slate-200/90 rounded-3xl p-8 sm:p-10 space-y-5 card-shadow">
      <h3 className="text-xl font-black text-[#071957] mb-2">
        Project Details & Requirements
      </h3>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2">
          <HiExclamationCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-extrabold text-[#071957] block mb-1">
            Your Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Rahul Sharma"
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#071957] focus:outline-none focus:ring-2 focus:ring-[#2855CE]"
          />
        </div>

        <div>
          <label className="text-xs font-extrabold text-[#071957] block mb-1">
            Business / Brand Name
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g. Sharma Textiles"
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#071957] focus:outline-none focus:ring-2 focus:ring-[#2855CE]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-extrabold text-[#071957] block mb-1">
            WhatsApp / Mobile Number *
          </label>
          <input
            type="tel"
            name="whatsappNumber"
            required
            value={formData.whatsappNumber}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#071957] focus:outline-none focus:ring-2 focus:ring-[#2855CE]"
          />
        </div>

        <div>
          <label className="text-xs font-extrabold text-[#071957] block mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@domain.com"
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#071957] focus:outline-none focus:ring-2 focus:ring-[#2855CE]"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-extrabold text-[#071957] block mb-1">
          Select Service Required *
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#071957] focus:outline-none focus:ring-2 focus:ring-[#2855CE]"
        >
          <option value="General Enquiry">General Creative Consultation</option>
          <option value="Brand Identity & Logo Design">Brand Identity & Logo Design</option>
          <option value="Social Media Design & Management">Social Media Design & Management</option>
          <option value="Digital Business Setup">Digital Business Setup (Google Map/Meta)</option>
          <option value="Marketing & Promotional Design">Marketing & Promotional Design</option>
          <option value="Business & Corporate Design">Business Profiles & Company Presentations</option>
          <option value="Social Media Workshops">Live Zoom Workshops (Academy)</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-extrabold text-[#071957] block mb-1">
          Tell us about your project & timeline *
        </label>
        <textarea
          name="requirement"
          required
          rows={4}
          value={formData.requirement}
          onChange={handleChange}
          placeholder="Briefly describe what you would like to achieve, target platforms, or specific questions..."
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#071957] focus:outline-none focus:ring-2 focus:ring-[#2855CE]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full brand-gradient text-white font-extrabold text-sm py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <span>Sending Enquiry...</span>
        ) : (
          <>
            <span>Submit Project Enquiry</span>
            <HiPaperAirplane className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

