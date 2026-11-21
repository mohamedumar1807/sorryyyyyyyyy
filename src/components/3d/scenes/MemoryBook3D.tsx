import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Heart, Sparkles, Crown } from 'lucide-react';
import { SisterPhoto } from '../../../types';
import { soundEffects } from '../../../utils/soundEffects';

interface MemoryBook3DProps {
  photos: SisterPhoto[];
  onPhotoClick?: (photo: SisterPhoto) => void;
  className?: string;
}

export const MemoryBook3D: React.FC<MemoryBook3DProps> = ({
  photos,
  onPhotoClick,
  className = '',
}) => {
  // Page 0: Cover, Pages 1-5: Photos, Page 6: Final Letter
  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalPages = photos.length + 1; // Cover (0), 5 photos (1-5), final letter (6)

  const handleNext = () => {
    if (currentPage <= totalPages) {
      setCurrentPage((prev) => prev + 1);
      soundEffects.playPageTurn();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      soundEffects.playPageTurn();
    }
  };

  const currentPhoto = photos[currentPage - 1];

  return (
    <div className={`w-full max-w-2xl mx-auto p-4 sm:p-6 ${className}`}>
      {/* Book Outer Perspective Shell */}
      <div className="relative perspective-1500 w-full min-h-[440px] sm:min-h-[500px] flex items-center justify-center">
        {/* Book Spine Shadow */}
        <div className="absolute inset-x-8 bottom-0 h-10 bg-[#624657]/20 rounded-full blur-xl" />

        {/* The 3D Book Container */}
        <div className="relative w-full max-w-lg aspect-[4/5] sm:aspect-[6/7] preserve-3d">
          <AnimatePresence mode="wait">
            {/* Page 0: Royal Fairytale Cover */}
            {currentPage === 0 && (
              <motion.div
                key="book-cover"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center justify-between text-center border-4 border-roseGold/60 cursor-pointer overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #B65F82 0%, #D9A0A9 50%, #9C4B6C 100%)',
                  boxShadow: 'inset 0 0 40px rgba(98, 70, 87, 0.4), 0 20px 45px rgba(98, 70, 87, 0.35)',
                }}
                onClick={handleNext}
              >
                {/* Gold filigree corners */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-200/70" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-200/70" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-200/70" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-200/70" />

                <div className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 border border-white/40 shadow-inner">
                    <Crown className="w-8 h-8 text-amber-100" />
                  </div>
                  <span className="font-sans text-xs uppercase tracking-widest text-amber-100/90 font-semibold">
                    A Brother's Fairytale Scrapbook
                  </span>
                </div>

                <div className="my-auto space-y-2">
                  <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide drop-shadow-md">
                    TO MY THANGA PULLA
                  </h3>
                  <p className="font-letter text-xl sm:text-2xl italic text-amber-100">
                    "Every page is a memory, every memory is you."
                  </p>
                </div>

                <div className="pb-4">
                  <span className="btn-royal-gold inline-flex items-center gap-2 px-8 py-3 rounded-full text-deepPlum font-sans text-sm font-extrabold shadow-md transform hover:scale-105 transition-transform">
                    <BookOpen className="w-4 h-4 text-deepPlum" />
                    <span>Open Scrapbook &rarr;</span>
                  </span>
                </div>
              </motion.div>
            )}

            {/* Pages 1-5: The Five Photo Pages */}
            {currentPage >= 1 && currentPage <= photos.length && currentPhoto && (
              <motion.div
                key={`photo-page-${currentPage}`}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-2xl bg-cream shadow-2xl p-4 sm:p-6 flex flex-col justify-between border-2 border-roseGold/30 overflow-hidden"
              >
                {/* Top Page Header */}
                <div className="flex items-center justify-between pb-2 border-b border-roseGold/20">
                  <span className="font-sans text-xs font-bold text-deepRose uppercase tracking-wider">
                    Page {currentPage} &bull; {currentPhoto.tag}
                  </span>
                  <span className="font-handwriting text-base text-brandText/70">
                    Chapter of Memories
                  </span>
                </div>

                {/* Photo in Vintage Photo Corners */}
                <div
                  className="relative my-auto max-h-[290px] sm:max-h-[330px] rounded-xl overflow-hidden bg-white p-2 shadow-md border border-roseGold/20 cursor-pointer group"
                  onClick={() => onPhotoClick && onPhotoClick(currentPhoto)}
                >
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const t = e.currentTarget;
                      if (!t.dataset.tried) {
                        t.dataset.tried = 'true';
                        t.src = '/images/Snapchat-378253179.jpg';
                      }
                    }}
                  />
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-white/80 text-[10px] font-sans font-semibold text-brandText shadow-sm">
                    Tap to view
                  </div>
                </div>

                {/* Handwritten Note underneath */}
                <div className="pt-2 text-center">
                  <h4 className="font-heading font-bold text-base text-brandText">
                    {currentPhoto.title}
                  </h4>
                  <p className="font-handwriting text-lg text-deepRose mt-0.5">
                    "{currentPhoto.caption}"
                  </p>
                </div>
              </motion.div>
            )}

            {/* Final Page: The Brother's Handwritten Closing Letter */}
            {currentPage > photos.length && (
              <motion.div
                key="final-letter-page"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-2xl bg-cream shadow-2xl p-6 sm:p-8 flex flex-col justify-between border-2 border-roseGold/40 text-left overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-3 border-b border-roseGold/30">
                  <span className="font-sans text-xs font-bold text-deepRose uppercase tracking-wider">
                    Final Chapter
                  </span>
                  <Heart className="w-4 h-4 text-deepRose fill-deepRose" />
                </div>

                <div className="space-y-3 font-letter text-base sm:text-lg text-brandText leading-relaxed my-auto py-2">
                  <p className="font-heading text-xl font-bold text-deepRose">
                    Dearest Thanga Pulla,
                  </p>
                  <p>
                    Every photo in this book represents a piece of time I cherish.
                  </p>
                  <p>
                    No fight can erase our memories, and no anger can make you a stranger to me.
                  </p>
                  <p className="font-semibold text-deepRose">
                    You are my sister, my princess, and a forever part of my heart.
                  </p>
                  <p className="font-handwriting text-xl text-brandText pt-2">
                    Forever your loving brother ❤️
                  </p>
                </div>

                <div className="pt-3 text-center border-t-2 border-royalRose/20">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(0)}
                    className="btn-royal-secondary px-5 py-2 min-h-[40px] rounded-full text-xs font-sans font-bold text-white shadow-sm hover:shadow-md transition-all active:scale-95"
                  >
                    &larr; Close Book & Return to Cover
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Book Navigation Controls */}
      <div className="flex items-center justify-between max-w-sm mx-auto mt-6 pt-2 gap-3">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`flex items-center justify-center gap-1.5 px-5 py-2.5 min-h-[48px] rounded-full text-sm font-sans font-bold transition-all shadow-md ${
            currentPage === 0
              ? 'opacity-30 cursor-not-allowed bg-gray-200 text-deepPlum/40'
              : 'btn-royal-secondary active:scale-95'
          }`}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
          <span>Previous</span>
        </button>

        <span className="font-sans text-xs sm:text-sm font-extrabold text-deepPlum px-3 py-1.5 rounded-full bg-white border border-royalRose/30 shadow-sm">
          {currentPage === 0 ? 'Cover' : `Page ${currentPage} of ${totalPages}`}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage > totalPages}
          className={`flex items-center justify-center gap-1.5 px-5 py-2.5 min-h-[48px] rounded-full text-sm font-sans font-bold transition-all shadow-md ${
            currentPage > totalPages
              ? 'opacity-30 cursor-not-allowed bg-gray-200 text-deepPlum/40'
              : 'btn-royal-primary active:scale-95'
          }`}
          aria-label="Next Page"
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};
