import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Heart } from 'lucide-react';
import { SisterPhoto } from '../../types';
import { PhotoFrame3D } from '../3d/PhotoFrame3D';
import { TimeHourglass3D } from '../3d/scenes/TimeHourglass3D';
import { CrownCeremony3D } from '../3d/scenes/CrownCeremony3D';

interface Chapter4Props {
  childhoodPhoto: SisterPhoto;
  recentPhoto: SisterPhoto;
  onPhotoClick: (photo: SisterPhoto) => void;
  onNext: () => void;
}

export const Chapter4Princess: React.FC<Chapter4Props> = ({
  childhoodPhoto,
  recentPhoto,
  onPhotoClick,
  onNext,
}) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Chapter Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-royalRose/40 text-xs font-bold text-royalRose uppercase tracking-wider mb-4 shadow-md"
      >
        <Crown className="w-3.5 h-3.5 text-royalGold" />
        <span>Chapter 04 &bull; Royal Fairytale</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold text-center text-deepPlum tracking-tight mb-2"
      >
        Every world has a princess. Mine is you.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-letter text-xl sm:text-2xl italic text-deepBerry font-semibold text-center mb-6"
      >
        "From that little girl in blue ribbons to the beautiful princess you are today."
      </motion.p>

      {/* 3D Golden Hourglass (Turning Back Time) */}
      <div className="w-full max-w-md my-4">
        <TimeHourglass3D onTimeReversed={() => onPhotoClick(childhoodPhoto)} />
      </div>

      {/* Side-by-side Photo Timeline: Childhood to Now */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl my-6">
        {/* Photo 1: Childhood School Photo */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[270px]">
            <PhotoFrame3D
              src={childhoodPhoto.src}
              alt={childhoodPhoto.alt}
              title={childhoodPhoto.title}
              caption={childhoodPhoto.caption}
              badge="Little Princess"
              onClick={() => onPhotoClick(childhoodPhoto)}
            />
          </div>
        </div>

        {/* Photo 3: Recent Green Outfit Portrait */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[270px]">
            <PhotoFrame3D
              src={recentPhoto.src}
              alt={recentPhoto.alt}
              title={recentPhoto.title}
              caption={recentPhoto.caption}
              badge="Today's Princess"
              crownOnTop={true}
              onClick={() => onPhotoClick(recentPhoto)}
            />
          </div>
        </div>
      </div>

      {/* 3D Princess Crown Ceremony Scene */}
      <div className="w-full max-w-lg my-6">
        <CrownCeremony3D />
      </div>

      {/* The Brother's Letter — High Contrast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="w-full max-w-2xl mt-4"
      >
        <div className="p-7 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-royalRose/40 shadow-2xl space-y-5 text-deepPlum font-letter text-lg sm:text-xl leading-relaxed">
          <p>
            From that little girl in the school photograph with blue hair ribbons to the beautiful person you are today...
          </p>

          <p>
            I wish I could show you how genuinely special and wonderful you look through my eyes.
          </p>

          <div className="p-5 rounded-2xl bg-warmCream border-2 border-royalGold/50 space-y-2">
            <p className="font-heading text-xl font-extrabold text-royalRose">
              You don't need a crown.
            </p>
            <p className="italic font-medium">You don't need to be perfect.</p>
            <p className="italic font-medium">You don't need to smile every day.</p>
          </div>

          <div className="pl-4 border-l-4 border-royalRose space-y-1.5 font-semibold text-deepBerry bg-blushPink/20 p-3 rounded-r-xl">
            <p>You can be angry with me.</p>
            <p>You can disagree with me.</p>
            <p>You can tell me when I hurt you.</p>
          </div>

          <p>
            I want you to always feel safe to be yourself around me.
          </p>

          <p className="font-heading text-xl font-bold text-deepPlum pt-2">
            And in my little world, you will always have your own irreplaceable throne:
          </p>

          <div className="text-center py-3 space-y-1 bg-warmCream rounded-2xl border-2 border-royalRose/20">
            <p className="font-heading text-3xl font-black text-royalRose">
              My little princess. 👑
            </p>
            <p className="font-heading text-2xl font-bold text-deepPlum">
              My Thanga Pulla.
            </p>
            <p className="font-handwriting text-2xl text-deepBerry font-bold">
              My forever favourite girl. ❤️
            </p>
          </div>
        </div>
      </motion.div>

      {/* SPECIAL EMOTIONAL SECTION: A BROTHER'S SACRED PROMISE (CARING LIKE APPA) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl mt-10"
      >
        <div className="relative p-7 sm:p-12 rounded-3xl bg-gradient-to-b from-white via-[#FFF5F8] to-[#FFFBF5] border-2 border-royalRose/40 shadow-2xl space-y-6 text-deepPlum font-letter text-lg sm:text-xl leading-relaxed overflow-hidden">
          {/* Rose-Gold Filigree Corner Accents */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-roseGold/60 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-roseGold/60 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-roseGold/60 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-roseGold/60 rounded-br-lg pointer-events-none" />

          {/* Glowing Crown Icon Header */}
          <div className="flex flex-col items-center text-center pt-2">
            <div className="relative inline-flex items-center justify-center mb-3">
              <motion.div
                className="absolute inset-0 rounded-full bg-royalGold/30 blur-xl"
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#FFF2D6] via-[#E8B957] to-[#C58B73] border-2 border-white flex items-center justify-center shadow-lg">
                <Crown className="w-7 h-7 text-deepPlum fill-deepPlum drop-shadow-sm" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blushPink/60 border border-royalRose/30 text-xs font-bold text-royalRose uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-royalGold" />
              <span>A Brother's Sacred Promise</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-deepPlum tracking-tight">
              Caring For You With A Father's Heart
            </h3>
            <p className="font-handwriting text-xl sm:text-2xl text-deepBerry font-bold mt-1">
              "The kind of love, protection and care you deserve..."
            </p>
          </div>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-royalRose/50 to-transparent mx-auto my-3" />

          {/* Staggered Paragraphs with Gentle Fade-In */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-deepPlum/95"
          >
            One thing I always wish for is to be like your father in the way I care for you. The way he loves you, protects you, looks after you, and makes you feel like a princess — I want to make you feel that same kind of special love and care.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-4 rounded-2xl bg-warmCream/80 border border-royalGold/40 text-deepPlum font-medium italic"
          >
            I know nobody can ever take your father's place, and I would never want to. He will always be your father, your first hero, and someone irreplaceable in your life.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-deepPlum/95"
          >
            But I want to be that one person you can always count on after{' '}
            <span className="inline-block px-2.5 py-0.5 rounded-lg bg-blushPink/80 border border-royalRose/40 text-royalRose font-extrabold font-sans shadow-sm">
              Appa and Amma
            </span>
            . Someone who listens to you, stands beside you, protects you when you need it, supports your dreams, makes you smile when you're sad, and reminds you how precious you are.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-4 rounded-2xl bg-blushPink/30 border-l-4 border-royalRose font-bold text-deepBerry shadow-sm"
          >
            I don't want you to ever feel like you're alone or that you have to face everything by yourself.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-deepPlum/95"
          >
            You are not just my sister. You are my{' '}
            <span className="inline-block px-2.5 py-0.5 rounded-lg bg-blushPink border border-royalRose/40 text-royalRose font-black font-heading tracking-wide shadow-sm">
              Thanga Pulla
            </span>
            ,{' '}
            <span className="inline-block px-2.5 py-0.5 rounded-lg bg-warmCream border border-royalGold text-deepPlum font-black font-heading tracking-wide shadow-sm">
              my little princess
            </span>
            , and one of the most important people in my world.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-deepPlum/95"
          >
            Even if I sometimes fail to express my love properly, please never doubt how much you mean to me. I may not be perfect, but I promise to keep trying to become a better brother for you.
          </motion.p>

          {/* Highlighted Banner Line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blushPink/70 via-warmCream to-blushPink/70 border-2 border-royalRose text-center shadow-md my-4"
          >
            <p className="font-heading text-xl sm:text-2xl font-black text-royalRose leading-snug">
              "I want you to feel like a princess, not just today, but every single day. 👑❤️"
            </p>
          </motion.div>

          {/* Animated Final Line with Hearts */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="pt-6 pb-2 border-t-2 border-royalRose/20 text-center flex flex-col items-center gap-2"
          >
            <div className="flex items-center justify-center gap-2.5">
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart className="w-5 h-5 text-royalRose fill-royalRose" />
              </motion.div>

              <p className="font-handwriting text-2xl sm:text-3xl font-extrabold text-deepPlum">
                "Your brother, your supporter, your forever person. Always. ❤️"
              </p>

              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <Heart className="w-5 h-5 text-royalRose fill-royalRose" />
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Button */}
          <div className="pt-6 flex justify-center sm:justify-end">
            <button
              type="button"
              onClick={onNext}
              className="btn-royal-primary min-h-[48px] px-8 text-base font-bold flex items-center justify-center gap-2 active:scale-95 shadow-md w-full sm:w-auto"
            >
              <span>You Were Always Special</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
