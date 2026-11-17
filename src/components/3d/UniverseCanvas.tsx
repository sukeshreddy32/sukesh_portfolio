import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural 3D Deep Space Starfield & Data Nebula Particles
const ParticleGalaxy: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = window.innerWidth < 768 ? 1400 : 3200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00f2fe');
    const violet = new THREE.Color('#7c3aed');
    const blue = new THREE.Color('#38bdf8');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spiral galaxy distribution
      const radius = 2 + Math.random() * 24;
      const spinAngle = radius * 0.7;
      const branchAngle = ((i % 3) * (2 * Math.PI)) / 3;

      const randomX = (Math.random() - 0.5) * (Math.random() * 2.5);
      const randomY = (Math.random() - 0.5) * (Math.random() * 2.5);
      const randomZ = (Math.random() - 0.5) * (Math.random() * 2.5);

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = randomY * 2.0;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixed = Math.random();
      const c = mixed < 0.4 ? cyan : mixed < 0.7 ? violet : mixed < 0.9 ? blue : white;
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors={true}
        transparent={true}
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const UniverseCanvas: React.FC<{ onNavigate: (sectionId: string) => void }> = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none h-full w-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#030712']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.0} color="#00f2fe" />
        <pointLight position={[-10, -5, -5]} intensity={0.8} color="#7c3aed" />

        <ParticleGalaxy />
      </Canvas>
    </div>
  );
};
