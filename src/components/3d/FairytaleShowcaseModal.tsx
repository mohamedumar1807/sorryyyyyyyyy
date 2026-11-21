import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Crown, Heart, Clock, BookOpen, Flower2, Gift, Eye } from 'lucide-react';
import { SisterPhoto } from '../../types';

// The 3D Scene Components
import { PrincessKingdom3D } from './scenes/PrincessKingdom3D';
import { TeddyBearLetter3D } from './scenes/TeddyBearLetter3D';
import { TimeHourglass3D } from './scenes/TimeHourglass3D';
import { MemoryBook3D } from './scenes/MemoryBook3D';
import { FlowerGarden3D } from './scenes/FlowerGarden3D';
import { CrownCeremony3D } from './scenes/CrownCeremony3D';
import { HeartUniverse3D } from './scenes/HeartUniverse3D';
import { ForgivenessButterfly3D } from './scenes/ForgivenessButterfly3D';
import { TeddyHugging3D } from './scenes/TeddyHugging3D';
import { PhotoFrame3D } from './PhotoFrame3D';

interface FairytaleShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  photos: SisterPhoto[];
  onPhotoClick: (photo: SisterPhoto) => void;
}

export const FairytaleShowcaseModal: React.FC<FairytaleShowcaseProps> = ({
  isOpen,
  onClose,
  photos,
  onPhotoClick,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  if (!isOpen) return null;

  const scenes = [
    { title: 'Princess Kingdom', icon: Crown, desc: '3D Castle, Floating Clouds & Butterflies' },
    { title: 'Teddy Messenger', icon: Gift, desc: 'Plush Teddy Bear Delivering Heart Letter' },
    { title: 'Turning Back Time', icon: Clock, desc: 'Golden Hourglass & Reversing Years' },
    { title: 'Memory Scrapbook', icon: BookOpen, desc: 'Realistic 3D Page-Turning Book' },
    { title: 'Magical Garden', icon: Flower2, desc: '5 Glowing Flowers of Sisterhood' },
    { title: 'Crown Ceremony', icon: Crown, desc: 'Rose-Gold Crown Descending on Velvet' },
    { title: 'Heart Universe', icon: Heart, desc: 'Nebula Starlight Orbiting 3D Heart' },
    { title: 'Forgiveness Butterfly', icon: Sparkles, desc: 'Gentle Butterfly Resting on Rose' },
    { title: 'Two Teddy Hug', icon: Heart, desc: 'Sibling Hug with Photo Collage' },
    { title: 'Royal Final Portrait', icon: Eye, desc: 'Princess in 3D Rose-Gold Glass Frame' },
  ];

  const mainPhoto = photos[2] || photos[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-deepPlum/85 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] bg-warmCream rounded-3xl border-4 border-royalGold/60 shadow-2xl flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header — High Contrast Deep Plum & Berry */}
          <div className="px-6 py-4 bg-white/95 border-b-2 border-royalRose/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Crown className="w-6 h-6 text-royalRose fill-royalGold" />
              <div>
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-deepPlum">
                  Cinematic 3D Fairytale Experience
                </h3>
                <p className="font-sans text-[11px] text-deepBerry font-bold tracking-wider uppercase">
                  12 Magical 3D Scenes for Thanga Pulla
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full btn-icon-control flex items-center justify-center shadow-sm active:scale-95"
              aria-label="Close showcase"
            >
              <X className="w-5 h-5 text-deepPlum" />
            </button>
          </div>

          {/* Scene Selector Ribbon */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-blushPink/50 border-b-2 border-royalRose/20 overflow-x-auto no-scrollbar">
            {scenes.map((s, idx) => {
              const Icon = s.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full text-xs sm:text-sm font-sans whitespace-nowrap transition-all shrink-0 active:scale-95 ${
                    isActive
                      ? 'btn-royal-primary shadow-md scale-105'
                      : 'btn-royal-secondary shadow-sm'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-royalGold' : 'text-white'}`} />
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active 3D Scene Viewport */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
            {activeTab === 0 && <PrincessKingdom3D className="max-w-xl mx-auto" />}
            {activeTab === 1 && <TeddyBearLetter3D className="max-w-xl mx-auto" />}
            {activeTab === 2 && (
              <TimeHourglass3D
                className="max-w-md mx-auto"
                onTimeReversed={() => onPhotoClick(photos[0])}
              />
            )}
            {activeTab === 3 && (
              <MemoryBook3D
                photos={photos}
                onPhotoClick={onPhotoClick}
                className="max-w-2xl mx-auto"
              />
            )}
            {activeTab === 4 && <FlowerGarden3D className="max-w-xl mx-auto" />}
            {activeTab === 5 && <CrownCeremony3D className="max-w-lg mx-auto" />}
            {activeTab === 6 && <HeartUniverse3D className="max-w-lg mx-auto" />}
            {activeTab === 7 && <ForgivenessButterfly3D className="max-w-xl mx-auto" />}
            {activeTab === 8 && <TeddyHugging3D photos={photos} className="max-w-xl mx-auto" />}
            {activeTab === 9 && (
              <div className="w-full max-w-sm mx-auto text-center">
                <PhotoFrame3D
                  src={mainPhoto.src}
                  alt={mainPhoto.alt}
                  title={mainPhoto.title}
                  caption={mainPhoto.caption}
                  badge="Royal Climax"
                  crownOnTop={true}
                  onClick={() => onPhotoClick(mainPhoto)}
                />
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="px-6 py-3.5 bg-white/95 border-t-2 border-royalRose/20 flex items-center justify-between text-xs text-deepPlum font-bold">
            <span>
              Scene {activeTab + 1} of {scenes.length}:{' '}
              <strong className="text-royalRose">{scenes[activeTab].title}</strong>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="btn-royal-primary px-8 py-2.5 min-h-[44px] rounded-full text-white font-bold text-sm transition-all shadow-md active:scale-95"
            >
              Back To Story
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
