const ITEMS = [
  "web apps",
  "ai agents",
  "mobile",
  "design engineering",
  "platforms",
];

export default function Marquee() {
  // Duplicate once so the .marquee-track's translateX(-50%) loop is seamless.
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div
      className="dark relative w-full overflow-hidden bg-ink text-paper"
      style={{
        borderTop: "1.5px solid var(--border)",
        borderBottom: "1.5px solid var(--border)",
      }}
    >
      {/* One accessible copy; the animated, duplicated track is decorative. */}
      <h2 className="sr-only">Capabilities</h2>
      <ul className="sr-only">
        {ITEMS.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>

      <div className="py-5">
        <div
          className="marquee-track motion-reduce:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {loop.map((word, i) => (
            <span key={i} className="inline-flex items-center">
              <span
                className="whitespace-nowrap px-2 font-display font-bold"
                style={{ fontSize: "clamp(20px, 4vw, 34px)" }}
              >
                {word}
              </span>
              <span className="mx-6 inline-block h-[7px] w-[7px] rounded-full bg-volt" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
