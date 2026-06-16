"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type Dims = { width: number; height: number; viewportH: number };

type PageStrokeProps = {
  /** Element id marking where the stroke should stop (default: the footer). */
  stopAtId?: string;
};

const MOBILE_BP = 900;
const SEGMENT = 600; // ~one S-curve per 600px of page height

/**
 * Build a smooth vertical weave that fits the real page height.
 * Vertical tangents at each node (control points share the mid-Y) give the
 * classic S-curve weave. Biased toward the right-hand whitespace on desktop.
 */
function buildPath(width: number, height: number, startY: number): string {
  const mobile = width < MOBILE_BP;
  // TEMP PATCH: push the line into the right-hand margin and calm the desktop
  // amplitude so it stops cutting across left-aligned H2s. Mobile unchanged.
  const centerX = mobile ? width * 0.5 : width * 0.76;
  const amplitude = mobile
    ? Math.min(width * 0.18, 140)
    : Math.min(width * 0.18, 200);

  const endY = height; // = footer offsetTop, i.e. just before the footer
  const span = Math.max(endY - startY, 1);
  const count = Math.max(2, Math.round(span / SEGMENT));
  const stepY = span / count;

  let d = "";
  let prevX = 0;
  let prevY = 0;

  for (let i = 0; i <= count; i++) {
    const y = startY + stepY * i;
    const x = centerX + amplitude * (i % 2 === 0 ? 1 : -1);

    if (i === 0) {
      d = `M ${x.toFixed(2)} ${y.toFixed(2)}`;
    } else {
      const midY = (prevY + y) / 2;
      d += ` C ${prevX.toFixed(2)} ${midY.toFixed(2)} ${x.toFixed(2)} ${midY.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }

    prevX = x;
    prevY = y;
  }

  return d;
}

export default function PageStroke({ stopAtId = "site-footer" }: PageStrokeProps) {
  const reduceMotion = useReducedMotion();
  const [dims, setDims] = useState<Dims | null>(null);

  // Whole-document scroll progress. Draw across the full scroll range so it
  // advances slowly, then smooth it with a spring so the drawn tip trails a
  // little behind the scroll position ("a bit behind the screen end").
  const { scrollYProgress } = useScroll();
  const drawn = useTransform(scrollYProgress, [0, 1], [0.03, 1]);
  const smooth = useSpring(drawn, { stiffness: 45, damping: 22, mass: 1 });
  // Reduced motion → fully drawn, no animation.
  const pathLength = reduceMotion ? 1 : smooth;

  useEffect(() => {
    const measure = () => {
      const width = document.documentElement.clientWidth;
      const viewportH = window.innerHeight;
      const footer = document.getElementById(stopAtId);
      const height = footer ? footer.offsetTop : document.body.scrollHeight;
      setDims({ width, height, viewportH });
    };

    measure();

    // Recompute when the page reflows (content/resize) and once fonts load.
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [stopAtId]);

  if (!dims || dims.height <= 0 || dims.width <= 0) return null;

  const mobile = dims.width < MOBILE_BP;
  // Start the weave at the hero's vertical center (~50vh).
  const startY = Math.min(dims.viewportH * 0.5, dims.height * 0.5);
  const d = buildPath(dims.width, dims.height, startY);

  return (
    <svg
      aria-hidden="true"
      width="100%"
      height={dims.height}
      viewBox={`0 0 ${dims.width} ${dims.height}`}
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: dims.height,
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <motion.path
        d={d}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{
          stroke: "var(--volt)",
          strokeWidth: mobile ? 6 : 13,
          opacity: 0.85, // TEMP PATCH: slightly calmer line
          pathLength,
        }}
      />
    </svg>
  );
}
