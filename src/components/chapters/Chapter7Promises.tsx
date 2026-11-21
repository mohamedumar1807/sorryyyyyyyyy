import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Ear, MessageSquareHeart, HeartHandshake, Sparkles, Gem, CheckCircle } from 'lucide-react';
import { PromiseItem } from '../../types';
import { promisesList } from '../../data/storyData';

interface Chapter7Props {
  onNext: () => void;
}

export const Chapter7Promises: React.FC<Chapter7Props> = ({ onNext }) => {
  const [readPromises, setReadPromises] = useState<number[]>([1, 2]);

  const toggleRead = (id: number) => {
    if (readPromises.includes(id)) {
      setReadPromises(readPromises.filter((p) => p !== id));
    } else {
      setReadPromises([...readPromises, id]);
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Ear':
        return <Ear className="w-5 h-5 text-royalRose" />;
      case 'MessageSquareHeart':
        return <MessageSquareHeart className="w-5 h-5 text-royalRose" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-royalRose" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-royalRose" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-royalRose" />;
      case 'Gem':
        return <Gem className="w-5 h-5 text-royalRose" />;
      default:
        return <CheckCircle className="w-5 h-5 text-royalRose" />;
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Chapter Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-royalRose/40 text-xs font-bold text-royalRose uppercase tracking-wider mb-4 shadow-md"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-royalRose" />
        <span>Chapter 07 &bull; A Brother's Vow</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="font-heading text-3xl sm:text-5xl font-extrabold text-center text-deepPlum tracking-tight mb-2"
      >
        I don't want to just say sorry.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-letter text-lg sm:text-xl italic text-deepBerry font-semibold text-center mb-8 max-w-xl"
      >
        "I cannot promise that I'll never make mistakes. But I can promise that I will never stop trying to be a better brother."
      </motion.p>

      {/* 6 Interactive Promise Cards — High Contrast Deep Borders */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
        {promisesList.map((p, idx) => {
          const isOpened = readPromises.includes(p.id);

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.08, duration: 0.5 }}
              onClick={() => toggleRead(p.id)}
              className="cursor-pointer group"
            >
              <div
                className={`p-5 rounded-2xl transition-all duration-300 border-2 ${isOpened
                  ? 'bg-white border-royalRose shadow-lg ring-4 ring-blushPink/50'
                  : 'bg-white/90 hover:bg-white border-royalRose/30 shadow-sm'
                  }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-xl bg-blushPink/60 text-royalRose">
                      {getIcon(p.iconName)}
                    </span>
                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-deepPlum">
                      {p.title}
                    </h4>
                  </div>
                  <span className="font-sans text-xs font-black text-royalGold">
                    {p.number}
                  </span>
                </div>

                <p className="font-letter text-base sm:text-lg text-deepPlum/90 italic leading-relaxed pl-12 font-medium">
                  "{p.description}"
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Concluding Note */}
      <div className="w-full max-w-2xl mt-8 p-7 rounded-3xl bg-warmCream border-2 border-royalGold/60 text-center space-y-2 shadow-md">
        <p className="font-heading text-xl font-extrabold text-deepPlum">
          I don't want you to question your place in my life.
        </p>
        <p className="font-letter text-lg italic text-deepBerry font-bold">
          You already have a special place that no fight, anger or argument can ever take away.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={onNext}
          className="btn-royal-primary min-h-[48px] px-10 text-base font-bold flex items-center justify-center gap-2 active:scale-95 shadow-md"
        >
          <span>The Final Letter</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
};
