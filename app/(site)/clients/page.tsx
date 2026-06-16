import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/site/navbar";
import SiteFooter from "@/components/site/site-footer";
import QuoteCard from "@/components/site/quote-card";
import AccentStroke from "@/components/site/accent-stroke";
import { testimonials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Clients — Throughline",
  description: "What clients say, in their words.",
};

export default function ClientsPage() {
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
          <span className="eyebrow">in their words</span>
          <h1
            className="mt-7 max-w-[18ch] font-display font-extrabold tracking-tight"
            style={{ fontSize: "clamp(34px, 6vw, 76px)", lineHeight: 0.98 }}
          >
            What clients say.
          </h1>
          <p className="mt-6 max-w-[560px] text-lg text-slate">
            Every word from the people we&rsquo;ve built with. Each card links to
            the client&rsquo;s site in a new tab.
          </p>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <QuoteCard key={t.id} testimonial={t} index={i} href={t.url} />
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
