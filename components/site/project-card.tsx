"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/site-data";

/* Deterministic PRNG so each card's motif is stable across renders/resizes. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Generative lime line-motif on a dark canvas — no external images to break. */
function CanvasThumb({ seed }: { seed: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Dark backdrop (theme ink-2).
      ctx.fillStyle = "#162B38";
      ctx.fillRect(0, 0, width, height);

      // A few smooth quadratic curves seeded per card (theme volt).
      const rand = mulberry32(seed);
      ctx.lineCap = "round";
      const lines = 6;
      for (let i = 0; i < lines; i++) {
        let x = -20;
        ctx.beginPath();
        ctx.moveTo(x, height * rand());
        const segs = 3;
        for (let s = 0; s < segs; s++) {
          const nx = x + (width + 40) / segs;
          const cx = (x + nx) / 2;
          const cy = height * rand();
          ctx.quadraticCurveTo(cx, cy, nx, height * rand());
          x = nx;
        }
        ctx.strokeStyle = `rgba(194, 248, 79, ${(0.22 + rand() * 0.55).toFixed(3)})`;
        ctx.lineWidth = 1 + rand() * 2.4;
        ctx.stroke();
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [seed]);

  return (
    <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />
  );
}

type ProjectCardProps = {
  project: Project;
  /** Index within its grid — drives the staggered reveal delay. */
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const reduced = useReducedMotion();
  const thumb = project.images?.[0];

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: reduced ? 0 : index * 0.09,
      }}
    >
      {/* Hover-lift lives here so it never fights the reveal transform above. */}
      <article className="group relative overflow-hidden rounded-card border border-border bg-paper-2 transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-ink-2/40">
        {/* Thumb */}
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-2">
          {thumb ? (
            <Image
              src={thumb}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <CanvasThumb seed={project.seed} />
          )}
          <span className="mono absolute left-4 top-4 text-volt">
            {project.index}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 p-6">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight">
              {/* Stretched link: whole card opens the internal case study. */}
              <Link
                href={`/work/${project.id}`}
                className="after:absolute after:inset-0"
                aria-label={`Read the ${project.title} case study`}
              >
                {project.title}
              </Link>
            </h3>
            <p className="mono mt-1">{project.category}</p>
            {project.outcome && (
              <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
                <span aria-hidden="true" className="text-volt">
                  ↳
                </span>
                {project.outcome}
              </p>
            )}
          </div>

          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-foreground transition-colors duration-300 group-hover:border-volt group-hover:bg-volt"
          >
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:-rotate-45 group-hover:text-ink-2"
            />
          </span>
        </div>
      </article>
    </motion.div>
  );
}
