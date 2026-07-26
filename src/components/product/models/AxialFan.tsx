import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { roundedSquareShape, smooth } from './geometry';
import { stageProgress } from '../useScrollStyle';
import type { ModelProps } from './types';

const FRAME_SIZE = 6.0;
const FRAME_CORNER_R = 0.85;
const FRAME_DEPTH = 1.0;
const GRILLE_R = 2.55;
const HOLE_R = 0.19;
const HOLE_OFFSET = 2.45;
const STRUT_COUNT = 3;
const BLADE_COUNT = 9;
const BLADE_PITCH = 0.14;

const GROMMETS: [number, number][] = [
  [-HOLE_OFFSET, -HOLE_OFFSET],
  [HOLE_OFFSET, -HOLE_OFFSET],
  [HOLE_OFFSET, HOLE_OFFSET],
  [-HOLE_OFFSET, HOLE_OFFSET],
];

/**
 * Axiallüfter (modelType "fan"): Rahmen mit Schutzgitter, Stator und
 * neunflügeligem Rotor samt Anschlussleitung. Der Rotor läuft beim Scrollen an
 * – aus dem stehenden Bauteil wird das Kühlkonzept im Betrieb.
 */
export default function AxialFan({ progress }: ModelProps) {
  const rotorRef = useRef<THREE.Group>(null);

  // Rahmen: abgerundetes Quadrat mit Gitterdurchbruch und vier Schraublöchern
  const frameGeometry = useMemo(() => {
    const shape = roundedSquareShape(FRAME_SIZE, FRAME_CORNER_R);
    const grille = new THREE.Path();
    grille.absarc(0, 0, GRILLE_R, 0, Math.PI * 2, false);
    shape.holes.push(grille);
    GROMMETS.forEach(([x, y]) => {
      const h = new THREE.Path();
      h.absarc(x, y, HOLE_R, 0, Math.PI * 2, false);
      shape.holes.push(h);
    });
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: FRAME_DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 2,
      curveSegments: 24,
    });
    geo.center();
    return geo;
  }, []);

  // Ein Flügelblatt, um die Nabe rotiert vervielfacht
  const bladeGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.92, -0.26);
    shape.lineTo(2.35, -0.58);
    shape.quadraticCurveTo(2.52, 0.0, 2.35, 0.58);
    shape.lineTo(0.92, 0.26);
    shape.quadraticCurveTo(0.8, 0.0, 0.92, -0.26);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.08, bevelEnabled: false, curveSegments: 12 });
    geo.translate(0, 0, -0.04);
    return geo;
  }, []);

  // Anschlussleitung: zwei Adern zum Steckverbinder
  const { redWire, blueWire, connectorPosition } = useMemo(() => {
    const start = new THREE.Vector3(FRAME_SIZE / 2 - 0.55, -(FRAME_SIZE / 2 - 0.45), FRAME_DEPTH / 2 - 0.15);
    const conn = start.clone().add(new THREE.Vector3(0.9, -0.15, 0));
    const curve = (offsetY: number) => {
      const p0 = start.clone().add(new THREE.Vector3(-0.05, offsetY, 0));
      const p1 = p0.clone().add(new THREE.Vector3(0.5, offsetY * 0.4 - 0.1, 0.05));
      const p2 = conn.clone().add(new THREE.Vector3(-0.05, offsetY, 0));
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3([p0, p1, p2]), 14, 0.045, 8, false);
    };
    return { redWire: curve(0.07), blueWire: curve(-0.07), connectorPosition: conn };
  }, []);

  useFrame((_, delta) => {
    if (!rotorRef.current) return;
    // Drehzahl fährt mit dem Scrollen hoch
    const speed = 1.2 + 9 * smooth(stageProgress(progress.get()), 0.1, 0.5);
    rotorRef.current.rotation.z += speed * delta;
  });

  return (
    <group scale={0.46}>
      {/* Rahmen */}
      <mesh geometry={frameGeometry}>
        <meshStandardMaterial color="#3a3f47" roughness={0.48} metalness={0.2} />
      </mesh>

      {/* Gummitüllen an den Schraublöchern */}
      {GROMMETS.map(([x, y], i) => (
        <group key={i}>
          <mesh position={[x, y, FRAME_DEPTH / 2 + 0.01]}>
            <torusGeometry args={[HOLE_R + 0.05, 0.045, 8, 20]} />
            <meshStandardMaterial color="#15181d" roughness={0.85} />
          </mesh>
          <mesh position={[x, y, -(FRAME_DEPTH / 2 + 0.01)]}>
            <torusGeometry args={[HOLE_R + 0.05, 0.045, 8, 20]} />
            <meshStandardMaterial color="#15181d" roughness={0.85} />
          </mesh>
        </group>
      ))}

      {/* Schutzringe vorne und hinten */}
      {[FRAME_DEPTH / 2 - 0.02, -(FRAME_DEPTH / 2 - 0.02)].map((z) => (
        <mesh key={z} position={[0, 0, z]}>
          <torusGeometry args={[GRILLE_R - 0.03, 0.035, 10, 48]} />
          <meshStandardMaterial color="#3d434b" roughness={0.55} metalness={0.15} />
        </mesh>
      ))}

      {/* Stator mit Haltestegen */}
      <group>
        <mesh position={[0, 0, FRAME_DEPTH / 2 - 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.6, 0.5, 24]} />
          <meshStandardMaterial color="#3d434b" roughness={0.55} metalness={0.15} />
        </mesh>
        {Array.from({ length: STRUT_COUNT }).map((_, i) => {
          const angle = (i / STRUT_COUNT) * Math.PI * 2 + 0.4;
          const len = GRILLE_R - 0.65;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * (len / 2 + 0.55), Math.sin(angle) * (len / 2 + 0.55), FRAME_DEPTH / 2 - 0.05]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[len, 0.16, 0.09]} />
              <meshStandardMaterial color="#3d434b" roughness={0.55} metalness={0.15} />
            </mesh>
          );
        })}
      </group>

      {/* Rotor: Nabe, Kappe, Flügelrad und Stabilisierungsring */}
      <group ref={rotorRef} position={[0, 0, FRAME_DEPTH / 2 - 0.02]}>
        <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.05, 1.15, 0.8, 32]} />
          <meshStandardMaterial color="#a7adb6" roughness={0.42} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.55]} rotation={[-Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[1.0, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2.4]} />
          <meshStandardMaterial color="#a7adb6" roughness={0.42} metalness={0.35} />
        </mesh>
        {Array.from({ length: BLADE_COUNT }).map((_, i) => (
          <group key={i} rotation={[0, 0, (i / BLADE_COUNT) * Math.PI * 2]}>
            <mesh geometry={bladeGeometry} rotation={[BLADE_PITCH, 0, 0]} position={[0, 0, 0.18]}>
              <meshStandardMaterial color="#2b3038" roughness={0.45} metalness={0.22} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0, 0.18]}>
          <torusGeometry args={[2.42, 0.035, 8, 48]} />
          <meshStandardMaterial color="#2b3037" roughness={0.5} metalness={0.15} />
        </mesh>
      </group>

      {/* Anschlussleitung mit Steckverbinder */}
      <group>
        <mesh position={connectorPosition}>
          <boxGeometry args={[0.48, 0.3, 0.24]} />
          <meshStandardMaterial color="#eef1f4" roughness={0.55} metalness={0.05} />
        </mesh>
        <mesh geometry={redWire}>
          <meshStandardMaterial color="#a33232" roughness={0.65} />
        </mesh>
        <mesh geometry={blueWire}>
          <meshStandardMaterial color="#1c1f24" roughness={0.65} />
        </mesh>
      </group>

      {/* Welle, Scheibe und Sicherungsring auf der Rückseite */}
      <group>
        <mesh position={[0, 0, -(FRAME_DEPTH / 2 + 0.14)]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.34, 20]} />
          <meshStandardMaterial color="#b0b4bb" roughness={0.32} metalness={0.75} />
        </mesh>
        <mesh position={[0, 0, -(FRAME_DEPTH / 2 + 0.03)]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.05, 24]} />
          <meshStandardMaterial color="#4a5058" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0, -(FRAME_DEPTH / 2 + 0.3)]} rotation={[0, 0, 0.35]}>
          <torusGeometry args={[0.155, 0.028, 8, 24, Math.PI * 1.55]} />
          <meshStandardMaterial color="#b0b4bb" roughness={0.32} metalness={0.75} />
        </mesh>
      </group>
    </group>
  );
}
