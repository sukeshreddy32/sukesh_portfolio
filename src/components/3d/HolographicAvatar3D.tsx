import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { sound } from '../../utils/soundEngine';

interface HolographicAvatar3DProps {
  mode?: 'hologram' | 'neural' | 'photorealistic';
  interactive?: boolean;
}

export const HolographicAvatar3D: React.FC<HolographicAvatar3DProps> = ({
  mode = 'hologram',
  interactive = true
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);

  // Load the background-free cutout of Sukesh
  const texture = useLoader(THREE.TextureLoader, '/assets/sukesh_cutout.png');
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipMapLinearFilter;

  // Custom procedural particles rising from the base
  const [particlePositions, particleColors] = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00f2fe');
    const purple = new THREE.Color('#a855f7');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.4 + Math.random() * 1.2;
      pos[i3] = Math.cos(angle) * radius;
      pos[i3 + 1] = (Math.random() - 0.5) * 4.0;
      pos[i3 + 2] = Math.sin(angle) * radius;

      const c = Math.random() > 0.5 ? cyan : purple;
      cols[i3] = c.r;
      cols[i3 + 1] = c.g;
      cols[i3 + 2] = c.b;
    }
    return [pos, cols];
  }, []);

  const particlesRef = useRef<THREE.Points>(null);

  // Animation frame loop
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle 3D mouse tracking
    if (groupRef.current && interactive) {
      const targetRotationY = state.pointer.x * 0.45;
      const targetRotationX = -state.pointer.y * 0.25;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.08);
    }

    // Scanning laser beam oscillation
    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(t * 2.2) * 2.1;
      const opacity = 0.5 + Math.sin(t * 4.4) * 0.3;
      if (scanLineRef.current.material instanceof THREE.Material) {
        scanLineRef.current.material.opacity = opacity;
      }
    }

    // Rotating 3D Hologram Gyro Rings
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.7;
    if (ring2Ref.current) ring2Ref.current.rotation.x -= delta * 0.9;
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 1.2;
      ring3Ref.current.rotation.y += delta * 0.5;
    }

    // Float rising particles upward
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += delta * 0.8;
        if (positions[i + 1] > 2.5) {
          positions[i + 1] = -2.2;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Calculate material properties based on mode
  const materialProps = useMemo(() => {
    if (mode === 'neural') {
      return {
        color: '#00f2fe',
        emissive: '#00f2fe',
        emissiveIntensity: 0.9,
        wireframe: false,
        opacity: 0.85,
        transparent: true
      };
    } else if (mode === 'photorealistic') {
      return {
        color: '#ffffff',
        emissive: '#000000',
        emissiveIntensity: 0.0,
        opacity: 1.0,
        transparent: true
      };
    }
    // Default 'hologram'
    return {
      color: '#e0f2fe',
      emissive: '#00f2fe',
      emissiveIntensity: hovered ? 0.6 : 0.35,
      opacity: 0.96,
      transparent: true
    };
  }, [mode, hovered]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.4}>
        
        {/* ================= 3D AVATAR MESH ================= */}
        {/* Aspect ratio of cutout is 872x1024 ~ 0.85 width to 1.0 height. Height = 4.6, Width = 3.9 */}
        <mesh
          ref={meshRef}
          position={[0, 0.2, 0]}
          onPointerOver={() => {
            setHovered(true);
            sound.playHover();
          }}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[3.8, 4.6, 32, 32]} />
          <meshStandardMaterial
            map={texture}
            side={THREE.DoubleSide}
            roughness={0.25}
            metalness={0.3}
            depthWrite={false}
            alphaTest={0.05}
            {...materialProps}
          />
        </mesh>

        {/* Second layered glow mesh for holographic depth rim effect */}
        {mode !== 'photorealistic' && (
          <mesh position={[0, 0.2, -0.05]}>
            <planeGeometry args={[3.88, 4.68]} />
            <meshBasicMaterial
              map={texture}
              transparent={true}
              color={mode === 'neural' ? '#10b981' : '#7c3aed'}
              opacity={0.35}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* ================= SCANNING LASER BEAM ================= */}
        <mesh ref={scanLineRef} position={[0, 0, 0.08]}>
          <planeGeometry args={[4.2, 0.06]} />
          <meshBasicMaterial
            color="#00f2fe"
            transparent={true}
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* ================= 3D HOLOGRAPHIC GYRO RINGS ================= */}
        {/* Horizontal Pedestal Ring 1 */}
        <mesh ref={ring1Ref} position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.6, 1.75, 48]} />
          <meshBasicMaterial
            color="#00f2fe"
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0.65}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Tilted Ring 2 */}
        <mesh ref={ring2Ref} position={[0, 0.2, 0]} rotation={[0.4, 0.3, 0]}>
          <ringGeometry args={[2.3, 2.38, 48]} />
          <meshBasicMaterial
            color="#a855f7"
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Outer Orbital Ring 3 with Dashes */}
        <mesh ref={ring3Ref} position={[0, 0.2, 0]} rotation={[-0.3, 0.5, 0]}>
          <ringGeometry args={[2.7, 2.76, 32]} />
          <meshBasicMaterial
            color="#38bdf8"
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* ================= PEDESTAL EMITTER DISC ================= */}
        <mesh position={[0, -2.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.5, 32]} />
          <meshBasicMaterial
            color="#00f2fe"
            transparent={true}
            opacity={0.12}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* ================= RISING PARTICLES ================= */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[particleColors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            vertexColors={true}
            transparent={true}
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        {/* ================= 3D SPATIAL TELEMETRY HUD ================= */}
        {/* Head Target Reticle */}
        <Html position={[1.4, 1.8, 0.3]} distanceFactor={8} center>
          <div className="pointer-events-none p-2 rounded-lg bg-slate-950/80 border border-cyan-400/60 backdrop-blur-md text-[10px] font-mono text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.3)] whitespace-nowrap animate-pulse">
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>BIOMETRIC LOCK: 99.8%</span>
            </div>
            <div className="text-[9px] text-slate-400 mt-0.5">ID: JANGA SUKESH // ALPHA_DEV</div>
          </div>
        </Html>

        {/* Lower Left Coordinates Tag */}
        <Html position={[-1.6, -1.2, 0.2]} distanceFactor={8} center>
          <div className="pointer-events-none p-2 rounded-lg bg-slate-950/80 border border-purple-500/50 backdrop-blur-md text-[10px] font-mono text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] whitespace-nowrap">
            <div className="font-bold text-white">LOCATION MATRIX</div>
            <div className="text-[9px] text-cyan-400">17.5236° N, 78.2325° E</div>
            <div className="text-[8px] text-slate-400">PATELGUDA / ELLENKI</div>
          </div>
        </Html>

        {/* Lower Right Tech Specs */}
        <Html position={[1.6, -1.4, 0.2]} distanceFactor={8} center>
          <div className="pointer-events-none p-2 rounded-lg bg-slate-950/80 border border-cyan-500/50 backdrop-blur-md text-[10px] font-mono text-slate-300 shadow-[0_0_15px_rgba(0,242,254,0.3)] whitespace-nowrap">
            <div className="flex justify-between gap-2">
              <span className="text-cyan-400 font-bold">CGPA: 8.7</span>
              <span className="text-emerald-400">CSE (DS)</span>
            </div>
            <div className="text-[9px] text-slate-400 mt-0.5">B.TECH • 2024–2028</div>
          </div>
        </Html>

      </Float>
    </group>
  );
};
