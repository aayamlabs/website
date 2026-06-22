"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { team } from "@/lib/team";

const VOLT = "#C2F84F";
const WORDS = ["websites", "AI agents", "mobile apps", "software"];
const ROTATE_MS = 2400;

// Lazy-load the 3D canvas: client-only, only fetched when actually mounted.
const HeroCanvas = dynamic(() => import("./hero-canvas"), { ssr: false });

/* ----------------------------------------------- capability detection */

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

let webglCache: boolean | null = null;
function getWebGL() {
  if (webglCache === null) webglCache = isWebGLAvailable();
  return webglCache;
}

let saveDataCache: boolean | null = null;
function getSaveData() {
  if (saveDataCache === null) {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    saveDataCache = !!conn?.saveData;
  }
  return saveDataCache;
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

/* ---------------------------------------------------- static fallback */

function HeroFallback() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 35%, color-mix(in srgb, var(--volt) 12%, transparent), transparent 70%)",
        }}
      />
      {/* Faint static wireframe — stands in for the 3D object */}
      <svg
        className="absolute right-[-6%] top-1/2 hidden h-[460px] w-[460px] -translate-y-1/2 opacity-30 md:block"
        viewBox="0 0 200 200"
        fill="none"
        stroke="var(--volt)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      >
        <polygon points="100,10 178,55 178,145 100,190 22,145 22,55" />
        <polygon points="100,52 142,76 142,124 100,148 58,124 58,76" />
        <line x1="100" y1="10" x2="100" y2="190" />
        <line x1="22" y1="55" x2="178" y2="145" />
        <line x1="178" y1="55" x2="22" y2="145" />
        <line x1="100" y1="10" x2="58" y2="76" />
        <line x1="100" y1="10" x2="142" y2="76" />
      </svg>
    </div>
  );
}

/* ----------------------------------------------------------------- Hero */

export default function Hero() {
  const reduced = useReducedMotion() ?? false;
  const hasWebGL = useSyncExternalStore(subscribeNoop, getWebGL, () => false);
  const saveData = useSyncExternalStore(subscribeNoop, getSaveData, () => false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [wordIndex, setWordIndex] = useState(0);

  // Only run the 3D scene on capable desktops without reduced-motion / data-saver.
  const render3D = hasWebGL && isDesktop && !reduced && !saveData;

  useEffect(() => {
    const id = window.setInterval(
      () => setWordIndex((i) => (i + 1) % WORDS.length),
      ROTATE_MS
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      {/* 3D background (or static fallback) */}
      {render3D ? (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <HeroCanvas isMobile={isMobile} reduced={reduced} />
        </div>
      ) : (
        <HeroFallback />
      )}

      {/* Foreground */}
      <div className="wrap relative z-[2] w-full py-32">
        <span className="eyebrow">a developer team</span>

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

        <p className="mt-8 max-w-[560px] text-lg leading-relaxed text-slate">
          We&rsquo;re {team.name} — a team that designs and builds
          websites, AI agents, mobile apps and the software underneath, start to
          finish. One team, one continuous line from idea to shipped.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#work" className="btn btn-solid">
            see the work
          </a>
          <a href="#contact" className="btn btn-ghost">
            connect with us
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
