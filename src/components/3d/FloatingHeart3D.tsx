import React from 'react';
import { motion } from 'framer-motion';

interface FloatingHeart3DProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const FloatingHeart3D: React.FC<FloatingHeart3DProps> = ({
  size = 54,
  className = '',
  glow = true,
}) => {
  return (
    <div className={`relative inline-block perspective-1000 ${className}`}>
      <motion.div
        className="relative preserve-3d"
        animate={{
          y: [0, -8, 0],
          rotateY: [-8, 8, -8],
          rotateX: [4, -4, 4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Soft shadow underneath */}
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-2 bg-deepPlum/30 rounded-full blur-sm"
          style={{ transform: 'rotateX(80deg)' }}
        />

        {/* 3D Heart Body with Rich Pink & Royal Rose Highlights */}
        <div
          className={`relative flex items-center justify-center ${
            glow ? 'filter drop-shadow(0 0 18px rgba(201, 79, 131, 0.75))' : ''
          }`}
          style={{ width: size, height: size }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="heart3dRichGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="20%" stopColor="#F7C1D7" />
                <stop offset="55%" stopColor="#E77AA5" />
                <stop offset="85%" stopColor="#C94F83" />
                <stop offset="100%" stopColor="#76264F" />
              </linearGradient>
              <radialGradient id="glossHighlightRich" cx="35%" cy="30%" r="40%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Back subtle depth */}
            <path
              d="M50 88C50 88 12 62 12 32C12 18 24 10 36 10C43 10 50 16 50 22C50 16 57 10 64 10C76 10 88 18 88 32C88 62 50 88 50 88Z"
              fill="#382235"
              transform="translate(1.5, 2.5)"
              opacity="0.35"
            />

            {/* Main heart */}
            <path
              d="M50 86C50 86 14 61 14 32C14 19 25 11 37 11C44 11 50 17 50 23C50 17 56 11 63 11C75 11 86 19 86 32C86 61 50 86 50 86Z"
              fill="url(#heart3dRichGrad)"
            />

            {/* Glossy curved highlight */}
            <path
              d="M36 14C28 14 20 20 20 30C20 40 32 54 48 68C42 56 32 46 32 34C32 24 38 18 45 16C42 14 39 14 36 14Z"
              fill="url(#glossHighlightRich)"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};
