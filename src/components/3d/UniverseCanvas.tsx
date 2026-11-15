import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { sound } from '../../utils/soundEngine';

interface StationProps {
  position: [number, number, number];
  name: string;
  color: string;
  secondaryColor: string;
  sectionId: string;
  onClick: (sectionId: string) => void;
}

const HolographicStation: React.FC<StationProps> = ({
  position,
  name,
  color,
  secondaryColor,
  sectionId,
  onClick
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 1.5 : 0.6);
      meshRef.current.rotation.x += delta * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * (hovered ? 2.0 : 0.8);
      ringRef.current.rotation.x += delta * 0.4;
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
        {/* Central Core Geometry */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onClick(sectionId);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
            setHovered(true);
            sound.playHover();
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
            setHovered(false);
          }}
        >
          <icosahedronGeometry args={[hovered ? 0.95 : 0.8, 1]} />
          <meshStandardMaterial
            color={hovered ? '#ffffff' : color}
            emissive={color}
            emissiveIntensity={hovered ? 1.8 : 0.9}
            wireframe={true}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Orbiting Hologram Energy Ring */}
        <mesh ref={ringRef}>
          <ringGeometry args={[1.2, 1.35, 32]} />
          <meshBasicMaterial
            color={secondaryColor}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={hovered ? 0.9 : 0.5}
          />
        </mesh>

        {/* 3D Label */}
        <Html position={[0, -1.3, 0]} center distanceFactor={12}>
          <div
            onClick={() => {
              sound.playClick();
              onClick(sectionId);
            }}
            className={`cursor-pointer px-3 py-1 rounded border text-xs font-mono font-semibold tracking-wider whitespace-nowrap transition-all duration-300 ${
              hovered
                ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_15px_#00f2fe] scale-110'
                : 'bg-slate-900/80 text-cyan-300 border-cyan-500/40 backdrop-blur-sm'
            }`}
          >
            {name}
          </div>
        </Html>
      </Float>
    </group>
  );
};

// Procedural 3D Deep Space Starfield & Data Nebula Particles
const ParticleGalaxy: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = window.innerWidth < 768 ? 1200 : 2800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00f2fe');
    const violet = new THREE.Color('#a855f7');
    const blue = new THREE.Color('#3b82f6');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spiral galaxy distribution
      const radius = 2 + Math.random() * 22;
      const spinAngle = radius * 0.7;
      const branchAngle = ((i % 3) * (2 * Math.PI)) / 3;

      const randomX = (Math.random() - 0.5) * (Math.random() * 2);
      const randomY = (Math.random() - 0.5) * (Math.random() * 2);
      const randomZ = (Math.random() - 0.5) * (Math.random() * 2);

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = randomY * 1.5;
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
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.01;
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
        size={0.06}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const UniverseCanvas: React.FC<{ onNavigate: (sectionId: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto h-full w-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 1.5, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#030712']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#00f2fe" />
        <pointLight position={[-10, -5, -5]} intensity={1.0} color="#7c3aed" />

        <ParticleGalaxy />

        {/* 3D Interactive Portfolio Stations */}
        <HolographicStation
          position={[-4.5, 2.2, 0]}
          name="ABOUT ME [IDENTITY]"
          color="#00f2fe"
          secondaryColor="#38bdf8"
          sectionId="about"
          onClick={onNavigate}
        />

        <HolographicStation
          position={[4.5, 2.2, 0]}
          name="TECH GALAXY [SKILLS]"
          color="#a855f7"
          secondaryColor="#c084fc"
          sectionId="skills"
          onClick={onNavigate}
        />

        <HolographicStation
          position={[-3.8, -2.4, 0.5]}
          name="PROJECTS [STATION]"
          color="#10b981"
          secondaryColor="#34d399"
          sectionId="projects"
          onClick={onNavigate}
        />

        <HolographicStation
          position={[3.8, -2.4, 0.5]}
          name="ACHIEVEMENTS [VAULT]"
          color="#fbbf24"
          secondaryColor="#fde047"
          sectionId="certifications"
          onClick={onNavigate}
        />

        <HolographicStation
          position={[0, -3.2, 1.5]}
          name="COMMUNICATION [PORTAL]"
          color="#f43f5e"
          secondaryColor="#fb7185"
          sectionId="contact"
          onClick={onNavigate}
        />
      </Canvas>
    </div>
  );
};
