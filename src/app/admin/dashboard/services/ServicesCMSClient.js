'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, CheckCircle2, X, Loader2 } from 'lucide-react';
import CloudinaryUploader from '../../../../components/admin/CloudinaryUploader.js';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '../../../../lib/alerts.js';

export default function ServicesCMSClient({ initialServices }) {
  const router = useRouter();
  const [services, setServices] = useState(initialServices || []);
  const [editingItem, setEditingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    tagline: '',
    description: '',
    deliverables: '',
    order: 0,
    imageUrl: '',
    imagePublicId: '',
    isPublished: true,
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      title: '',
      slug: '',
      tagline: '',
      description: '',
      deliverables: '',
      order: services.length + 1,
      imageUrl: '',
      imagePublicId: '',
      isPublished: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (s) => {
    setEditingItem(s);
    setForm({
      title: s.title,
      slug: s.slug,
      tagline: s.tagline || '',
      description: s.description || '',
      deliverables: Array.isArray(s.deliverables) ? s.deliverables.join('\n') : '',
      order: s.order || 0,
      imageUrl: s.imageUrl || '',
      imagePublicId: s.imagePublicId || '',
      isPublished: s.isPublished !== false,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const deliverablesArr = form.deliverables
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean);

    const payload = {
      ...form,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      deliverables: deliverablesArr,
    };

    try {
      if (editingItem) {
        const res = await fetch(`/api/admin/services/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        setServices(services.map((item) => (item._id === editingItem._id ? updated : item)));
        showSuccessAlert('Service Updated', `${form.title} has been saved.`);
      } else {
        const res = await fetch('/api/admin/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setServices([...services, created]);
        showSuccessAlert('Service Created', `${form.title} added successfully.`);
      }
      setModalOpen(false);
      router.refresh();
    } catch (err) {
      showErrorAlert('Save Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (deletingId) return;
    const confirmed = await showConfirmAlert(`Delete ${title || 'service'}?`, 'This service will be removed from your website.');
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      setServices(services.filter((s) => s._id !== id));
      showSuccessAlert('Service Deleted');
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
          <h1 className="text-2xl font-black text-[#071957]">Services Management</h1>
          <p className="text-xs text-slate-500">
            Control service descriptions, deliverables, and Cloudinary media assets.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="brand-gradient text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-[#071957] font-extrabold uppercase">
            <tr>
              <th className="p-4">Title & Tagline</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Order</th>
              <th className="p-4">Deliverables</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {services.map((s) => (
              <tr key={s._id} className="hover:bg-slate-50/50">
                <td className="p-4">
                  <span className="font-bold text-[#071957] block">{s.title}</span>
                  <span className="text-[11px] text-[#2855CE]">{s.tagline}</span>
                </td>
                <td className="p-4 text-slate-500">{s.slug}</td>
                <td className="p-4">{s.order}</td>
                <td className="p-4">{s.deliverables?.length || 0} items</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(s)}
                    disabled={loading || deletingId === s._id}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(s._id, s.title)}
                    disabled={loading || deletingId === s._id}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                  >
                    {deletingId === s._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

            <h2 className="text-xl font-black text-[#071957] mb-4">
              {editingItem ? 'Edit Service' : 'Create New Service'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="e.g. Be Recognized. Be Remembered."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">
                  Deliverables (one per line)
                </label>
                <textarea
                  rows={4}
                  value={form.deliverables}
                  onChange={(e) => setForm({ ...form, deliverables: e.target.value })}
                  placeholder="Custom Logo Variations&#10;Brand Style Guide&#10;Social Media Avatar Kit"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <CloudinaryUploader
                label="Service Illustration / Cloudinary Media"
                currentImageUrl={form.imageUrl}
                onUploadComplete={({ url, publicId }) =>
                  setForm({ ...form, imageUrl: url, imagePublicId: publicId })
                }
              />

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
                  <span>{loading ? 'Saving...' : 'Save Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

