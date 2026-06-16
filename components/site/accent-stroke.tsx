/**
 * A short, static lime accent stroke for listing-page headers — keeps the pages
 * on-brand without mounting the full scroll-driven <PageStroke />. Decorative.
 */
export default function AccentStroke({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 120"
      fill="none"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d="M4 100 C 56 100, 56 22, 108 22 S 168 86, 196 30"
        stroke="var(--volt)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
