import type { Project } from "@/lib/site-data";
import { team } from "@/lib/team";

/**
 * Renders a JSON-LD <script>. Server component — the markup is in the static
 * HTML, so crawlers (and Google's Rich Results test) see it without running JS.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Schema is build-time/static data we control — no user input — so this is safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const siteUrl = team.siteUrl.startsWith("http")
  ? team.siteUrl.replace(/\/$/, "")
  : "https://example.com";

// Only advertise socials that are actually filled in (skip TODO/placeholder "#").
const sameAs = [team.github, team.linkedin, team.x].filter((u) =>
  u.startsWith("http")
);

/** Organization + WebSite — emitted site-wide from the root layout. */
export function organizationLd(): object {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: team.name,
        url: `${siteUrl}/`,
        description: `${team.name} — a team building websites, AI agents, mobile apps and the software underneath.`,
        logo: `${siteUrl}/favicon.ico`,
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: team.name,
        url: `${siteUrl}/`,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

/** CreativeWork + BreadcrumbList for a single case study. */
export function caseStudyLd(project: Project): object {
  const url = `${siteUrl}/work/${project.id}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: project.title,
        url,
        about: project.category,
        abstract: project.blurb,
        ...(project.stack ? { keywords: project.stack.join(", ") } : {}),
        creator: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Work", item: `${siteUrl}/work` },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}
