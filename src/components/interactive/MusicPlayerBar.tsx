import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Music, ChevronUp, ChevronDown, Upload, Sparkles } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const MusicPlayerBar: React.FC = () => {
  const {
    isPlaying,
    isMuted,
    volume,
    trackName,
    hasStarted,
    audioBars,
    currentTime,
    duration,
    togglePlay,
    toggleMute,
    setVolume,
    replaySong,
    loadCustomAudioFile,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!hasStarted) return null;

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadCustomAudioFile(file);
    }
  };

  return (
    <div className="fixed bottom-4 right-3 sm:right-6 z-40 max-w-sm">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-full sm:rounded-2xl bg-white/95 backdrop-blur-xl border-2 border-royalRose shadow-2xl p-2 sm:p-3 relative overflow-hidden"
        style={{
          boxShadow: '0 12px 35px -5px rgba(118, 38, 79, 0.45), 0 0 15px rgba(232, 185, 87, 0.4)',
        }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Main Play / Pause Button with Solid Royal Pink */}
          <button
            type="button"
            onClick={togglePlay}
            className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white bg-btnPrimary hover:bg-btnPrimaryHover border-2 border-white shadow-md transition-transform duration-200 active:scale-95 shrink-0"
            style={{
              boxShadow: '0 4px 15px rgba(192, 47, 112, 0.5)',
            }}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-white text-white" />
            ) : (
              <Play className="w-5 h-5 fill-white text-white ml-0.5" />
            )}
          </button>

          {/* Track Name & Visualizer */}
          <div
            className="hidden sm:flex flex-col cursor-pointer select-none min-w-[140px] max-w-[180px]"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-black text-royalRose tracking-wider">
                Soundtrack
              </span>
              {/* Animated 4-bar visualizer */}
              <div className="flex items-end gap-0.5 h-3.5">
                {audioBars.map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-royalRose rounded-full transition-all duration-100"
                    style={{ height: `${Math.max(4, h * 0.32)}px` }}
                  />
                ))}
              </div>
            </div>
            <span className="text-xs font-heading font-extrabold text-deepPlum truncate">
              {trackName}
            </span>
            {duration > 0 && (
              <span className="text-[10px] text-deepBerry font-bold font-sans">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            )}
          </div>

          {/* Replay Button */}
          <button
            type="button"
            onClick={replaySong}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-warmCream hover:bg-blushPink/80 border-2 border-royalRose/40 text-deepPlum hover:text-royalRose flex items-center justify-center shadow-sm transition-all active:scale-95"
            title="Replay from start"
            aria-label="Replay song"
          >
            <RotateCcw className="w-4 h-4 text-deepPlum" />
          </button>

          {/* Mute Button */}
          <button
            type="button"
            onClick={toggleMute}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-warmCream hover:bg-blushPink/80 border-2 border-royalRose/40 text-deepPlum hover:text-royalRose flex items-center justify-center shadow-sm transition-all active:scale-95"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-royalRose" />
            ) : (
              <Volume2 className="w-5 h-5 text-deepPlum" />
            )}
          </button>

          {/* Expand toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full bg-warmCream border border-royalRose/30 text-deepPlum hover:bg-blushPink/60 transition-colors"
            aria-label="Expand player"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Controls: Volume Slider & Audio File Loader */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pt-3 mt-2 border-t-2 border-royalRose/20 px-2 space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-deepPlum uppercase tracking-wider">
                  Vol
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-blushPink rounded-lg appearance-none cursor-pointer accent-btnPrimary"
                />
                <span className="text-[10px] font-bold text-deepPlum w-8 text-right">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>

              {/* Custom Audio File Loader */}
              <div className="pt-2 flex items-center justify-between text-xs text-deepBerry font-bold border-t border-roseGold/30">
                <span className="truncate pr-2">Replace audio:</span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 min-h-[40px] rounded-full btn-royal-secondary text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose file</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
