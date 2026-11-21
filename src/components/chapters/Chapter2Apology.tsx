import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { TeddyBearLetter3D } from '../3d/scenes/TeddyBearLetter3D';

interface Chapter2Props {
  onNext: () => void;
}

export const Chapter2Apology: React.FC<Chapter2Props> = ({ onNext }) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Chapter Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-royalRose/40 text-xs font-bold text-royalRose uppercase tracking-wider mb-4 shadow-md"
      >
        <Heart className="w-3.5 h-3.5 text-royalRose fill-royalRose/30" />
        <span>Chapter 02 &bull; From My Heart</span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="font-heading text-3xl sm:text-5xl font-extrabold text-center text-deepPlum tracking-tight mb-2"
      >
        First, I'm really sorry, pa.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-letter text-xl sm:text-2xl italic text-deepBerry font-semibold text-center mb-6"
      >
        "I don't want to just say sorry. I want to become better for you."
      </motion.p>

      {/* 3D Teddy Bear Delivering Letter Scene */}
      <div className="w-full my-4">
        <TeddyBearLetter3D />
      </div>

      {/* 3D Paper Letter Card — High Contrast Glass */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-full mt-6"
      >
        <div className="p-7 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-royalRose/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-blushPink to-transparent pointer-events-none" />
          <div className="absolute top-4 right-5 text-royalGold">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-5 text-deepPlum font-letter text-lg sm:text-xl leading-relaxed">
            <p className="font-heading text-2xl font-extrabold text-royalRose">
              Thanga Pulla...
            </p>

            <p>
              I know sometimes I hurt you.
            </p>

            <div className="pl-4 border-l-4 border-royalRose space-y-2 text-deepBerry font-semibold italic bg-blushPink/30 p-3 rounded-r-xl">
              <p>Sometimes I get angry.</p>
              <p>Sometimes I speak without thinking.</p>
              <p>Sometimes my ego takes over.</p>
            </div>

            <p>
              I know that being your brother doesn't give me the right to hurt your feelings.
              Being family means protecting your peace, not testing it.
            </p>

            <p className="p-4 rounded-2xl bg-warmCream border-2 border-royalGold/50 text-deepBerry font-bold shadow-sm">
              You deserve love, respect, patience, understanding and affection from me every single day.
            </p>

            <p>
              I'm genuinely sorry for every moment when I failed to give you those things.
            </p>

            <p>
              I don't want to keep repeating the same mistakes and simply say sorry afterwards like it solves everything.
            </p>

            <p className="font-heading text-xl font-bold text-deepPlum pt-2">
              I want to understand you better and show you through my actions that your feelings truly matter to me.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-royalRose/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-handwriting text-2xl text-royalRose font-bold">
              With all my sincerity, your brother ❤️
            </span>
            <button
              type="button"
              onClick={onNext}
              className="btn-royal-primary min-h-[48px] px-8 text-base font-bold flex items-center justify-center gap-2 active:scale-95 shadow-md"
            >
              <span>The Most Important Words</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
