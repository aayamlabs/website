import { ImageResponse } from "next/og";
import { projects, getProject } from "@/lib/site-data";
import { team } from "@/lib/team";

// Generate one image per project at build time (required by `output: 'export'`).
export const dynamic = "force-static";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${team.name} case study`;

// Theme palette as literals (Satori can't read CSS variables).
const PAPER = "#FAFDEE";
const INK = "#1F3A4B";
const VOLT = "#C2F84F";
const SLATE = "#586E79";

export default async function CaseStudyOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? team.name;
  const category = project?.category ?? team.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "36px",
            fontWeight: 800,
            color: INK,
          }}
        >
          {team.name.toLowerCase()}
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: VOLT,
              display: "flex",
            }}
          />
        </div>

        {/* Project title + category */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "30px", color: SLATE }}>{category}</div>
          <div
            style={{
              fontSize: "96px",
              fontWeight: 800,
              color: INK,
              lineHeight: 1.02,
              marginTop: "12px",
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", marginTop: "28px" }}>
            <div
              style={{
                width: "140px",
                height: "10px",
                borderRadius: "999px",
                backgroundColor: VOLT,
                display: "flex",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
