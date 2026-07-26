import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { smooth } from './geometry';
import { stageProgress } from '../useScrollStyle';
import type { ModelProps } from './types';

/** Segmentblöcke auf dem monochromen Panel – deuten die Anzeige an. */
const SEGMENTS: [number, number, number, number][] = [
  // x, y, breite, höhe
  [-0.78, 0.32, 0.42, 0.55],
  [-0.26, 0.32, 0.42, 0.55],
  [0.26, 0.32, 0.42, 0.55],
  [0.78, 0.32, 0.42, 0.55],
  [-0.6, -0.42, 1.5, 0.16],
  [-0.6, -0.68, 1.0, 0.16],
];

/**
 * LCM/LCD-Modul (modelType "lcd"): monochromes FSTN-Glaspanel mit
 * Elastomer-Streifenverbinder und COB-Platine (Treiber-IC als schwarzer
 * Vergusstropfen). Das Backlight fährt beim Scrollen hoch.
 */
export default function LcdModule({ progress }: ModelProps) {
  const backlightMat = useRef<THREE.MeshStandardMaterial>(null);

  const segmentMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#0f2a1c', transparent: true, opacity: 0.25, roughness: 0.8 }),
    []
  );
  useEffect(() => () => segmentMaterial.dispose(), [segmentMaterial]);

  useFrame(() => {
    const p = stageProgress(progress.get());
    const on = smooth(p, 0.1, 0.45);
    if (backlightMat.current) backlightMat.current.emissiveIntensity = 0.05 + 0.7 * on;
    segmentMaterial.opacity = 0.25 + 0.7 * on;
  });

  return (
    <group>
      {/* Trägerplatine (COB) */}
      <mesh position={[0, -0.15, -0.14]}>
        <boxGeometry args={[3.1, 1.95, 0.07]} />
        <meshStandardMaterial color="#14532d" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Treiber-IC als schwarzer Vergusstropfen (Chip-on-Board) */}
      <mesh position={[0, -0.92, -0.19]} scale={[1, 0.42, 0.34]}>
        <sphereGeometry args={[0.36, 20, 12]} />
        <meshStandardMaterial color="#0b0e12" roughness={0.35} metalness={0.05} />
      </mesh>

      {/* Pfostenstecker am Rand */}
      <mesh position={[1.3, -0.9, -0.2]}>
        <boxGeometry args={[0.36, 0.14, 0.12]} />
        <meshStandardMaterial color="#1f2937" roughness={0.6} metalness={0.15} />
      </mesh>
      {[-0.06, 0.06].map((dy) => (
        <mesh key={dy} position={[1.3, -0.9 + dy, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.14, 8]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.85} />
        </mesh>
      ))}

      {/* Backlight-Diffusor hinter dem Glas */}
      <mesh position={[0, 0.02, -0.06]}>
        <planeGeometry args={[2.8, 1.6]} />
        <meshStandardMaterial
          ref={backlightMat}
          color="#dff5e4"
          emissive="#8fe0a8"
          emissiveIntensity={0.05}
          roughness={0.9}
        />
      </mesh>

      {/* Elastomer-Streifenverbinder zwischen Glas und Platine */}
      <mesh position={[0, -0.83, -0.03]}>
        <boxGeometry args={[2.5, 0.1, 0.07]} />
        <meshStandardMaterial color="#4b5563" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Monochromes FSTN-Glaspanel */}
      <mesh position={[0, 0.02, 0.0]}>
        <boxGeometry args={[2.95, 1.75, 0.05]} />
        <meshPhysicalMaterial
          color="#e7f2ea"
          transparent
          opacity={0.42}
          roughness={0.06}
          metalness={0}
          clearcoat={1}
        />
      </mesh>

      {/* Angedeutete Segmente auf dem Panel – teilen sich ein Material,
          damit der Kontrast beim Einschalten gemeinsam hochfährt. */}
      {SEGMENTS.map(([x, y, w, h], i) => (
        <mesh key={i} position={[x, y, 0.028]} material={segmentMaterial}>
          <planeGeometry args={[w, h]} />
        </mesh>
      ))}
    </group>
  );
}
