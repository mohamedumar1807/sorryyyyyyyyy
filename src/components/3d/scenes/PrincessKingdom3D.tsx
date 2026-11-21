import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PrincessKingdom3DProps {
  className?: string;
  onExplore?: () => void;
}

export const PrincessKingdom3D: React.FC<PrincessKingdom3DProps> = ({
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 280;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfff5f8, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 11);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffbf5, 1.2);
    sunLight.position.set(5, 10, 7);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const pinkPointLight = new THREE.PointLight(0xe9a5bd, 1.5, 15);
    pinkPointLight.position.set(0, 2.5, 2);
    scene.add(pinkPointLight);

    // 3. Castle Group
    const castleGroup = new THREE.Group();
    scene.add(castleGroup);

    // Materials
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xf8dce8,
      roughness: 0.4,
      metalness: 0.1,
    });
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0xb65f82,
      roughness: 0.3,
      metalness: 0.3,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd9a0a9,
      metalness: 0.8,
      roughness: 0.2,
    });
    const windowMat = new THREE.MeshBasicMaterial({ color: 0xfff3d6 });

    // Main Keep
    const mainKeepGeo = new THREE.BoxGeometry(2.4, 2.2, 1.8);
    const mainKeep = new THREE.Mesh(mainKeepGeo, wallMat);
    mainKeep.position.y = 1.1;
    mainKeep.castShadow = true;
    mainKeep.receiveShadow = true;
    castleGroup.add(mainKeep);

    // Central Tower
    const centerTowerGeo = new THREE.CylinderGeometry(0.7, 0.75, 3.2, 16);
    const centerTower = new THREE.Mesh(centerTowerGeo, wallMat);
    centerTower.position.set(0, 1.6, 0);
    centerTower.castShadow = true;
    castleGroup.add(centerTower);

    // Central Cone Roof
    const centerConeGeo = new THREE.ConeGeometry(0.95, 1.8, 16);
    const centerCone = new THREE.Mesh(centerConeGeo, roofMat);
    centerCone.position.set(0, 3.8, 0);
    centerCone.castShadow = true;
    castleGroup.add(centerCone);

    // Rose-Gold Crown on Top Spire
    const crownRingGeo = new THREE.TorusGeometry(0.25, 0.06, 8, 24);
    const crownTop = new THREE.Mesh(crownRingGeo, goldMat);
    crownTop.rotation.x = Math.PI / 2;
    crownTop.position.set(0, 4.8, 0);
    castleGroup.add(crownTop);

    // 4 Corner Towers
    const cornerPositions = [
      [-1.4, 0, -1],
      [1.4, 0, -1],
      [-1.4, 0, 1],
      [1.4, 0, 1],
    ];

    cornerPositions.forEach(([x, _, z]) => {
      const towerGeo = new THREE.CylinderGeometry(0.42, 0.45, 2.6, 12);
      const tower = new THREE.Mesh(towerGeo, wallMat);
      tower.position.set(x, 1.3, z);
      tower.castShadow = true;
      castleGroup.add(tower);

      const coneGeo = new THREE.ConeGeometry(0.55, 1.2, 12);
      const cone = new THREE.Mesh(coneGeo, roofMat);
      cone.position.set(x, 2.9, z);
      cone.castShadow = true;
      castleGroup.add(cone);

      // Gold sphere tip
      const tipGeo = new THREE.SphereGeometry(0.09, 8, 8);
      const tip = new THREE.Mesh(tipGeo, goldMat);
      tip.position.set(x, 3.55, z);
      castleGroup.add(tip);
    });

    // Castle Arch Gate
    const gateGeo = new THREE.BoxGeometry(0.7, 1.1, 0.1);
    const gateMat = new THREE.MeshStandardMaterial({ color: 0x624657, roughness: 0.6 });
    const gate = new THREE.Mesh(gateGeo, gateMat);
    gate.position.set(0, 0.55, 0.92);
    castleGroup.add(gate);

    // Glowing Castle Windows
    const winGeo = new THREE.PlaneGeometry(0.22, 0.35);
    const w1 = new THREE.Mesh(winGeo, windowMat);
    w1.position.set(0, 2.2, 0.72);
    castleGroup.add(w1);

    const w2 = new THREE.Mesh(winGeo, windowMat);
    w2.position.set(-0.6, 1.2, 0.92);
    castleGroup.add(w2);

    const w3 = new THREE.Mesh(winGeo, windowMat);
    w3.position.set(0.6, 1.2, 0.92);
    castleGroup.add(w3);

    // Castle Base Island
    const islandGeo = new THREE.CylinderGeometry(3.6, 4.0, 0.6, 32);
    const islandMat = new THREE.MeshStandardMaterial({
      color: 0xeae3fa,
      roughness: 0.8,
    });
    const island = new THREE.Mesh(islandGeo, islandMat);
    island.position.y = -0.3;
    island.receiveShadow = true;
    castleGroup.add(island);

    // 4. Floating Clouds
    const cloudsGroup = new THREE.Group();
    scene.add(cloudsGroup);

    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      transparent: true,
      opacity: 0.85,
    });

    for (let c = 0; c < 5; c++) {
      const singleCloud = new THREE.Group();
      const puffCount = 3 + Math.floor(Math.random() * 2);
      for (let p = 0; p < puffCount; p++) {
        const puff = new THREE.Mesh(
          new THREE.SphereGeometry(0.35 + Math.random() * 0.25, 8, 8),
          cloudMat
        );
        puff.position.set(p * 0.4 - 0.5, Math.random() * 0.15, (Math.random() - 0.5) * 0.3);
        singleCloud.add(puff);
      }
      singleCloud.position.set(
        (Math.random() - 0.5) * 9,
        2.5 + Math.random() * 2.2,
        (Math.random() - 0.5) * 6 - 2
      );
      cloudsGroup.add(singleCloud);
    }

    // 5. Fluttering Butterflies
    const butterfliesGroup = new THREE.Group();
    scene.add(butterfliesGroup);

    const butterflyWings: { left: THREE.Mesh; right: THREE.Mesh; pivot: THREE.Group; speed: number; angle: number; radius: number }[] = [];
    const bMat = new THREE.MeshBasicMaterial({ color: 0xe9a5bd, side: THREE.DoubleSide });

    for (let b = 0; b < 4; b++) {
      const bPivot = new THREE.Group();
      const wingGeo = new THREE.PlaneGeometry(0.18, 0.14);

      const leftWing = new THREE.Mesh(wingGeo, bMat);
      leftWing.position.x = -0.09;
      const rightWing = new THREE.Mesh(wingGeo, bMat);
      rightWing.position.x = 0.09;

      bPivot.add(leftWing);
      bPivot.add(rightWing);

      bPivot.position.set(
        Math.cos((b * Math.PI) / 2) * 2.5,
        1.2 + b * 0.4,
        Math.sin((b * Math.PI) / 2) * 2.5
      );
      butterfliesGroup.add(bPivot);

      butterflyWings.push({
        left: leftWing,
        right: rightWing,
        pivot: bPivot,
        speed: 8 + Math.random() * 4,
        angle: (b * Math.PI) / 2,
        radius: 2.2 + Math.random() * 0.8,
      });
    }

    // 6. Floating Sparkles / Golden Stars
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 45;
    const starPositions = new Float32Array(starCount * 3);
    for (let s = 0; s < starCount * 3; s += 3) {
      starPositions[s] = (Math.random() - 0.5) * 12;
      starPositions[s + 1] = Math.random() * 6;
      starPositions[s + 2] = (Math.random() - 0.5) * 8;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xd9a0a9,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
    });
    const stars = new THREE.Points(starsGeo, starMat);
    scene.add(stars);

    // Animation Loop
    let clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Gentle castle floating and slow yaw rotation
      castleGroup.position.y = Math.sin(t * 1.2) * 0.12;
      castleGroup.rotation.y = Math.sin(t * 0.3) * 0.15;

      // Cloud drift
      cloudsGroup.children.forEach((cloud, i) => {
        cloud.position.x += 0.003 * (i % 2 === 0 ? 1 : -0.8);
        if (cloud.position.x > 5) cloud.position.x = -5;
        if (cloud.position.x < -5) cloud.position.x = 5;
      });

      // Butterfly fluttering & orbital flight
      butterflyWings.forEach((b) => {
        b.angle += 0.015;
        b.pivot.position.x = Math.cos(b.angle) * b.radius;
        b.pivot.position.z = Math.sin(b.angle) * b.radius;
        b.pivot.position.y += Math.sin(t * 3) * 0.004;
        b.pivot.rotation.y = -b.angle + Math.PI / 2;

        const flap = Math.sin(t * b.speed) * 0.7;
        b.left.rotation.y = flap;
        b.right.rotation.y = -flap;
      });

      // Star rotation
      stars.rotation.y = t * 0.02;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 360;
      const newH = container.clientHeight || 280;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden rounded-3xl ${className}`}>
      <div ref={mountRef} className="w-full h-[260px] sm:h-[320px] flex items-center justify-center cursor-grab active:cursor-grabbing" />
      {/* Decorative caption badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-roseGold/30 text-xs font-heading font-medium text-brandText shadow-sm whitespace-nowrap">
        👑 The Kingdom Built For My Princess
      </div>
    </div>
  );
};
