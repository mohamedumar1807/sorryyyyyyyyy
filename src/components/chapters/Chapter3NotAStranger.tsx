import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { HeartUniverse3D } from '../3d/scenes/HeartUniverse3D';

interface Chapter3Props {
  onNext: () => void;
}

export const Chapter3NotAStranger: React.FC<Chapter3Props> = ({ onNext }) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Chapter Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-royalRose/40 text-xs font-bold text-royalRose uppercase tracking-wider mb-4 shadow-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-royalGold" />
        <span>Chapter 03 &bull; The Most Important Words</span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="font-heading text-3xl sm:text-5xl font-extrabold text-center text-deepPlum tracking-tight mb-2"
      >
        You're not a stranger to me...
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-letter text-xl sm:text-2xl italic text-deepBerry font-semibold text-center mb-6"
      >
        "I never want our relationship to feel formal or distant."
      </motion.p>

      {/* 3D Glowing Heart Universe */}
      <div className="w-full my-4">
        <HeartUniverse3D />
      </div>

      {/* Her Words Callout: "I feel like I'm a stranger to you." */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.8 }}
        className="w-full my-6 p-7 sm:p-9 rounded-3xl bg-gradient-to-r from-blushPink/90 via-white to-richLavender/80 border-2 border-royalRose shadow-2xl text-center relative overflow-hidden"
      >
        <div className="absolute top-2 left-4 text-5xl text-royalRose/30 font-serif select-none">
          “
        </div>
        <p className="font-sans text-xs uppercase tracking-widest text-royalRose font-extrabold mb-2">
          When you once told me:
        </p>
        <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-deepPlum italic">
          "I feel like I'm a stranger to you."
        </h3>
        <div className="absolute bottom-2 right-4 text-5xl text-royalRose/30 font-serif select-none">
          ”
        </div>
      </motion.div>

      {/* Brother's Response Card — High Contrast Glass */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="w-full"
      >
        <div className="p-7 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-royalRose/40 shadow-2xl space-y-6 text-deepPlum font-letter text-lg sm:text-xl leading-relaxed">
          <p>
            Whenever you say these words, my heart aches. I realise how much my cold behaviour and quick anger must hurt you.
          </p>

          <p>
            I'm truly sorry for ever making you feel like a stranger.
          </p>

          <p className="p-4 rounded-2xl bg-warmCream border-2 border-royalGold/50 text-deepPlum font-semibold">
            How can I make someone who is so close to my heart feel like someone I barely know?
          </p>

          <p>
            Just because we fight, just because I get angry, or just because we disagree, it doesn't mean our relationship becomes any less special or that you are pushed away.
          </p>

          <div className="space-y-2 pl-4 border-l-4 border-royalRose text-deepPlum font-bold bg-blushPink/20 p-4 rounded-r-2xl">
            <p>You are not someone I met yesterday.</p>
            <p>You are not just another person receiving a formal apology.</p>
            <p className="text-royalRose font-heading text-2xl">You are my sister.</p>
            <p className="text-royalRose font-heading text-2xl">You are my Thanga Pulla.</p>
          </div>

          <p>
            I never want you to feel like a stranger to your own brother. I want to speak to you with warmth, affection and familiar love, never formal distance.
          </p>

          {/* Highlighted Tamil Climax Line */}
          <div className="mt-8 p-7 rounded-3xl bg-gradient-to-r from-blushPink via-white to-blushPink border-2 border-royalRose text-center shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-royalRose fill-royalRose" />
              <span className="font-sans text-xs uppercase font-extrabold tracking-widest text-royalRose">
                My Promise To You
              </span>
              <Heart className="w-5 h-5 text-royalRose fill-royalRose" />
            </div>
            <h4 className="font-heading text-2xl sm:text-4xl font-black text-deepPlum tracking-wide">
              Nee enakku eppovume stranger illa pa. ❤️
            </h4>
            <p className="font-handwriting text-xl text-royalRose mt-1 font-bold">
              (You are never a stranger to me. Not today, not tomorrow, not ever.)
            </p>
          </div>

          <div className="pt-6 flex justify-center sm:justify-end">
            <button
              type="button"
              onClick={onNext}
              className="btn-royal-primary min-h-[48px] px-8 text-base font-bold flex items-center justify-center gap-2 active:scale-95 shadow-md w-full sm:w-auto"
            >
              <span>My Princess Of This World</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
