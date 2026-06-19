import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages — emits an `out/` folder of plain
  // HTML/CSS/JS with no Node server. Root-served user-pages repo on a custom
  // domain, so NO basePath/assetPrefix (those are only for /repo-name/ project
  // sites and would break asset paths here).
  output: "export",
  // GitHub Pages can't run the default image optimizer, so serve images as-is.
  images: { unoptimized: true },
  // Hide the on-screen Next.js dev indicator (the "N" badge). Compile/runtime
  // errors are still surfaced.
  devIndicators: false,
};

export default nextConfig;
