/**
 * Single source of truth for projects and testimonials.
 * Both the home sections (sliced) and the full listing/case-study pages read here.
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

  // --- Case-study fields (all optional; fill per project) ---
  /** One-line result shown under the category on cards, e.g. "cut tickets 70%". */
  outcome?: string;
  /** The problem the client had. */
  problem?: string;
  /** What we built / the approach taken. */
  approach?: string;
  /** Our explicit role on the project. */
  role?: string;
  /** Tech used. */
  stack?: string[];
  /** Screenshot paths under /public, e.g. "/work/settl/cover.png". Empty = none yet. */
  images?: string[];
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

// TODO(you): replace every `outcome`, `problem`, `approach`, `role`, `stack` and
// `images` below with real case-study content. `images` paths must exist under /public.
export const projects: Project[] = [
  {
    id: "settl",
    index: "01",
    title: "Settl",
    category: "web app · fintech",
    url: "https://example.com",
    blurb: "A consumer fintech dashboard with instant settlement and live balances.",
    seed: 1207,
    outcome: "cut settlement time from days to seconds",
    problem: "TODO(you): what was broken / slow / missing for the client?",
    approach: "TODO(you): what you designed and built, and the key decisions.",
    role: "TODO(you): our role — e.g. design, build & ship, end to end.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    images: [],
  },
  {
    id: "northpeak-ai",
    index: "02",
    title: "Northpeak AI",
    category: "ai agent · support",
    url: "https://example.com",
    blurb: "An autonomous support agent that resolves tickets end to end.",
    seed: 4831,
    outcome: "resolved 70% of tickets with no human in the loop",
    problem: "TODO(you): what was broken / slow / missing for the client?",
    approach: "TODO(you): what you designed and built, and the key decisions.",
    role: "TODO(you): our role — e.g. design, build & ship, end to end.",
    stack: ["LLMs", "RAG", "Vector DBs", "Python"],
    images: [],
  },
  {
    id: "tempo",
    index: "03",
    title: "Tempo",
    category: "mobile · ios + android",
    url: "https://example.com",
    blurb: "A cross-platform habit tracker with offline-first sync.",
    seed: 9056,
    outcome: "shipped both stores from one codebase in 9 weeks",
    problem: "TODO(you): what was broken / slow / missing for the client?",
    approach: "TODO(you): what you designed and built, and the key decisions.",
    role: "TODO(you): our role — e.g. design, build & ship, end to end.",
    stack: ["React Native", "Swift", "Expo"],
    images: [],
  },
  {
    id: "relay",
    index: "04",
    title: "Relay",
    category: "platform · infra",
    url: "https://example.com",
    blurb: "Event-driven infrastructure moving millions of messages a day.",
    seed: 6402,
    outcome: "scaled to 5M msgs/day at a third of the cost",
    problem: "TODO(you): what was broken / slow / missing for the client?",
    approach: "TODO(you): what you designed and built, and the key decisions.",
    role: "TODO(you): our role — e.g. design, build & ship, end to end.",
    stack: ["Node", "Postgres", "AWS", "Go"],
    images: [],
  },
  {
    id: "lumen",
    index: "05",
    title: "Lumen",
    category: "web app · healthcare",
    url: "https://example.com",
    blurb: "A clinician portal that turns patient data into clear next steps.",
    seed: 2718,
    outcome: "saved clinicians ~6 hours a week",
    problem: "TODO(you): what was broken / slow / missing for the client?",
    approach: "TODO(you): what you designed and built, and the key decisions.",
    role: "TODO(you): our role — e.g. design, build & ship, end to end.",
    stack: ["Next.js", "TypeScript", "Postgres"],
    images: [],
  },
  {
    id: "cargo",
    index: "06",
    title: "Cargo",
    category: "platform · logistics",
    url: "https://example.com",
    blurb: "Real-time fleet routing and shipment visibility at scale.",
    seed: 3141,
    outcome: "cut empty-miles 22% across the fleet",
    problem: "TODO(you): what was broken / slow / missing for the client?",
    approach: "TODO(you): what you designed and built, and the key decisions.",
    role: "TODO(you): our role — e.g. design, build & ship, end to end.",
    stack: ["Node", "PostGIS", "AWS"],
    images: [],
  },
  {
    id: "vega-ai",
    index: "07",
    title: "Vega AI",
    category: "ai agent · analytics",
    url: "https://example.com",
    blurb: "A natural-language analyst that queries the warehouse for you.",
    seed: 5926,
    outcome: "answered 80% of data questions self-serve",
    problem: "TODO(you): what was broken / slow / missing for the client?",
    approach: "TODO(you): what you designed and built, and the key decisions.",
    role: "TODO(you): our role — e.g. design, build & ship, end to end.",
    stack: ["LLMs", "DuckDB", "Python", "Next.js"],
    images: [],
  },
  {
    id: "drift",
    index: "08",
    title: "Drift",
    category: "mobile · social",
    url: "https://example.com",
    blurb: "An ephemeral social app built for fast, low-latency feeds.",
    seed: 5358,
    outcome: "held p95 feed load under 200ms",
    problem: "TODO(you): what was broken / slow / missing for the client?",
    approach: "TODO(you): what you designed and built, and the key decisions.",
    role: "TODO(you): our role — e.g. design, build & ship, end to end.",
    stack: ["React Native", "Expo", "WebSockets"],
    images: [],
  },
  {
    id: "mint",
    index: "09",
    title: "Mint",
    category: "web app · payments",
    url: "https://example.com",
    blurb: "A checkout and payments layer with a drop-in component kit.",
    seed: 9793,
    outcome: "lifted checkout conversion 18%",
    problem: "TODO(you): what was broken / slow / missing for the client?",
    approach: "TODO(you): what you designed and built, and the key decisions.",
    role: "TODO(you): our role — e.g. design, build & ship, end to end.",
    stack: ["Next.js", "Stripe", "TypeScript"],
    images: [],
  },
  {
    id: "atlas",
    index: "10",
    title: "Atlas",
    category: "platform · devtools",
    url: "https://example.com",
    blurb: "A developer platform with self-serve environments and previews.",
    seed: 2384,
    outcome: "dropped environment spin-up to under a minute",
    problem: "TODO(you): what was broken / slow / missing for the client?",
    approach: "TODO(you): what you designed and built, and the key decisions.",
    role: "TODO(you): our role — e.g. design, build & ship, end to end.",
    stack: ["Go", "Kubernetes", "Next.js"],
    images: [],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "aanya-rao",
    name: "Aanya Rao",
    role: "founder",
    company: "Settl",
    quote:
      "Working with one team that designed, built, and shipped the whole thing was a revelation — nothing got lost between strangers, and it shows in the product.",
    url: "https://example.com",
  },
  {
    id: "marcus-kell",
    name: "Marcus Kell",
    role: "COO",
    company: "Northpeak",
    quote:
      "Embedded like part of our team and shipped faster than we thought possible — without ever cutting the corners that matter.",
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
      "Understood our infrastructure better than some of our own hires within a week, and the rollout was flawless.",
    url: "https://example.com",
  },
  {
    id: "daniel-osei",
    name: "Daniel Osei",
    role: "head of product",
    company: "Lumen",
    quote:
      "Thoughtful, fast, and genuinely invested in the outcome. We'll be working together for a long time.",
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

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.id === slug);
}
