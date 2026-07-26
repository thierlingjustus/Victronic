import { useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import type { MotionValue } from 'motion/react';
import { ErrorBoundary } from '../ErrorBoundary';
import { stageProgress } from './useScrollStyle';
import DisplayPanel from './models/DisplayPanel';
import LcdModule from './models/LcdModule';
import TouchGlass from './models/TouchGlass';
import PowerSupply from './models/PowerSupply';
import PlasticHousing from './models/PlasticHousing';
import CoverGlass from './models/CoverGlass';
import BoxBuildDevice from './models/BoxBuildDevice';
import AxialFan from './models/AxialFan';
import type { ModelProps } from './models/types';

/**
 * 3D-Bühne der Produktseiten: lädt three.js nur über diesen (lazy geladenen)
 * Pfad, dreht das Modell scrollgesteuert um die eigene Achse und lässt es auf
 * Desktop zusätzlich per Drag drehen. Zoom bleibt aus, damit das Mausrad
 * weiterhin die Seite scrollt (gleiche Regel wie in HousingAssembly3D).
 */

const MODELS: Record<string, (props: ModelProps) => ReactNode> = {
  display: DisplayPanel,
  lcd: LcdModule,
  touch: TouchGlass,
  power: PowerSupply,
  plastic: PlasticHousing,
  glass: CoverGlass,
  assembly: BoxBuildDevice,
  fan: AxialFan,
};

/** Startwinkel, damit das Modell schon beim Ankommen leicht angeschnitten steht. */
const START_ROTATION = -0.5;

/**
 * Die meisten Produkte sind flache Baugruppen (Panel, Deckglas, Gehäuseschale).
 * Bei gleichmäßiger Drehung stehen sie zu lange hochkant und sind dann nur ein
 * weißer Strich. Diese Kurve verweilt deshalb auf Vorder- und Rückseite und
 * dreht zügig durch die Kanten-Positionen: die Ableitung ist bei t = 0/0.5/1
 * klein und bei t = 0.25/0.75 groß.
 */
const EDGE_SKIP = 0.72;
const faceEase = (t: number) => t - (EDGE_SKIP * Math.sin(4 * Math.PI * t)) / (4 * Math.PI);

function RotationRig({
  progress,
  reducedMotion,
  children,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const canvasWidth = useThree((state) => state.size.width);

  // Auf schmalen Viewports schrumpft das Modell mit, sonst ragt es seitlich
  // aus der Bühne heraus.
  const fitScale = THREE.MathUtils.clamp(canvasWidth / 700, 0.6, 1);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.scale.setScalar(fitScale);

    if (reducedMotion) {
      ref.current.rotation.set(0.16, START_ROTATION, 0);
      ref.current.position.y = 0;
      return;
    }

    const p = stageProgress(progress.get());
    // Eine volle Umdrehung über den gesamten Scrollbereich: Vorderseite →
    // Seitenprofil → Rückseite → wieder Vorderseite.
    ref.current.rotation.y = START_ROTATION + faceEase(p) * Math.PI * 2;
    // Leichte Neigung, damit auch in der Kantenstellung noch Fläche zu sehen ist
    ref.current.rotation.x = 0.2 + Math.sin(p * Math.PI) * 0.08;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.045;
  });

  return <group ref={ref}>{children}</group>;
}

export default function ProductModel3D({
  modelType,
  progress,
  reducedMotion = false,
  fallbackSrc,
  fallbackAlt,
}: {
  modelType: string;
  progress: MotionValue<number>;
  reducedMotion?: boolean;
  fallbackSrc: string;
  fallbackAlt: string;
}) {
  const Model = MODELS[modelType] ?? BoxBuildDevice;

  // Nur mit Maus drehbar; auf Touch-Geräten bleibt der Canvas
  // pointer-transparent, sonst blockiert das Modell das Scrollen.
  const [canRotate] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );
  const interactive = canRotate && !reducedMotion;

  return (
    <ErrorBoundary
      fallback={
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <img src={fallbackSrc} alt={fallbackAlt} className="max-w-full max-h-full object-contain opacity-80" />
        </div>
      }
    >
      <div
        className={`absolute inset-0 ${interactive ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
        aria-hidden="true"
      >
        <Canvas
          camera={{ position: [0, 0.35, 6.2], fov: 38 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 9, 6]} intensity={1.25} />
          <directionalLight position={[-6, 4, -6]} intensity={0.55} color="#7dd0f2" />
          <pointLight position={[0, 1, 5]} intensity={0.35} />

          <RotationRig progress={progress} reducedMotion={reducedMotion}>
            <Model progress={progress} />
          </RotationRig>

          <ContactShadows position={[0, -1.85, 0]} opacity={0.24} scale={9} blur={2.6} far={4} color="#0f172a" />

          {interactive && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI * 0.32}
              maxPolarAngle={Math.PI * 0.64}
            />
          )}
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
