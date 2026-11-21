import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, RotateCcw, Heart } from 'lucide-react';
import { SisterPhoto } from '../../types';
import { PhotoFrame3D } from '../3d/PhotoFrame3D';
import { TeddyHugging3D } from '../3d/scenes/TeddyHugging3D';
import { ForgivenessButterfly3D } from '../3d/scenes/ForgivenessButterfly3D';
import { useAudio } from '../../context/AudioContext';

interface Chapter8Props {
  mainPhoto: SisterPhoto;
  allPhotos: SisterPhoto[];
  onPhotoClick: (photo: SisterPhoto) => void;
  onReplay: () => void;
}

export const Chapter8FinalLetter: React.FC<Chapter8Props> = ({
  mainPhoto,
  allPhotos,
  onPhotoClick,
  onReplay,
}) => {
  const { fadeVolume } = useAudio();

  // Rule 8: Gradually fade the music during the final emotional letter
  useEffect(() => {
    fadeVolume(0.18, 4000);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Chapter Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-royalRose/40 text-xs font-bold text-royalRose uppercase tracking-wider mb-4 shadow-md"
      >
        <Crown className="w-3.5 h-3.5 text-royalGold" />
        <span>Chapter 08 &bull; The Final Letter</span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold text-center text-deepPlum tracking-tight mb-2"
      >
        To My Forever Princess...
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-letter text-xl sm:text-2xl italic text-deepBerry font-semibold text-center mb-8"
      >
        "No matter what happens, you will always be my Thanga Pulla."
      </motion.p>

      {/* Main Portrait of Sister in 3D Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="my-4 max-w-[310px] w-full"
      >
        <PhotoFrame3D
          src={mainPhoto.src}
          alt={mainPhoto.alt}
          title={mainPhoto.title}
          caption={mainPhoto.caption}
          badge="My Princess"
          crownOnTop={true}
          onClick={() => onPhotoClick(mainPhoto)}
        />
      </motion.div>

      {/* The Full Emotional Letter — High Contrast Royal Paper */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.8 }}
        className="w-full max-w-2xl mt-6"
      >
        <div className="p-7 sm:p-12 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-royalRose/50 shadow-2xl space-y-6 text-deepPlum font-letter text-lg sm:text-xl leading-relaxed relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-blushPink/80 to-transparent pointer-events-none" />

          <p className="font-heading text-3xl font-black text-royalRose">
            Pa...
          </p>

          <p>
            We may fight.
          </p>
          <p>
            We may get angry.
          </p>
          <p>
            We may misunderstand each other.
          </p>

          <p>
            Sometimes I may behave like I don't care, but that doesn't mean you aren't important to me.
          </p>

          <p>
            I know I don't always express my love properly.
          </p>

          <p className="p-5 rounded-2xl bg-warmCream border-2 border-royalGold/60 text-deepBerry font-bold italic text-xl text-center shadow-sm">
            "But please never, ever think you're just a stranger to me."
          </p>

          <div className="space-y-1 text-deepPlum pl-4 border-l-4 border-royalRose font-bold bg-blushPink/20 p-3 rounded-r-xl">
            <p>You're my own sister.</p>
            <p>You're my Thanga Pulla.</p>
            <p>You're someone I never want to lose the bond with.</p>
          </div>

          <p>
            I don't want our fights to become bigger than our relationship.
          </p>
          <p>
            I don't want you to wait for an apology to feel loved and safe.
          </p>
          <p>
            I want to be a better brother, not just through my words, but through my daily actions.
          </p>

          <div className="pt-2">
            <p className="font-heading text-xl sm:text-2xl font-bold text-royalRose">
              And no matter how many times we fight...
            </p>
            <p className="font-heading text-3xl sm:text-4xl font-black text-deepPlum mt-1">
              You'll always be my Thanga Pulla.
            </p>
            <p className="font-heading text-2xl font-extrabold text-royalRose mt-2">
              Love you so much, pa. ❤️
            </p>
          </div>

          {/* Grand Finale Royal Slate with High Contrast Royal Palette */}
          <div className="mt-8 pt-8 border-t-2 border-royalRose/30 text-center space-y-4">
            <div className="inline-flex items-center justify-center gap-2 text-royalGold">
              <Sparkles className="w-5 h-5" />
              <Crown className="w-6 h-6 fill-royalGold" />
              <Sparkles className="w-5 h-5" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-heading text-2xl sm:text-4xl font-black text-deepPlum tracking-wider">
                YOU ARE MY PRINCESS.
              </h3>
              <h3 className="font-heading text-2xl sm:text-4xl font-black text-royalRose tracking-wider">
                YOU ARE MY THANGA PULLA.
              </h3>
              <h3 className="font-heading text-2xl sm:text-4xl font-black text-deepPlum tracking-wider">
                YOU ARE MY WORLD.
              </h3>
            </div>

            <p className="font-heading text-2xl font-black text-royalRose pt-3">
              Nee enakku eppovume special dhaan pa. ❤️
            </p>

            <div className="flex items-center justify-center gap-2 pt-2">
              <Heart className="w-4 h-4 text-royalRose fill-royalRose animate-pulse" />
              <p className="font-handwriting text-xl sm:text-2xl font-extrabold text-deepPlum">
                "Your brother, your supporter, your forever person. Always. ❤️"
              </p>
              <Heart className="w-4 h-4 text-royalRose fill-royalRose animate-pulse" />
            </div>

            <p className="font-sans text-xs uppercase tracking-widest text-deepBerry pt-2 font-black">
              FOREVER YOUR BROTHER
            </p>
          </div>
        </div>
      </motion.div>

      {/* 3D Hug Scene: Two Cute Hugging Bears & Photo Collage */}
      <div className="w-full max-w-xl mt-8">
        <TeddyHugging3D photos={allPhotos} />
      </div>

      {/* 3D Forgiveness Scene: Butterfly Approaching Blooming Flower */}
      <div className="w-full max-w-xl mt-6">
        <ForgivenessButterfly3D />
      </div>

      {/* Replay Option */}
      <div className="my-10 text-center">
        <button
          type="button"
          onClick={onReplay}
          className="btn-royal-secondary inline-flex items-center justify-center gap-2.5 px-8 py-3.5 min-h-[48px] rounded-full text-base font-sans font-extrabold text-white transition-all shadow-md active:scale-95"
        >
          <RotateCcw className="w-5 h-5 text-white" />
          <span>Read Again From The Beginning</span>
        </button>
      </div>
    </div>
  );
};
