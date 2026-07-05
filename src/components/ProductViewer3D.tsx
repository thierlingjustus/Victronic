import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- VORBEREITUNG FÜR FINALE MODELLE ---
// Sobald die echten Modelle vorliegen, diesen Code einkommentieren
// und die PlaceholderModel Komponente im Canvas ersetzen.
/*
import { useGLTF } from '@react-three/drei';

function FinalModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}
*/

function PlaceholderModel({ type }: { type: string }) {
  const groupRef = useRef<THREE.Group>(null);

  // Leichte, kontinuierliche Drehung für mehr Dynamik (optional)
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

// Error Boundary für WebGL Context Loss
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
  // Hier später den Pfad zum echten Modell eintragen:
  // const modelUrl = `/models/${modelType}.glb`;

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
            
            {/* Das Platzhalter-Modell */}
            <PlaceholderModel type={modelType} />
            
            {/* Schattenwurf auf den Boden */}
            <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={10} blur={2.5} far={4} color="#000000" />
            
            {/* Interaktive Steuerung */}
            <OrbitControls 
              enableZoom={true} 
              enablePan={false}
              minDistance={2}
              maxDistance={10}
              makeDefault 
            />
          </Canvas>
        </Suspense>
      </ErrorBoundary>

      <div className="absolute bottom-4 right-4 text-xs text-gray-500 flex items-center gap-2 pointer-events-none bg-white/95 px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
        <div className="w-2 h-2 rounded-full bg-[#0070f3] animate-pulse" />
        Interaktives 3D-Modell (Drag & Zoom)
      </div>
    </div>
  );
}
