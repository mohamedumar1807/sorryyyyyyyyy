import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, RotateCcw, Check, Image as ImageIcon } from 'lucide-react';
import { SisterPhoto } from '../../types';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: SisterPhoto[];
  onUpdatePhoto: (id: string, newSrc: string, newCaption?: string, newTitle?: string) => void;
  onResetDefaults: () => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  photos,
  onUpdatePhoto,
  onResetDefaults,
}) => {
  const [activePhotoId, setActivePhotoId] = useState<string>(photos[0]?.id || '');
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [editingCaption, setEditingCaption] = useState<string>('');
  const [savedNotice, setSavedNotice] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const currentPhoto = photos.find((p) => p.id === activePhotoId) || photos[0];

  const handleSelectSlot = (photo: SisterPhoto) => {
    setActivePhotoId(photo.id);
    setEditingTitle(photo.title);
    setEditingCaption(photo.caption);
    setSavedNotice(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdatePhoto(currentPhoto.id, reader.result, editingCaption || currentPhoto.caption, editingTitle || currentPhoto.title);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveText = () => {
    onUpdatePhoto(currentPhoto.id, currentPhoto.src, editingCaption || currentPhoto.caption, editingTitle || currentPhoto.title);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-deepPlum/85 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative z-10 w-full max-w-2xl bg-warmCream rounded-3xl border-4 border-royalGold/60 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b-2 border-royalRose/30 bg-white/95">
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-5 h-5 text-royalRose" />
              <h3 className="font-heading font-extrabold text-lg text-deepPlum">
                Manage & Personalize Photographs
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full btn-icon-control flex items-center justify-center shadow-sm active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-deepPlum" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            <p className="font-letter text-lg italic text-deepPlum/90 font-medium">
              You can personalize each of the five photo slots with your actual photos of your sister, customize captions, or restore the pre-linked original files anytime.
            </p>

            {/* 5 Slots Selector */}
            <div className="grid grid-cols-5 gap-2.5">
              {photos.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectSlot(p)}
                  className={`p-2 rounded-2xl text-center border-2 transition-all ${p.id === currentPhoto.id
                    ? 'border-royalRose bg-blushPink/70 shadow-md scale-105 ring-2 ring-royalRose/30'
                    : 'border-royalRose/30 bg-white hover:bg-blushPink/30'
                    }`}
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-warmCream mb-1.5 shadow-inner">
                    <img src={p.src} alt={p.alt} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] font-bold text-deepPlum block truncate">
                    Photo {idx + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Slot Details */}
            <div className="p-5 rounded-2xl bg-white border-2 border-royalRose/30 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-royalRose uppercase tracking-wider">
                    {currentPhoto.tag}
                  </span>
                  <h4 className="font-heading font-extrabold text-lg text-deepPlum">
                    {currentPhoto.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-royal-primary px-5 py-2.5 min-h-[44px] rounded-full text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Upload className="w-4 h-4 text-white" />
                  <span>Upload Replacement</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Title & Caption inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-deepPlum mb-1">
                    Memory Title:
                  </label>
                  <input
                    type="text"
                    defaultValue={currentPhoto.title}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-royalRose/40 bg-warmCream text-deepPlum font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-royalRose"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-deepPlum mb-1">
                    Caption:
                  </label>
                  <textarea
                    rows={2}
                    defaultValue={currentPhoto.caption}
                    onChange={(e) => setEditingCaption(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-royalRose/40 bg-warmCream text-deepPlum font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-royalRose"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleSaveText}
                    className="btn-royal-secondary px-6 py-2.5 min-h-[44px] rounded-full text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <Check className="w-4 h-4 text-white" />
                    <span>Save Caption Changes</span>
                  </button>

                  {savedNotice && (
                    <span className="text-xs font-bold text-emerald-700 animate-pulse">
                      Changes saved successfully!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t-2 border-royalRose/20 bg-white/95 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onResetDefaults}
              className="btn-royal-gold px-5 py-2.5 min-h-[44px] rounded-full text-xs sm:text-sm font-extrabold text-deepPlum flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4 text-deepPlum" />
              <span>Reset All To Original Photos</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-royal-primary px-8 py-2.5 min-h-[44px] rounded-full text-white text-sm font-bold shadow-md active:scale-95 transition-all"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
