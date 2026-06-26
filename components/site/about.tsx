"use client";

import { Calendar, Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { team } from "@/lib/team";

const MODELS = [
  { name: "Project", line: "Fixed scope & milestones — a defined build, start to ship." },
  { name: "Retainer", line: "Ongoing monthly — continuous design and engineering capacity." },
  { name: "Advisory", line: "Hourly / fractional — architecture, reviews, and direction." },
];

export default function About() {
  const reduced = useReducedMotion();

  const reveal = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 34 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: reduced ? 0 : i * 0.08,
    },
  });

  return (
    <section id="about" className="wrap py-24 md:py-32">
      <motion.span className="eyebrow" {...reveal(0)}>
        who you&rsquo;re working with
      </motion.span>

      <motion.h2
        className="mt-7 max-w-[16ch] font-display font-extrabold tracking-tight"
        style={{ fontSize: "clamp(34px, 6vw, 76px)", lineHeight: 0.98 }}
        {...reveal(1)}
      >
        Meet {team.name}.
      </motion.h2>

      {/* TODO(you): write a 2–3 sentence bio — the team's background, what you're
          best at, and why clients hire you. */}
      <motion.p
        className="mt-6 max-w-[60ch] text-lg leading-relaxed text-slate"
        {...reveal(2)}
      >
        TODO(you): a short bio goes here — a couple of sentences on the team&rsquo;s
        background, the kind of work we do best, and why clients trust us to
        carry a product end to end.
      </motion.p>

      {/* Availability badge */}
      <motion.div className="mt-8" {...reveal(3)}>
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-sm text-foreground">
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-volt"
          />
          available for projects from {team.availableFrom}
        </span>
      </motion.div>

      {/* Engagement models */}
      <motion.ul
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
        {...reveal(4)}
      >
        {MODELS.map((m) => (
          <li
            key={m.name}
            className="rounded-card border border-border bg-paper-2 p-6"
          >
            <h3 className="font-display text-xl font-bold tracking-tight">
              {m.name}
            </h3>
            <p className="mt-2 text-slate">{m.line}</p>
          </li>
        ))}
      </motion.ul>

      {/* CTAs */}
      <motion.div className="mt-10 flex flex-wrap items-center gap-4" {...reveal(5)}>
        {/* TODO(you): set team.bookingUrl */}
        <a
          href={team.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-solid"
        >
          <Calendar size={16} aria-hidden="true" />
          book a 20-min intro call
        </a>
        <a
          href={team.deckUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          <Download size={16} aria-hidden="true" />
          download our deck (PDF)
        </a>
      </motion.div>
    </section>
  );
}
