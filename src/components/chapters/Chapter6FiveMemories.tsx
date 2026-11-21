import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, BookOpen, Layers } from 'lucide-react';
import { SisterPhoto } from '../../types';
import { PolaroidCard3D } from '../3d/PolaroidCard3D';
import { MemoryBook3D } from '../3d/scenes/MemoryBook3D';

interface Chapter6Props {
  photos: SisterPhoto[];
  onPhotoClick: (photo: SisterPhoto) => void;
  onOpenManager: () => void;
  onNext: () => void;
}

export const Chapter6FiveMemories: React.FC<Chapter6Props> = ({
  photos,
  onPhotoClick,
  onOpenManager,
  onNext,
}) => {
  const [viewMode, setViewMode] = useState<'polaroids' | 'book'>('polaroids');

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Chapter Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-royalRose/40 text-xs font-bold text-royalRose uppercase tracking-wider mb-4 shadow-md"
      >
        <Camera className="w-3.5 h-3.5 text-royalRose" />
        <span>Chapter 06 &bull; Photo Memories</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="font-heading text-3xl sm:text-5xl font-extrabold text-center text-deepPlum tracking-tight mb-2"
      >
        Five Little Windows
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-letter text-xl sm:text-2xl italic text-deepBerry font-semibold text-center mb-2"
      >
        Into My Favourite Person's World
      </motion.p>

      <p className="font-sans text-xs sm:text-sm text-deepPlum/80 font-bold tracking-wider text-center uppercase mb-6">
        Little moments &bull; Different versions of you &bull; One very special person
      </p>

      {/* View Mode Toggle: 3D Polaroids vs 3D Memory Book */}
      <div className="flex flex-wrap items-center justify-center gap-3 p-2 rounded-2xl bg-white border-2 border-royalRose/40 shadow-md mb-8">
        <button
          type="button"
          onClick={() => setViewMode('polaroids')}
          className={`flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-full text-sm sm:text-base font-sans font-extrabold transition-all active:scale-95 ${viewMode === 'polaroids'
            ? 'btn-royal-primary shadow-md'
            : 'btn-royal-secondary shadow-sm'
            }`}
        >
          <Layers className="w-4 h-4 text-white" />
          <span>3D Polaroid Frames</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('book')}
          className={`flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-full text-sm sm:text-base font-sans font-extrabold transition-all active:scale-95 ${viewMode === 'book'
            ? 'btn-royal-primary shadow-md'
            : 'btn-royal-secondary shadow-sm'
            }`}
        >
          <BookOpen className="w-4 h-4 text-white" />
          <span>3D Memory Scrapbook 📖</span>
        </button>
      </div>

      {/* View 1: 3D Polaroids Grid */}
      {viewMode === 'polaroids' && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center my-2">
          {photos.slice(0, 5).map((photo, index) => (
            <div key={photo.id} className="w-full max-w-[280px]">
              <PolaroidCard3D
                photo={photo}
                index={index}
                onClick={onPhotoClick}
              />
            </div>
          ))}
        </div>
      )}

      {/* View 2: Realistic 3D Memory Scrapbook */}
      {viewMode === 'book' && (
        <div className="w-full my-2">
          <MemoryBook3D photos={photos} onPhotoClick={onPhotoClick} />
        </div>
      )}

      {/* Navigation Button to Promises */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onNext}
          className="btn-royal-primary min-h-[48px] px-10 text-base font-bold flex items-center justify-center gap-2 active:scale-95 shadow-md"
        >
          <span>My Promises To You</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
};
