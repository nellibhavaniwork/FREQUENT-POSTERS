'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Lock, User, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import CloudinaryUploader from '../../../../components/admin/CloudinaryUploader.js';
import HeroCardsManager from '../../../../components/admin/HeroCardsManager.js';
import { showSuccessAlert, showErrorAlert } from '../../../../lib/alerts.js';

export default function SettingsCMSClient({ initialSettings, adminEmail }) {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings || {});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Password change state
  const [pwdData, setPwdData] = useState({
    currentPassword: '',
    newPassword: '',
    newEmail: adminEmail || '',
  });
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [pwdError, setPwdError] = useState('');

  const handleSettingsSave = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const res = await fetch(`/api/admin/settings/${settings._id || 'default'}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to update website settings');
      showSuccessAlert('Settings Saved', 'Website configuration updated across public pages.');
      setSuccess('Website settings updated successfully! Public pages updated.');
      router.refresh();
    } catch (err) {
      showErrorAlert('Update Failed', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwdLoading(true);
    setPwdSuccess('');
    setPwdError('');

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pwdData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update credentials');

      setPwdSuccess('Credentials updated successfully!');
      setPwdData({ ...pwdData, currentPassword: '', newPassword: '' });
    } catch (err) {
      setPwdError(err.message);
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-[#071957]">Website & Brand Settings</h1>
        <p className="text-xs text-slate-500">
          Modify contact details, founder information, and hero typography live on the public website.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. General & Contact Settings */}
      <form onSubmit={handleSettingsSave} className="bg-white border border-slate-200 rounded-3xl p-8 card-shadow space-y-6">
        <h2 className="text-lg font-black text-[#071957] border-b border-slate-100 pb-3">
          1. Brand & Contact Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-extrabold text-[#071957] block mb-1">Company Name</label>
            <input
              type="text"
              value={settings.companyName || ''}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-[#071957] block mb-1">Tagline</label>
            <input
              type="text"
              value={settings.tagline || ''}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-extrabold text-[#071957] block mb-1">Direct Phone Number</label>
            <input
              type="text"
              value={settings.phone || ''}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
              placeholder="+91 7780271948"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-[#071957] block mb-1">WhatsApp Number</label>
            <input
              type="text"
              value={settings.whatsapp || ''}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
              placeholder="+91 7780271948"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-[#071957] block mb-1">Public Email</label>
            <input
              type="email"
              value={settings.email || ''}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-extrabold text-[#071957] block mb-1">Physical Location</label>
            <input
              type="text"
              value={settings.location || ''}
              onChange={(e) => setSettings({ ...settings, location: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-[#071957] block mb-1">Instagram Handle</label>
            <input
              type="text"
              value={settings.instagram || ''}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
            />
          </div>
        </div>

        {/* 2. Founder Section Settings */}
        <h2 className="text-lg font-black text-[#071957] border-b border-slate-100 pb-3 pt-4">
          2. Founder Profile
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-extrabold text-[#071957] block mb-1">Founder Name</label>
            <input
              type="text"
              value={settings.founderName || ''}
              onChange={(e) => setSettings({ ...settings, founderName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-[#071957] block mb-1">Founder Title</label>
            <input
              type="text"
              value={settings.founderTitle || ''}
              onChange={(e) => setSettings({ ...settings, founderTitle: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-extrabold text-[#071957] block mb-1">Founder Quote / Biography</label>
          <textarea
            rows={3}
            value={settings.founderBio || ''}
            onChange={(e) => setSettings({ ...settings, founderBio: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
          />
        </div>

        <CloudinaryUploader
          label="Founder Photograph (Cloudinary)"
          currentImageUrl={settings.founderImage}
          onUploadComplete={({ url, publicId }) =>
            setSettings({ ...settings, founderImage: url, founderImagePublicId: publicId })
          }
        />

        {/* 3. Hero Section Copy */}
        <h2 className="text-lg font-black text-[#071957] border-b border-slate-100 pb-3 pt-4">
          3. Homepage Hero Section
        </h2>

        <div>
          <label className="text-xs font-extrabold text-[#071957] block mb-1">Hero Eyebrow</label>
          <input
            type="text"
            value={settings.heroEyebrow || ''}
            onChange={(e) => setSettings({ ...settings, heroEyebrow: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
          />
        </div>

        <div>
          <label className="text-xs font-extrabold text-[#071957] block mb-1">Main Headline</label>
          <input
            type="text"
            value={settings.heroHeading || ''}
            onChange={(e) => setSettings({ ...settings, heroHeading: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
          />
        </div>

        <div>
          <label className="text-xs font-extrabold text-[#071957] block mb-1">Hero Description</label>
          <textarea
            rows={3}
            value={settings.heroDescription || ''}
            onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
          />
        </div>

        {/* 4. Hero Interactive Card Stack */}
        <div className="pt-4 border-t border-slate-100">
          <HeroCardsManager
            cards={settings.heroStackCards || []}
            onChange={(newCards) => setSettings({ ...settings, heroStackCards: newCards })}
            layout={settings.heroStackLayout || 'pile'}
            onLayoutChange={(newLayout) => setSettings({ ...settings, heroStackLayout: newLayout })}
            autoplay={settings.heroStackAutoplay !== false}
            onAutoplayChange={(newAutoplay) => setSettings({ ...settings, heroStackAutoplay: newAutoplay })}
            autoplayDelay={settings.heroStackDelay || 2500}
            onDelayChange={(newDelay) => setSettings({ ...settings, heroStackDelay: newDelay })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="brand-gradient text-white text-xs font-extrabold px-8 py-3.5 rounded-xl shadow-md disabled:opacity-60 flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{loading ? 'Saving Settings...' : 'Save Website Settings & Hero Cards'}</span>
        </button>
      </form>

      {/* 5. Admin Security & Credentials Form */}
      <form onSubmit={handlePasswordChange} className="bg-white border border-slate-200 rounded-3xl p-8 card-shadow space-y-5">
        <h2 className="text-lg font-black text-[#071957] border-b border-slate-100 pb-3">
          5. Admin Security & Credentials
        </h2>

        {pwdSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            {pwdSuccess}
          </div>
        )}

        {pwdError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
            {pwdError}
          </div>
        )}

        <div>
          <label className="text-xs font-extrabold text-[#071957] block mb-1">Admin Email</label>
          <input
            type="email"
            value={pwdData.newEmail}
            onChange={(e) => setPwdData({ ...pwdData, newEmail: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-extrabold text-[#071957] block mb-1">
              Current Password *
            </label>
            <input
              type="password"
              required
              value={pwdData.currentPassword}
              onChange={(e) => setPwdData({ ...pwdData, currentPassword: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-[#071957] block mb-1">
              New Password (optional)
            </label>
            <input
              type="password"
              placeholder="Leave blank to keep same"
              value={pwdData.newPassword}
              onChange={(e) => setPwdData({ ...pwdData, newPassword: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={pwdLoading}
          className="bg-[#071957] text-white text-xs font-extrabold px-6 py-3 rounded-xl hover:bg-[#05123d] transition-colors flex items-center gap-2"
        >
          <Lock className="w-4 h-4" />
          <span>{pwdLoading ? 'Updating...' : 'Update Admin Credentials'}</span>
        </button>
      </form>
    </div>
  );
}

