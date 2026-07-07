import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Cloud, Sparkles, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';

function FloatingObjects() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[-4, 2, -5]}>
        <Sphere args={[0.5, 32, 32]}>
          <MeshDistortMaterial color="#ffd1dc" attach="material" distort={0.5} speed={2} roughness={0.2} metalness={0.8} />
        </Sphere>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2} position={[5, -1, -3]}>
        <Sphere args={[0.7, 32, 32]}>
          <MeshDistortMaterial color="#b0e0e6" attach="material" distort={0.6} speed={1.5} roughness={0.1} metalness={0.5} />
        </Sphere>
      </Float>

      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1} position={[0, -4, -6]}>
        <Sphere args={[1, 32, 32]}>
          <MeshDistortMaterial color="#ffdab9" attach="material" distort={0.4} speed={3} roughness={0.3} metalness={0.7} />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffd1dc" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#b0e0e6" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <Cloud opacity={0.3} speed={0.4} width={10} depth={1.5} segments={20} position={[0, 5, -10]} color="#fffdd0" />
        <Cloud opacity={0.2} speed={0.2} width={15} depth={2} segments={20} position={[5, -5, -15]} color="#e6e6fa" />
        
        <Sparkles count={200} scale={15} size={3} speed={0.3} opacity={0.5} color="#f2d184" />
        
        <FloatingObjects />
      </Canvas>
    </div>
  );
}
