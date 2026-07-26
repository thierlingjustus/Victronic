import { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { roundedRectShape, roundedRectHole } from './geometry';
import type { ModelProps } from './types';

/**
 * Kunststoffkomponente (modelType "plastic"): Gehäuse-Halbschale aus
 * glasfaserverstärktem PA66+GF mit Verstärkungsrippen, Schraubdomen und
 * Rastclips – daneben die weiche Griffzone aus dem 2K-Spritzguss.
 */
export default function PlasticHousing(_props: ModelProps) {
  // Wandung der Halbschale: Rahmen mit Innenausschnitt
  const wallGeometry = useMemo(() => {
    const shape = roundedRectShape(3.2, 2.4, 0.3);
    shape.holes.push(roundedRectHole(2.82, 2.02, 0.2));
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.62,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 2,
      curveSegments: 20,
    });
    geo.center();
    return geo;
  }, []);

  return (
    <group rotation={[0.12, 0, 0]}>
      {/* Wandung */}
      <mesh geometry={wallGeometry}>
        <meshStandardMaterial color="#dfe4e9" roughness={0.62} metalness={0.05} />
      </mesh>

      {/* Bodenplatte */}
      <RoundedBox args={[3.2, 2.4, 0.1]} radius={0.04} position={[0, 0, -0.3]}>
        <meshStandardMaterial color="#d7dce2" roughness={0.66} metalness={0.05} />
      </RoundedBox>

      {/* Schraubdome in den Ecken */}
      {(
        [
          [-1.18, -0.78],
          [1.18, -0.78],
          [1.18, 0.78],
          [-1.18, 0.78],
        ] as [number, number][]
      ).map(([x, y], i) => (
        <group key={i}>
          <mesh position={[x, y, 0.0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.15, 0.5, 18]} />
            <meshStandardMaterial color="#dadfe5" roughness={0.6} metalness={0.05} />
          </mesh>
          {/* Gewindeeinsatz aus Messing */}
          <mesh position={[x, y, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.062, 0.062, 0.14, 14]} />
            <meshStandardMaterial color="#b08d57" roughness={0.4} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Verstärkungsrippen auf der Bodenplatte */}
      {[-0.62, 0, 0.62].map((y) => (
        <mesh key={`h${y}`} position={[0, y, -0.19]}>
          <boxGeometry args={[2.6, 0.075, 0.2]} />
          <meshStandardMaterial color="#d2d8de" roughness={0.64} metalness={0.05} />
        </mesh>
      ))}
      {[-0.75, 0.75].map((x) => (
        <mesh key={`v${x}`} position={[x, 0, -0.19]}>
          <boxGeometry args={[0.075, 1.85, 0.2]} />
          <meshStandardMaterial color="#d2d8de" roughness={0.64} metalness={0.05} />
        </mesh>
      ))}

      {/* Rastclips an den Längsseiten */}
      {[-1, 1].map((side) =>
        [-0.5, 0.5].map((y) => (
          <mesh key={`${side}-${y}`} position={[side * 1.48, y, 0.22]}>
            <boxGeometry args={[0.1, 0.32, 0.12]} />
            <meshStandardMaterial color="#ccd2d9" roughness={0.6} metalness={0.05} />
          </mesh>
        ))
      )}

      {/* Weiche Griffzone (2K-Spritzguss, Hart-Weich-Verbindung) */}
      <mesh position={[0, -1.24, 0.06]}>
        <boxGeometry args={[2.2, 0.2, 0.5]} />
        <meshStandardMaterial color="#3f4650" roughness={0.95} metalness={0} />
      </mesh>
      {[-0.75, -0.45, -0.15, 0.15, 0.45, 0.75].map((x) => (
        <mesh key={x} position={[x, -1.33, 0.06]}>
          <boxGeometry args={[0.09, 0.06, 0.46]} />
          <meshStandardMaterial color="#2c323a" roughness={0.95} metalness={0} />
        </mesh>
      ))}

      {/* Außenseite: vertiefte Typenschild-Tasche und Gerätefüße, damit die
          geschlossene Seite beim Drehen nicht als leere Fläche erscheint. */}
      <mesh position={[0, 0.15, -0.36]}>
        <boxGeometry args={[1.5, 0.85, 0.03]} />
        <meshStandardMaterial color="#cbd1d8" roughness={0.75} metalness={0.04} />
      </mesh>
      {(
        [
          [-1.25, -0.88],
          [1.25, -0.88],
          [1.25, 0.88],
          [-1.25, 0.88],
        ] as [number, number][]
      ).map(([x, y], i) => (
        <mesh key={`foot-${i}`} position={[x, y, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.06, 20]} />
          <meshStandardMaterial color="#3f4650" roughness={0.95} metalness={0} />
        </mesh>
      ))}
      {/* Trennfuge der beiden Halbschalen */}
      <mesh position={[0, 0, 0.3]}>
        <boxGeometry args={[3.24, 2.44, 0.02]} />
        <meshStandardMaterial color="#aeb5bd" roughness={0.8} metalness={0.05} />
      </mesh>

      {/* Kabeldurchführung in der Wandung */}
      <mesh position={[0, 1.22, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.19, 0.045, 10, 24]} />
        <meshStandardMaterial color="#2c323a" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}
