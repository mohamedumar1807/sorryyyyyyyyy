import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { soundEffects } from '../utils/soundEffects';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  trackName: string;
  hasStarted: boolean;
  audioBars: number[];
  currentTime: number;
  duration: number;
  startMusic: () => Promise<void>;
  pauseMusic: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (val: number) => void;
  replaySong: () => void;
  fadeVolume: (targetVal: number, durationMs?: number) => void;
  loadCustomAudioFile: (file: File) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.4);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [audioBars, setAudioBars] = useState<number[]>([25, 45, 65, 35]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const trackName = 'Unakkenna Venum Sollu ❤️';

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialize Persistent Single Audio Element
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';

    // Candidate audio sources in order
    const sources = [
      '/music/unakkenna-venum-sollu.mp3',
      '/music/aanandha-yaazhai.mp3',
      '/music/aanandha-yazhai.mp3'
    ];

    let currentSourceIdx = 0;
    audio.src = sources[0];

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.onloadedmetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.onerror = () => {
      currentSourceIdx++;
      if (currentSourceIdx < sources.length) {
        audio.src = sources[currentSourceIdx];
        if (isPlaying) {
          audio.play().catch(() => { });
        }
      } else {
        // Fallback to procedural soothing Tamil lullaby harp synthesizer
        startProceduralSynth();
      }
    };

    audioElementRef.current = audio;

    return () => {
      audio.pause();
      if (synthTimerRef.current) window.clearInterval(synthTimerRef.current);
      if (animFrameRef.current) window.cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Update volume & mute on audio element
  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.volume = isMuted ? 0 : volume;
    }
    soundEffects.setMuted(isMuted);
  }, [volume, isMuted]);

  // Animated dancing music bars
  useEffect(() => {
    let phase = 0;
    const animateBars = () => {
      if (isPlaying) {
        phase += 0.12;
        const b1 = Math.floor(20 + Math.sin(phase) * 16 + Math.random() * 12);
        const b2 = Math.floor(45 + Math.sin(phase + 1.2) * 26 + Math.random() * 14);
        const b3 = Math.floor(65 + Math.sin(phase + 2.4) * 30 + Math.random() * 16);
        const b4 = Math.floor(32 + Math.sin(phase + 3.6) * 18 + Math.random() * 10);
        setAudioBars([b1, b2, b3, b4]);
      } else {
        setAudioBars([12, 12, 12, 12]);
      }
      animFrameRef.current = requestAnimationFrame(animateBars);
    };
    animFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Soothing Harp/Celesta Synthesizer Fallback ("Unakkenna Venum Sollu" notes)
  const startProceduralSynth = () => {
    if (synthTimerRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!synthCtxRef.current && AudioCtx) {
        synthCtxRef.current = new AudioCtx();
      }
      const melodyNotes = [
        392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 587.33, 523.25,
        493.88, 440.00, 392.00, 329.63, 349.23, 392.00, 440.00, 392.00
      ];
      let noteIndex = 0;

      synthTimerRef.current = window.setInterval(() => {
        if (!isPlaying || isMuted || !synthCtxRef.current) return;
        if (synthCtxRef.current.state === 'suspended') {
          synthCtxRef.current.resume().catch(() => { });
        }

        const now = synthCtxRef.current.currentTime;
        const freq = melodyNotes[noteIndex % melodyNotes.length];
        noteIndex++;

        const osc = synthCtxRef.current.createOscillator();
        const gain = synthCtxRef.current.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.045 * volume, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);

        osc.connect(gain);
        gain.connect(synthCtxRef.current.destination);

        osc.start(now);
        osc.stop(now + 1.0);
      }, 650);
    } catch {
      // Audio safely ignored if not supported
    }
  };

  const startMusic = async () => {
    setHasStarted(true);
    setIsPlaying(true);
    if (audioElementRef.current) {
      try {
        await audioElementRef.current.play();
      } catch {
        startProceduralSynth();
      }
    }
  };

  const pauseMusic = () => {
    setIsPlaying(false);
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const replaySong = () => {
    if (audioElementRef.current) {
      audioElementRef.current.currentTime = 0;
      startMusic();
    }
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const fadeVolume = (targetVal: number, durationMs: number = 3000) => {
    const startVal = volume;
    const diff = targetVal - startVal;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const current = startVal + diff * progress;
      setVolumeState(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const loadCustomAudioFile = (file: File) => {
    if (audioElementRef.current) {
      const objectUrl = URL.createObjectURL(file);
      audioElementRef.current.src = objectUrl;
      if (hasStarted) {
        startMusic();
      }
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        trackName,
        hasStarted,
        audioBars,
        currentTime,
        duration,
        startMusic,
        pauseMusic,
        togglePlay,
        toggleMute,
        setVolume,
        replaySong,
        fadeVolume,
        loadCustomAudioFile
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return ctx;
};
