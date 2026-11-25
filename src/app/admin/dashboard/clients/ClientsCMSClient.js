'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, X, Loader2 } from 'lucide-react';
import CloudinaryUploader from '../../../../components/admin/CloudinaryUploader.js';
import { getClientLogo } from '../../../../lib/clientLogoHelper.js';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '../../../../lib/alerts.js';

export default function ClientsCMSClient({ initialClients }) {
  const router = useRouter();
  const [clients, setClients] = useState(initialClients || []);
  const [editingItem, setEditingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    websiteUrl: '',
    logoUrl: '',
    logoPublicId: '',
    order: 0,
    isPublished: true,
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      name: '',
      description: '',
      websiteUrl: '',
      logoUrl: '',
      logoPublicId: '',
      order: clients.length + 1,
      isPublished: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (c) => {
    setEditingItem(c);
    setForm({
      name: c.name,
      description: c.description || '',
      websiteUrl: c.websiteUrl || '',
      logoUrl: c.logoUrl || '',
      logoPublicId: c.logoPublicId || '',
      order: c.order || 0,
      isPublished: c.isPublished !== false,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (editingItem) {
        const res = await fetch(`/api/admin/clients/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const updated = await res.json();
        setClients(clients.map((i) => (i._id === editingItem._id ? updated : i)));
        showSuccessAlert('Client Updated', `${form.name} details have been saved.`);
      } else {
        const res = await fetch('/api/admin/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const created = await res.json();
        setClients([...clients, created]);
        showSuccessAlert('Client Added', `${form.name} has been added successfully.`);
      }
      setModalOpen(false);
      router.refresh();
    } catch (err) {
      showErrorAlert('Operation Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (deletingId) return;
    const confirmed = await showConfirmAlert(`Delete ${name || 'Client'}?`, 'This client will be removed from your showcase.');
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await fetch(`/api/admin/clients/${id}`, { method: 'DELETE' });
      setClients(clients.filter((c) => c._id !== id));
      showSuccessAlert('Client Deleted');
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
          <h1 className="text-2xl font-black text-[#071957]">Clients Management</h1>
          <p className="text-xs text-slate-500">
            Manage genuine client logos, descriptions, and partnership orders.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="brand-gradient text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((c) => (
          <div
            key={c._id}
            className="bg-white border border-slate-200 rounded-2xl p-6 card-shadow flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 mb-4 overflow-hidden">
                {getClientLogo(c) ? (
                  <img
                    src={getClientLogo(c)}
                    alt={c.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-[#2855CE] font-black text-lg">
                    {c.name.charAt(0)}
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-[#071957] text-base mb-1">{c.name}</h3>
              <p className="text-xs text-slate-500 mb-4">{c.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold">Order: {c.order}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(c)}
                  disabled={loading || deletingId === c._id}
                  className="p-1.5 text-blue-600 hover:bg-slate-50 rounded-lg disabled:opacity-50"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(c._id, c.name)}
                  disabled={loading || deletingId === c._id}
                  className="p-1.5 text-red-600 hover:bg-slate-50 rounded-lg disabled:opacity-50"
                >
                  {deletingId === c._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
              {editingItem ? 'Edit Client' : 'Add New Client'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">
                  Client Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#071957] block mb-1">
                  Description / Industry
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g. Stage & show production specialists"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#071957]"
                />
              </div>

              <CloudinaryUploader
                label="Client Logo (Cloudinary Asset)"
                currentImageUrl={form.logoUrl}
                onUploadComplete={({ url, publicId }) =>
                  setForm({ ...form, logoUrl: url, logoPublicId: publicId })
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
                  <span>{loading ? 'Saving...' : 'Save Client'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

