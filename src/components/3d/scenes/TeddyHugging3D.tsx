import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Crown, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SisterPhoto } from '../../../types';
import { soundEffects } from '../../../utils/soundEffects';

interface TeddyHuggingProps {
  photos: SisterPhoto[];
  className?: string;
}

export const TeddyHugging3D: React.FC<TeddyHuggingProps> = ({
  photos,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [showCollage, setShowCollage] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 1.2, 4.6);
    camera.lookAt(0, 0.3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xfff5f8, 0.95);
    scene.add(ambient);
    const pinkLight = new THREE.PointLight(0xe9a5bd, 2.0, 10);
    pinkLight.position.set(0, 2, 2.5);
    scene.add(pinkLight);

    const hugGroup = new THREE.Group();
    scene.add(hugGroup);

    // Materials
    const bear1Mat = new THREE.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.85 }); // Brother bear
    const bear2Mat = new THREE.MeshStandardMaterial({ color: 0xf5deb3, roughness: 0.85 }); // Sister bear
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x2d1820 });
    const heartMat = new THREE.MeshBasicMaterial({ color: 0xe9a5bd, transparent: true, opacity: 0.85 });

    // Glowing Heart Behind Them
    const bgHeartShape = new THREE.Shape();
    bgHeartShape.moveTo(0.2, 0.2);
    bgHeartShape.bezierCurveTo(0.2, 0.2, 0.15, 0, 0, 0);
    bgHeartShape.bezierCurveTo(-0.25, 0, -0.25, 0.3, -0.25, 0.3);
    bgHeartShape.bezierCurveTo(-0.25, 0.5, -0.1, 0.7, 0.2, 0.9);
    bgHeartShape.bezierCurveTo(0.5, 0.7, 0.65, 0.5, 0.65, 0.3);
    bgHeartShape.bezierCurveTo(0.65, 0.3, 0.65, 0, 0.4, 0);
    bgHeartShape.bezierCurveTo(0.25, 0, 0.2, 0.2, 0.2, 0.2);

    const bgHeartGeo = new THREE.ShapeGeometry(bgHeartShape);
    bgHeartGeo.center();
    const bgHeart = new THREE.Mesh(bgHeartGeo, heartMat);
    bgHeart.scale.set(2.2, 2.2, 2.2);
    bgHeart.rotation.z = Math.PI;
    bgHeart.position.set(0, 0.8, -0.6);
    scene.add(bgHeart);

    // Helper: Build Single Cute Bear
    const createBear = (mat: THREE.Material, scale: number, xPos: number, rotY: number) => {
      const b = new THREE.Group();
      b.scale.set(scale, scale, scale);
      b.position.x = xPos;
      b.rotation.y = rotY;

      // Head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 16), mat);
      head.position.y = 0.85;
      b.add(head);

      // Ears
      const earGeo = new THREE.SphereGeometry(0.14, 8, 8);
      const lE = new THREE.Mesh(earGeo, mat);
      lE.position.set(-0.32, 1.15, 0);
      const rE = new THREE.Mesh(earGeo, mat);
      rE.position.set(0.32, 1.15, 0);
      b.add(lE);
      b.add(rE);

      // Eyes
      const eyeGeo = new THREE.SphereGeometry(0.05, 8, 8);
      const lEye = new THREE.Mesh(eyeGeo, eyeMat);
      lEye.position.set(-0.15, 0.9, 0.36);
      const rEye = new THREE.Mesh(eyeGeo, eyeMat);
      rEye.position.set(0.15, 0.9, 0.36);
      b.add(lEye);
      b.add(rEye);

      // Snout
      const snout = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0xfff0db })
      );
      snout.position.set(0, 0.78, 0.35);
      b.add(snout);

      // Body
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.48, 16, 16), mat);
      body.scale.set(1, 1.2, 0.9);
      body.position.y = 0.35;
      b.add(body);

      // Arms hugging forward
      const armGeo = new THREE.CapsuleGeometry(0.12, 0.4, 8, 8);
      const arm = new THREE.Mesh(armGeo, mat);
      arm.position.set(0.3, 0.45, 0.35);
      arm.rotation.x = -1.2;
      arm.rotation.z = -0.5;
      b.add(arm);

      return b;
    };

    // Bear 1 (Brother) & Bear 2 (Sister)
    const bear1 = createBear(bear1Mat, 1.05, -0.32, 0.4);
    const bear2 = createBear(bear2Mat, 0.92, 0.32, -0.4);
    hugGroup.add(bear1);
    hugGroup.add(bear2);

    let clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Gentle mutual hug sway
      hugGroup.position.y = Math.sin(t * 1.8) * 0.05;
      hugGroup.rotation.z = Math.sin(t * 1.2) * 0.03;

      // Glowing heart pulsing
      const pulse = 2.0 + Math.sin(t * 2.5) * 0.15;
      bgHeart.scale.set(pulse, pulse, pulse);

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

  const handleHugClick = () => {
    setShowCollage(true);
    soundEffects.playHugChime();
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#FFF5F8', '#F8DCE8', '#E9A5BD', '#B65F82', '#D9A0A9'],
      });
    } catch { }
  };

  return (
    <div className={`w-full max-w-xl mx-auto p-6 sm:p-8 rounded-3xl glass-card-gold text-center border border-roseGold/40 shadow-glass ${className}`}>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush text-xs font-semibold text-deepRose uppercase mb-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>3D Sibling Embrace</span>
      </div>

      <div
        ref={mountRef}
        className="w-full h-[220px] sm:h-[260px] flex items-center justify-center cursor-pointer"
        onClick={handleHugClick}
      />

      <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-brandText mt-1">
        A Forever Warm Hug
      </h3>
      <p className="font-letter text-base sm:text-lg italic text-deepRose mt-1 mb-4">
        "Whenever words fall short, my hug will always remind you that you are my Thanga Pulla."
      </p>

      <button
        type="button"
        onClick={handleHugClick}
        className="btn-royal-primary min-h-[52px] px-8 text-base font-bold inline-flex items-center justify-center gap-2.5 active:scale-95 shadow-md"
      >
        <Heart className="w-5 h-5 fill-white text-white" />
        <span>Tap To Hug & Reveal Photo Collage</span>
      </button>

      {/* Collage of All Five Real Photographs */}
      <AnimatePresence>
        {showCollage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-roseGold/30"
          >
            <p className="font-sans text-xs uppercase font-bold tracking-wider text-brandText/70 mb-3">
              Our Five Little Windows &bull; All Kept In My Heart
            </p>
            <div className="grid grid-cols-5 gap-2">
              {photos.slice(0, 5).map((p, idx) => (
                <div key={p.id} className="aspect-square rounded-xl overflow-hidden border-2 border-white shadow-sm bg-cream">
                  <img src={p.src} alt={p.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
