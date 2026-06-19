import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/site/navbar";
import SiteFooter from "@/components/site/site-footer";
import ProjectCard from "@/components/site/project-card";
import AccentStroke from "@/components/site/accent-stroke";
import { projects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Work",
  description: "The full archive of things we've shipped.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="relative">
      <Navbar />

      <main className="wrap pt-32 pb-24 md:pt-40">
        <Link
          href="/"
          className="mono group inline-flex items-center gap-1.5 text-foreground"
        >
          <ArrowLeft
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          back home
        </Link>

        {/* Header with a short static lime accent stroke */}
        <header className="relative mt-10">
          <AccentStroke className="pointer-events-none absolute right-0 -top-6 hidden h-24 w-44 sm:block" />
          <span className="eyebrow">the full archive</span>
          <h1
            className="mt-7 max-w-[18ch] font-display font-extrabold tracking-tight"
            style={{ fontSize: "clamp(34px, 6vw, 76px)", lineHeight: 0.98 }}
          >
            Everything we&rsquo;ve shipped.
          </h1>
          <p className="mt-6 max-w-[560px] text-lg text-slate">
            Every build in one place. Each opens its live site in a new tab —
            swap these placeholders for your real projects anytime.
          </p>
        </header>

        {/* sr-only section heading keeps the outline clean (h1 → h2 → h3 cards). */}
        <section aria-label="All projects">
          <h2 className="sr-only">All projects</h2>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
