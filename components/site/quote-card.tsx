"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Testimonial } from "@/lib/site-data";

type QuoteCardProps = {
  testimonial: Testimonial;
  /** Index within its grid — drives the staggered reveal delay. */
  index?: number;
  /** When set, the whole card links here (external → opens in a new tab). */
  href?: string;
};

export default function QuoteCard({ testimonial, index = 0, href }: QuoteCardProps) {
  const reduced = useReducedMotion();
  const t = testimonial;

  return (
    <motion.figure
      className="relative flex flex-col rounded-card border border-border bg-paper-2 p-8"
      initial={reduced ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: reduced ? 0 : index * 0.09,
      }}
    >
      {/* Big lime quote mark */}
      <span
        aria-hidden="true"
        className="font-display font-extrabold leading-none text-volt"
        style={{ fontSize: "64px" }}
      >
        &ldquo;
      </span>

      <blockquote
        className="mt-2 flex-1 leading-relaxed text-foreground"
        style={{ fontSize: "19px" }}
      >
        {t.quote}
      </blockquote>

      {/* Author */}
      <figcaption className="mt-8 flex items-center gap-4">
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-ink">
          <Image
            src={t.avatar}
            alt=""
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </span>
        <span className="flex flex-col">
          <span className="font-sans font-semibold text-foreground">
            {href ? (
              // Stretched link: whole card links to the client site.
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="after:absolute after:inset-0"
                aria-label={`Visit ${t.company} — opens in a new tab`}
              >
                {t.name}
              </a>
            ) : (
              t.name
            )}
          </span>
          <span className="mono mt-0.5">
            {t.role}, {t.company}
          </span>
        </span>
      </figcaption>
    </motion.figure>
  );
}
