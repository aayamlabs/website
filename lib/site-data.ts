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
  /** Screenshot paths under /public, e.g. "/work/presto/cover.png". Empty = none yet. */
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
  /** Headshot under /public, e.g. "/testimonials/gagan-malik.jpg" */
  avatar: string;
};

// TODO(you): replace every `outcome`, `problem`, `approach`, `role`, `stack` and
// `images` below with real case-study content. `images` paths must exist under /public.
export const projects: Project[] = [
  {
    id: "presto",
    index: "01",
    title: "Presto",
    category: "platform · industrial ops",
    url: "https://askpresto.com",
    blurb:
      "A collaborative workspace for safer, compliant, and efficient industrial operations with AI-powered project and knowledge management.",
    seed: 1207,
    problem:
      "Industrial operations lacked a safe, compliant, and efficient collaborative workspace with AI-powered capabilities for managing projects and knowledge.",
    approach:
      "Presto Labs — a collaborative workspace for safer, compliant, and efficient industrial operations, featuring custom AI agents, AI-powered project management, and AI-driven knowledge management.",
    role:
      "Backend + Infra: Built the entire backend logic from scratch, set up multiple data flows and LLM pipelines, integrated 3rd party services (email, payments, event tracking), and managed infrastructure end to end.\n\nUI/UX: Developed the entire user interface of the Presto web app including Login/Signup, Dashboards, Reports & Analytics, Issues and Actions Kanban Board. Also created an independent private design system and published it as an npm package consumed within the application.",
    outcome:
      "A fully functional AI-powered industrial operations platform with a robust backend infrastructure, scalable data pipelines, and a polished, component-driven frontend with a published design system.",
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "MySQL",
      "AWS",
      "Material UI",
      "Tailwind CSS",
      "Redux",
      "Storybook",
      "PostgreSQL",
      "Python",
      "Django",
      "Docker",
    ],
    images: ["/work/presto/screenshot.jpg"],
  },
  {
    id: "davinci-brain",
    index: "02",
    title: "DaVinci Brain",
    category: "platform · marketplace",
    url: "https://ui.simple123.com/",
    blurb:
      "A marketplace connecting restaurant operators and distributors with bid-based purchasing, opportunity tracking, and salesperson management.",
    seed: 4831,
    problem:
      "Restaurant operators and distributors lacked an efficient way to connect, discover products, and manage purchasing — leading to inefficiencies in the supply chain, poor pricing visibility, and limited distributor reach.",
    approach:
      "Simple123 — a marketplace platform that connects restaurant operators and distributors, enabling product listing, bid-based purchasing, a dashboard for tracking opportunities, and salesperson management with area assignments.",
    role:
      "• Developed an analytics platform for insightful and efficient querying.\n• Refactored a complex schema into a normalized structure to enhance query performance.\n• Designed and implemented deployment pipelines using GitHub Actions, AWS ECS, and AWS ECR.\n• Optimized query latency from 10 seconds down to milliseconds.\n• Built data ingestion pipelines to process and map invoices directly to the database.",
    outcome:
      "A structured, competitive marketplace that streamlines the distributor-restaurant supply chain, dramatically improves query performance, and expands distributor reach through a scalable, efficiently deployed platform.",
    stack: [
      "React",
      "Redux",
      "TypeScript",
      "Next.js",
      "Tailwind",
      "Bootstrap",
      "FastAPI",
      "PostgreSQL",
      "AWS",
      "ECS",
      "ECR",
      "Docker",
      "EC2",
      "Vercel",
    ],
    images: ["/work/davinci-brain/screenshot.jpg"],
  },
  {
    id: "sanatni",
    index: "03",
    title: "Sanatni",
    category: "web app · mindfulness",
    url: "https://www.sanatni.com",
    blurb:
      "A mindfulness and meditation companion for mood tracking, guided practice, and community — all in one place.",
    seed: 9056,
    problem:
      "People struggle to maintain consistent mindfulness and meditation habits in their daily lives, with no unified space to track their emotional state, practice guided meditation, and stay connected with a like-minded supportive community.",
    approach:
      "Sanatni — a mindfulness and meditation companion app that helps users track their moods, practice meditation, and connect with a supportive community, all in one place.",
    role:
      "• Built the complete web application from design to deployment.\n• Developed mood tracking and meditation practice features.\n• Implemented community/social features to connect users.\n• Configured PWA/mobile-ready experience with full viewport and Apple mobile web app support.\n• Integrated Google Tag Manager for analytics and growth tracking.",
    outcome:
      "A fully functional mindfulness platform that combines personal wellness tracking with community engagement, giving users a holistic space to build and sustain a healthy meditation practice.",
    stack: ["Next.js", "React", "TypeScript", "PWA", "Google Tag Manager", "Vercel"],
    images: ["/work/sanatni/screenshot.jpg"],
  },
  // {
  //   id: "relay",
  //   index: "04",
  //   title: "Relay",
  //   category: "platform · infra",
  //   url: "https://example.com",
  //   blurb: "Event-driven infrastructure moving millions of messages a day.",
  //   seed: 6402,
  //   outcome: "scaled to 5M msgs/day at a third of the cost",
  //   problem: "TODO(you): what was broken / slow / missing for the client?",
  //   approach: "TODO(you): what you designed and built, and the key decisions.",
  //   role: "TODO(you): our role — e.g. design, build & ship, end to end.",
  //   stack: ["Node", "Postgres", "AWS", "Go"],
  //   images: [],
  // },
  // {
  //   id: "lumen",
  //   index: "05",
  //   title: "Lumen",
  //   category: "web app · healthcare",
  //   url: "https://example.com",
  //   blurb: "A clinician portal that turns patient data into clear next steps.",
  //   seed: 2718,
  //   outcome: "saved clinicians ~6 hours a week",
  //   problem: "TODO(you): what was broken / slow / missing for the client?",
  //   approach: "TODO(you): what you designed and built, and the key decisions.",
  //   role: "TODO(you): our role — e.g. design, build & ship, end to end.",
  //   stack: ["Next.js", "TypeScript", "Postgres"],
  //   images: [],
  // },
  // {
  //   id: "cargo",
  //   index: "06",
  //   title: "Cargo",
  //   category: "platform · logistics",
  //   url: "https://example.com",
  //   blurb: "Real-time fleet routing and shipment visibility at scale.",
  //   seed: 3141,
  //   outcome: "cut empty-miles 22% across the fleet",
  //   problem: "TODO(you): what was broken / slow / missing for the client?",
  //   approach: "TODO(you): what you designed and built, and the key decisions.",
  //   role: "TODO(you): our role — e.g. design, build & ship, end to end.",
  //   stack: ["Node", "PostGIS", "AWS"],
  //   images: [],
  // },
  // {
  //   id: "vega-ai",
  //   index: "07",
  //   title: "Vega AI",
  //   category: "ai agent · analytics",
  //   url: "https://example.com",
  //   blurb: "A natural-language analyst that queries the warehouse for you.",
  //   seed: 5926,
  //   outcome: "answered 80% of data questions self-serve",
  //   problem: "TODO(you): what was broken / slow / missing for the client?",
  //   approach: "TODO(you): what you designed and built, and the key decisions.",
  //   role: "TODO(you): our role — e.g. design, build & ship, end to end.",
  //   stack: ["LLMs", "DuckDB", "Python", "Next.js"],
  //   images: [],
  // },
  // {
  //   id: "drift",
  //   index: "08",
  //   title: "Drift",
  //   category: "mobile · social",
  //   url: "https://example.com",
  //   blurb: "An ephemeral social app built for fast, low-latency feeds.",
  //   seed: 5358,
  //   outcome: "held p95 feed load under 200ms",
  //   problem: "TODO(you): what was broken / slow / missing for the client?",
  //   approach: "TODO(you): what you designed and built, and the key decisions.",
  //   role: "TODO(you): our role — e.g. design, build & ship, end to end.",
  //   stack: ["React Native", "Expo", "WebSockets"],
  //   images: [],
  // },
  // {
  //   id: "mint",
  //   index: "09",
  //   title: "Mint",
  //   category: "web app · payments",
  //   url: "https://example.com",
  //   blurb: "A checkout and payments layer with a drop-in component kit.",
  //   seed: 9793,
  //   outcome: "lifted checkout conversion 18%",
  //   problem: "TODO(you): what was broken / slow / missing for the client?",
  //   approach: "TODO(you): what you designed and built, and the key decisions.",
  //   role: "TODO(you): our role — e.g. design, build & ship, end to end.",
  //   stack: ["Next.js", "Stripe", "TypeScript"],
  //   images: [],
  // },
  // {
  //   id: "atlas",
  //   index: "10",
  //   title: "Atlas",
  //   category: "platform · devtools",
  //   url: "https://example.com",
  //   blurb: "A developer platform with self-serve environments and previews.",
  //   seed: 2384,
  //   outcome: "dropped environment spin-up to under a minute",
  //   problem: "TODO(you): what was broken / slow / missing for the client?",
  //   approach: "TODO(you): what you designed and built, and the key decisions.",
  //   role: "TODO(you): our role — e.g. design, build & ship, end to end.",
  //   stack: ["Go", "Kubernetes", "Next.js"],
  //   images: [],
  // },
];

export const testimonials: Testimonial[] = [
  {
    id: "gagan-malik",
    name: "Gagan Malik",
    role: "founder",
    company: "Presto Labs",
    quote:
      "Working with this team was a game-changer for us. They didn't just write code — they architected our entire platform from the ground up, backend to frontend, and even shipped a reusable design system as an npm package. The depth of ownership they brought to Presto Labs is rare to find.",
    url: "https://example.com",
    avatar: "/testimonials/gagan.jpg",
  },
  {
    id: "prashant-kumar-jha",
    name: "Prashant Kumar Jha",
    role: "founder",
    company: "fluffypet",
    quote:
      "They truly understood our vision of bringing spirituality into the digital age. From mapping India's sacred sites to integrating AI-powered voice for our meditation sessions, every detail was handled with care and precision. Guruji's ashram now reaches devotees across the world, and that would not have been possible without their work.",
    url: "https://example.com",
    avatar: "/testimonials/prashant.jpg",
  },
  {
    id: "shivam-srivastava",
    name: "Shivam Srivastava",
    role: "founder",
    company: "SunjaLabs",
    quote:
      "We were struggling to manage client projects, track deliverables, and scale our team — all at once. Their team built us a custom platform that automated our entire workflow. From client onboarding to project tracking, everything just runs. It's the kind of solution you didn't know you needed until you can't imagine working without it.",
    url: "https://example.com",
    avatar: "/testimonials/shivam.jpg",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.id === slug);
}
