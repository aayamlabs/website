import type { MetadataRoute } from "next";
import { projects } from "@/lib/site-data";
import { team } from "@/lib/team";

// Generate this metadata route at build time (required by `output: 'export'`).
export const dynamic = "force-static";

const base = (
  team.siteUrl.startsWith("http") ? team.siteUrl : "https://example.com"
).replace(/\/$/, "");

// Build-time stamp so every URL carries a <lastmod>. Regenerated each deploy.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/clients"].map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const caseStudies = projects.map((p) => ({
    url: `${base}/work/${p.id}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudies];
}
