"use client";

import { AppWindow, Bot, Server, Smartphone, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type Cell = {
  icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
};

const CELLS: Cell[] = [
  {
    icon: AppWindow,
    title: "Websites & web apps",
    desc: "Fast, accessible sites and product interfaces built to last and easy to grow.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    icon: Bot,
    title: "AI agents & automation",
    desc: "Autonomous agents and workflows that put LLMs to real, reliable work.",
    tags: ["LLMs", "RAG", "Vector DBs", "Python"],
  },
  {
    icon: Smartphone,
    title: "Mobile apps",
    desc: "Native-feeling apps for iOS and Android from a single, sharp codebase.",
    tags: ["React Native", "Swift", "Expo"],
  },
  {
    icon: Server,
    title: "Custom software & platforms",
    desc: "APIs, data layers, and infrastructure engineered to scale without drama.",
    tags: ["Node", "Postgres", "AWS", "Go"],
  },
];

export default function WhatWeBuild() {
  const reduced = useReducedMotion();

  return (
    <section id="build" className="wrap py-24 md:py-32">
      {/* Header */}
      {/* TEMP PATCH: cap header lane so copy clears the page-stroke's right lane */}
      <div className="max-w-full md:max-w-[min(60ch,58%)]">
        <span className="eyebrow">what we make</span>
        <h2
          className="mt-7 max-w-[16ch] font-display font-extrabold tracking-tight"
          style={{ fontSize: "clamp(34px, 6vw, 76px)", lineHeight: 0.98 }}
        >
          Four things, done properly.
        </h2>
        <p className="mt-6 max-w-[560px] text-lg text-slate">
          We keep our focus narrow on purpose — a handful of disciplines we know
          deeply, shipped to a standard we can stand behind.
        </p>
      </div>

      {/* 2x2 grid — hairline separators via gap-px over a border-colored base */}
      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-feature border border-border bg-border md:grid-cols-2">
        {CELLS.map((cell, i) => {
          const Icon = cell.icon;
          return (
            <motion.div
              key={cell.title}
              className="group flex flex-col bg-background p-8 transition-colors duration-300 hover:bg-paper-2 md:p-10"
              initial={reduced ? false : { opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: reduced ? 0 : i * 0.09,
              }}
            >
              <Icon
                size={30}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-foreground"
              />

              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                {cell.title}
              </h3>

              <p className="mt-3 max-w-[42ch] text-slate">{cell.desc}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {cell.tags.map((tag) => (
                  <li
                    key={tag}
                    className="mono rounded-full border border-border px-3 py-1"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
