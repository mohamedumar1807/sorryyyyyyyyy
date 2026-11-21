import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Heart } from 'lucide-react';

interface FlowerGardenProps {
  className?: string;
}

export const FlowerGarden3D: React.FC<FlowerGardenProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeFlower, setActiveFlower] = useState<{ name: string; meaning: string; color: string } | null>({
    name: 'Flower of Understanding',
    meaning: 'To truly listen to your thoughts and respect what you feel.',
    color: '#E9A5BD',
  });

  const flowerData = [
    { name: 'Flower of Love', meaning: 'The unconditional love of a brother that never fades.', color: '#B65F82' },
    { name: 'Flower of Memories', meaning: 'Cherishing every laugh, silly quarrel and sweet childhood day.', color: '#D9A0A9' },
    { name: 'Flower of Trust', meaning: 'Knowing you can always count on me, through any storm.', color: '#EAE3FA' },
    { name: 'Flower of Care', meaning: 'Checking on you and protecting your smile above everything else.', color: '#F8DCE8' },
    { name: 'Flower of Understanding', meaning: 'To truly listen to your thoughts and respect what you feel.', color: '#E9A5BD' },
  ];

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 2.2, 5.5);
    camera.lookAt(0, 0.8, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 1.0);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffe4e1, 1.4, 15);
    pointLight.position.set(0, 4, 3);
    scene.add(pointLight);

    const gardenGroup = new THREE.Group();
    scene.add(gardenGroup);

    // Glowing Grass Island
    const islandGeo = new THREE.CylinderGeometry(3.0, 3.2, 0.4, 32);
    const islandMat = new THREE.MeshStandardMaterial({ color: 0xf8dce8, roughness: 0.8 });
    const island = new THREE.Mesh(islandGeo, islandMat);
    island.position.y = -0.2;
    gardenGroup.add(island);

    // Glowing pathway
    const pathGeo = new THREE.PlaneGeometry(0.8, 2.8);
    const pathMat = new THREE.MeshBasicMaterial({ color: 0xfffbf5, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
    const path = new THREE.Mesh(pathGeo, pathMat);
    path.rotation.x = -Math.PI / 2;
    path.position.set(0, 0.02, 0.3);
    gardenGroup.add(path);

    // 5 Blooming Flowers
    const flowers: THREE.Group[] = [];
    const colors = [0xb65f82, 0xd9a0a9, 0xc9a0dc, 0xf8dce8, 0xe9a5bd];

    for (let f = 0; f < 5; f++) {
      const fGroup = new THREE.Group();
      const angle = (f * Math.PI * 2) / 5;
      const radius = 1.6;
      fGroup.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius * 0.7);

      // Stem
      const stemGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.0, 8);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x9370db, roughness: 0.7 });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = 0.5;
      fGroup.add(stem);

      // Center sphere
      const centerGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const centerMat = new THREE.MeshBasicMaterial({ color: 0xfff0b5 });
      const center = new THREE.Mesh(centerGeo, centerMat);
      center.position.y = 1.0;
      fGroup.add(center);

      // Petals
      const petalMat = new THREE.MeshStandardMaterial({
        color: colors[f],
        roughness: 0.3,
        side: THREE.DoubleSide,
      });

      for (let p = 0; p < 6; p++) {
        const pAngle = (p * Math.PI * 2) / 6;
        const petalGeo = new THREE.SphereGeometry(0.16, 8, 8);
        petalGeo.scale(1.2, 0.4, 0.8);
        const petal = new THREE.Mesh(petalGeo, petalMat);
        petal.position.set(
          Math.cos(pAngle) * 0.22,
          1.0 + Math.sin(pAngle * 2) * 0.03,
          Math.sin(pAngle) * 0.22
        );
        petal.rotation.y = pAngle;
        fGroup.add(petal);
      }

      gardenGroup.add(fGroup);
      flowers.push(fGroup);
    }

    // Swirling Butterflies
    const bGroup = new THREE.Group();
    scene.add(bGroup);
    const bWingGeo = new THREE.PlaneGeometry(0.16, 0.12);
    const bMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const bL = new THREE.Mesh(bWingGeo, bMat);
    bL.position.x = -0.08;
    const bR = new THREE.Mesh(bWingGeo, bMat);
    bR.position.x = 0.08;
    bGroup.add(bL);
    bGroup.add(bR);

    let clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Flower swaying in gentle breeze
      flowers.forEach((fl, idx) => {
        fl.rotation.z = Math.sin(t * 1.5 + idx) * 0.08;
        fl.rotation.x = Math.cos(t * 1.2 + idx) * 0.06;
      });

      // Butterfly path
      bGroup.position.set(Math.cos(t * 1.2) * 1.5, 1.4 + Math.sin(t * 2) * 0.3, Math.sin(t * 1.2) * 1.2);
      bGroup.rotation.y = -t * 1.2 + Math.PI / 2;
      const flap = Math.sin(t * 12) * 0.8;
      bL.rotation.y = flap;
      bR.rotation.y = -flap;

      // Slow garden yaw
      gardenGroup.rotation.y = Math.sin(t * 0.2) * 0.15;

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
    <div className={`w-full max-w-xl mx-auto p-4 sm:p-6 rounded-3xl glass-card border border-roseGold/35 text-center ${className}`}>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush text-xs font-semibold text-deepRose uppercase mb-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>3D Fairytale Garden</span>
      </div>

      <div ref={mountRef} className="w-full h-[220px] sm:h-[260px] flex items-center justify-center cursor-pointer" />

      {/* Flower selector buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        {flowerData.map((fl, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveFlower(fl)}
            className={`px-4 py-2 min-h-[42px] rounded-full text-xs sm:text-sm font-sans font-extrabold transition-all active:scale-95 ${
              activeFlower?.name === fl.name
                ? 'btn-royal-primary shadow-md scale-105'
                : 'btn-royal-secondary shadow-sm'
            }`}
          >
            {fl.name}
          </button>
        ))}
      </div>

      {/* Active Flower Meaning */}
      {activeFlower && (
        <div className="mt-3 p-3 rounded-2xl bg-white/90 border border-roseGold/30">
          <h4 className="font-heading font-bold text-base text-deepRose">
            {activeFlower.name}
          </h4>
          <p className="font-letter text-base italic text-brandText mt-0.5">
            "{activeFlower.meaning}"
          </p>
        </div>
      )}
    </div>
  );
};
