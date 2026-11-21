import React from 'react';
import { Crown, Images, RotateCcw, Heart, Sparkles } from 'lucide-react';

interface HeaderBarProps {
  onOpenPhotoManager: () => void;
  onOpen3DShowcase: () => void;
  onReplay: () => void;
  currentChapterId: number;
  totalChapters: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onOpenPhotoManager,
  onOpen3DShowcase,
  onReplay,
  currentChapterId,
  totalChapters,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-8 py-2.5 sm:py-3 bg-white/95 backdrop-blur-md border-b-2 border-royalRose/30 shadow-md transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Title — High Contrast */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blushPink flex items-center justify-center text-royalRose shadow-sm border-2 border-royalGold/60 shrink-0">
            <Crown className="w-5 h-5 fill-royalGold text-royalRose" />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-sm sm:text-base text-deepPlum tracking-wide flex items-center gap-1.5">
              <span>TO MY THANGA PULLA</span>
              <Heart className="w-4 h-4 text-royalRose fill-royalRose" />
            </h1>
            <p className="font-sans text-[10px] text-deepBerry/80 tracking-wider uppercase font-bold hidden sm:block">
              My Princess Of This World
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Chapter counter badge */}
          <div className="px-3.5 py-1.5 min-h-[40px] flex items-center justify-center rounded-full bg-warmCream border-2 border-royalRose/40 text-xs font-bold text-deepPlum shadow-sm">
            <span className="text-royalRose font-extrabold">{currentChapterId}</span> / {totalChapters}
          </div>

          {/* 3D Fairytale Scenes Showcase Button */}
          <button
            type="button"
            onClick={onOpen3DShowcase}
            className="px-4 py-2 min-h-[44px] rounded-full btn-royal-gold text-deepPlum border-2 border-white text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            title="Explore 12 Cinematic 3D Scenes"
          >
            <Sparkles className="w-4 h-4 text-deepPlum animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">3D Fairytale</span>
          </button>

          {/* Manage / Personalize photos */}
          <button
            type="button"
            onClick={onOpenPhotoManager}
            className="px-4 py-2 min-h-[44px] rounded-full btn-royal-secondary text-white border-2 border-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md active:scale-95"
            title="Personalize or view photos"
          >
            <Images className="w-4 h-4 text-royalGold" />
            <span className="hidden sm:inline">Photos</span>
          </button>

          {/* Replay */}
          <button
            type="button"
            onClick={onReplay}
            className="w-11 h-11 rounded-full btn-icon-control flex items-center justify-center shadow-md active:scale-95"
            title="Replay from Beginning"
            aria-label="Replay from Beginning"
          >
            <RotateCcw className="w-5 h-5 text-deepPlum hover:text-royalRose" />
          </button>
        </div>
      </div>
    </header>
  );
};
