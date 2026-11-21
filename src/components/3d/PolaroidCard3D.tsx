import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart } from 'lucide-react';
import { SisterPhoto } from '../../types';

interface PolaroidCard3DProps {
  photo: SisterPhoto;
  index: number;
  onClick: (photo: SisterPhoto) => void;
  className?: string;
}

export const PolaroidCard3D: React.FC<PolaroidCard3DProps> = ({
  photo,
  index,
  onClick,
  className = '',
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [liked, setLiked] = useState(false);

  const initialRotate = (index % 2 === 0 ? 1 : -1) * ((index % 3) * 1.5 + 1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 18);
    setRotateY(x / 18);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={`relative inline-block perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative preserve-3d bg-white rounded-xl p-3 sm:p-4 shadow-3d-card border-2 border-royalRose/30 cursor-pointer group transition-all duration-300"
        style={{
          transform: `rotate(${initialRotate}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          boxShadow: '0 20px 40px -10px rgba(56, 34, 53, 0.25), 0 0 0 1px rgba(231, 122, 165, 0.3)',
        }}
        whileHover={{
          scale: 1.035,
          rotate: 0,
          zIndex: 30,
          boxShadow: '0 28px 55px -12px rgba(118, 38, 79, 0.45)',
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onClick(photo)}
      >
        {/* Decorative Tape with Royal Gold & Vibrant Rose */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 opacity-90 shadow-sm pointer-events-none rounded-sm border border-white/60"
          style={{
            background:
              index % 2 === 0
                ? 'linear-gradient(90deg, #E8B957 0%, #C58B73 100%)'
                : 'linear-gradient(90deg, #C94F83 0%, #A88AE0 100%)',
            transform: `rotate(${index % 2 === 0 ? -2 : 3}deg)`,
          }}
        />

        {/* Polaroid Image Window */}
        <div className="relative overflow-hidden rounded-lg bg-warmCream aspect-[4/5] sm:aspect-[3/4] flex items-center justify-center border border-royalRose/15">
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.tried) {
                target.dataset.tried = 'true';
                target.src = '/images/Snapchat-378253179.jpg';
              }
            }}
          />

          {/* Hover Overlay with View Icon */}
          <div className="absolute inset-0 bg-deepPlum/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <span className="p-3 rounded-full bg-white text-royalRose shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Eye className="w-5 h-5" />
            </span>
          </div>

          {/* High-Contrast Memory Tag */}
          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-deepPlum/85 backdrop-blur-sm text-[10px] font-bold text-white tracking-wider uppercase border border-royalGold/40 shadow-sm">
            Memory #{index + 1}
          </div>
        </div>

        {/* Polaroid Bottom Caption Area — High Contrast */}
        <div className="pt-3 pb-1 px-1 flex items-start justify-between gap-2">
          <div className="text-left flex-1 min-w-0">
            <p className="font-heading font-bold text-sm sm:text-base text-deepPlum truncate">
              {photo.title}
            </p>
            <p className="font-handwriting text-base sm:text-lg text-royalRose mt-0.5 leading-snug line-clamp-2 font-semibold">
              "{photo.caption}"
            </p>
          </div>

          {/* Interactive Heart Like Button */}
          <button
            type="button"
            className="mt-1 p-1.5 rounded-full hover:bg-blushPink/50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            aria-label="Favorite memory"
          >
            <Heart
              className={`w-5 h-5 transition-transform duration-200 active:scale-125 ${
                liked ? 'text-royalRose fill-royalRose' : 'text-roseGold hover:text-royalRose'
              }`}
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
