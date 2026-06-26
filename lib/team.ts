/**
 * Single source of truth for the team.
 * Edit these once; the whole site reads from here.
 * TODO(you): fill in every value below.
 */
export const team = {
  name: "Aayamlabs",
  /** Short positioning line used in metadata / OG (replaces the old per-person role). */
  tagline: "a developer team — web, AI, mobile, software",
  email: "getintouch@aayamlabs.in",
  city: "TODO(you): Your City, Country",
  availableFrom: "TODO(you): e.g. August 2026",
  bookingUrl: "TODO(you): https://cal.com/aayamlabs/intro",
  deckUrl: "https://shorturl.at/D18It",
  github: "TODO(you): https://github.com/aayamlabs",
  linkedin: "TODO(you): https://linkedin.com/company/aayamlabs",
  x: "TODO(you): https://x.com/aayamlabs",
  /** Used for metadataBase / canonical URLs / sitemap. */
  siteUrl: "https://aayamlabs.in",
} as const;

export type Team = typeof team;
