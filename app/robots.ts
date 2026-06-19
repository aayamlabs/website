import type { MetadataRoute } from "next";
import { team } from "@/lib/team";

// Generate this metadata route at build time (required by `output: 'export'`).
export const dynamic = "force-static";

const base = (
  team.siteUrl.startsWith("http") ? team.siteUrl : "https://example.com"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
