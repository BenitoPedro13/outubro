// The untangling cord — visual-identity-spec.md §2. Three renderings of one motif, all
// plain server-rendered SVG; the motion lives in globals.css (.cord-path, .scroll-cord),
// not in JS. pathLength="1" keeps the dash math unitless whatever the path's real length.

/** Hero: tangled loops on the left that run out into a straight line. */
export function HeroCord({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 120" className={className} aria-hidden="true" focusable="false">
      <path
        className="cord-path"
        pathLength={1}
        d="M8,86 C34,18 92,14 84,62 C76,108 22,98 42,56 C62,14 124,24 132,72 C140,118 88,112 108,64 C128,18 188,34 198,70 C208,100 244,66 292,64 C368,62 470,64 592,64"
        fill="none"
        stroke="var(--color-cobalt)"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Section divider: the cord's resolved state — one small kink, then straight. */
export function CordDivider({ color = "var(--color-ink)", className }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 320 24" className={className} aria-hidden="true" focusable="false">
      <path
        d="M4,12 C16,2 26,22 38,12 C50,2 60,22 72,12 C120,12 220,12 316,12"
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Page-long progress cord under the sticky header, revealed by a CSS scroll timeline. */
export function ScrollCord() {
  return (
    <svg
      viewBox="0 0 1000 8"
      preserveAspectRatio="none"
      className="scroll-cord pointer-events-none absolute inset-x-0 -bottom-[5px] h-2 w-full"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0,4 C6,0 12,8 18,4 C24,0 30,8 36,4 L1000,4"
        fill="none"
        stroke="var(--color-cobalt)"
        strokeWidth={4}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
