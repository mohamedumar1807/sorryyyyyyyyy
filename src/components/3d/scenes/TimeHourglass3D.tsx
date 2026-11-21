import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles, Clock } from 'lucide-react';
import { soundEffects } from '../../../utils/soundEffects';

interface TimeHourglass3DProps {
  onTimeReversed?: () => void;
  className?: string;
}

export const TimeHourglass3D: React.FC<TimeHourglass3DProps> = ({
  onTimeReversed,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 1.2, 5.0);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 0.9);
    scene.add(ambientLight);
    const goldLight = new THREE.PointLight(0xffd700, 1.6, 12);
    goldLight.position.set(2, 3, 3);
    scene.add(goldLight);

    const hourglassGroup = new THREE.Group();
    scene.add(hourglassGroup);

    // Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd9a0a9,
      metalness: 0.85,
      roughness: 0.25,
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
    });
    const sandMat = new THREE.MeshStandardMaterial({
      color: 0xffe4b5,
      roughness: 0.6,
      emissive: 0xdeb887,
      emissiveIntensity: 0.2,
    });

    // Top and Bottom Plates
    const plateGeo = new THREE.CylinderGeometry(0.9, 0.95, 0.12, 32);
    const topPlate = new THREE.Mesh(plateGeo, goldMat);
    topPlate.position.y = 1.35;
    const bottomPlate = new THREE.Mesh(plateGeo, goldMat);
    bottomPlate.position.y = -1.35;
    hourglassGroup.add(topPlate);
    hourglassGroup.add(bottomPlate);

    // 3 Gold Pillars
    for (let p = 0; p < 3; p++) {
      const angle = (p * Math.PI * 2) / 3;
      const pillarGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.6, 16);
      const pillar = new THREE.Mesh(pillarGeo, goldMat);
      pillar.position.set(Math.cos(angle) * 0.75, 0, Math.sin(angle) * 0.75);
      hourglassGroup.add(pillar);
    }

    // Glass Bulbs (Two connected cones)
    const topGlassGeo = new THREE.ConeGeometry(0.75, 1.25, 32);
    const topGlass = new THREE.Mesh(topGlassGeo, glassMat);
    topGlass.position.y = 0.65;
    topGlass.rotation.x = Math.PI;
    hourglassGroup.add(topGlass);

    const bottomGlassGeo = new THREE.ConeGeometry(0.75, 1.25, 32);
    const bottomGlass = new THREE.Mesh(bottomGlassGeo, glassMat);
    bottomGlass.position.y = -0.65;
    hourglassGroup.add(bottomGlass);

    // Sand Meshes
    const topSandGeo = new THREE.ConeGeometry(0.65, 0.9, 24);
    const topSand = new THREE.Mesh(topSandGeo, sandMat);
    topSand.position.y = 0.8;
    topSand.rotation.x = Math.PI;
    hourglassGroup.add(topSand);

    const bottomSandGeo = new THREE.ConeGeometry(0.7, 0.8, 24);
    const bottomSand = new THREE.Mesh(bottomSandGeo, sandMat);
    bottomSand.position.y = -0.95;
    hourglassGroup.add(bottomSand);

    // Swirling Golden Particles inside
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 0.4;
      particlePos[i + 1] = (Math.random() - 0.5) * 1.8;
      particlePos[i + 2] = (Math.random() - 0.5) * 0.4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const sandParticles = new THREE.Points(particleGeo, pMat);
    hourglassGroup.add(sandParticles);

    let clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Gentle hourglass tilt and floating
      hourglassGroup.position.y = Math.sin(t * 1.5) * 0.08;
      hourglassGroup.rotation.y = t * 0.4;

      // Particle sand flow
      const positions = sandParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        // Normal or reverse flow
        positions[i] -= isReversing ? -0.03 : 0.02;
        if (positions[i] < -1.1) positions[i] = 1.1;
        if (positions[i] > 1.1) positions[i] = -1.1;
      }
      sandParticles.geometry.attributes.position.needsUpdate = true;

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
  }, [isReversing]);

  const handleActivate = () => {
    setIsReversing(true);
    soundEffects.playSparkle();
    setTimeout(() => {
      setIsReversing(false);
      if (onTimeReversed) onTimeReversed();
    }, 2400);
  };

  return (
    <div className={`relative w-full max-w-md mx-auto p-4 rounded-3xl glass-card text-center border border-roseGold/35 ${className}`}>
      <div ref={mountRef} className="w-full h-[220px] sm:h-[260px] flex items-center justify-center cursor-pointer" onClick={handleActivate} />

      <h4 className="font-heading font-bold text-lg text-brandText mt-1">
        The Golden Hourglass of Time
      </h4>
      <p className="font-letter text-sm sm:text-base italic text-brandText/80 max-w-xs mx-auto mt-0.5">
        "Tap the hourglass to rewind the years and see where our journey began."
      </p>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleActivate}
          disabled={isReversing}
          className="btn-royal-gold min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-deepPlum font-sans text-sm sm:text-base font-extrabold shadow-md active:scale-95 transition-all disabled:opacity-70"
        >
          <RotateCcw className={`w-4 h-4 text-deepPlum ${isReversing ? 'animate-spin' : ''}`} />
          <span>{isReversing ? 'Rewinding Years...' : 'Rewind Time ⏳'}</span>
        </button>
      </div>
    </div>
  );
};
