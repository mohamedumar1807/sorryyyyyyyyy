import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SisterPhoto } from './types';
import { chapters, defaultPhotos } from './data/storyData';
import { AudioProvider, useAudio } from './context/AudioContext';
import { soundEffects } from './utils/soundEffects';

// 3D & Visual Components
import { FloatingPetals } from './components/3d/FloatingPetals';
import { EnvelopeOpening } from './components/3d/EnvelopeOpening';
import { FairytaleShowcaseModal } from './components/3d/FairytaleShowcaseModal';

// Navigation & Global UI
import { HeaderBar } from './components/navigation/HeaderBar';
import { ChapterNav } from './components/navigation/ChapterNav';
import { MusicPlayerBar } from './components/interactive/MusicPlayerBar';
import { PhotoLightbox } from './components/interactive/PhotoLightbox';
import { PhotoUploadModal } from './components/interactive/PhotoUploadModal';

// 8 Chapters
import { Chapter1Opening } from './components/chapters/Chapter1Opening';
import { Chapter2Apology } from './components/chapters/Chapter2Apology';
import { Chapter3NotAStranger } from './components/chapters/Chapter3NotAStranger';
import { Chapter4Princess } from './components/chapters/Chapter4Princess';
import { Chapter5AlwaysSpecial } from './components/chapters/Chapter5AlwaysSpecial';
import { Chapter6FiveMemories } from './components/chapters/Chapter6FiveMemories';
import { Chapter7Promises } from './components/chapters/Chapter7Promises';
import { Chapter8FinalLetter } from './components/chapters/Chapter8FinalLetter';

const MainExperience: React.FC = () => {
  const { startMusic, isPlaying } = useAudio();
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState<boolean>(false);
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [photos, setPhotos] = useState<SisterPhoto[]>(defaultPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<SisterPhoto | null>(null);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState<boolean>(false);
  const [is3DShowcaseOpen, setIs3DShowcaseOpen] = useState<boolean>(false);

  // Load any saved custom photos/captions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('thanga_pulla_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized = parsed.map((p) => {
            const def = defaultPhotos.find((dp) => dp.id === p.id);
            if (def && p.src.includes('/images/photo-')) {
              return { ...p, src: def.src };
            }
            return p;
          });
          setPhotos(normalized);
        }
      }
    } catch {}
  }, []);

  const handleUpdatePhoto = (
    id: string,
    newSrc: string,
    newCaption?: string,
    newTitle?: string
  ) => {
    const updated = photos.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          src: newSrc,
          caption: newCaption || p.caption,
          title: newTitle || p.title,
        };
      }
      return p;
    });
    setPhotos(updated);
    try {
      localStorage.setItem('thanga_pulla_photos', JSON.stringify(updated));
    } catch {}
  };

  const handleResetDefaults = () => {
    setPhotos(defaultPhotos);
    try {
      localStorage.removeItem('thanga_pulla_photos');
    } catch {}
  };

  const handleEnvelopeOpen = () => {
    setHasOpenedEnvelope(true);
    startMusic();
    soundEffects.playSparkle();
  };

  const handleNextChapter = () => {
    if (currentChapter < chapters.length) {
      setCurrentChapter((prev) => prev + 1);
      soundEffects.playPageTurn();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter((prev) => prev - 1);
      soundEffects.playPageTurn();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectChapter = (id: number) => {
    setCurrentChapter(id);
    soundEffects.playPageTurn();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    setHasOpenedEnvelope(false);
    setCurrentChapter(1);
    soundEffects.playSparkle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Specific photos mapping
  const childhoodPhoto = photos[0] || defaultPhotos[0];
  const flowerSelfie = photos[1] || defaultPhotos[1];
  const greenOutfitPhoto = photos[2] || defaultPhotos[2];

  return (
    <div
      className={`min-h-screen text-[#382235] relative selection:bg-blushPink selection:text-royalRose flex flex-col justify-between transition-colors duration-1000 ${
        isPlaying ? 'bg-[radial-gradient(ellipse_at_top,_#F7C1D7_0%,_#FFF6F0_50%,_#EAE3FA_100%)]' : 'bg-[#FFF6F0]'
      }`}
    >
      {/* Floating flower petals and golden sparkles */}
      <FloatingPetals count={26} />

      {/* Top Header Bar when envelope is open */}
      {hasOpenedEnvelope && (
        <HeaderBar
          currentChapterId={currentChapter}
          totalChapters={chapters.length}
          onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
          onOpen3DShowcase={() => setIs3DShowcaseOpen(true)}
          onReplay={handleReplay}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-20 pb-16">
        <AnimatePresence mode="wait">
          {!hasOpenedEnvelope ? (
            <motion.div
              key="envelope-stage"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.6 }}
              className="w-full min-h-[85vh] flex items-center justify-center py-10"
            >
              <EnvelopeOpening
                onOpen={handleEnvelopeOpen}
                sisterFlowerPhotoSrc={flowerSelfie.src}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`chapter-${currentChapter}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full"
            >
              {currentChapter === 1 && (
                <Chapter1Opening
                  photo={flowerSelfie}
                  onPhotoClick={setSelectedPhoto}
                  onNext={handleNextChapter}
                />
              )}
              {currentChapter === 2 && (
                <Chapter2Apology onNext={handleNextChapter} />
              )}
              {currentChapter === 3 && (
                <Chapter3NotAStranger onNext={handleNextChapter} />
              )}
              {currentChapter === 4 && (
                <Chapter4Princess
                  childhoodPhoto={childhoodPhoto}
                  recentPhoto={greenOutfitPhoto}
                  onPhotoClick={setSelectedPhoto}
                  onNext={handleNextChapter}
                />
              )}
              {currentChapter === 5 && (
                <Chapter5AlwaysSpecial onNext={handleNextChapter} />
              )}
              {currentChapter === 6 && (
                <Chapter6FiveMemories
                  photos={photos}
                  onPhotoClick={setSelectedPhoto}
                  onOpenManager={() => setIsPhotoManagerOpen(true)}
                  onNext={handleNextChapter}
                />
              )}
              {currentChapter === 7 && (
                <Chapter7Promises onNext={handleNextChapter} />
              )}
              {currentChapter === 8 && (
                <Chapter8FinalLetter
                  mainPhoto={greenOutfitPhoto}
                  allPhotos={photos}
                  onPhotoClick={setSelectedPhoto}
                  onReplay={handleReplay}
                />
              )}

              {/* Progress & Chapter Controls */}
              <ChapterNav
                chapters={chapters}
                currentChapter={currentChapter}
                onSelectChapter={handleSelectChapter}
                onNext={handleNextChapter}
                onPrev={handlePrevChapter}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Floating Music Player Controls */}
      <MusicPlayerBar />

      {/* Lightbox for Fullscreen Photo View */}
      <PhotoLightbox
        photos={photos}
        selectedPhoto={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={setSelectedPhoto}
      />

      {/* Photo Upload & Caption Editor Modal */}
      <PhotoUploadModal
        isOpen={isPhotoManagerOpen}
        onClose={() => setIsPhotoManagerOpen(false)}
        photos={photos}
        onUpdatePhoto={handleUpdatePhoto}
        onResetDefaults={handleResetDefaults}
      />

      {/* 3D Fairytale Scenes Showcase Modal */}
      <FairytaleShowcaseModal
        isOpen={is3DShowcaseOpen}
        onClose={() => setIs3DShowcaseOpen(false)}
        photos={photos}
        onPhotoClick={setSelectedPhoto}
      />

      {/* Footer Tagline — High Contrast */}
      <footer className="w-full py-4 text-center border-t-2 border-royalRose/30 bg-white/70 backdrop-blur-md z-20">
        <p className="font-letter text-base italic text-deepPlum font-bold">
          "You're never a stranger to me. You're my sister, my princess and my forever Thanga Pulla. 👑❤️"
        </p>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AudioProvider>
      <MainExperience />
    </AudioProvider>
  );
}
