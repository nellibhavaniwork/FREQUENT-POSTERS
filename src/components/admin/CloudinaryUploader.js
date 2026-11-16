'use client';

import { useState } from 'react';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';

export default function CloudinaryUploader({ onUploadComplete, currentImageUrl, label = 'Upload Image' }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(currentImageUrl || '');
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit.');
      return;
    }

    setLoading(true);
    setError('');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const base64Data = reader.result;
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64Data, folder: 'frequent_posters' }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Upload failed');
        }

        setPreview(data.url);
        if (onUploadComplete) {
          onUploadComplete({ url: data.url, publicId: data.publicId });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-extrabold text-[#071957] block">{label}</label>

      {error && <p className="text-xs text-red-500 font-bold">{error}</p>}

      <div className="flex items-center gap-4">
        {preview ? (
          <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
            <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => {
                setPreview('');
                if (onUploadComplete) onUploadComplete({ url: '', publicId: '' });
              }}
              className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 shrink-0">
            <ImageIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold mt-1">No Image</span>
          </div>
        )}

        <div className="flex-1">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-extrabold text-[#071957] transition-colors shadow-sm">
            <Upload className="w-4 h-4 text-[#2855CE]" />
            <span>{loading ? 'Uploading to Cloudinary...' : 'Choose Image File'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
              className="hidden"
            />
          </label>
          <p className="text-[10px] text-slate-400 mt-1">
            Delivered & optimized via Cloudinary CDN. Max 5MB.
          </p>
        </div>
      </div>
    </div>
  );
}

