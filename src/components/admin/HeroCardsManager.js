'use client';

import { useState } from 'react';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Upload,
  Link as LinkIcon,
  Layers,
  Sparkles,
  Eye,
  EyeOff,
  RotateCcw,
  ExternalLink,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import HeroStack from '../common/HeroStack';

const DEFAULT_PRESET_CARDS = [
  {
    url: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=600&auto=format',
    title: 'Brand Visual Identity',
  },
  {
    url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format',
    title: 'City Brand Identity',
  },
  {
    url: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=600&auto=format',
    title: 'Modern Architecture',
  },
  {
    url: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=600&auto=format',
    title: 'Creative Studio Assets',
  },
  {
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format',
    title: 'Digital Gradient Creatives',
  },
];

export default function HeroCardsManager({
  cards = [],
  onChange,
  layout = 'pile',
  onLayoutChange,
  autoplay = true,
  onAutoplayChange,
  autoplayDelay = 2500,
  onDelayChange,
}) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url'
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  // Normalize current cards
  const cardList = Array.isArray(cards) ? cards : [];

  // 1. Upload direct image file to Cloudinary
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds 5MB limit.');
      return;
    }

    setUploading(true);
    setUploadError('');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const base64Data = reader.result;
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64Data, folder: 'frequent_posters/hero_cards' }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Upload failed');
        }

        const newCard = {
          url: data.url,
          publicId: data.publicId || '',
          title: titleInput.trim() || `Card ${cardList.length + 1}`,
        };

        onChange?.([...cardList, newCard]);
        setTitleInput('');
        e.target.value = '';
      } catch (err) {
        setUploadError(err.message || 'Failed to upload image');
      } finally {
        setUploading(false);
      }
    };
  };

  // 2. Add via external/pasted Image URL
  const handleAddUrl = (e) => {
    e?.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    const newCard = {
      url: trimmed,
      title: titleInput.trim() || `Card ${cardList.length + 1}`,
      publicId: '',
    };

    onChange?.([...cardList, newCard]);
    setUrlInput('');
    setTitleInput('');
  };

  // 3. Delete card
  const handleDelete = (index) => {
    const next = cardList.filter((_, i) => i !== index);
    onChange?.(next);
  };

  // 4. Move card Up / Closer to front
  const handleMoveUp = (index) => {
    if (index === 0) return;
    const next = [...cardList];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    onChange?.(next);
  };

  // 5. Move card Down / Towards back
  const handleMoveDown = (index) => {
    if (index >= cardList.length - 1) return;
    const next = [...cardList];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    onChange?.(next);
  };

  // 6. Inline title update
  const handleTitleChange = (index, newTitle) => {
    const next = cardList.map((item, i) => {
      if (i === index) {
        return typeof item === 'string'
          ? { url: item, title: newTitle }
          : { ...item, title: newTitle };
      }
      return item;
    });
    onChange?.(next);
  };

  // 7. Reset to default samples
  const handleResetDefaults = () => {
    onChange?.(DEFAULT_PRESET_CARDS);
  };

  return (
    <div id="hero-stack" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#2855CE]" />
            <h2 className="text-lg font-black text-[#071957]">
              Hero Interactive Card Stack
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2855CE] text-[11px] font-black">
              {cardList.length} Cards
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage the interactive cards displayed on the homepage hero section. Drag, flick, or click to cycle.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
          >
            {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showPreview ? 'Hide Preview' : 'Live Preview'}</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            title="Reset to sample photography cards"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Live Preview Panel */}
      {showPreview && (
        <div className="bg-gradient-to-b from-[#f4f8ff] to-white border border-blue-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2855CE] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Live Interactive Component Preview
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">
              (Interactive: Drag, flick, or click)
            </span>
          </div>

          <div className="py-4">
            <HeroStack
              cards={cardList}
              layout={layout}
              autoplay={autoplay}
              autoplayDelay={autoplayDelay}
              className="py-2"
            />
          </div>
        </div>
      )}

      {/* Stack Animation & Layout Settings */}
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
        <h3 className="text-xs font-extrabold text-[#071957] uppercase tracking-wider mb-3">
          Animation & Layout Settings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Stack Layout Style
            </label>
            <select
              value={layout}
              onChange={(e) => onLayoutChange?.(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#071957]"
            >
              <option value="pile">Pile (Loose Scattered Photos - Recommended)</option>
              <option value="fan">Fan (Angled Corner Spread)</option>
              <option value="cascade">Cascade (Diagonal Offset)</option>
              <option value="deck">Deck (Stacked Upward)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Autoplay Behavior
            </label>
            <select
              value={autoplay ? 'true' : 'false'}
              onChange={(e) => onAutoplayChange?.(e.target.value === 'true')}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#071957]"
            >
              <option value="true">Enabled (Auto-cycles cards)</option>
              <option value="false">Disabled (Manual drag / click only)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Cycle Interval (Delay: {autoplayDelay}ms)
            </label>
            <select
              value={autoplayDelay}
              onChange={(e) => onDelayChange?.(Number(e.target.value))}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#071957]"
            >
              <option value={1800}>Fast (1.8s)</option>
              <option value={2500}>Smooth (2.5s - Default)</option>
              <option value={3500}>Relaxed (3.5s)</option>
              <option value={5000}>Slow (5.0s)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add New Card Section */}
      <div className="bg-white border-2 border-dashed border-blue-200 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-[#071957] flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-[#2855CE]" />
            Add New Card to Stack
          </span>

          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'upload'
                  ? 'bg-white text-[#2855CE] shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Upload Image
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'url'
                  ? 'bg-white text-[#2855CE] shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Paste Image URL
            </button>
          </div>
        </div>

        {uploadError && (
          <p className="text-xs font-bold text-rose-500 bg-rose-50 p-2 rounded-lg">
            {uploadError}
          </p>
        )}

        {/* Title / Label Input (Optional) */}
        <div>
          <label className="text-[11px] font-bold text-slate-500 block mb-1">
            Card Title / Label (Optional)
          </label>
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="e.g. Brand Identity 2026, Social Creatives"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#071957]"
          />
        </div>

        {activeTab === 'upload' ? (
          <div>
            <label className="cursor-pointer inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-50 text-xs font-extrabold text-[#2855CE] transition-all shadow-xs">
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>{uploading ? 'Uploading to Cloudinary...' : 'Choose Image File to Upload'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <span className="text-[10px] text-slate-400 block mt-1.5">
              PNG, JPG, WebP supported. Max 5MB. Uploads securely to Cloudinary CDN.
            </span>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#071957]"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              disabled={!urlInput.trim()}
              className="brand-gradient text-white text-xs font-extrabold px-4 py-2 rounded-xl disabled:opacity-50 flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Card</span>
            </button>
          </div>
        )}
      </div>

      {/* Cards List Grid */}
      <div className="space-y-3">
        <span className="text-xs font-extrabold text-[#071957] block">
          Current Cards in Stack ({cardList.length})
        </span>

        {cardList.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
            <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-bold">No custom cards added yet.</p>
            <p className="text-[11px] text-slate-400 mt-1">
              Add your first card image above or click &ldquo;Reset Defaults&rdquo; to load samples.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {cardList.map((card, index) => {
              const src = typeof card === 'string' ? card : card?.url;
              const title = typeof card === 'object' ? card?.title : '';
              const isTop = index === 0;

              return (
                <div
                  key={`${src}-${index}`}
                  className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 hover:border-slate-300 transition-all shadow-xs"
                >
                  {/* Position Badge */}
                  <span
                    className={`w-7 h-7 rounded-lg text-[11px] font-black flex items-center justify-center shrink-0 ${
                      isTop
                        ? 'bg-[#2855CE] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                    title={isTop ? 'Top card on initial view' : `Position #${index + 1}`}
                  >
                    #{index + 1}
                  </span>

                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 relative">
                    <img
                      src={src}
                      alt={title || `Card ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={title || ''}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                      placeholder="Card Title (optional)"
                      className="text-xs font-bold text-[#071957] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-slate-50 rounded px-1 py-0.5 w-full outline-hidden"
                    />
                    <a
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-slate-400 hover:text-[#2855CE] truncate block mt-0.5 flex items-center gap-1"
                    >
                      <span className="truncate max-w-[280px] sm:max-w-md">{src}</span>
                      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                    </a>
                  </div>

                  {/* Reorder and Delete Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      title="Move card higher"
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === cardList.length - 1}
                      title="Move card lower"
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      title="Delete card"
                      className="p-1.5 rounded-lg border border-red-200 text-rose-500 hover:bg-rose-50 ml-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
