"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { team } from "@/lib/team";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "what we build", href: "#build" },
  { label: "work", href: "#work" },
  { label: "clients", href: "#words" },
  { label: "about", href: "#about" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); // sync if the page loads already scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b transition-all duration-300",
        scrolled
          ? "border-border bg-paper/80 backdrop-blur-md"
          : "border-transparent bg-transparent backdrop-blur-0"
      )}
      style={{
        paddingInline: "var(--gutter)",
        paddingBlock: scrolled ? "0.75rem" : "1.25rem",
      }}
    >
      {/* Wordmark */}
      <Link
        href="/"
        className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-foreground"
      >
        {team.name.toLowerCase()}
        <span
          aria-hidden="true"
          className="relative inline-flex h-[11px] w-[11px]"
        >
          {/* Pulsing ring via framer-motion; static under reduced motion. */}
          <motion.span
            className="absolute inset-0 rounded-full bg-volt"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={reduced ? undefined : { scale: [1, 2.2], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="relative inline-flex h-[11px] w-[11px] rounded-full bg-volt" />
        </span>
      </Link>

      <nav aria-label="Primary" className="flex items-center gap-8">
        {/* Desktop text links — hidden below 860px */}
        <ul className="hidden items-center gap-8 min-[860px]:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="mono group relative text-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-volt transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — always visible */}
        <a href="#contact" className="btn btn-solid">
          start a project
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
