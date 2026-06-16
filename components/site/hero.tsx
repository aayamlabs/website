"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Icosahedron } from "@react-three/drei";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import * as THREE from "three";

const VOLT = "#C2F84F";
const INK = "#1F3A4B";
const WORDS = ["websites", "AI agents", "mobile apps", "software"];
const ROTATE_MS = 2400;

/* ---------------------------------------------------------------- 3D scene */

type SceneProps = {
  isMobile: boolean;
  reduced: boolean;
};

// Deterministic [0,1) hash — pure (no Math.random), so positions are stable
// across renders and SSR/hydration.
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

function Scene({ isMobile, reduced }: SceneProps) {
  const parallax = useRef<THREE.Group>(null);
  const spinner = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  // Track the pointer at the window level so the canvas can stay
  // pointer-events:none and the foreground buttons remain clickable.
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  useFrame((_, delta) => {
    // Slow auto-rotation.
    if (spinner.current && !reduced) {
      spinner.current.rotation.y += delta * 0.15;
      spinner.current.rotation.x += delta * 0.04;
    }
    // Subtle mouse parallax (lerp toward pointer).
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
          {/* Lime wireframe shell */}
          <Icosahedron args={[2, 1]}>
            <meshBasicMaterial transparent opacity={0} />
            <Edges threshold={1} color={VOLT} />
          </Icosahedron>

          {/* Solid ink core */}
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

/* -------------------------------------------------------- WebGL detection */

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Cache so the useSyncExternalStore snapshot is stable across renders.
let webglCache: boolean | null = null;
function getWebGL() {
  if (webglCache === null) webglCache = isWebGLAvailable();
  return webglCache;
}
const subscribeNoop = () => () => {};

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/* ----------------------------------------------------------------- Hero */

export default function Hero() {
  const reduced = useReducedMotion() ?? false;
  // false on the server / before hydration → Canvas mounts client-only.
  const hasWebGL = useSyncExternalStore(subscribeNoop, getWebGL, () => false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setWordIndex((i) => (i + 1) % WORDS.length),
      ROTATE_MS
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      {/* 3D background */}
      {hasWebGL && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Canvas
            className="!pointer-events-none"
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{ alpha: true, antialias: true }}
            style={{ background: "transparent" }}
          >
            <Scene isMobile={isMobile} reduced={reduced} />
          </Canvas>
        </div>
      )}

      {/* Foreground */}
      <div className="wrap relative z-[2] w-full py-32">
        <span className="eyebrow">a developer collective</span>

        <h1
          className="mt-7 font-display font-extrabold tracking-tight"
          style={{ fontSize: "clamp(46px, 9vw, 128px)", lineHeight: 0.98 }}
        >
          <span className="block">We build</span>
          <span className="block py-[0.06em]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={WORDS[wordIndex]}
                className="inline-block px-[0.12em]"
                style={{
                  backgroundImage: `linear-gradient(transparent 62%, ${VOLT} 62%, ${VOLT} 92%, transparent 92%)`,
                }}
                initial={
                  reduced
                    ? false
                    : { y: "0.5em", opacity: 0, filter: "blur(12px)" }
                }
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={
                  reduced
                    ? { opacity: 0 }
                    : { y: "-0.5em", opacity: 0, filter: "blur(12px)" }
                }
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="block">that ship.</span>
        </h1>

        <p className="mt-8 max-w-[560px] text-slate text-lg leading-relaxed">
          A small team of engineers and designers who turn ambitious ideas into
          fast, durable products — from the first line to the launch.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#work" className="btn btn-solid">
            see the work
          </a>
          <a href="#contact" className="btn btn-ghost">
            say hello
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-[var(--gutter)] z-[2] flex items-center gap-3"
        aria-hidden="true"
      >
        <span className="mono">scroll</span>
        <motion.span
          className="block h-10 w-px origin-top bg-volt"
          animate={
            reduced ? undefined : { scaleY: [0.25, 1, 0.25], opacity: [0.4, 1, 0.4] }
          }
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
