import { ImageResponse } from "next/og";
import { team } from "@/lib/team";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${team.name} — ${team.tagline}`;

// Theme palette as literals (Satori can't read CSS variables).
const PAPER = "#FAFDEE";
const INK = "#1F3A4B";
const VOLT = "#C2F84F";
const SLATE = "#5C7480";

export default function OpengraphImage() {
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
            fontSize: "40px",
            fontWeight: 800,
            color: INK,
          }}
        >
          {team.name.toLowerCase()}
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: VOLT,
              display: "flex",
            }}
          />
        </div>

        {/* Name + accent line + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              color: INK,
              lineHeight: 1.04,
            }}
          >
            {team.name}
          </div>
          <div style={{ display: "flex", marginTop: "24px" }}>
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
          <div style={{ fontSize: "34px", color: SLATE, marginTop: "26px" }}>
            {team.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
