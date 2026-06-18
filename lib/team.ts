/**
 * Single source of truth for the team.
 * Edit these once; the whole site reads from here.
 * TODO(you): fill in every value below.
 */
export const team = {
  name: "Scrapuzzle",
  /** Short positioning line used in metadata / OG (replaces the old per-person role). */
  tagline: "a developer team — web, AI, mobile, software",
  email: "TODO(you): hello@scrapuzzle.dev",
  city: "TODO(you): Your City, Country",
  availableFrom: "TODO(you): e.g. August 2026",
  bookingUrl: "TODO(you): https://cal.com/scrapuzzle/intro",
  deckUrl: "TODO(you): /scrapuzzle-deck.pdf",
  github: "TODO(you): https://github.com/scrapuzzle",
  linkedin: "TODO(you): https://linkedin.com/company/scrapuzzle",
  x: "TODO(you): https://x.com/scrapuzzle",
  /** Used for metadataBase / canonical URLs / sitemap. */
  siteUrl: "TODO(you): https://scrapuzzle.dev",
} as const;

export type Team = typeof team;
