'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, X, Loader2 } from 'lucide-react';
import CloudinaryUploader from '../../../../components/admin/CloudinaryUploader.js';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '../../../../lib/alerts.js';

export default function BlogCMSClient({ initialBlogs }) {
  const router = useRouter();
  const [blogs, setBlogs] = useState(initialBlogs || []);
  const [editingItem, setEditingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Branding',
    summary: '',
    content: '',
    readTime: '5 min read',
    status: 'draft',
    featuredImage: '',
    featuredImagePublicId: '',
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      title: '',
      category: 'Branding',
      summary: '',
      content: '',
      readTime: '5 min read',
      status: 'draft',
      featuredImage: '',
      featuredImagePublicId: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (b) => {
    setEditingItem(b);
    setForm({
      title: b.title,
      category: b.category || 'Branding',
      summary: b.summary || '',
      content: b.content || '',
      readTime: b.readTime || '5 min read',
      status: b.status || 'draft',
      featuredImage: b.featuredImage || '',
      featuredImagePublicId: b.featuredImagePublicId || '',
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const payload = {
      ...form,
      slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    try {
      if (editingItem) {
        const res = await fetch(`/api/admin/blog/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        setBlogs(blogs.map((i) => (i._id === editingItem._id ? updated : i)));
        showSuccessAlert('Post Updated', `${form.title} has been saved.`);
      } else {
        const res = await fetch('/api/admin/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setBlogs([...blogs, created]);
        showSuccessAlert('Post Created', `${form.title} has been added.`);
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
    const confirmed = await showConfirmAlert(`Delete ${title || 'article'}?`, 'This post will be deleted permanently.');
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      setBlogs(blogs.filter((b) => b._id !== id));
      showSuccessAlert('Article Deleted');
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
          <h1 className="text-2xl font-black text-[#071957]">Blog & Insights</h1>
          <p className="text-xs text-slate-500">
            Publish educational articles, marketing guides, and design tips.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="brand-gradient text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-[#071957] font-extrabold uppercase">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Reading Time</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {blogs.map((b) => (
              <tr key={b._id} className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-[#071957] max-w-xs">{b.title}</td>
                <td className="p-4">{b.category}</td>
                <td className="p-4 text-slate-400">{b.readTime}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      b.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(b)}
                    disabled={loading || deletingId === b._id}
                    className="p-1.5 text-blue-600 hover:bg-slate-50 rounded-lg disabled:opacity-50"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(b._id, b.title)}
                    disabled={loading || deletingId === b._id}
                    className="p-1.5 text-red-600 hover:bg-slate-50 rounded-lg disabled:opacity-50"
                  >
                    {deletingId === b._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
              {editingItem ? 'Edit Article' : 'Compose Blog Article'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-extrabold text-[#071957] block mb-1">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#071957] block mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">Summary / Excerpt</label>
                <textarea
                  rows={2}
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">Article Content</label>
                <textarea
                  rows={6}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Write comprehensive design insights..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <CloudinaryUploader
                label="Cover Image (Cloudinary)"
                currentImageUrl={form.featuredImage}
                onUploadComplete={({ url, publicId }) =>
                  setForm({ ...form, featuredImage: url, featuredImagePublicId: publicId })
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
                  <span>{loading ? 'Saving...' : 'Save Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

