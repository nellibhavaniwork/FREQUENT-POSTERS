'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, X, Star, Loader2 } from 'lucide-react';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '../../../../lib/alerts.js';

export default function TestimonialsCMSClient({ initialTestimonials }) {
  const router = useRouter();
  const [reviews, setReviews] = useState(initialTestimonials || []);
  const [editingItem, setEditingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    company: '',
    designation: '',
    content: '',
    rating: 5,
    order: 0,
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      name: '',
      company: '',
      designation: '',
      content: '',
      rating: 5,
      order: reviews.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (r) => {
    setEditingItem(r);
    setForm({
      name: r.name,
      company: r.company || '',
      designation: r.designation || '',
      content: r.content || '',
      rating: r.rating || 5,
      order: r.order || 0,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (editingItem) {
        const res = await fetch(`/api/admin/testimonials/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const updated = await res.json();
        setReviews(reviews.map((i) => (i._id === editingItem._id ? updated : i)));
        showSuccessAlert('Review Updated', `${form.name}'s testimonial has been saved.`);
      } else {
        const res = await fetch('/api/admin/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const created = await res.json();
        setReviews([...reviews, created]);
        showSuccessAlert('Review Added', `New testimonial from ${form.name} added.`);
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
    const confirmed = await showConfirmAlert(`Delete review by ${name || 'client'}?`, 'This testimonial will be removed from your website.');
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      setReviews(reviews.filter((r) => r._id !== id));
      showSuccessAlert('Review Deleted');
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
          <h1 className="text-2xl font-black text-[#071957]">Client Testimonials</h1>
          <p className="text-xs text-slate-500">
            Publish authentic client stories and satisfaction ratings.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="brand-gradient text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-white border border-slate-200 rounded-2xl p-6 card-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(r.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic mb-4 leading-relaxed">&ldquo;{r.content}&rdquo;</p>
              <h4 className="font-extrabold text-[#071957] text-sm">{r.name}</h4>
              <p className="text-[11px] text-slate-400">{r.designation} • {r.company}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(r)}
                disabled={loading || deletingId === r._id}
                className="p-1.5 text-blue-600 hover:bg-slate-50 rounded-lg disabled:opacity-50"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(r._id, r.name)}
                disabled={loading || deletingId === r._id}
                className="p-1.5 text-red-600 hover:bg-slate-50 rounded-lg disabled:opacity-50"
              >
                {deletingId === r._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              </button>
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
              {editingItem ? 'Edit Review' : 'Add Testimonial'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">Client Name *</label>
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
                  <label className="text-xs font-extrabold text-[#071957] block mb-1">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#071957] block mb-1">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">Testimonial Content *</label>
                <textarea
                  rows={4}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
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
                  <span>{loading ? 'Saving...' : 'Save Review'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

