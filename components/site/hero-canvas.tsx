"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

// Theme palette (WebGL/canvas can't read CSS custom properties).
const VOLT = "#C2F84F";
const INK = "#1F3A4B";

// Deterministic [0,1) hash — pure (no Math.random), stable across renders.
function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function FloatingPoints() {
  const positions = useMemo(() => {
    const count = 130;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (hash(i * 3) - 0.5) * 12;
      arr[i * 3 + 1] = (hash(i * 3 + 1) - 0.5) * 12;
      arr[i * 3 + 2] = (hash(i * 3 + 2) - 0.5) * 12;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={INK}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.45}
      />
    </points>
  );
}

type SceneProps = { isMobile: boolean; reduced: boolean };

function Scene({ isMobile, reduced }: SceneProps) {
  const parallax = useRef<THREE.Group>(null);
  const spinner = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  // Window-level pointer so the canvas stays pointer-events:none and buttons work.
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  useFrame((_, delta) => {
    if (spinner.current && !reduced) {
      spinner.current.rotation.y += delta * 0.15;
      spinner.current.rotation.x += delta * 0.04;
    }
    if (parallax.current) {
      const tx = reduced ? 0 : pointer.current.y * 0.18;
      const ty = reduced ? 0 : pointer.current.x * 0.18;
      parallax.current.rotation.x = THREE.MathUtils.lerp(
        parallax.current.rotation.x,
        tx,
        0.05
      );
      parallax.current.rotation.y = THREE.MathUtils.lerp(
        parallax.current.rotation.y,
        ty,
        0.05
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 6]} intensity={1.1} />
      <group ref={parallax} position={[isMobile ? 0 : 2.4, 0, 0]}>
        <group ref={spinner} scale={isMobile ? 0.7 : 1}>
          <Icosahedron args={[2, 1]}>
            <meshBasicMaterial transparent opacity={0} />
            <Edges threshold={1} color={VOLT} />
          </Icosahedron>
          <mesh>
            <icosahedronGeometry args={[0.9, 0]} />
            <meshStandardMaterial
              color={INK}
              flatShading
              roughness={0.5}
              metalness={0.1}
            />
          </mesh>
          <FloatingPoints />
        </group>
      </group>
    </>
  );
}

export default function HeroCanvas({ isMobile, reduced }: SceneProps) {
  return (
    <Canvas
      className="!pointer-events-none"
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <Scene isMobile={isMobile} reduced={reduced} />
    </Canvas>
  );
}
