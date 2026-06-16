import { ArrowRight } from "lucide-react";
import CallButton from "./call-button";

// NOTE: lucide-react 1.18.0 no longer ships brand/social icons (Github, Twitter,
// Dribbble, Linkedin, Instagram are all gone), so the glyphs are inlined here.
type IconProps = { className?: string };

function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.61 8.21 11.17.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.21.08 1.84 1.22 1.84 1.22 1.07 1.79 2.81 1.27 3.5.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21.96-.26 1.98-.39 3-.4 1.02.01 2.04.14 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.86.12 3.16.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.09.81 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.22.68.83.56C20.56 21.9 24 17.49 24 12.29 24 5.78 18.63.5 12 .5z" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.21-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.71 6.23 5.454-6.23zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function DribbbleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm7.93 5.53c1.43 1.74 2.3 3.96 2.32 6.38-.34-.07-3.72-.76-7.12-.33-.08-.18-.15-.36-.23-.55-.21-.5-.45-1-.69-1.49 3.77-1.54 5.49-3.76 5.72-4.01zM12 1.85c2.61 0 4.99.98 6.8 2.58-.2.27-1.75 2.35-5.39 3.72-1.68-3.08-3.54-5.6-3.82-5.99.78-.19 1.58-.31 2.41-.31zM7.56 2.78c.27.36 2.1 2.9 3.79 5.91-4.77 1.27-8.98 1.25-9.43 1.24.66-3.16 2.79-5.78 5.64-7.15zM1.7 12.01c0-.1 0-.21.01-.31.44.01 5.39.07 10.48-1.46.29.57.57 1.15.83 1.73-.13.04-.27.08-.4.12-5.26 1.7-8.06 6.33-8.29 6.72C2.65 17.2 1.7 14.71 1.7 12.01zm10.3 10.14c-2.41 0-4.63-.82-6.4-2.2.18-.37 2.17-4.2 7.93-6.21l.07-.02c1.44 3.73 2.03 6.86 2.18 7.76-1.13.45-2.37.7-3.78.7zm5.49-1.69c-.1-.62-.65-3.61-1.99-7.28 3.2-.51 6 .33 6.35.44-.44 2.77-2.03 5.16-4.36 6.84z" />
    </svg>
  );
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [
  { label: "GitHub", href: "#", Icon: GithubIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "Dribbble", href: "#", Icon: DribbbleIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

export default function SiteFooter() {
  return (
    // id="site-footer" is the PageStroke stop boundary — keep it.
    <footer
      id="site-footer"
      className="dark relative overflow-hidden bg-ink text-paper"
    >
      <div id="contact" className="wrap pt-32 pb-16 md:pt-48">
        <span className="eyebrow">get in touch</span>

        <h2
          className="mt-7 font-display font-extrabold tracking-tight"
          style={{ fontSize: "clamp(48px, 12vw, 150px)", lineHeight: 0.95 }}
        >
          <span className="block">Let&rsquo;s build</span>
          <span className="block">
            something<span className="text-volt">.</span>
          </span>
        </h2>

        {/* Mailto with lime underline + nudging arrow */}
        <a
          href="mailto:hello@throughline.dev"
          className="group mt-12 inline-flex w-fit items-center gap-3 border-b-2 border-volt pb-1 font-mono text-lg text-paper"
        >
          hello@throughline.dev
          <ArrowRight
            size={18}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </a>

        {/* Call us — click to reveal the phone number */}
        <div className="mt-6">
          <CallButton />
        </div>

        {/* Social row */}
        <ul className="mt-12 flex flex-wrap gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-paper transition-all duration-300 hover:-translate-y-1 hover:border-volt hover:bg-volt hover:text-ink-2"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom bar */}
      <div className="wrap">
        <div className="mono flex flex-col gap-2 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Throughline collective</span>
          <span>{"// built as one continuous line"}</span>
        </div>
      </div>
    </footer>
  );
}
