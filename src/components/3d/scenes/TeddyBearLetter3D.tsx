import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export const TeddyBearLetter3D: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hasDelivered, setHasDelivered] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 1.8, 5.2);
    camera.lookAt(0, 0.6, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 0.95);
    scene.add(ambientLight);

    const directLight = new THREE.DirectionalLight(0xfffbf5, 1.2);
    directLight.position.set(3, 6, 4);
    directLight.castShadow = true;
    scene.add(directLight);

    const teddyGroup = new THREE.Group();
    scene.add(teddyGroup);

    // Teddy Bear Materials
    const furMat = new THREE.MeshStandardMaterial({
      color: 0xdeb887, // soft warm biscuit bear color
      roughness: 0.85,
    });
    const snoutMat = new THREE.MeshStandardMaterial({
      color: 0xfff0db,
      roughness: 0.7,
    });
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x2d1820,
      roughness: 0.2,
    });
    const noseMat = new THREE.MeshStandardMaterial({
      color: 0x624657,
      roughness: 0.4,
    });
    const innerEarMat = new THREE.MeshStandardMaterial({
      color: 0xf8dce8,
      roughness: 0.8,
    });
    const letterMat = new THREE.MeshStandardMaterial({
      color: 0xb65f82,
      roughness: 0.3,
      metalness: 0.2,
    });

    // 1. Bear Head
    const headGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const head = new THREE.Mesh(headGeo, furMat);
    head.position.y = 1.1;
    head.castShadow = true;
    teddyGroup.add(head);

    // Snout
    const snoutGeo = new THREE.SphereGeometry(0.24, 12, 12);
    snoutGeo.scale(1, 0.7, 1);
    const snout = new THREE.Mesh(snoutGeo, snoutMat);
    snout.position.set(0, 0.98, 0.42);
    teddyGroup.add(snout);

    // Nose
    const noseGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.set(0, 1.05, 0.62);
    teddyGroup.add(nose);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.065, 8, 8);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.2, 1.18, 0.46);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.2, 1.18, 0.46);
    teddyGroup.add(leftEye);
    teddyGroup.add(rightEye);

    // Ears
    const earGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const leftEar = new THREE.Mesh(earGeo, furMat);
    leftEar.position.set(-0.42, 1.5, 0.1);
    const rightEar = new THREE.Mesh(earGeo, furMat);
    rightEar.position.set(0.42, 1.5, 0.1);

    const innerEarGeo = new THREE.SphereGeometry(0.1, 8, 8);
    const leftInnerEar = new THREE.Mesh(innerEarGeo, innerEarMat);
    leftInnerEar.position.set(-0.42, 1.5, 0.18);
    const rightInnerEar = new THREE.Mesh(innerEarGeo, innerEarMat);
    rightInnerEar.position.set(0.42, 1.5, 0.18);

    teddyGroup.add(leftEar);
    teddyGroup.add(rightEar);
    teddyGroup.add(leftInnerEar);
    teddyGroup.add(rightInnerEar);

    // 2. Body
    const bodyGeo = new THREE.SphereGeometry(0.65, 16, 16);
    bodyGeo.scale(1, 1.15, 0.9);
    const body = new THREE.Mesh(bodyGeo, furMat);
    body.position.y = 0.45;
    body.castShadow = true;
    teddyGroup.add(body);

    // Tummy patch
    const tummyGeo = new THREE.SphereGeometry(0.38, 12, 12);
    tummyGeo.scale(1, 1.1, 0.4);
    const tummy = new THREE.Mesh(tummyGeo, snoutMat);
    tummy.position.set(0, 0.45, 0.52);
    teddyGroup.add(tummy);

    // 3. Arms
    const armGeo = new THREE.CapsuleGeometry(0.16, 0.45, 8, 8);

    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.55, 0.65, 0);
    const leftArm = new THREE.Mesh(armGeo, furMat);
    leftArm.position.y = -0.25;
    leftArmGroup.add(leftArm);
    teddyGroup.add(leftArmGroup);

    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.55, 0.65, 0);
    const rightArm = new THREE.Mesh(armGeo, furMat);
    rightArm.position.y = -0.25;
    rightArmGroup.add(rightArm);
    teddyGroup.add(rightArmGroup);

    // 4. Legs
    const legGeo = new THREE.CapsuleGeometry(0.19, 0.45, 8, 8);
    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.35, -0.05, 0);
    const leftLeg = new THREE.Mesh(legGeo, furMat);
    leftLeg.position.y = -0.22;
    leftLegGroup.add(leftLeg);
    teddyGroup.add(leftLegGroup);

    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(0.35, -0.05, 0);
    const rightLeg = new THREE.Mesh(legGeo, furMat);
    rightLeg.position.y = -0.22;
    rightLegGroup.add(rightLeg);
    teddyGroup.add(rightLegGroup);

    // 5. Heart-Shaped Letter
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = { depth: 0.08, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
    const letterHeartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    letterHeartGeo.center();
    const heartLetter = new THREE.Mesh(letterHeartGeo, letterMat);
    heartLetter.scale.set(0.7, 0.7, 0.7);
    heartLetter.rotation.z = Math.PI;
    heartLetter.position.set(0, 0.45, 0.65);
    teddyGroup.add(heartLetter);

    // Gentle floor shadow
    const floorGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.05, 24);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xf8dce8, roughness: 0.9 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.35;
    floor.receiveShadow = true;
    scene.add(floor);

    let clock = new THREE.Clock();
    let frameId: number;

    // Bear starts walking in from right (+2.5) to center (0), places letter down, sits down
    teddyGroup.position.set(2.2, 0, 0);

    const animate = () => {
      const t = clock.getElapsedTime();

      // Walking Phase: t from 0 to 3.5s
      if (t < 3.2) {
        teddyGroup.position.x = 2.2 - (t / 3.2) * 2.2;
        teddyGroup.position.y = Math.abs(Math.sin(t * 7)) * 0.08;

        // Waddle leg swing
        leftLegGroup.rotation.x = Math.sin(t * 7) * 0.6;
        rightLegGroup.rotation.x = -Math.sin(t * 7) * 0.6;

        // Arm swing holding letter
        leftArmGroup.rotation.x = -0.5 + Math.sin(t * 7) * 0.15;
        rightArmGroup.rotation.x = -0.5 - Math.sin(t * 7) * 0.15;
      } else {
        // Bear is in position, places letter down and sits down
        teddyGroup.position.x = -0.4;
        teddyGroup.position.y = -0.08; // sitting down

        leftLegGroup.rotation.x = -1.2; // sitting legs forward
        rightLegGroup.rotation.x = -1.2;
        leftLegGroup.position.z = 0.2;
        rightLegGroup.position.z = 0.2;

        // Letter placed beside on the floor
        heartLetter.position.set(0.65, -0.15, 0.3);
        heartLetter.rotation.x = Math.PI / 4;
        heartLetter.rotation.y = Math.sin(t * 1.5) * 0.1;

        // Gentle waving right arm
        rightArmGroup.rotation.x = -1.4;
        rightArmGroup.rotation.z = Math.sin(t * 4) * 0.35 - 0.2;

        // Happy head tilt
        head.rotation.z = Math.sin(t * 1.5) * 0.1;
        head.rotation.y = Math.sin(t * 1.2) * 0.15;

        if (!hasDelivered) setHasDelivered(true);
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
    <div className={`relative w-full overflow-hidden rounded-3xl bg-white/70 backdrop-blur-md border border-roseGold/30 p-4 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div ref={mountRef} className="w-full sm:w-1/2 h-[240px] flex items-center justify-center cursor-pointer" />
        <div className="w-full sm:w-1/2 space-y-2 text-left pr-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blush text-xs font-semibold text-deepRose uppercase">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Special Delivery</span>
          </div>
          <h4 className="font-heading font-bold text-lg text-brandText">
            A Letter Carried With Care
          </h4>
          <p className="font-letter text-base text-brandText/90 italic leading-relaxed">
            "My little messenger has brought this letter to you, Thanga Pulla. Every word in it is written with true regret and pure sibling love."
          </p>
        </div>
      </div>
    </div>
  );
};
