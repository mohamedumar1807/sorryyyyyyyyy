import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { FlowerGarden3D } from '../3d/scenes/FlowerGarden3D';

interface Chapter5Props {
  onNext: () => void;
}

export const Chapter5AlwaysSpecial: React.FC<Chapter5Props> = ({ onNext }) => {
  const sentences = [
    { text: 'Even when we laugh.', icon: '😊' },
    { text: 'Even when we fight.', icon: '⚡' },
    { text: "Even when we don't talk properly.", icon: '💭' },
    { text: "Even when we're angry with each other.", icon: '🌧️' },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Chapter Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-royalRose/40 text-xs font-bold text-royalRose uppercase tracking-wider mb-4 shadow-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-royalGold" />
        <span>Chapter 05 &bull; Timeless Bond</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="font-heading text-3xl sm:text-5xl font-extrabold text-center text-deepPlum tracking-tight mb-2"
      >
        Even before I said sorry...
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-letter text-xl sm:text-2xl italic text-deepBerry font-semibold text-center mb-6"
      >
        "You don't become special to me only when I apologise. You were always special."
      </motion.p>

      {/* 3D Magical Flower Garden */}
      <div className="w-full my-4">
        <FlowerGarden3D />
      </div>

      {/* Content Card — High Contrast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-full mt-6"
      >
        <div className="p-7 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-royalRose/40 shadow-2xl space-y-6 text-deepPlum font-letter text-lg sm:text-xl leading-relaxed">
          <p>
            You once told me that whenever I say sorry, you feel like you're someone special to me.
          </p>

          <p className="font-heading text-2xl font-extrabold text-royalRose">
            But I want you to understand something deeply:
          </p>

          <p className="p-5 rounded-2xl bg-warmCream border-2 border-royalGold text-deepPlum font-bold italic text-xl text-center shadow-sm">
            You don't become special to me only when I apologise. You were ALWAYS special.
          </p>

          {/* Staggered cards for sentences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
            {sentences.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="p-4 rounded-xl bg-blushPink/30 border-2 border-royalRose/30 flex items-center gap-3 shadow-sm"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-sans text-sm font-bold text-deepPlum">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>

          <p>
            Your place in my life doesn't disappear or shrink because of one misunderstanding or bad mood.
          </p>

          <p>
            I don't want you to wait for an apology to feel important or valued.
          </p>

          <p>
            I want to make you smile on ordinary days. I want to celebrate your small joys and listen to your silly stories.
          </p>

          {/* Highlighted final sentence */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blushPink/80 via-white to-blushPink/80 border-2 border-royalRose text-center shadow-lg">
            <p className="font-heading text-xl sm:text-2xl font-black text-royalRose">
              "You matter to me more than my ego, my anger and any stupid argument."
            </p>
          </div>

          <div className="pt-6 flex justify-center sm:justify-end">
            <button
              type="button"
              onClick={onNext}
              className="btn-royal-primary min-h-[48px] px-8 text-base font-bold flex items-center justify-center gap-2 active:scale-95 shadow-md w-full sm:w-auto"
            >
              <span>Our Five Memories</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
