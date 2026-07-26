import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { smooth } from './geometry';
import { stageProgress } from '../useScrollStyle';
import type { ModelProps } from './types';

const GRID_COLS = 9;
const GRID_ROWS = 6;
const DIAMOND = 0.26;

/**
 * Touchscreen (modelType "touch"): OGS-Panel – Sensor und Deckglas als eine
 * Glasscheibe mit bedrucktem Rand-Bezel und FPC-Anschluss. Beim Scrollen wird
 * das rautenförmige ITO-Elektrodenraster sichtbar.
 */
export default function TouchGlass({ progress }: ModelProps) {
  const itoRef = useRef<THREE.InstancedMesh>(null);

  const itoMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00a0e8',
        transparent: true,
        opacity: 0,
        roughness: 0.35,
        metalness: 0.4,
        side: THREE.DoubleSide,
      }),
    []
  );
  const itoGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(DIAMOND, DIAMOND);
    geo.rotateZ(Math.PI / 4);
    return geo;
  }, []);

  useEffect(() => {
    return () => {
      itoMaterial.dispose();
      itoGeometry.dispose();
    };
  }, [itoMaterial, itoGeometry]);

  // Raster einmalig positionieren
  useEffect(() => {
    if (!itoRef.current) return;
    const dummy = new THREE.Object3D();
    let i = 0;
    for (let cx = 0; cx < GRID_COLS; cx++) {
      for (let cy = 0; cy < GRID_ROWS; cy++) {
        dummy.position.set(
          (cx - (GRID_COLS - 1) / 2) * 0.31,
          (cy - (GRID_ROWS - 1) / 2) * 0.31,
          0
        );
        dummy.updateMatrix();
        itoRef.current.setMatrixAt(i++, dummy.matrix);
      }
    }
    itoRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(() => {
    itoMaterial.opacity = 0.75 * smooth(stageProgress(progress.get()), 0.15, 0.5);
  });

  return (
    <group>
      {/* Deckglas mit Sensor in einer Scheibe (One Glass Solution) */}
      <mesh>
        <boxGeometry args={[3.2, 2.25, 0.07]} />
        <meshPhysicalMaterial
          color="#d3e3ee"
          transparent
          opacity={0.2}
          roughness={0.03}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.02}
        />
      </mesh>

      {/* Siebgedruckter Passepartout-Rand (Bezel) */}
      {(
        [
          [0, 1.03, 3.2, 0.2],
          [0, -1.03, 3.2, 0.2],
          [-1.52, 0, 0.17, 2.25],
          [1.52, 0, 0.17, 2.25],
        ] as [number, number, number, number][]
      ).map(([x, y, w, h], i) => (
        <mesh key={i} position={[x, y, 0.037]}>
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial color="#0d1117" roughness={0.55} metalness={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* ITO-Elektrodenraster im Glas */}
      <instancedMesh
        ref={itoRef}
        args={[itoGeometry, itoMaterial, GRID_COLS * GRID_ROWS]}
        position={[0, 0, 0.005]}
      />

      {/* FPC-Anschluss an der Unterkante */}
      <mesh position={[0.55, -1.28, 0]} rotation={[0.35, 0, 0]}>
        <boxGeometry args={[0.62, 0.4, 0.012]} />
        <meshStandardMaterial color="#c2761f" roughness={0.65} metalness={0.05} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.55, -1.52, -0.14]}>
        <boxGeometry args={[0.5, 0.1, 0.08]} />
        <meshStandardMaterial color="#1f2937" roughness={0.6} metalness={0.15} />
      </mesh>
    </group>
  );
}
