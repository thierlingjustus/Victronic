import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { roundedRectShape, roundedRectHole, smooth } from './geometry';
import { stageProgress } from '../useScrollStyle';
import type { ModelProps } from './types';

const W = 3.3;
const H = 2.3;
const D = 0.2;

/**
 * TFT-Display-Modul (modelType "display"): IPS-Panel im Metallchassis, hinten
 * Treiber-PCB mit FPC-Flachband und Steckverbindern. Beim Scrollen fährt die
 * Hintergrundbeleuchtung hoch – das Panel "schaltet sich ein".
 */
export default function DisplayPanel({ progress }: ModelProps) {
  const screenMat = useRef<THREE.MeshStandardMaterial>(null);

  // Schmaler schwarzer Bezel als flacher Rahmen mit Ausschnitt. Bewusst kein
  // Vollkörper – der würde hinten aus dem Chassis herausschauen und die
  // Rückansicht schwarz zumauern.
  const bezelGeometry = useMemo(() => {
    const shape = roundedRectShape(W - 0.08, H - 0.08, 0.05);
    shape.holes.push(roundedRectHole(W - 0.42, H - 0.42, 0.03));
    return new THREE.ShapeGeometry(shape, 16);
  }, []);

  useFrame(() => {
    if (!screenMat.current) return;
    const p = stageProgress(progress.get());
    screenMat.current.emissiveIntensity = 0.05 + 0.5 * smooth(p, 0.08, 0.42);
  });

  return (
    <group>
      {/* Metallchassis – bildet zugleich die Rückwand des Moduls */}
      <RoundedBox args={[W, H, D]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#c8ced5" roughness={0.38} metalness={0.62} />
      </RoundedBox>

      {/* Aktive Bildfläche */}
      <mesh position={[0, 0, D / 2 + 0.002]}>
        <planeGeometry args={[W - 0.4, H - 0.4]} />
        <meshStandardMaterial
          ref={screenMat}
          color="#0c1a26"
          emissive="#0086c4"
          emissiveIntensity={0.05}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Schwarzer Bezel rund um die Bildfläche */}
      <mesh geometry={bezelGeometry} position={[0, 0, D / 2 + 0.004]}>
        <meshStandardMaterial color="#12161c" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Rückseite: Treiber-PCB, flach aufs Chassis geschraubt */}
      <mesh position={[0, -0.45, -(D / 2 + 0.035)]}>
        <boxGeometry args={[1.85, 0.72, 0.05]} />
        <meshStandardMaterial color="#14532d" roughness={0.72} metalness={0.1} />
      </mesh>
      {/* Timing-Controller */}
      <mesh position={[-0.35, -0.45, -(D / 2 + 0.09)]}>
        <boxGeometry args={[0.42, 0.36, 0.06]} />
        <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Spannungswandler und Elkos */}
      <mesh position={[0.35, -0.58, -(D / 2 + 0.085)]}>
        <boxGeometry args={[0.5, 0.16, 0.05]} />
        <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.3} />
      </mesh>
      {[-0.78, 0.15, 0.42].map((x) => (
        <mesh key={x} position={[x, -0.26, -(D / 2 + 0.09)]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.09, 12]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}
      {/* LVDS-/eDP-Steckverbinder */}
      <mesh position={[0.78, -0.45, -(D / 2 + 0.09)]}>
        <boxGeometry args={[0.34, 0.13, 0.07]} />
        <meshStandardMaterial color="#e8ebee" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* FPC-Flachband vom Panel zum PCB */}
      <mesh position={[0, -0.02, -(D / 2 + 0.008)]}>
        <planeGeometry args={[1.05, 0.62]} />
        <meshStandardMaterial
          color="#b8751f"
          roughness={0.7}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Montagegewinde in den Ecken des Chassis */}
      {(
        [
          [-(W / 2 - 0.22), H / 2 - 0.22],
          [W / 2 - 0.22, H / 2 - 0.22],
          [-(W / 2 - 0.22), -(H / 2 - 0.22)],
          [W / 2 - 0.22, -(H / 2 - 0.22)],
        ] as [number, number][]
      ).map(([x, y], i) => (
        <mesh key={i} position={[x, y, -(D / 2 + 0.012)]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.02, 16]} />
          <meshStandardMaterial color="#9aa1a9" roughness={0.45} metalness={0.7} />
        </mesh>
      ))}

      {/* LED-Backlight-Leiste an der Unterkante */}
      <mesh position={[0, -(H / 2 + 0.03), 0]}>
        <boxGeometry args={[W - 0.7, 0.05, D * 0.42]} />
        <meshStandardMaterial color="#e9edf1" roughness={0.5} metalness={0.3} />
      </mesh>
    </group>
  );
}
