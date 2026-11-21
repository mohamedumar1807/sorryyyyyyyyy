import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface PhotoFrame3DProps {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  badge?: string;
  crownOnTop?: boolean;
  className?: string;
  onClick?: () => void;
  aspect?: 'portrait' | 'landscape' | 'square';
}

export const PhotoFrame3D: React.FC<PhotoFrame3DProps> = ({
  src,
  alt,
  title,
  caption,
  badge,
  crownOnTop = false,
  className = '',
  onClick,
  aspect = 'portrait',
}) => {
  const { isPlaying } = useAudio();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 15);
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={`relative inline-block perspective-1500 cursor-pointer group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Crown on top option */}
      {crownOnTop && (
        <motion.div
          className="absolute -top-7 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border-2 border-royalGold text-royalRose backdrop-blur-sm">
            <Crown className="w-6 h-6 text-royalGold fill-royalGold/30" />
          </div>
        </motion.div>
      )}

      {/* Ambient background glow — pulses when music is playing */}
      <div
        className={`absolute inset-0 rounded-3xl blur-xl transform group-hover:scale-105 transition-all duration-700 ${
          isPlaying
            ? 'bg-gradient-to-tr from-vibrantRose/40 via-richLavender/40 to-royalGold/30 opacity-90'
            : 'bg-gradient-to-tr from-rose-300/30 via-lavender/30 to-amber-200/20 opacity-60'
        }`}
      />

      {/* 3D Frame Container — Rich Rose Gold & Deep Berry Rim */}
      <motion.div
        className="relative preserve-3d rounded-2xl p-2.5 sm:p-3 transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          background: 'linear-gradient(145deg, #FFFFFF 0%, #F7C1D7 40%, #C58B73 80%, #76264F 100%)',
          boxShadow: '0 24px 48px -12px rgba(56, 34, 53, 0.35), 0 0 0 2px rgba(197, 139, 115, 0.6)',
        }}
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Inner Solid White/Cream Border for High Contrast */}
        <div className="relative rounded-xl overflow-hidden border-2 border-white shadow-inner bg-warmCream">
          {/* Photograph Container */}
          <div
            className={`relative overflow-hidden ${
              aspect === 'portrait'
                ? 'aspect-[3/4] max-h-[460px]'
                : aspect === 'landscape'
                ? 'aspect-[4/3] max-h-[360px]'
                : 'aspect-square max-h-[380px]'
            } flex items-center justify-center bg-blushPink/30`}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = 'true';
                  target.src = '/images/Snapchat-378253179.jpg';
                }
              }}
            />

            {/* Subtle glass reflection overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-500"
              style={{
                background:
                  'linear-gradient(125deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(231, 122, 165, 0.2) 100%)',
              }}
            />

            {/* High-Contrast Badge */}
            {badge && (
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-deepPlum/90 backdrop-blur-md border border-royalGold/60 text-xs font-semibold text-white flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3 h-3 text-royalGold" />
                <span>{badge}</span>
              </div>
            )}
          </div>

          {/* Caption bar — Deep Plum & Berry typography for maximum readability */}
          {(title || caption) && (
            <div className="p-3.5 sm:p-4 bg-white/95 border-t-2 border-royalRose/20 text-center">
              {title && (
                <h4 className="font-heading text-base sm:text-lg font-bold text-deepPlum">
                  {title}
                </h4>
              )}
              {caption && (
                <p className="font-letter text-sm sm:text-base italic text-deepBerry mt-0.5 leading-snug font-medium">
                  {caption}
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
