import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Heart, Sparkles } from 'lucide-react';

export const HeartUniverse3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xfff5f8, 0.9);
    scene.add(ambient);

    const pinkLight = new THREE.PointLight(0xe9a5bd, 2.5, 12);
    pinkLight.position.set(2, 2, 3);
    scene.add(pinkLight);

    const softRoseLight = new THREE.PointLight(0xb65f82, 1.8, 10);
    softRoseLight.position.set(-2, -2, 2);
    scene.add(softRoseLight);

    // 1. Extruded Glossy Heart
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.35, y, x - 0.35, y + 0.45, x - 0.35, y + 0.45);
    heartShape.bezierCurveTo(x - 0.35, y + 0.7, x - 0.1, y + 0.95, x + 0.25, y + 1.2);
    heartShape.bezierCurveTo(x + 0.6, y + 0.95, x + 0.85, y + 0.7, x + 0.85, y + 0.45);
    heartShape.bezierCurveTo(x + 0.85, y + 0.45, x + 0.85, y, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.25,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };

    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();

    const heartMat = new THREE.MeshPhysicalMaterial({
      color: 0xe9a5bd,
      emissive: 0xb65f82,
      emissiveIntensity: 0.25,
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.3,
      thickness: 0.8,
    });

    const heartMesh = new THREE.Mesh(heartGeo, heartMat);
    heartMesh.rotation.z = Math.PI;
    heartMesh.scale.set(1.4, 1.4, 1.4);
    scene.add(heartMesh);

    // 2. Swirling Nebula Particles
    const pCount = 180;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      const radius = 1.2 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      pPos[i] = Math.cos(angle) * radius;
      pPos[i + 1] = (Math.random() - 0.5) * 1.8;
      pPos[i + 2] = Math.sin(angle) * radius;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xf8dce8,
      size: 0.065,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Gentle heart heartbeat & rotation
      heartMesh.rotation.y = t * 0.45;
      heartMesh.rotation.x = Math.sin(t * 0.8) * 0.15;
      const beat = 1.35 + Math.sin(t * 2.5) * 0.06;
      heartMesh.scale.set(beat, beat, beat);

      // Orbiting nebula
      particles.rotation.y = -t * 0.2;
      particles.rotation.x = t * 0.05;

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
    <div className={`w-full max-w-lg mx-auto p-4 sm:p-6 rounded-3xl glass-card text-center border border-roseGold/35 ${className}`}>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush text-xs font-semibold text-deepRose uppercase mb-1">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Heart of The Universe</span>
      </div>

      <div ref={mountRef} className="w-full h-[220px] sm:h-[260px] flex items-center justify-center cursor-pointer" />

      <h4 className="font-heading font-extrabold text-xl sm:text-2xl text-deepRose mt-1">
        "Even when we fight, you're still my Thanga Pulla."
      </h4>
      <p className="font-letter text-base italic text-brandText/80 mt-1">
        No argument is ever bigger than our bond.
      </p>
    </div>
  );
};
