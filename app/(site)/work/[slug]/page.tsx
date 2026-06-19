import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/site/navbar";
import SiteFooter from "@/components/site/site-footer";
import { projects, getProject } from "@/lib/site-data";
import { team } from "@/lib/team";
import JsonLd, { caseStudyLd } from "@/components/site/json-ld";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.title} — ${project.category}`,
    description: project.outcome ?? project.blurb,
    alternates: { canonical: `/work/${slug}` },
  };
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-mono text-sm uppercase tracking-widest text-foreground">
        {label}
      </h2>
      <div className="mt-3 text-slate">{children}</div>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const hasImages = (project.images?.length ?? 0) > 0;

  return (
    <div className="relative">
      <JsonLd data={caseStudyLd(project)} />
      <Navbar />

      <main className="wrap pt-32 pb-24 md:pt-40">
        <Link
          href="/work"
          className="group mono inline-flex items-center gap-1.5 text-foreground"
        >
          <ArrowLeft
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          back to work
        </Link>

        {/* Title */}
        <header className="mt-10 max-w-[20ch]">
          <p className="mono">{project.category}</p>
          <h1
            className="mt-3 font-display font-extrabold tracking-tight"
            style={{ fontSize: "clamp(40px, 8vw, 104px)", lineHeight: 0.96 }}
          >
            {project.title}
          </h1>
        </header>

        {/* Screenshot gallery (next/image) */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {hasImages ? (
            project.images!.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[16/10] overflow-hidden rounded-card border border-border"
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            // TODO(you): add screenshots to this project's `images` array.
            <div className="dark flex aspect-[16/10] items-center justify-center rounded-card border border-border bg-ink-2 sm:col-span-2">
              <p className="mono text-muted-foreground">
                TODO(you): add screenshots to project.images
              </p>
            </div>
          )}
        </div>

        {/* Three labelled blocks */}
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          <Block label="The problem">{project.problem}</Block>
          <Block label="What we built">
            {project.approach}
            <p className="mt-3 text-foreground">
              <span className="font-semibold">Our role:</span> {project.role}
            </p>
          </Block>
          <Block label="The outcome">
            {project.outcome && (
              <p className="flex items-baseline gap-2 font-display text-2xl font-bold tracking-tight text-foreground">
                <span aria-hidden="true" className="text-volt">
                  ↳
                </span>
                {project.outcome}
              </p>
            )}
          </Block>
        </div>

        {/* Stack + live link */}
        {project.stack && project.stack.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li
                key={s}
                className="mono rounded-full border border-border px-3 py-1"
              >
                {s}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid"
            aria-label={`Visit the live ${project.title} site — opens in a new tab`}
          >
            visit live site
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        {/* Quiet attribution */}
        <p className="mt-12 mono text-muted-foreground">
          built by {team.name}
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
