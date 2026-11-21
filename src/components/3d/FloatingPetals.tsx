import React, { useMemo } from 'react';
import { useAudio } from '../../context/AudioContext';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  type: 'petal' | 'sparkle' | 'heart' | 'goldStar';
  opacity: number;
}

export const FloatingPetals: React.FC<{ count?: number }> = ({ count = 28 }) => {
  const { isPlaying } = useAudio();

  const items = useMemo(() => {
    const list: Petal[] = [];
    for (let i = 0; i < count; i++) {
      const isSparkle = i % 4 === 0;
      const isHeart = i % 6 === 0;
      const isGoldStar = i % 8 === 0;
      list.push({
        id: i,
        left: Math.random() * 98,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 8,
        size: isSparkle ? 10 + Math.random() * 6 : 16 + Math.random() * 14,
        type: isGoldStar ? 'goldStar' : isHeart ? 'heart' : isSparkle ? 'sparkle' : 'petal',
        opacity: 0.45 + Math.random() * 0.45,
      });
    }
    return list;
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute -top-8 animate-petalFall"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: isPlaying ? `${item.duration * 0.85}s` : `${item.duration}s`,
            opacity: isPlaying ? item.opacity : item.opacity * 0.65,
            width: `${item.size}px`,
            height: `${item.size}px`,
          }}
        >
          {item.type === 'sparkle' ? (
            <svg viewBox="0 0 24 24" fill="#E8B957" className="w-full h-full filter drop-shadow(0 0 6px #C58B73)">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          ) : item.type === 'goldStar' ? (
            <svg viewBox="0 0 24 24" fill="#E8B957" className="w-full h-full filter drop-shadow(0 0 8px #E8B957)">
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
            </svg>
          ) : item.type === 'heart' ? (
            <svg viewBox="0 0 24 24" fill="#C94F83" className="w-full h-full filter drop-shadow(0 0 4px #F7C1D7)">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            // Rich Rose Petal
            <div
              className="w-full h-full rounded-[50%_0%_50%_50%] transform rotate-45 shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #F7C1D7 0%, #E77AA5 70%, #C94F83 100%)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
