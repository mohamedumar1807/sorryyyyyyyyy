import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';
import { SisterPhoto } from '../../types';

interface PhotoLightboxProps {
  photos: SisterPhoto[];
  selectedPhoto: SisterPhoto | null;
  onClose: () => void;
  onSelectPhoto: (photo: SisterPhoto) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  selectedPhoto,
  onClose,
  onSelectPhoto,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, photos]);

  if (!selectedPhoto) return null;

  const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);

  const handleNext = () => {
    setIsZoomed(false);
    const nextIdx = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIdx]);
  };

  const handlePrev = () => {
    setIsZoomed(false);
    const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIdx]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-deepPlum/90 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 max-w-4xl w-full max-h-[92vh] flex flex-col rounded-3xl bg-warmCream border-4 border-royalGold/60 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b-2 border-royalRose/30 bg-white/95">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-royalRose text-xs font-bold text-white uppercase tracking-wider shadow-sm">
                Memory {currentIndex + 1} of {photos.length}
              </span>
              <span className="text-sm font-bold text-deepPlum hidden sm:inline">
                {selectedPhoto.tag}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full btn-icon-control flex items-center justify-center shadow-sm active:scale-95"
                title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                aria-label={isZoomed ? 'Zoom Out' : 'Zoom In'}
              >
                {isZoomed ? <ZoomOut className="w-5 h-5 text-deepPlum" /> : <ZoomIn className="w-5 h-5 text-deepPlum" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full btn-icon-control flex items-center justify-center shadow-sm active:scale-95"
                title="Close"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-deepPlum" />
              </button>
            </div>
          </div>

          {/* Main Photo Area */}
          <div className="relative flex-1 min-h-[300px] max-h-[68vh] overflow-auto flex items-center justify-center p-4 bg-deepPlum/10">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className={`max-w-full max-h-[60vh] object-contain rounded-xl shadow-2xl transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
              onClick={() => setIsZoomed(!isZoomed)}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.tried) {
                  target.dataset.tried = 'true';
                  target.src = '/images/Snapchat-378253179.jpg';
                }
              }}
            />

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full btn-royal-secondary flex items-center justify-center text-white shadow-xl border-2 border-white transition-all hover:scale-105 active:scale-95"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full btn-royal-primary flex items-center justify-center text-white shadow-xl border-2 border-white transition-all hover:scale-105 active:scale-95"
              aria-label="Next photo"
            >
              <ChevronRight className="w-7 h-7 text-white" />
            </button>
          </div>

          {/* Bottom Caption and Info Bar — High Contrast Deep Plum & Berry */}
          <div className="p-5 sm:p-6 bg-white/95 border-t-2 border-royalRose/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-heading text-lg sm:text-2xl font-black text-deepPlum">
                  {selectedPhoto.title}
                </h3>
                <p className="font-letter text-base sm:text-lg italic text-royalRose mt-0.5 font-bold">
                  "{selectedPhoto.caption}"
                </p>
              </div>
              {selectedPhoto.highlight && (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blushPink/80 border-2 border-royalRose/40 text-xs text-deepPlum font-bold self-start sm:self-auto shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-royalGold" />
                  <span>{selectedPhoto.highlight}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
