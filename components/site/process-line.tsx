"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function ProcessLine() {
  const reduced = useReducedMotion();

  // Shared scroll-reveal (fade + rise), staggered by index. Reduced motion → static.
  const reveal = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 34 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: reduced ? 0 : i * 0.1,
    },
  });

  // TEMP PATCH (fix #3): dropped the ~120vh min-height so the dark band hugs its
  // content instead of showing a big empty gap (no timeline built yet). Added
  // vertical padding for breathing room. DELETE once Prompt 7's milestone
  // timeline fills the band.
  return (
    <section
      id="line"
      className="dark relative overflow-hidden bg-ink text-paper"
    >
      <div className="wrap py-24 md:py-32">
        {/* The global <PageStroke /> traces through this dark band on its own. */}
        {/* TEMP PATCH (fix #2): cap intro lane so copy clears the stroke's lane. */}
        <div className="max-w-full md:max-w-[min(60ch,58%)]">
          <motion.span className="eyebrow" {...reveal(0)}>
            how we work
          </motion.span>

          <motion.h2
            className="mt-7 font-display font-extrabold tracking-tight"
            style={{ fontSize: "clamp(34px, 6vw, 76px)", lineHeight: 0.98 }}
            {...reveal(1)}
          >
            One <span className="text-volt">continuous line</span> from idea to
            shipped.
          </motion.h2>

          <motion.p
            className="mt-8 max-w-[560px] text-lg leading-relaxed text-muted-foreground"
            {...reveal(2)}
          >
            The same small team carries your product from the first whiteboard
            sketch to the production deploy — no handoffs, no telephone game,
            nothing lost between strangers. That lime line is exactly that: a
            single, unbroken throughline of ownership from idea to shipped.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
