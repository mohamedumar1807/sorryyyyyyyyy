import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ChapterMeta } from '../../types';

interface ChapterNavProps {
  chapters: ChapterMeta[];
  currentChapter: number;
  onSelectChapter: (id: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ChapterNav: React.FC<ChapterNavProps> = ({
  chapters,
  currentChapter,
  onSelectChapter,
  onNext,
  onPrev,
}) => {
  const isFirst = currentChapter === 1;
  const isLast = currentChapter === chapters.length;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center gap-4">
      {/* Chapter Indicator Dots with Tooltips */}
      <div className="flex items-center justify-center gap-2 p-2.5 rounded-full bg-white/95 border-2 border-royalRose/40 shadow-lg">
        {chapters.map((chap) => {
          const isActive = chap.id === currentChapter;
          const isPassed = chap.id < currentChapter;

          return (
            <button
              key={chap.id}
              type="button"
              onClick={() => onSelectChapter(chap.id)}
              className="group relative p-1.5 focus:outline-none"
              aria-label={`Go to chapter ${chap.id}: ${chap.title}`}
            >
              <div
                className={`transition-all duration-300 rounded-full ${isActive
                    ? 'w-8 sm:w-10 h-3 bg-royalRose shadow-md'
                    : isPassed
                      ? 'w-3 h-3 bg-roseGold'
                      : 'w-2.5 h-2.5 bg-roseGold/40 hover:bg-roseGold/80'
                  }`}
              />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-lg bg-deepPlum text-white text-[10px] font-sans font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-30">
                {chap.id}. {chap.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Prev / Next Navigation Buttons */}
      <div className="flex items-center justify-between w-full max-w-lg pt-3 gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className={`flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-full font-sans text-base font-bold transition-all shadow-md ${isFirst
              ? 'opacity-30 cursor-not-allowed text-deepPlum/40 bg-gray-200'
              : 'btn-royal-secondary active:scale-95'
            }`}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
          <span>Previous</span>
        </button>

        <span className="font-letter text-base sm:text-lg italic text-deepBerry font-extrabold hidden sm:inline text-center">
          {chapters[currentChapter - 1]?.subtitle}
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={isLast}
          className={`flex items-center justify-center gap-2 px-7 py-3 min-h-[48px] rounded-full font-sans text-base font-bold transition-all shadow-md ${isLast
              ? 'opacity-30 cursor-not-allowed text-deepPlum/40 bg-gray-200'
              : 'btn-royal-primary active:scale-95'
            }`}
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};
