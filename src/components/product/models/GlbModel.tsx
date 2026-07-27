import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Rendert ein geliefertes GLB-Modell auf der Produktbühne.
 *
 * Die Dateien kommen aus unterschiedlichen Quellen und damit in
 * unterschiedlichen Maßstäben und Ursprungslagen. Statt für jedes Modell
 * Zahlen von Hand zu suchen, wird hier nach dem Laden die Bounding-Box
 * gemessen: Das Modell wird auf seinen Mittelpunkt geschoben und so skaliert,
 * dass seine größte Kante `targetSize` entspricht. Neue Modelle sitzen dadurch
 * ohne weiteres Zutun richtig im Bild.
 */
export default function GlbModel({
  url,
  targetSize = 3.2,
  rotation = [0, 0, 0],
}: {
  url: string;
  /** Größte Kante des Modells in Szeneneinheiten (Kamera ist darauf abgestimmt). */
  targetSize?: number;
  /** Korrektur, falls das Modell nicht in Ansichtslage exportiert wurde. */
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF(url);
  // Einzelwerte statt des Arrays in den Dependencies: ein inline übergebenes
  // Array hätte bei jedem Render eine neue Identität und würde die Szene
  // unnötig neu klonen.
  const [rx, ry, rz] = rotation;

  const { object, scale } = useMemo(() => {
    // Kopie, weil useGLTF die Szene global zwischenspeichert – die Original-
    // szene darf nicht verschoben oder skaliert werden.
    const clone = scene.clone(true);
    clone.rotation.set(rx, ry, rz);
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    clone.position.sub(center);

    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    return { object: clone, scale: targetSize / maxDim };
  }, [scene, targetSize, rx, ry, rz]);

  return (
    <group scale={scale}>
      <primitive object={object} />
    </group>
  );
}
