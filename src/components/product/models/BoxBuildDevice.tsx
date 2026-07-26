import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { roundedRectShape, roundedRectHole, smooth } from './geometry';
import { stageProgress } from '../useScrollStyle';
import type { ModelProps } from './types';

/**
 * Box-Build-Endgerät (modelType "assembly"): fertig montiertes Gerät aus
 * Frontblende, Display, PCBA und Rückschale – inklusive Bedientasten und
 * HDMI-/Ethernet-Anschlüssen auf der Rückseite. Das Display schaltet sich beim
 * Scrollen ein, so wie beim End-of-Line-Funktionstest.
 */
export default function BoxBuildDevice({ progress }: ModelProps) {
  const screenMat = useRef<THREE.MeshStandardMaterial>(null);

  const frontGeometry = useMemo(() => {
    const shape = roundedRectShape(3.5, 2.5, 0.32);
    shape.holes.push(roundedRectHole(2.6, 1.75, 0.1));
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.24,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 2,
      curveSegments: 20,
    });
    geo.center();
    return geo;
  }, []);

  useFrame(() => {
    if (!screenMat.current) return;
    screenMat.current.emissiveIntensity = 0.05 + 0.7 * smooth(stageProgress(progress.get()), 0.1, 0.45);
  });

  return (
    <group>
      {/* Frontblende (Kunststoff-Spritzguss) */}
      <mesh geometry={frontGeometry} position={[0, 0, 0.3]}>
        <meshStandardMaterial color="#d2d7dd" roughness={0.55} metalness={0.08} />
      </mesh>

      {/* Displaymodul hinter der Blende */}
      <RoundedBox args={[2.9, 1.98, 0.16]} radius={0.03} position={[0, 0, 0.16]}>
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0, 0.25]}>
        <planeGeometry args={[2.55, 1.7]} />
        <meshStandardMaterial
          ref={screenMat}
          color="#0b1220"
          emissive="#00a0e8"
          emissiveIntensity={0.05}
          roughness={0.15}
          metalness={0.4}
        />
      </mesh>

      {/* Bedientasten in der Blende */}
      {[-0.5, -0.17, 0.16, 0.49].map((x) => (
        <mesh key={x} position={[x, -1.12, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.07, 20]} />
          <meshStandardMaterial color="#3f4650" roughness={0.7} metalness={0.1} />
        </mesh>
      ))}

      {/* PCBA im Gehäuseinneren */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[3.0, 2.1, 0.07]} />
        <meshStandardMaterial color="#14532d" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[-0.68, 0.32, -0.11]}>
        <boxGeometry args={[0.6, 0.6, 0.11]} />
        <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0.5, -0.42, -0.1]}>
        <boxGeometry args={[0.8, 0.38, 0.09]} />
        <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Rückschale – reicht bis an die Frontblende heran, damit das Gerät
          als geschlossene Einheit und nicht als Explosionsansicht wirkt. */}
      <RoundedBox args={[3.5, 2.5, 0.62]} radius={0.2} position={[0, 0, -0.11]}>
        <meshStandardMaterial color="#c2c8d0" roughness={0.55} metalness={0.08} />
      </RoundedBox>

      {/* Anschlüsse auf der Rückseite: HDMI, Ethernet, Stromversorgung */}
      <mesh position={[-0.7, -0.55, -0.46]}>
        <boxGeometry args={[0.5, 0.24, 0.14]} />
        <meshStandardMaterial color="#8b939c" roughness={0.35} metalness={0.8} />
      </mesh>
      <mesh position={[-0.02, -0.55, -0.46]}>
        <boxGeometry args={[0.4, 0.36, 0.14]} />
        <meshStandardMaterial color="#5a6572" roughness={0.45} metalness={0.55} />
      </mesh>
      <mesh position={[0.62, -0.55, -0.46]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.14, 18]} />
        <meshStandardMaterial color="#2b2f36" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Kabelkonfektion, die aus dem Gerät führt */}
      <mesh position={[1.05, -0.55, -0.5]} rotation={[0, 0.3, 0.2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 12]} />
        <meshStandardMaterial color="#22262c" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Typenschild / Prüfaufkleber – zeigt nach hinten */}
      <mesh position={[0, 0.5, -0.446]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.5, 0.85]} />
        <meshStandardMaterial color="#f5f7f9" roughness={0.85} />
      </mesh>
      {[0.78, 0.66, 0.54, 0.42].map((y, i) => (
        <mesh key={y} position={[-0.05 + i * 0.03, y, -0.448]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.1 - i * 0.16, 0.05]} />
          <meshStandardMaterial color="#8b939c" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
