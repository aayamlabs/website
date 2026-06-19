import type { Metadata } from "next";
import PageStroke from "@/components/site/page-stroke";
import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import Marquee from "@/components/site/marquee";
import WhatWeBuild from "@/components/site/what-we-build";
import ProcessLine from "@/components/site/process-line";
import Work from "@/components/site/work";
import Testimonials from "@/components/site/testimonials";
import About from "@/components/site/about";
import SiteFooter from "@/components/site/site-footer";

// Home inherits title/description from the root layout; only the canonical
// is page-specific. Relative path resolves against metadataBase.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    // Single relative wrapper so the page-spanning stroke measures and aligns
    // to the whole document (footer.offsetTop is relative to this element).
    <div className="relative">
      <PageStroke stopAtId="site-footer" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <WhatWeBuild />
        <ProcessLine />
        <Work />
        <Testimonials />
        <About />
      </main>
      <SiteFooter />
    </div>
  );
}
