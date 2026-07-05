import React, { Suspense, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Play, Pause, RotateCw, RefreshCw } from 'lucide-react';

function FanModel({ isSpinning }: { isSpinning: boolean }) {
  const rotorRef = useRef<THREE.Group>(null);
  const fanGroupRef = useRef<THREE.Group>(null);

  // Constants
  const FRAME_SIZE = 6.0;
  const FRAME_CORNER_R = 0.85;
  const FRAME_DEPTH = 1.0;
  const GRILLE_R = 2.55;
  const HOLE_R = 0.19;
  const HOLE_OFFSET = 2.45;
  const STRUT_COUNT = 3;
  const BLADE_COUNT = 9;
  const BLADE_PITCH = 0.14;

  // Grommet positions
  const GROMMET_POSITIONS = [
    [-HOLE_OFFSET, -HOLE_OFFSET],
    [HOLE_OFFSET, -HOLE_OFFSET],
    [HOLE_OFFSET, HOLE_OFFSET],
    [-HOLE_OFFSET, HOLE_OFFSET]
  ];

  // Helper rounded square shape generator
  const roundedSquareShape = (size: number, r: number) => {
    const s = size / 2;
    const shape = new THREE.Shape();
    shape.moveTo(-s + r, -s);
    shape.lineTo(s - r, -s);
    shape.quadraticCurveTo(s, -s, s, -s + r);
    shape.lineTo(s, s - r);
    shape.quadraticCurveTo(s, s, s - r, s);
    shape.lineTo(-s + r, s);
    shape.quadraticCurveTo(-s, s, -s, s - r);
    shape.lineTo(-s, -s + r);
    shape.quadraticCurveTo(-s, -s, -s + r, -s);
    return shape;
  };

  // Memoized geometries
  const frameGeometry = useMemo(() => {
    const shape = roundedSquareShape(FRAME_SIZE, FRAME_CORNER_R);
    const grilleHole = new THREE.Path();
    grilleHole.absarc(0, 0, GRILLE_R, 0, Math.PI * 2, false);
    shape.holes.push(grilleHole);

    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach((sgn) => {
      const h = new THREE.Path();
      h.absarc(sgn[0] * HOLE_OFFSET, sgn[1] * HOLE_OFFSET, HOLE_R, 0, Math.PI * 2, false);
      shape.holes.push(h);
    });

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: FRAME_DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 2,
      curveSegments: 24
    });
    geo.center();
    return geo;
  }, []);

  const bladeGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(1.15, -0.30);
    shape.lineTo(2.35, -0.58);
    shape.quadraticCurveTo(2.52, 0.0, 2.35, 0.58);
    shape.lineTo(1.15, 0.30);
    shape.quadraticCurveTo(1.02, 0.0, 1.15, -0.30);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.08,
      bevelEnabled: false,
      curveSegments: 12
    });
    geo.translate(0, 0, -0.04);
    return geo;
  }, []);

  const { redWireGeometry, blueWireGeometry, connectorPosition } = useMemo(() => {
    const wireStart = new THREE.Vector3(FRAME_SIZE / 2 - 0.55, -(FRAME_SIZE / 2 - 0.45), FRAME_DEPTH / 2 - 0.15);
    const connPos = wireStart.clone().add(new THREE.Vector3(0.55, -0.05, 0));

    const makeCurve = (offsetY: number) => {
      const p0 = wireStart.clone().add(new THREE.Vector3(-0.05, offsetY, 0));
      const p1 = p0.clone().add(new THREE.Vector3(0.45, offsetY * 0.4, 0.05));
      const p2 = connPos.clone().add(new THREE.Vector3(-0.05, offsetY, 0));
      return new THREE.CatmullRomCurve3([p0, p1, p2]);
    };

    const redGeo = new THREE.TubeGeometry(makeCurve(0.07), 12, 0.045, 8, false);
    const blueGeo = new THREE.TubeGeometry(makeCurve(-0.07), 12, 0.045, 8, false);

    return { redWireGeometry: redGeo, blueWireGeometry: blueGeo, connectorPosition: connPos };
  }, []);

  // Frame animation loop
  useFrame((state, delta) => {
    if (rotorRef.current && isSpinning) {
      rotorRef.current.rotation.z += 6.5 * delta;
    }
  });

  return (
    <group ref={fanGroupRef} scale={0.45} rotation={[0.4, -0.5, 0]}>
      {/* Frame / Housing */}
      <mesh geometry={frameGeometry} castShadow receiveShadow>
        <meshStandardMaterial color="#c7cbd1" roughness={0.55} metalness={0.08} />
      </mesh>

      {/* Grommets */}
      {GROMMET_POSITIONS.map(([x, y], idx) => (
        <group key={idx}>
          <mesh position={[x, y, FRAME_DEPTH / 2 + 0.01]}>
            <torusGeometry args={[HOLE_R + 0.05, 0.045, 8, 20]} />
            <meshStandardMaterial color="#2b2f36" roughness={0.8} metalness={0.0} />
          </mesh>
          <mesh position={[x, y, -(FRAME_DEPTH / 2 + 0.01)]}>
            <torusGeometry args={[HOLE_R + 0.05, 0.045, 8, 20]} />
            <meshStandardMaterial color="#2b2f36" roughness={0.8} metalness={0.0} />
          </mesh>
        </group>
      ))}

      {/* Grille guards */}
      <mesh position={[0, 0, FRAME_DEPTH / 2 - 0.02]}>
        <torusGeometry args={[GRILLE_R - 0.03, 0.035, 10, 48]} />
        <meshStandardMaterial color="#9aa0a8" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0, -(FRAME_DEPTH / 2 - 0.02)]}>
        <torusGeometry args={[GRILLE_R - 0.03, 0.035, 10, 48]} />
        <meshStandardMaterial color="#9aa0a8" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Stator & struts */}
      <group>
        <mesh position={[0, 0, FRAME_DEPTH / 2 - 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.6, 0.5, 24]} />
          <meshStandardMaterial color="#9aa0a8" roughness={0.5} metalness={0.1} />
        </mesh>
        {Array.from({ length: STRUT_COUNT }).map((_, idx) => {
          const angle = (idx / STRUT_COUNT) * Math.PI * 2 + 0.4;
          const strutLen = GRILLE_R - 0.65;
          const x = Math.cos(angle) * (strutLen / 2 + 0.55);
          const y = Math.sin(angle) * (strutLen / 2 + 0.55);
          return (
            <mesh 
              key={idx}
              position={[x, y, FRAME_DEPTH / 2 - 0.05]} 
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[strutLen, 0.16, 0.09]} />
              <meshStandardMaterial color="#9aa0a8" roughness={0.5} metalness={0.1} />
            </mesh>
          );
        })}
      </group>

      {/* Rotor (hub + cap + blades + rim) */}
      <group ref={rotorRef} position={[0, 0, FRAME_DEPTH / 2 - 0.02]}>
        <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.35, 1.45, 0.85, 32]} />
          <meshStandardMaterial color="#b7bbc2" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[1.3, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2.4]} />
          <meshStandardMaterial color="#b7bbc2" roughness={0.4} metalness={0.2} />
        </mesh>
        {Array.from({ length: BLADE_COUNT }).map((_, idx) => {
          const bAngle = (idx / BLADE_COUNT) * Math.PI * 2;
          return (
            <group key={idx} rotation={[0, 0, bAngle]}>
              <mesh geometry={bladeGeometry} rotation={[BLADE_PITCH, 0, 0]} position={[0, 0, 0.18]} castShadow>
                <meshStandardMaterial color="#8b90a0" roughness={0.35} metalness={0.25} />
              </mesh>
            </group>
          );
        })}
        <mesh position={[0, 0, 0.18]}>
          <torusGeometry args={[2.42, 0.035, 8, 48]} />
          <meshStandardMaterial color="#b7bbc2" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* Wiring harness */}
      <group>
        <mesh position={connectorPosition}>
          <boxGeometry args={[0.42, 0.22, 0.22]} />
          <meshStandardMaterial color="#3a3f47" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh geometry={redWireGeometry}>
          <meshStandardMaterial color="#b43a3a" roughness={0.6} metalness={0.05} />
        </mesh>
        <mesh geometry={blueWireGeometry}>
          <meshStandardMaterial color="#3a5fb4" roughness={0.6} metalness={0.05} />
        </mesh>
      </group>

      {/* Rear shaft + washer + retaining clip */}
      <group>
        <mesh position={[0, 0, -(FRAME_DEPTH / 2 + 0.14)]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.34, 20]} />
          <meshStandardMaterial color="#b0b4bb" roughness={0.32} metalness={0.75} />
        </mesh>
        <mesh position={[0, 0, -(FRAME_DEPTH / 2 + 0.03)]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.05, 24]} />
          <meshStandardMaterial color="#9aa0a8" roughness={0.5} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0, -(FRAME_DEPTH / 2 + 0.30)]} rotation={[0, 0, 0.35]}>
          <torusGeometry args={[0.155, 0.028, 8, 24, Math.PI * 1.55]} />
          <meshStandardMaterial color="#b0b4bb" roughness={0.32} metalness={0.75} />
        </mesh>
      </group>
    </group>
  );
}

function PlaceholderModel({ type }: { type: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Haupt-Gehäuse (dunkles Metall) */}
      <mesh castShadow receiveShadow position={[0, 0, -0.1]}>
        <boxGeometry args={[3.2, 2.2, 0.2]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Display-Fläche (leuchtend) */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[3.0, 2.0, 0.05]} />
        <meshStandardMaterial 
          color="#0070f3" 
          emissive="#0070f3" 
          emissiveIntensity={0.2} 
          roughness={0.1} 
          metalness={0.5} 
        />
      </mesh>

      {/* Kleines Detail: Connector/Platine auf der Rückseite */}
      <mesh position={[0, -0.5, -0.25]}>
        <boxGeometry args={[1.5, 0.5, 0.1]} />
        <meshStandardMaterial color="#0a3a2a" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  );
}

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
          3D-Ansicht konnte nicht geladen werden.
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ProductViewer3D({ modelType }: { modelType: string }) {
  const controlsRef = useRef<any>(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] bg-slate-50 rounded-2xl border border-gray-200 overflow-hidden relative flex items-center justify-center cursor-grab active:cursor-grabbing">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,112,243,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <ErrorBoundary>
        <Suspense fallback={<div className="text-[#0070f3] animate-pulse text-sm tracking-widest uppercase">Lade 3D-Modul...</div>}>
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 45 }} 
            shadows 
            gl={{ antialias: true, preserveDrawingBuffer: true }}
          >
            {/* Hochwertige Beleuchtung */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
            <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#0070f3" />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
            
            {/* 3D-Modell */}
            {modelType === 'fan' ? (
              <FanModel isSpinning={isSpinning} />
            ) : (
              <PlaceholderModel type={modelType} />
            )}
            
            {/* Schattenwurf auf den Boden */}
            <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={10} blur={2.5} far={4} color="#000000" />
            
            {/* Interaktive Steuerung */}
            <OrbitControls 
              ref={controlsRef}
              enableZoom={true} 
              enablePan={false}
              minDistance={2}
              maxDistance={10}
              autoRotate={autoRotate}
              autoRotateSpeed={1.6}
              makeDefault 
            />
          </Canvas>
        </Suspense>
      </ErrorBoundary>

      {/* Custom Controls UI for Lüfter */}
      {modelType === 'fan' && (
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10 max-w-[calc(100%-120px)]">
          <button 
            onClick={() => setIsSpinning(!isSpinning)} 
            className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-sm border transition-colors ${
              isSpinning 
                ? 'bg-[#14b8a6] text-white border-[#14b8a6] hover:bg-[#0d9488]' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#14b8a6] hover:text-[#14b8a6]'
            }`}
          >
            {isSpinning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>Betrieb: {isSpinning ? 'An' : 'Aus'}</span>
          </button>
          <button 
            onClick={() => setAutoRotate(!autoRotate)} 
            className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-sm border transition-colors ${
              autoRotate 
                ? 'bg-[#14b8a6] text-white border-[#14b8a6] hover:bg-[#0d9488]' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#14b8a6] hover:text-[#14b8a6]'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Auto-Drehung</span>
          </button>
          <button 
            onClick={handleReset} 
            className="flex items-center gap-1.5 text-[11px] font-semibold bg-white text-gray-700 border border-gray-200 px-2.5 py-1.5 rounded-lg shadow-sm hover:border-[#14b8a6] hover:text-[#14b8a6] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Ansicht zurücksetzen</span>
          </button>
        </div>
      )}

      <div className="absolute bottom-4 right-4 text-[10px] text-gray-500 flex items-center gap-1.5 pointer-events-none bg-white/95 px-2.5 py-1.5 rounded-full shadow-sm border border-gray-200">
        <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
        {modelType === 'fan' ? '60mm Axiallüfter · 3D' : 'Interaktives 3D-Modell (Drag & Zoom)'}
      </div>
    </div>
  );
}
