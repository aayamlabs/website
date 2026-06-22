import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { team } from "@/lib/team";
import JsonLd, { organizationLd } from "@/components/site/json-ld";
import "./globals.css";

// team.siteUrl is a TODO placeholder until filled; fall back to a valid URL
// so metadataBase / new URL() never throws at build time.
const siteUrl = team.siteUrl.startsWith("http")
  ? team.siteUrl
  : "https://example.com";

const fontDisplay = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const fontBody = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${team.name} — ${team.tagline}`,
    template: `%s · ${team.name}`,
  },
  description: `${team.name} — a team building websites, AI agents, mobile apps and the software underneath. One team, idea to shipped.`,
  keywords: [
    "developer team",
    "web development",
    "AI agents",
    "mobile apps",
    "software engineering",
    "Next.js",
    "React",
    team.name,
  ],
  openGraph: {
    title: `${team.name} — ${team.tagline}`,
    description: `A developer team — web, AI, mobile, software. ${team.name}.`,
    url: siteUrl,
    siteName: team.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${team.name} — ${team.tagline}`,
    description: `A developer team — web, AI, mobile, software. ${team.name}.`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={organizationLd()} />
        {children}
      </body>
    </html>
  );
}
