import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../../../utils/soundEffects';

interface ForgivenessButterfly3DProps {
  className?: string;
}

export const ForgivenessButterfly3D: React.FC<ForgivenessButterfly3DProps> = ({
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [choice, setChoice] = useState<'forgiven' | 'time' | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 240;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 1.4, 4.2);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xfff5f8, 1.0);
    scene.add(ambient);
    const pointLight = new THREE.PointLight(0xffe4e1, 1.6, 10);
    pointLight.position.set(2, 3, 2);
    scene.add(pointLight);

    // 1. Center Blooming Rose
    const flowerGroup = new THREE.Group();
    scene.add(flowerGroup);

    const stemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x9370db, roughness: 0.8 });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = 0.4;
    flowerGroup.add(stem);

    // Center bulb
    const bulbGeo = new THREE.SphereGeometry(0.2, 12, 12);
    const bulbMat = new THREE.MeshStandardMaterial({ color: 0xb65f82, roughness: 0.3 });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.y = 0.8;
    flowerGroup.add(bulb);

    // Rose petals
    const petalMat = new THREE.MeshStandardMaterial({ color: 0xe9a5bd, roughness: 0.3, side: THREE.DoubleSide });
    for (let p = 0; p < 8; p++) {
      const angle = (p * Math.PI * 2) / 8;
      const petalGeo = new THREE.SphereGeometry(0.18, 8, 8);
      petalGeo.scale(1.1, 0.3, 0.7);
      const petal = new THREE.Mesh(petalGeo, petalMat);
      petal.position.set(Math.cos(angle) * 0.18, 0.82, Math.sin(angle) * 0.18);
      petal.rotation.y = angle;
      flowerGroup.add(petal);
    }

    // 2. Butterfly
    const bPivot = new THREE.Group();
    scene.add(bPivot);

    const bWingGeo = new THREE.PlaneGeometry(0.24, 0.18);
    const bMat = new THREE.MeshStandardMaterial({ color: 0xd9a0a9, side: THREE.DoubleSide, roughness: 0.3 });
    const leftWing = new THREE.Mesh(bWingGeo, bMat);
    leftWing.position.x = -0.12;
    const rightWing = new THREE.Mesh(bWingGeo, bMat);
    rightWing.position.x = 0.12;

    bPivot.add(leftWing);
    bPivot.add(rightWing);

    let clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Butterfly approaches flower and circles smoothly
      if (t < 4.0) {
        const radius = 2.0 - (t / 4.0) * 1.5;
        bPivot.position.set(Math.cos(t * 2) * radius, 0.85 + Math.sin(t * 3) * 0.2, Math.sin(t * 2) * radius);
        bPivot.rotation.y = -t * 2 + Math.PI / 2;
        const flap = Math.sin(t * 14) * 0.8;
        leftWing.rotation.y = flap;
        rightWing.rotation.y = -flap;
      } else {
        // Butterfly rests softly on petal
        bPivot.position.set(0.12, 0.95, 0.1);
        bPivot.rotation.set(0.2, 0.5, 0);
        const slowFlap = Math.sin(t * 2) * 0.2;
        leftWing.rotation.y = slowFlap;
        rightWing.rotation.y = -slowFlap;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleForgive = () => {
    setChoice('forgiven');
    soundEffects.playSparkle();
    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.8 },
        colors: ['#F8DCE8', '#E9A5BD', '#B65F82', '#FFF5F8'],
      });
    } catch {}
  };

  const handleNeedTime = () => {
    setChoice('time');
    soundEffects.playPageTurn();
  };

  return (
    <div className={`w-full max-w-xl mx-auto p-6 sm:p-8 rounded-3xl glass-card text-center border border-roseGold/35 shadow-glass ${className}`}>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush text-xs font-semibold text-deepRose uppercase mb-2">
        <Sparkles className="w-3.5 h-3.5 text-roseGold" />
        <span>3D Forgiveness Moment</span>
      </div>

      <div ref={mountRef} className="w-full h-[200px] sm:h-[240px] flex items-center justify-center cursor-pointer" />

      <h3 className="font-heading font-bold text-2xl sm:text-3xl text-brandText mt-1">
        Can you forgive me, Thanga Pulla?
      </h3>

      <p className="font-letter text-base sm:text-lg italic text-brandText/80 mt-1 mb-6 max-w-md mx-auto">
        "Your heart has its own pace. Take all the time you need, because your happiness matters more than rushed words."
      </p>

      {/* The Two Respectful Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleForgive}
          className={`w-full sm:w-auto px-7 py-3.5 min-h-[48px] rounded-full font-sans font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
            choice === 'forgiven'
              ? 'btn-royal-primary ring-4 ring-royalGold'
              : 'btn-royal-primary'
          }`}
        >
          <Heart className="w-5 h-5 fill-white text-white" />
          <span>I forgive you ❤️</span>
        </button>

        <button
          type="button"
          onClick={handleNeedTime}
          className={`w-full sm:w-auto px-7 py-3.5 min-h-[48px] rounded-full font-sans font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
            choice === 'time'
              ? 'btn-royal-secondary ring-4 ring-royalGold'
              : 'btn-royal-secondary'
          }`}
        >
          <Clock className="w-5 h-5 text-white" />
          <span>I need a little time</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {choice === 'forgiven' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 rounded-2xl bg-blush/70 border border-roseGold/30"
          >
            <p className="font-heading text-lg font-bold text-deepRose">
              Thank you, pa. 🫂
            </p>
            <p className="font-letter text-base italic text-brandText mt-1">
              "I'll try my best to make you feel loved and appreciated every single day."
            </p>
          </motion.div>
        )}

        {choice === 'time' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 rounded-2xl bg-lavender/70 border border-lavender"
          >
            <p className="font-heading text-lg font-bold text-brandText">
              That's okay, Thanga Pulla. ❤️
            </p>
            <p className="font-letter text-base italic text-brandText/90 mt-1">
              "Take all the time you need. Your feelings matter to me, and I'll keep trying to do better."
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
