import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { testimonials } from "@/lib/site-data";
import QuoteCard from "./quote-card";

export default function Testimonials() {
  // Home shows only the first three; the rest live on /clients.
  const items = testimonials.slice(0, 3);

  return (
    <section id="words" className="wrap py-24 md:py-32">
      {/* Header row: H2 + right-aligned "read all" */}
      {/* TEMP PATCH: cap header lane so copy clears the page-stroke's right lane */}
      <div className="max-w-full md:max-w-[min(60ch,58%)]">
        <span className="eyebrow">in their words</span>
        <div className="mt-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <h2
            className="font-display font-extrabold tracking-tight"
            style={{ fontSize: "clamp(34px, 6vw, 76px)", lineHeight: 0.98 }}
          >
            What clients say.
          </h2>

          {/* Per request, this opens /clients in a NEW TAB.
              For same-tab navigation instead, remove target + rel below. */}
          <Link
            href="/clients"
            target="_blank"
            rel="noopener"
            className="group relative mono inline-flex items-center gap-1.5 pb-1 text-foreground"
          >
            read all
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-volt transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        <p className="mt-6 max-w-[560px] text-lg text-slate">
          Placeholder quotes for now — swap these out for real words from your own
          clients.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((t, i) => (
          <QuoteCard key={t.id} testimonial={t} index={i} href={t.url} />
        ))}
      </div>
    </section>
  );
}
