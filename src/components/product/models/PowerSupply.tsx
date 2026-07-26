import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { smooth } from './geometry';
import { stageProgress } from '../useScrollStyle';
import type { ModelProps } from './types';

const W = 1.5;
const H = 2.3;
const D = 1.15;

/**
 * Stromversorgung (modelType "power"): Hutschienen-Netzteil im Metallgehäuse
 * mit Lüftungsschlitzen, Schraubklemmen oben und unten sowie DIN-Rail-Clip auf
 * der Rückseite. Die Status-LED geht beim Scrollen an.
 */
export default function PowerSupply({ progress }: ModelProps) {
  const ledMat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    if (!ledMat.current) return;
    ledMat.current.emissiveIntensity = 0.1 + 1.6 * smooth(stageProgress(progress.get()), 0.12, 0.4);
  });

  return (
    <group>
      {/* Gehäusekörper */}
      <RoundedBox args={[W, H, D]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#d6dbe1" roughness={0.36} metalness={0.5} />
      </RoundedBox>

      {/* Lüftungsschlitze auf beiden Seiten */}
      {[-1, 1].map((side) =>
        [-0.55, -0.28, -0.01, 0.26, 0.53].map((y) => (
          <mesh key={`${side}-${y}`} position={[side * (W / 2 + 0.001), y, 0]}>
            <boxGeometry args={[0.02, 0.11, D * 0.72]} />
            <meshStandardMaterial color="#3d444d" roughness={0.9} metalness={0.05} />
          </mesh>
        ))
      )}

      {/* Typenschild vorne */}
      <mesh position={[0, 0.35, D / 2 + 0.002]}>
        <planeGeometry args={[W * 0.82, 0.85]} />
        <meshStandardMaterial color="#f5f7f9" roughness={0.85} metalness={0} />
      </mesh>
      {[0.62, 0.5, 0.38, 0.26].map((y, i) => (
        <mesh key={y} position={[-0.08 + i * 0.02, y, D / 2 + 0.004]}>
          <planeGeometry args={[W * (0.6 - i * 0.08), 0.045]} />
          <meshStandardMaterial color="#8b939c" roughness={0.9} />
        </mesh>
      ))}

      {/* Status-LED (DC OK) */}
      <mesh position={[0.42, -0.28, D / 2 + 0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.03, 16]} />
        <meshStandardMaterial
          ref={ledMat}
          color="#134e2b"
          emissive="#22c55e"
          emissiveIntensity={0.1}
          roughness={0.25}
        />
      </mesh>

      {/* Schraubklemmen oben (AC-Eingang) und unten (DC-Ausgang) */}
      {(
        [
          [H / 2 + 0.09, '#1f2937'],
          [-(H / 2 + 0.09), '#0f766e'],
        ] as [number, string][]
      ).map(([y, color]) => (
        <group key={y}>
          <mesh position={[0, y, 0]}>
            <boxGeometry args={[W * 0.88, 0.2, D * 0.66]} />
            <meshStandardMaterial color={color} roughness={0.65} metalness={0.12} />
          </mesh>
          {[-0.42, -0.14, 0.14, 0.42].map((x) => (
            <mesh key={x} position={[x, y + (y > 0 ? 0.11 : -0.11), 0]} rotation={[0, 0, 0.4]}>
              <cylinderGeometry args={[0.055, 0.055, 0.03, 12]} />
              <meshStandardMaterial color="#b9c0c8" roughness={0.3} metalness={0.85} />
            </mesh>
          ))}
        </group>
      ))}

      {/* DIN-Rail-Clip auf der Rückseite */}
      <mesh position={[0, 0.28, -(D / 2 + 0.08)]}>
        <boxGeometry args={[W * 0.72, 0.5, 0.14]} />
        <meshStandardMaterial color="#9aa1a9" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.3, -(D / 2 + 0.1)]}>
        <boxGeometry args={[W * 0.55, 0.34, 0.09]} />
        <meshStandardMaterial color="#2b2f36" roughness={0.75} metalness={0.15} />
      </mesh>
    </group>
  );
}
