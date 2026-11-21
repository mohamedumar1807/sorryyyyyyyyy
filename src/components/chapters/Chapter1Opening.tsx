import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown } from 'lucide-react';
import { SisterPhoto } from '../../types';
import { PhotoFrame3D } from '../3d/PhotoFrame3D';
import { PrincessKingdom3D } from '../3d/scenes/PrincessKingdom3D';

interface Chapter1Props {
  photo: SisterPhoto;
  onPhotoClick: (photo: SisterPhoto) => void;
  onNext: () => void;
}

export const Chapter1Opening: React.FC<Chapter1Props> = ({
  photo,
  onPhotoClick,
  onNext,
}) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Chapter Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-royalRose/40 text-xs font-bold text-royalRose uppercase tracking-wider mb-4 shadow-md"
      >
        <Crown className="w-3.5 h-3.5 text-royalGold" />
        <span>Chapter 01 &bull; Welcome To Your Kingdom</span>
      </motion.div>

      {/* Main Heading — High Contrast Deep Plum */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold text-center text-deepPlum tracking-tight mb-2"
      >
        Heyyyy, My Thanga Pulla...
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-letter text-xl sm:text-2xl italic text-deepBerry font-semibold text-center mb-6"
      >
        "Welcome to your little kingdom, Princess. 👑"
      </motion.p>

      {/* 3D Princess Kingdom Scene */}
      <div className="w-full max-w-2xl my-4">
        <PrincessKingdom3D />
      </div>

      {/* Grid: 3D Photo Frame + Brother's Letter */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-6">
        {/* Left Column: Sister's 3D Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="md:col-span-5 flex justify-center"
        >
          <div className="w-full max-w-[290px] sm:max-w-[320px]">
            <PhotoFrame3D
              src={photo.src}
              alt={photo.alt}
              title={photo.title}
              caption={photo.caption}
              badge="Her Smile"
              crownOnTop={true}
              onClick={() => onPhotoClick(photo)}
            />
          </div>
        </motion.div>

        {/* Right Column: Emotional Opening Message */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="md:col-span-7 space-y-5"
        >
          <div className="p-7 sm:p-9 rounded-3xl glass-card border-2 border-royalRose/35 shadow-glass relative">
            <div className="absolute top-4 right-4 text-royalGold">
              <Sparkles className="w-6 h-6" />
            </div>

            <p className="font-heading text-2xl font-extrabold text-deepPlum mb-4">
              Heyyyy pa...
            </p>

            <div className="font-letter text-lg sm:text-xl text-deepPlum/90 leading-relaxed space-y-4">
              <p>
                Today, this little world is completely yours.
              </p>
              <p>
                I made something special just for you.
              </p>
              <p>
                Not because it's your birthday or any special occasion.
              </p>
              <p className="p-4 rounded-2xl bg-blushPink/50 border-l-4 border-royalRose text-deepBerry font-bold italic shadow-sm">
                Just because sometimes the people we love deserve to be reminded how much they mean to us.
              </p>
              <p>
                And you're one of those people.
              </p>
              <p className="font-heading text-xl font-bold text-royalRose pt-2">
                Welcome to your little kingdom, my princess. 👑
              </p>
            </div>

            <div className="mt-8 pt-5 border-t-2 border-royalRose/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-handwriting text-2xl text-deepBerry font-extrabold">
                Forever your brother ❤️
              </span>
              <button
                type="button"
                onClick={onNext}
                className="btn-royal-primary min-h-[48px] px-8 text-base font-bold flex items-center justify-center gap-2 active:scale-95 shadow-md"
              >
                <span>Turn Page</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
