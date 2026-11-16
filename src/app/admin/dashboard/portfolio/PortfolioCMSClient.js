'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, X, ExternalLink } from 'lucide-react';
import CloudinaryUploader from '../../../../components/admin/CloudinaryUploader.js';

export default function PortfolioCMSClient({ initialPortfolio }) {
  const router = useRouter();
  const [items, setItems] = useState(initialPortfolio || []);
  const [editingItem, setEditingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Brand Identity',
    client: '',
    description: '',
    thumbnailUrl: '',
    thumbnailPublicId: '',
    order: 0,
    isPublished: true,
  });

  const categories = [
    'Brand Identity',
    'Social Media Creatives',
    'Marketing & Advertising',
    'Business Profiles & Presentations',
    'Digital Branding',
  ];

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      title: '',
      category: 'Brand Identity',
      client: '',
      description: '',
      thumbnailUrl: '',
      thumbnailPublicId: '',
      order: items.length + 1,
      isPublished: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingItem(p);
    setForm({
      title: p.title,
      category: p.category || 'Brand Identity',
      client: p.client || '',
      description: p.description || '',
      thumbnailUrl: p.thumbnailUrl || '',
      thumbnailPublicId: p.thumbnailPublicId || '',
      order: p.order || 0,
      isPublished: p.isPublished !== false,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.thumbnailUrl) {
      alert('Please upload or provide an image URL for the project thumbnail.');
      return;
    }
    setLoading(true);

    const payload = {
      ...form,
      slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    try {
      if (editingItem) {
        const res = await fetch(`/api/admin/portfolio/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        setItems(items.map((i) => (i._id === editingItem._id ? updated : i)));
      } else {
        const res = await fetch('/api/admin/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setItems([...items, created]);
      }
      setModalOpen(false);
      router.refresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this portfolio project?')) return;
    try {
      await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' });
      setItems(items.filter((i) => i._id !== id));
      router.refresh();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#071957]">Portfolio Projects</h1>
          <p className="text-xs text-slate-500">
            Showcase your agency work, categories, and Cloudinary visual assets.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="brand-gradient text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <div
            key={p._id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden card-shadow flex flex-col justify-between"
          >
            <div>
              <div className="h-44 w-full bg-slate-100 overflow-hidden relative">
                <img src={p.thumbnailUrl} alt={p.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[#071957] text-[10px] font-extrabold px-2.5 py-1 rounded">
                  {p.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-extrabold text-[#071957] text-sm mb-1">{p.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold">Order: {p.order}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(p)}
                  className="p-1.5 text-blue-600 hover:bg-white rounded-lg border border-slate-200"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="p-1.5 text-red-600 hover:bg-white rounded-lg border border-slate-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

            <h2 className="text-xl font-black text-[#071957] mb-4">
              {editingItem ? 'Edit Project' : 'Add New Portfolio Project'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">
                  Project Title *
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
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">
                  Client / Brand Name
                </label>
                <input
                  type="text"
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <CloudinaryUploader
                label="Portfolio Artwork / Cloudinary Asset"
                currentImageUrl={form.thumbnailUrl}
                onUploadComplete={({ url, publicId }) =>
                  setForm({ ...form, thumbnailUrl: url, thumbnailPublicId: publicId })
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
                  className="brand-gradient text-white text-xs font-extrabold px-6 py-2.5 rounded-xl shadow-md"
                >
                  {loading ? 'Saving...' : 'Save Portfolio Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

