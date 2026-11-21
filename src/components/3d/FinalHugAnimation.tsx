import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Crown } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

interface FinalHugAnimationProps {
  onHugTriggered?: () => void;
}

export const FinalHugAnimation: React.FC<FinalHugAnimationProps> = ({ onHugTriggered }) => {
  const [hugGiven, setHugGiven] = useState(false);

  const handleHug = () => {
    setHugGiven(true);
    soundEffects.playHugChime();

    try {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.7 },
        colors: ['#FFF5F8', '#F8DCE8', '#E9A5BD', '#B65F82', '#D9A0A9', '#FFFBF5'],
      });
    } catch {}

    if (onHugTriggered) onHugTriggered();
  };

  return (
    <div className="relative text-center my-8">
      {!hugGiven ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <button
            type="button"
            onClick={handleHug}
            className="btn-royal-primary min-h-[56px] inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full font-sans font-extrabold text-lg sm:text-xl text-white shadow-rose-glow hover:shadow-gold-glow active:scale-95 transition-all duration-300"
          >
            <Crown className="w-6 h-6 text-royalGold fill-royalGold" />
            <span>One Big Brother Hug</span>
            <span className="text-2xl">🫂</span>
          </button>
          <p className="font-handwriting text-base text-brandText/70 mt-3">
            Tap here whenever you feel hurt, angry or distant. It's always here for you.
          </p>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="p-6 sm:p-8 rounded-3xl glass-card-gold max-w-lg mx-auto relative overflow-hidden"
          >
            {/* Background pulsating warm aura */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-rose-200/40 via-lavender/30 to-amber-100/40"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10 flex flex-col items-center">
              {/* Symbolic warm embrace with glowing heart & crown */}
              <div className="relative mb-4">
                <motion.div
                  className="w-24 h-24 rounded-full bg-white/90 shadow-xl border-2 border-roseGold/40 flex items-center justify-center text-4xl"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span role="img" aria-label="Hug">
                    🫂
                  </span>
                </motion.div>

                {/* Floating crown over hug */}
                <motion.div
                  className="absolute -top-3 -right-2"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shadow-sm">
                    <Crown className="w-4 h-4 text-roseGold fill-roseGold" />
                  </div>
                </motion.div>

                {/* Mini orbiting hearts */}
                <motion.div
                  className="absolute -bottom-1 -left-2"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-6 h-6 text-deepRose fill-deepRose/70 drop-shadow-sm" />
                </motion.div>
              </div>

              <h4 className="font-heading text-xl sm:text-2xl font-bold text-brandText">
                A Forever Hug From Your Brother
              </h4>

              <p className="font-letter text-lg sm:text-xl italic text-deepRose mt-2 leading-relaxed max-w-md">
                "No matter how old we get, no matter how much we argue... my arms are always open, and you will always be my precious Thanga Pulla."
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brandText/60">
                <Sparkles className="w-3.5 h-3.5 text-roseGold" />
                <span>You will never be a stranger</span>
                <Sparkles className="w-3.5 h-3.5 text-roseGold" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
