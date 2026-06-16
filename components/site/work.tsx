import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/site-data";
import ProjectCard from "./project-card";

export default function Work() {
  // Home shows only the first four; the rest live on /work.
  const items = projects.slice(0, 4);

  return (
    <section id="work" className="wrap py-24 md:py-32">
      {/* Header row: H2 + right-aligned "see all" */}
      <span className="eyebrow">selected work</span>
      {/* TEMP PATCH: cap the H2 to a clear lane, but keep this row full-width so
          "see all" stays pushed to the right edge (not wrapped underneath). */}
      <div className="mt-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <h2
          className="max-w-full font-display font-extrabold tracking-tight md:max-w-[min(60ch,58%)]"
          style={{ fontSize: "clamp(34px, 6vw, 76px)", lineHeight: 0.98 }}
        >
          Things we&rsquo;ve shipped.
        </h2>

        {/* Per request, this opens /work in a NEW TAB.
            For same-tab navigation instead, remove target + rel below. */}
        <Link
          href="/work"
          target="_blank"
          rel="noopener"
          className="group relative mono inline-flex items-center gap-1.5 pb-1 text-foreground"
        >
          see all work
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-volt transition-all duration-300 group-hover:w-full" />
        </Link>
      </div>

      <p className="mt-6 max-w-[560px] text-lg text-slate">
        A few representative builds. These are swappable case studies — drop in
        your own projects and screenshots anytime.
      </p>

      {/* Cards */}
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            href={project.url}
          />
        ))}
      </div>
    </section>
  );
}
