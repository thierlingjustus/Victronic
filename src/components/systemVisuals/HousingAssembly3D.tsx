import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useTransform, MotionValue } from 'motion/react';
import type { InfoSlot } from '../../data/systems';
import { ErrorBoundary } from '../ErrorBoundary';
import VisualCallout from './VisualCallout';

/**
 * Scroll-Visualisierung für "Housing & Assembling": echte 3D-Montage nach der
 * "+"-Logik aus den Victronic Key Facts (S. 2): Display + PCBA + Gehäuse =
 * schlüsselfertiges Endgerät. Die Bauteile fahren beim Scrollen entlang der
 * Tiefenachse zusammen; auf Desktop lässt sich das Modell per Drag drehen
 * (Zoom bewusst deaktiviert, damit das Mausrad weiter die Seite scrollt).
 */

function roundedRectShape(w: number, h: number, r: number) {
  const x = -w / 2;
  const y = -h / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

function roundedRectHole(w: number, h: number, r: number) {
  const x = -w / 2;
  const y = -h / 2;
  const hole = new THREE.Path();
  hole.moveTo(x + r, y);
  hole.lineTo(x + w - r, y);
  hole.quadraticCurveTo(x + w, y, x + w, y + r);
  hole.lineTo(x + w, y + h - r);
  hole.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  hole.lineTo(x + r, y + h);
  hole.quadraticCurveTo(x, y + h, x, y + h - r);
  hole.lineTo(x, y + r);
  hole.quadraticCurveTo(x, y, x + r, y);
  return hole;
}

const smooth = (p: number, a: number, b: number) => THREE.MathUtils.smoothstep(p, a, b);

function DeviceModel({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const frontRef = useRef<THREE.Group>(null);
  const displayRef = useRef<THREE.Group>(null);
  const pcbaRef = useRef<THREE.Group>(null);
  const rearRef = useRef<THREE.Group>(null);
  const screenMat = useRef<THREE.MeshStandardMaterial>(null);

  // Frontblende: Rahmen mit Display-Ausschnitt
  const frontGeometry = useMemo(() => {
    const shape = roundedRectShape(3.6, 2.6, 0.35);
    shape.holes.push(roundedRectHole(2.75, 1.85, 0.12));
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.26,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 2,
      curveSegments: 20,
    });
    geo.center();
    return geo;
  }, []);

  // Rückschale: Rahmen (Wandung) + Bodenplatte
  const rearGeometry = useMemo(() => {
    const shape = roundedRectShape(3.6, 2.6, 0.35);
    shape.holes.push(roundedRectHole(3.15, 2.15, 0.2));
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.45,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 2,
      curveSegments: 20,
    });
    geo.center();
    return geo;
  }, []);

  useFrame(({ clock }) => {
    const v = scrollYProgress.get();
    const p = THREE.MathUtils.clamp((v - 0.15) / 0.65, 0, 1);

    if (pcbaRef.current) pcbaRef.current.position.z = THREE.MathUtils.lerp(-0.95, -0.02, smooth(p, 0.06, 0.4));
    if (displayRef.current) displayRef.current.position.z = THREE.MathUtils.lerp(0.95, 0.18, smooth(p, 0.16, 0.52));
    if (frontRef.current) frontRef.current.position.z = THREE.MathUtils.lerp(1.8, 0.4, smooth(p, 0.3, 0.68));
    if (rearRef.current) rearRef.current.position.z = THREE.MathUtils.lerp(-1.9, -0.32, smooth(p, 0.42, 0.78));

    // Fertig montiert: Display "schaltet sich ein"
    if (screenMat.current) screenMat.current.emissiveIntensity = 0.04 + 0.55 * smooth(p, 0.7, 0.85);

    if (groupRef.current) {
      groupRef.current.rotation.y = -0.55 + p * 0.8;
      groupRef.current.rotation.x = 0.16;
      groupRef.current.position.y = 0.15 + Math.sin(clock.elapsedTime * 0.7) * 0.04;
    }
  });

  return (
    <group ref={groupRef} scale={0.85}>
      {/* Frontblende (Kunststoff-Spritzguss) */}
      <group ref={frontRef}>
        <mesh geometry={frontGeometry}>
          <meshStandardMaterial color="#d2d7dd" roughness={0.55} metalness={0.08} />
        </mesh>
      </group>

      {/* Displaymodul */}
      <group ref={displayRef}>
        <RoundedBox args={[2.95, 2.0, 0.16]} radius={0.04}>
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0, 0.085]}>
          <planeGeometry args={[2.7, 1.78]} />
          <meshStandardMaterial
            ref={screenMat}
            color="#0b1220"
            emissive="#00a0e8"
            emissiveIntensity={0.04}
            roughness={0.15}
            metalness={0.4}
          />
        </mesh>
      </group>

      {/* PCBA mit Bauteilen und FPC */}
      <group ref={pcbaRef}>
        <mesh>
          <boxGeometry args={[3.05, 2.15, 0.07]} />
          <meshStandardMaterial color="#14532d" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[-0.7, 0.35, -0.12]}>
          <boxGeometry args={[0.62, 0.62, 0.12]} />
          <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0.45, -0.4, -0.11]}>
          <boxGeometry args={[0.85, 0.4, 0.1]} />
          <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[1.15, 0.55, -0.12]}>
          <boxGeometry args={[0.5, 0.24, 0.14]} />
          <meshStandardMaterial color="#9aa0a8" roughness={0.35} metalness={0.6} />
        </mesh>
        {[-1.0, -0.65, -0.3].map((x) => (
          <mesh key={x} position={[x, -0.75, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.12, 12]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.5} />
          </mesh>
        ))}
        {/* FPC-Verbinder zum Display */}
        <mesh position={[0, 0.95, 0.06]}>
          <boxGeometry args={[0.55, 0.22, 0.03]} />
          <meshStandardMaterial color="#d97706" roughness={0.6} metalness={0.05} />
        </mesh>
      </group>

      {/* Rückschale mit Schraubdomen */}
      <group ref={rearRef}>
        <mesh geometry={rearGeometry}>
          <meshStandardMaterial color="#c2c8d0" roughness={0.55} metalness={0.08} />
        </mesh>
        <RoundedBox args={[3.6, 2.6, 0.08]} radius={0.03} position={[0, 0, -0.24]}>
          <meshStandardMaterial color="#b9bfc7" roughness={0.6} metalness={0.08} />
        </RoundedBox>
        {[[-1.35, -0.9], [1.35, -0.9], [1.35, 0.9], [-1.35, 0.9]].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.11, 0.34, 14]} />
            <meshStandardMaterial color="#9aa0a8" roughness={0.6} metalness={0.1} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Terme der "+"-Zeile mit ihren Einblende-Fenstern (bezogen auf den
// lokalen Fortschritt 0..1 des Visual-Fensters)
const PLUS_STEPS: { label: string; window: [number, number]; highlight?: boolean }[] = [
  { label: 'PCBA', window: [0.2, 0.28] },
  { label: '+', window: [0.3, 0.34] },
  { label: 'Display', window: [0.36, 0.44] },
  { label: '+', window: [0.5, 0.54] },
  { label: 'Gehäuse', window: [0.56, 0.64] },
  { label: '=', window: [0.68, 0.72] },
  { label: 'Ihr Endgerät', window: [0.72, 0.8], highlight: true },
];

function PlusStep({ step, progress }: { step: (typeof PLUS_STEPS)[number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, step.window, [0, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={
        step.highlight
          ? 'text-brand-700 font-bold'
          : step.label === '+' || step.label === '='
            ? 'text-gray-400'
            : 'text-gray-700 font-semibold'
      }
    >
      {step.label}
    </motion.span>
  );
}

export default function HousingAssembly3D({
  scrollYProgress,
  infoSlots,
}: {
  scrollYProgress: MotionValue<number>;
  infoSlots: InfoSlot[];
}) {
  const progress = useTransform(scrollYProgress, [0.15, 0.8], [0, 1]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 0.9], [0, 1, 1, 0]);

  const calloutMaterial = useTransform(progress, [0.58, 0.66], [0, 1]);
  const calloutAssembly = useTransform(progress, [0.44, 0.52], [0, 1]);
  const calloutTooling = useTransform(progress, [0.72, 0.8], [0, 1]);
  const hintOpacity = useTransform(progress, [0.5, 0.6], [0, 1]);

  // Nur bei Maus-Bedienung drehbar; auf Touch-Geräten bleibt der Canvas
  // pointer-transparent, damit das Scrollen nicht blockiert wird.
  const [canRotate] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );

  return (
    <motion.div style={{ opacity: visualOpacity }} className="absolute inset-0 pointer-events-none">
      <div className={`absolute inset-0 ${canRotate ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : ''}`}>
        <ErrorBoundary
          fallback={
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
              3D-Ansicht konnte nicht geladen werden.
            </div>
          }
        >
          <Canvas camera={{ position: [0, 0.5, 6.4], fov: 38 }} gl={{ antialias: true }}>
            <ambientLight intensity={0.75} />
            <directionalLight position={[5, 10, 6]} intensity={1.3} />
            <directionalLight position={[-6, 4, -6]} intensity={0.5} color="#7dd0f2" />
            <DeviceModel scrollYProgress={scrollYProgress} />
            <ContactShadows position={[0, -1.9, 0]} opacity={0.25} scale={9} blur={2.4} far={4} color="#000000" />
            {canRotate && (
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI * 0.32}
                maxPolarAngle={Math.PI * 0.62}
              />
            )}
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* "+"-Logik aus den Key Facts: Bauteile addieren sich zum Endgerät */}
      <div className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm md:text-base whitespace-nowrap pointer-events-none">
        {PLUS_STEPS.map((step, i) => (
          <PlusStep key={i} step={step} progress={progress} />
        ))}
      </div>

      {canRotate && (
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute left-8 top-24 hidden md:flex items-center gap-1.5 text-[10px] text-gray-500 bg-white/95 px-2.5 py-1.5 rounded-full shadow-sm border border-gray-200 pointer-events-none"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          Ziehen zum Drehen
        </motion.div>
      )}

      {/* infoSlots als Callouts */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full max-w-4xl h-full mx-auto flex items-center justify-center">
          <VisualCallout
            slot={infoSlots[0]}
            opacity={calloutMaterial}
            className="left-1/2 ml-[11rem] md:ml-[16rem] top-[24%]"
          />
          <VisualCallout
            slot={infoSlots[1]}
            opacity={calloutAssembly}
            className="right-1/2 mr-[11rem] md:mr-[16rem] top-[38%]"
          />
          <VisualCallout
            slot={infoSlots[2]}
            opacity={calloutTooling}
            className="left-1/2 ml-[11rem] md:ml-[16rem] top-[48%]"
          />
        </div>
      </div>
    </motion.div>
  );
}
