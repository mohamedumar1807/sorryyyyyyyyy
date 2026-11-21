import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Crown } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { FloatingCrown } from './FloatingCrown';

interface EnvelopeOpeningProps {
  onOpen: () => void;
  sisterFlowerPhotoSrc: string;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({
  onOpen,
  sisterFlowerPhotoSrc,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isLetterElevated, setIsLetterElevated] = useState(false);

  const handleOpenClick = () => {
    if (isOpen) {
      onOpen();
      return;
    }
    if (isOpening) return;
    setIsOpening(true);

    soundEffects.playEnvelopeOpen();

    try {
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.55 },
        colors: ['#F7C1D7', '#E77AA5', '#C02F70', '#E8B957', '#FFFFFF', '#7048A8'],
      });
    } catch {}

    // 0.0s - 0.5s: Wax seal breaks & Top flap rotates open 180° upwards
    // 0.35s: Letter starts sliding upwards out of envelope
    // 0.5s: Letter elevates in front of pocket flaps (z-30)
    setTimeout(() => {
      setIsLetterElevated(true);
    }, 450);

    // 0.85s: Fully opened resting state reached
    setTimeout(() => {
      setIsOpen(true);
    }, 850);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center px-4 py-4 z-20">
      {/* 1. Floating Crown Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-2"
      >
        <FloatingCrown size={52} />
      </motion.div>

      {/* 2. Royal Greeting Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.8 }}
        className="text-center mb-5 px-2 max-w-md"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border-2 border-royalRose text-[11px] font-extrabold text-royalRose tracking-wider uppercase mb-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-royalGold" />
          <span>A Personal Letter For You</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-deepPlum tracking-tight">
          Heyyyy, My Thanga Pulla...
        </h1>
      </motion.div>

      {/* 
        3. 3D PINK ENVELOPE (Positioned neatly ABOVE the welcome card)
        - Slightly reduced size: max-w-[290px] sm:max-w-[320px], height ~180px
        - Centered horizontally
        - Does NOT overlap or hide the white welcome card below it
      */}
      <div className="relative w-full max-w-[290px] sm:max-w-[320px] h-[180px] sm:h-[195px] flex items-center justify-center my-4 overflow-visible">
        {/* Soft floor shadow beneath envelope */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-5 bg-deepPlum/20 rounded-full blur-md pointer-events-none" />

        {/* The 3D Envelope Body */}
        <motion.div
          className="relative w-full h-full perspective-1000 cursor-pointer overflow-visible"
          animate={!isOpening ? { y: [0, -5, 0] } : { y: 0 }}
          transition={{ duration: 4, repeat: !isOpening ? Infinity : 0, ease: 'easeInOut' }}
          onClick={handleOpenClick}
          title={isOpen ? 'Click to step into your story' : 'Click to open envelope'}
        >
          {/* Back Panel: Soft Pink Paper Base */}
          <div
            className="absolute inset-0 rounded-2xl shadow-lg overflow-hidden border-2 border-royalRose/40 z-0"
            style={{
              background: 'linear-gradient(135deg, #FDE8F1 0%, #F8DCE8 50%, #F5C6DA 100%)',
            }}
          >
            <div className="absolute inset-1.5 rounded-xl border border-roseGold/30 bg-white/30" />
          </div>

          {/* 
            Emerging Inside Letter Sheet
            Nestled inside envelope initially, slides UP in front of envelope on click
          */}
          <motion.div
            className={`absolute left-[4%] w-[92%] rounded-xl bg-white border-2 border-royalRose shadow-2xl p-3 sm:p-4 flex flex-col items-center text-center ${
              isLetterElevated ? 'z-30' : 'z-5'
            }`}
            style={{
              boxShadow: isOpening
                ? '0 20px 40px -8px rgba(118, 38, 79, 0.4), 0 0 0 1px rgba(232, 185, 87, 0.5)'
                : '0 4px 12px rgba(118, 38, 79, 0.1)',
            }}
            initial={{ y: 0, opacity: 0.95 }}
            animate={
              isOpening
                ? {
                    y: -110,
                    scale: 1.03,
                    opacity: 1,
                  }
                : { y: 0, opacity: 0.95 }
            }
            transition={{
              duration: 0.75,
              delay: 0.25,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {/* Sister's Photo in Gold Frame */}
            <div className="relative mb-1.5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-royalGold shadow-sm bg-warmCream">
                <img
                  src={sisterFlowerPhotoSrc}
                  alt="My Thanga Pulla"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.tried) {
                      target.dataset.tried = 'true';
                      target.src = '/images/Snapchat-378253179.jpg';
                    }
                  }}
                />
              </div>
              <div className="absolute -top-1.5 -right-1 w-5 h-5 rounded-full bg-royalGold flex items-center justify-center shadow-sm">
                <Crown className="w-3 h-3 text-deepPlum fill-deepPlum" />
              </div>
            </div>

            <h2 className="font-heading text-xs font-black text-royalRose uppercase tracking-wider">
              TO PRINCESS THANGA PULLA 👑
            </h2>

            <div className="w-10 h-0.5 bg-royalGold/60 my-1 rounded-full" />

            <p className="font-letter text-xs sm:text-sm font-bold text-deepPlum leading-tight max-w-xs">
              "You are never a stranger to me. You are my Thanga Pulla, and no fight can ever change your place in my heart."
            </p>
          </motion.div>

          {/* Envelope Pocket (Vector Flaps with Precise Geometry) */}
          <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl overflow-hidden">
            <svg
              className="w-full h-full"
              viewBox="0 0 320 195"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="sideFlapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE8F1" />
                  <stop offset="60%" stopColor="#F7C1D7" />
                  <stop offset="100%" stopColor="#E77AA5" />
                </linearGradient>

                <linearGradient id="bottomFlapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2F7" />
                  <stop offset="40%" stopColor="#F7C1D7" />
                  <stop offset="100%" stopColor="#C94F83" />
                </linearGradient>

                <filter id="bottomFlapShadow" x="-10%" y="-20%" width="120%" height="130%">
                  <feDropShadow dx="0" dy="-2" stdDeviation="2.5" floodColor="#76264F" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Left Flap */}
              <path
                d="M 0,0 L 160,102 L 0,195 Z"
                fill="url(#sideFlapGrad)"
                stroke="#E77AA5"
                strokeWidth="1"
              />

              {/* Right Flap */}
              <path
                d="M 320,0 L 160,102 L 320,195 Z"
                fill="url(#sideFlapGrad)"
                stroke="#E77AA5"
                strokeWidth="1"
              />

              {/* Bottom Flap with soft shadow overlapping sides */}
              <path
                d="M 0,195 L 160,86 L 320,195 Z"
                fill="url(#bottomFlapGrad)"
                filter="url(#bottomFlapShadow)"
                stroke="#C02F70"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* Top Flap (Hinged at top, rotates upwards on click) */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[105px] origin-top z-20 preserve-3d"
            initial={{ rotateX: 0 }}
            animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front Face (closed, pointing down) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
                background: 'linear-gradient(180deg, #FDE8F1 0%, #F7C1D7 40%, #C02F70 100%)',
                filter: 'drop-shadow(0 4px 8px rgba(56, 34, 53, 0.25))',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Gold border line */}
              <div
                className="w-full h-full"
                style={{
                  clipPath: 'polygon(0% 0%, 50% 98%, 100% 0%, 97% 0%, 50% 92%, 3% 0%)',
                  background: 'linear-gradient(90deg, #E8B957 0%, #FFF2D6 50%, #E8B957 100%)',
                  opacity: 0.75,
                }}
              />
            </div>

            {/* Back Face (visible when rotated 180° upwards) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
                background: 'linear-gradient(180deg, #FFF6F9 0%, #FDE8F1 50%, #F7C1D7 100%)',
                transform: 'rotateX(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />
          </motion.div>

          {/* Centered Royal Gold Wax Seal with Heart */}
          <AnimatePresence>
            {!isOpening && (
              <motion.div
                className="absolute top-[100px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-25"
                initial={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-2 border-white text-white cursor-pointer transform hover:scale-110 active:scale-95 transition-transform"
                  style={{
                    background:
                      'radial-gradient(circle at 35% 35%, #FFF2D6 0%, #E8B957 45%, #C58B73 80%, #76264F 100%)',
                    boxShadow: '0 6px 18px rgba(118, 38, 79, 0.5), 0 0 16px rgba(232, 185, 87, 0.5)',
                  }}
                  title="Click to open envelope"
                >
                  <Heart className="w-5 h-5 fill-white text-white drop-shadow-sm animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 
        4. WHITE WELCOME CARD (Positioned properly BELOW the envelope, 100% visible)
        - Never covered or hidden by the envelope
        - Full readable welcome message
        - "Today, this little fairytale kingdom is completely yours."
        - "Forever your brother ❤️"
      */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className="w-full max-w-md mt-4 relative z-10"
      >
        <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-royalRose/35 shadow-xl text-center space-y-3 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-blushPink/30 rounded-full blur-xl pointer-events-none" />

          <p className="font-heading text-xl sm:text-2xl font-black text-deepPlum">
            Welcome, My Princess 👑
          </p>

          <p className="font-letter text-base sm:text-lg text-deepPlum/90 leading-relaxed font-semibold">
            "Today, this little fairytale kingdom is completely yours."
          </p>

          <p className="font-sans text-xs sm:text-sm text-deepBerry/80 font-medium">
            Not because of any special occasion, but simply because you deserve to know how deeply you are loved, valued and cherished.
          </p>

          <div className="pt-2 border-t border-royalRose/20">
            <span className="font-handwriting text-2xl text-royalRose font-black">
              Forever your brother ❤️
            </span>
          </div>
        </div>
      </motion.div>

      {/* 5. PRIMARY OPENING CTA BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
        className="mt-6 z-20 w-full flex flex-col items-center"
      >
        <button
          type="button"
          onClick={handleOpenClick}
          className="btn-royal-primary text-base sm:text-lg min-h-[52px] px-8 sm:px-10 py-3.5 w-full sm:w-auto shadow-btn-primary active:scale-95 transition-all"
        >
          {isOpen ? (
            <span className="flex items-center gap-2">
              <span>Step Into Your Kingdom</span>
              <span className="text-xl">👑 &rarr;</span>
            </span>
          ) : isOpening ? (
            <span className="flex items-center gap-2">
              <span>Opening Your Letter...</span>
              <Sparkles className="w-5 h-5 text-royalGold animate-spin" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>Open Your Little Surprise</span>
              <span className="text-xl">💌</span>
            </span>
          )}
        </button>

        <p className="font-handwriting text-base sm:text-lg text-deepBerry text-center mt-2.5 font-bold">
          {isOpen
            ? 'Tap above to enter Chapter 1 of your storybook.'
            : 'Made with all my heart, just for you.'}
        </p>
      </motion.div>
    </div>
  );
};
