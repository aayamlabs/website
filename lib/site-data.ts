/**
 * Single source of truth for projects and testimonials.
 * Both the home sections (sliced) and the full listing pages read from here.
 */

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  /** The project's live site (opened in a new tab). Placeholder for now. */
  url: string;
  blurb: string;
  /** Feeds the deterministic canvas thumbnail. */
  seed: number;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  /** The client's site (opened in a new tab). Placeholder for now. */
  url: string;
};

export const projects: Project[] = [
  {
    id: "settl",
    index: "01",
    title: "Settl",
    category: "web app · fintech",
    url: "https://example.com",
    blurb: "A consumer fintech dashboard with instant settlement and live balances.",
    seed: 1207,
  },
  {
    id: "northpeak-ai",
    index: "02",
    title: "Northpeak AI",
    category: "ai agent · support",
    url: "https://example.com",
    blurb: "An autonomous support agent that resolves tickets end to end.",
    seed: 4831,
  },
  {
    id: "tempo",
    index: "03",
    title: "Tempo",
    category: "mobile · ios + android",
    url: "https://example.com",
    blurb: "A cross-platform habit tracker with offline-first sync.",
    seed: 9056,
  },
  {
    id: "relay",
    index: "04",
    title: "Relay",
    category: "platform · infra",
    url: "https://example.com",
    blurb: "Event-driven infrastructure moving millions of messages a day.",
    seed: 6402,
  },
  {
    id: "lumen",
    index: "05",
    title: "Lumen",
    category: "web app · healthcare",
    url: "https://example.com",
    blurb: "A clinician portal that turns patient data into clear next steps.",
    seed: 2718,
  },
  {
    id: "cargo",
    index: "06",
    title: "Cargo",
    category: "platform · logistics",
    url: "https://example.com",
    blurb: "Real-time fleet routing and shipment visibility at scale.",
    seed: 3141,
  },
  {
    id: "vega-ai",
    index: "07",
    title: "Vega AI",
    category: "ai agent · analytics",
    url: "https://example.com",
    blurb: "A natural-language analyst that queries the warehouse for you.",
    seed: 5926,
  },
  {
    id: "drift",
    index: "08",
    title: "Drift",
    category: "mobile · social",
    url: "https://example.com",
    blurb: "An ephemeral social app built for fast, low-latency feeds.",
    seed: 5358,
  },
  {
    id: "mint",
    index: "09",
    title: "Mint",
    category: "web app · payments",
    url: "https://example.com",
    blurb: "A checkout and payments layer with a drop-in component kit.",
    seed: 9793,
  },
  {
    id: "atlas",
    index: "10",
    title: "Atlas",
    category: "platform · devtools",
    url: "https://example.com",
    blurb: "A developer platform with self-serve environments and previews.",
    seed: 2384,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "aanya-rao",
    name: "Aanya Rao",
    role: "founder",
    company: "Settl",
    quote:
      "They embedded like part of our own team and shipped faster than we thought possible — without ever cutting the corners that matter.",
    url: "https://example.com",
  },
  {
    id: "marcus-kell",
    name: "Marcus Kell",
    role: "COO",
    company: "Northpeak",
    quote:
      "The same people designed, built, and launched the whole thing. Nothing got lost in translation, and it shows in the product.",
    url: "https://example.com",
  },
  {
    id: "jia-lin",
    name: "Jia Lin",
    role: "product lead",
    company: "Tempo",
    quote:
      "Genuinely the smoothest engineering partnership we've had. Clear thinking, sharp execution, and a real eye for the details.",
    url: "https://example.com",
  },
  {
    id: "sofia-marsh",
    name: "Sofia Marsh",
    role: "VP engineering",
    company: "Relay",
    quote:
      "They understood our infrastructure better than some of our own hires within a week, and the rollout was flawless.",
    url: "https://example.com",
  },
  {
    id: "daniel-osei",
    name: "Daniel Osei",
    role: "head of product",
    company: "Lumen",
    quote:
      "Thoughtful, fast, and genuinely invested in the outcome. We'll be working with this team for a long time.",
    url: "https://example.com",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "founder",
    company: "Drift",
    quote:
      "From first call to launch felt like one continuous motion. No handoffs, no surprises — just steady, excellent work.",
    url: "https://example.com",
  },
];
