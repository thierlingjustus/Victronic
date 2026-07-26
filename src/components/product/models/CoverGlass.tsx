import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { roundedRectShape, smooth } from './geometry';
import { stageProgress } from '../useScrollStyle';
import type { ModelProps } from './types';

/**
 * Glaslösung (modelType "glass"): chemisch gehärtetes Cover-Glas mit gefaster
 * Kante, umlaufendem Siebdruck-Passepartout und CNC-gefrästem Rundausschnitt.
 * Beim Scrollen legt sich eine Anti-Reflex-Vergütung als Schimmer darüber.
 */
export default function CoverGlass({ progress }: ModelProps) {
  const arMat = useRef<THREE.MeshStandardMaterial>(null);

  // Glasscheibe mit CNC-Rundausschnitt, leicht gefaste Kante über den Bevel
  const glassGeometry = useMemo(() => {
    const shape = roundedRectShape(3.3, 2.3, 0.14);
    const cutout = new THREE.Path();
    cutout.absarc(1.02, -0.66, 0.24, 0, Math.PI * 2, false);
    shape.holes.push(cutout);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.09,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3,
      curveSegments: 32,
    });
    geo.center();
    return geo;
  }, []);

  // Siebgedruckter Rand als Rahmen-Shape mit Innenausschnitt
  const printGeometry = useMemo(() => {
    const shape = roundedRectShape(3.28, 2.28, 0.13);
    const inner = new THREE.Path();
    const w = 2.62;
    const h = 1.62;
    const r = 0.08;
    const x = -w / 2;
    const y = -h / 2;
    inner.moveTo(x + r, y);
    inner.lineTo(x + w - r, y);
    inner.quadraticCurveTo(x + w, y, x + w, y + r);
    inner.lineTo(x + w, y + h - r);
    inner.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    inner.lineTo(x + r, y + h);
    inner.quadraticCurveTo(x, y + h, x, y + h - r);
    inner.lineTo(x, y + r);
    inner.quadraticCurveTo(x, y, x + r, y);
    shape.holes.push(inner);
    return new THREE.ShapeGeometry(shape, 24);
  }, []);

  useEffect(() => {
    return () => {
      glassGeometry.dispose();
      printGeometry.dispose();
    };
  }, [glassGeometry, printGeometry]);

  useFrame(() => {
    if (!arMat.current) return;
    const on = smooth(stageProgress(progress.get()), 0.18, 0.55);
    arMat.current.opacity = 0.02 + 0.2 * on;
    arMat.current.emissiveIntensity = 0.1 + 0.5 * on;
  });

  return (
    <group>
      {/* Gehärtetes Deckglas */}
      <mesh geometry={glassGeometry}>
        <meshPhysicalMaterial
          color="#cfe0ea"
          transparent
          opacity={0.3}
          roughness={0.02}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.01}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Siebdruck-Passepartout auf der Rückseite */}
      <mesh geometry={printGeometry} position={[0, 0, -0.055]}>
        <meshStandardMaterial color="#0d1117" roughness={0.6} metalness={0.08} side={THREE.DoubleSide} />
      </mesh>

      {/* AG/AR-Vergütung als Schimmer auf der Sichtfläche */}
      <mesh position={[0, 0, 0.062]}>
        <planeGeometry args={[2.6, 1.6]} />
        <meshStandardMaterial
          ref={arMat}
          color="#a8e6ff"
          emissive="#00a0e8"
          emissiveIntensity={0.1}
          transparent
          opacity={0.02}
          roughness={0.05}
          metalness={0.2}
        />
      </mesh>

      {/* Kapazitive Bedienelemente im Siebdruckrand */}
      {[-0.9, -0.45, 0].map((x) => (
        <mesh key={x} position={[x, -0.94, -0.058]}>
          <circleGeometry args={[0.085, 24]} />
          <meshStandardMaterial color="#5a6572" roughness={0.5} metalness={0.2} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Splitterschutzfolie auf der Rückseite (Shatter-Proof) */}
      <mesh position={[0, 0, -0.075]}>
        <planeGeometry args={[3.16, 2.16]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.12} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
