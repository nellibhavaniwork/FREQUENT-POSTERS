'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, X, Loader2 } from 'lucide-react';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '../../../../lib/alerts.js';

export default function PricingCMSClient({ initialPricing }) {
  const router = useRouter();
  const [pricing, setPricing] = useState(initialPricing || []);
  const [editingItem, setEditingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    price: '',
    period: 'per session',
    description: '',
    features: '',
    ctaText: 'Register Now',
    ctaLink: '',
    isFeatured: false,
    order: 0,
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      name: '',
      price: '₹',
      period: 'per session',
      description: '',
      features: '',
      ctaText: 'Register Now',
      ctaLink: 'https://wa.me/917780271948',
      isFeatured: false,
      order: pricing.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingItem(p);
    setForm({
      name: p.name,
      price: p.price,
      period: p.period || 'per session',
      description: p.description || '',
      features: Array.isArray(p.features) ? p.features.join('\n') : '',
      ctaText: p.ctaText || 'Register Now',
      ctaLink: p.ctaLink || '',
      isFeatured: Boolean(p.isFeatured),
      order: p.order || 0,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const featuresArr = form.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      ...form,
      features: featuresArr,
    };

    try {
      if (editingItem) {
        const res = await fetch(`/api/admin/pricing/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        setPricing(pricing.map((i) => (i._id === editingItem._id ? updated : i)));
        showSuccessAlert('Workshop Updated', `${form.name} package saved.`);
      } else {
        const res = await fetch('/api/admin/pricing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setPricing([...pricing, created]);
        showSuccessAlert('Workshop Added', `${form.name} package created.`);
      }
      setModalOpen(false);
      router.refresh();
    } catch (err) {
      showErrorAlert('Save Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (deletingId) return;
    const confirmed = await showConfirmAlert(`Delete ${name || 'package'}?`, 'This workshop tier will be removed from your public website.');
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await fetch(`/api/admin/pricing/${id}`, { method: 'DELETE' });
      setPricing(pricing.filter((p) => p._id !== id));
      showSuccessAlert('Package Deleted');
      router.refresh();
    } catch (err) {
      showErrorAlert('Delete Failed', err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#071957]">Pricing & Packages</h1>
          <p className="text-xs text-slate-500">
            Control workshop fees, business setup tiers, and promotional CTA links.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="brand-gradient text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Package</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricing.map((p) => (
          <div
            key={p._id}
            className={`bg-white rounded-2xl p-6 border flex flex-col justify-between card-shadow ${
              p.isFeatured ? 'border-[#2855CE] ring-1 ring-[#2855CE]' : 'border-slate-200'
            }`}
          >
            <div>
              <span className="text-xs font-extrabold text-[#2855CE] uppercase">{p.name}</span>
              <div className="text-3xl font-black text-[#071957] my-2">{p.price}</div>
              <p className="text-xs text-slate-500 mb-4">{p.description}</p>
              <div className="space-y-1.5 border-t border-slate-100 pt-3">
                {p.features?.map((f, i) => (
                  <div key={i} className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5">
                    <span>✓</span> <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold">{p.period}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(p)}
                  disabled={loading || deletingId === p._id}
                  className="p-1.5 text-blue-600 hover:bg-slate-50 rounded-lg disabled:opacity-50"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(p._id, p.name)}
                  disabled={loading || deletingId === p._id}
                  className="p-1.5 text-red-600 hover:bg-slate-50 rounded-lg disabled:opacity-50"
                >
                  {deletingId === p._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

            <h2 className="text-xl font-black text-[#071957] mb-4">
              {editingItem ? 'Edit Package' : 'Create Pricing Package'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">
                  Package Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-extrabold text-[#071957] block mb-1">Price *</label>
                  <input
                    type="text"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#071957] block mb-1">Billing Period</label>
                  <input
                    type="text"
                    value={form.period}
                    onChange={(e) => setForm({ ...form, period: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">
                  Features Included (one per line)
                </label>
                <textarea
                  rows={4}
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-[#2855CE] rounded"
                />
                <label htmlFor="featuredCheck" className="text-xs font-bold text-[#071957]">
                  Mark as Popular / Featured Package
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="brand-gradient text-white text-xs font-extrabold px-6 py-2.5 rounded-xl shadow-md disabled:opacity-60 flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{loading ? 'Saving...' : 'Save Package'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

