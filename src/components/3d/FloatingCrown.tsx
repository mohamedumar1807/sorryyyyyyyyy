import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCrownProps {
  className?: string;
  size?: number;
}

export const FloatingCrown: React.FC<FloatingCrownProps> = ({ className = '', size = 52 }) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      animate={{
        y: [0, -6, 0],
        rotate: [-1, 2, -1],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="relative filter drop-shadow(0 6px 14px rgba(232, 185, 87, 0.55))">
        <svg
          width={size}
          height={size * 0.8}
          viewBox="0 0 48 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="crownRoyalGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="30%" stopColor="#E8B957" />
              <stop offset="70%" stopColor="#C58B73" />
              <stop offset="100%" stopColor="#C94F83" />
            </linearGradient>
            <filter id="glowCrown" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Crown Base */}
          <path
            d="M6 31C6 31 16 33 24 33C32 33 42 31 42 31L40 35C40 35 30 37 24 37C18 37 8 35 8 35L6 31Z"
            fill="url(#crownRoyalGold)"
          />

          {/* Crown Main Body with 5 Royal Peaks */}
          <path
            d="M4 14L12 28H36L44 14L33 21L24 7L15 21L4 14Z"
            fill="url(#crownRoyalGold)"
            stroke="#FFFFFF"
            strokeWidth="1.0"
          />

          {/* Sparkle Jewels on peaks */}
          <circle cx="24" cy="7" r="2.8" fill="#FFFFFF" filter="url(#glowCrown)" />
          <circle cx="4" cy="14" r="2.2" fill="#FFFFFF" />
          <circle cx="44" cy="14" r="2.2" fill="#FFFFFF" />
          <circle cx="15" cy="21" r="1.8" fill="#F7C1D7" />
          <circle cx="33" cy="21" r="1.8" fill="#F7C1D7" />

          {/* Crown band jewels */}
          <circle cx="16" cy="33" r="1.4" fill="#FFFFFF" />
          <circle cx="24" cy="33.5" r="1.8" fill="#FFFFFF" />
          <circle cx="32" cy="33" r="1.4" fill="#FFFFFF" />
        </svg>

        {/* Shimmer sparkle */}
        <motion.div
          className="absolute -top-1 right-2 w-2.5 h-2.5 bg-white rounded-full blur-[0.5px]"
          animate={{
            scale: [0.6, 1.4, 0.6],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
};
