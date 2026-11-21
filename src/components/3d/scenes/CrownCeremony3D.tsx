import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';
import { soundEffects } from '../../../utils/soundEffects';

interface CrownCeremonyProps {
  className?: string;
}

export const CrownCeremony3D: React.FC<CrownCeremonyProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isCrowned, setIsCrowned] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 1.8, 5.2);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xfff5f8, 0.85);
    scene.add(ambient);

    const goldSpot = new THREE.SpotLight(0xfff0db, 2.0);
    goldSpot.position.set(2, 6, 3);
    goldSpot.castShadow = true;
    scene.add(goldSpot);

    const pinkLight = new THREE.PointLight(0xe9a5bd, 1.2, 10);
    pinkLight.position.set(-2, 2, 2);
    scene.add(pinkLight);

    // 1. Velvet Cushion Pedestal
    const pedestalGroup = new THREE.Group();
    scene.add(pedestalGroup);

    // Marble Base
    const baseGeo = new THREE.CylinderGeometry(1.4, 1.5, 0.2, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0xfffbf5, roughness: 0.3 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.5;
    baseMesh.receiveShadow = true;
    pedestalGroup.add(baseMesh);

    // Deep Rose Velvet Cushion
    const cushionGeo = new THREE.CylinderGeometry(1.0, 1.15, 0.35, 32);
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0xb65f82, roughness: 0.8 });
    const cushion = new THREE.Mesh(cushionGeo, cushionMat);
    cushion.position.y = -0.22;
    cushion.receiveShadow = true;
    pedestalGroup.add(cushion);

    // Gold Tassels
    const tasselMat = new THREE.MeshStandardMaterial({ color: 0xd9a0a9, metalness: 0.8, roughness: 0.2 });
    for (let t = 0; t < 4; t++) {
      const angle = (t * Math.PI) / 2 + Math.PI / 4;
      const tGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const tassel = new THREE.Mesh(tGeo, tasselMat);
      tassel.position.set(Math.cos(angle) * 1.1, -0.22, Math.sin(angle) * 1.1);
      pedestalGroup.add(tassel);
    }

    // 2. Rose-Gold Crown
    const crownGroup = new THREE.Group();
    scene.add(crownGroup);

    // Crown Band
    const bandGeo = new THREE.TorusGeometry(0.65, 0.08, 16, 32);
    const crownBand = new THREE.Mesh(bandGeo, tasselMat);
    crownBand.rotation.x = Math.PI / 2;
    crownBand.castShadow = true;
    crownGroup.add(crownBand);

    // Crown Peaks
    const peakMat = new THREE.MeshStandardMaterial({ color: 0xd9a0a9, metalness: 0.85, roughness: 0.2 });
    for (let p = 0; p < 5; p++) {
      const pAngle = (p * Math.PI * 2) / 5;
      const height = p === 0 ? 0.65 : 0.45;
      const peakGeo = new THREE.ConeGeometry(0.12, height, 8);
      const peak = new THREE.Mesh(peakGeo, peakMat);
      peak.position.set(Math.cos(pAngle) * 0.65, height / 2, Math.sin(pAngle) * 0.65);
      peak.castShadow = true;
      crownGroup.add(peak);

      // Gem on peak
      const gemGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const gemMat = new THREE.MeshBasicMaterial({ color: p === 0 ? 0xffffff : 0xffd1dc });
      const gem = new THREE.Mesh(gemGeo, gemMat);
      gem.position.set(Math.cos(pAngle) * 0.65, height, Math.sin(pAngle) * 0.65);
      crownGroup.add(gem);
    }

    // Crown starts high up and slowly descends
    crownGroup.position.set(0, 1.8, 0);

    let clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Crown descending animation
      if (t < 2.5) {
        const progress = t / 2.5;
        crownGroup.position.y = 1.8 - progress * 1.78;
        crownGroup.rotation.y = t * 1.5;
      } else {
        // Resting gently on cushion
        crownGroup.position.y = 0.02 + Math.sin(t * 2) * 0.02;
        crownGroup.rotation.y = t * 0.3;
        if (!isCrowned) setIsCrowned(true);
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

  return (
    <div className={`w-full max-w-lg mx-auto p-4 sm:p-6 rounded-3xl glass-card-gold text-center border border-roseGold/40 ${className}`}>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blush border border-roseGold/30 text-xs font-semibold text-deepRose uppercase mb-1">
        <Crown className="w-3.5 h-3.5" />
        <span>Royal Coronation</span>
      </div>

      <div ref={mountRef} className="w-full h-[220px] sm:h-[260px] flex items-center justify-center" />

      <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-brandText mt-1">
        "Every world has a princess. Mine is you."
      </h3>
      <p className="font-letter text-base sm:text-lg italic text-deepRose mt-1">
        No crown is needed for you to be royalty in my heart.
      </p>
    </div>
  );
};
