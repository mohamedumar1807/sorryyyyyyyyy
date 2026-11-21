import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../../utils/soundEffects';

export const ForgivenessCard: React.FC = () => {
  const [selected, setSelected] = useState<'forgiven' | 'time' | null>(null);

  const handleForgive = () => {
    setSelected('forgiven');
    soundEffects.playSparkle();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#F8DCE8', '#E9A5BD', '#B65F82', '#FFF5F8'],
      });
    } catch {}
  };

  const handleNeedTime = () => {
    setSelected('time');
    soundEffects.playPageTurn();
  };

  return (
    <div className="w-full max-w-lg mx-auto my-10 p-6 sm:p-8 rounded-3xl glass-card text-center relative overflow-hidden border border-roseGold/40 shadow-glass">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blush/40 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-lavender/40 rounded-full blur-2xl -z-10 pointer-events-none" />

      {/* Decorative tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush/80 border border-roseGold/30 text-xs font-semibold text-deepRose uppercase tracking-wider mb-4">
        <Sparkles className="w-3.5 h-3.5 text-roseGold" />
        <span>A Gentle Question For You</span>
      </div>

      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brandText mb-3">
        Can you forgive me, Thanga Pulla?
      </h3>

      <p className="font-letter text-base sm:text-lg text-brandText/80 italic mb-6 max-w-md mx-auto">
        "I will never force you or rush you. What you feel is genuine, and your heart deserves all the time and patience in the world."
      </p>

      {/* Choice Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleForgive}
          className={`w-full sm:w-auto px-7 py-3.5 min-h-[48px] rounded-full font-sans font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-md active:scale-95 ${
            selected === 'forgiven'
              ? 'btn-royal-primary ring-4 ring-royalGold'
              : 'btn-royal-primary'
          }`}
        >
          <Heart className="w-5 h-5 fill-white text-white" />
          <span>I forgive you ❤️</span>
        </button>

        <button
          type="button"
          onClick={handleNeedTime}
          className={`w-full sm:w-auto px-7 py-3.5 min-h-[48px] rounded-full font-sans font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-md active:scale-95 ${
            selected === 'time'
              ? 'btn-royal-secondary ring-4 ring-royalGold'
              : 'btn-royal-secondary'
          }`}
        >
          <Clock className="w-5 h-5 text-white" />
          <span>I need a little time</span>
        </button>
      </div>

      {/* Respectful Response Messages */}
      <AnimatePresence mode="wait">
        {selected === 'forgiven' && (
          <motion.div
            key="forgiven-msg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 rounded-2xl bg-blush/60 border border-roseGold/30"
          >
            <p className="font-heading text-lg font-bold text-deepRose">
              Thank you, pa. 🫂
            </p>
            <p className="font-letter text-base sm:text-lg italic text-brandText mt-1">
              "I'll try my best to make you feel loved every day, not just with words, but with how I treat you."
            </p>
          </motion.div>
        )}

        {selected === 'time' && (
          <motion.div
            key="time-msg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 rounded-2xl bg-lavender/60 border border-lavender"
          >
            <p className="font-heading text-lg font-bold text-brandText">
              It's okay, pa. ❤️
            </p>
            <p className="font-letter text-base sm:text-lg italic text-brandText/90 mt-1">
              "Take all the time you need. Your feelings matter to me, and I'll keep trying to do better."
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
