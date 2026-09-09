"use client";

import { useId } from "react";

// The circular arc-text badge — speakPolish's rotating gallery ring
// (docs/research.md §4b), recreated as a rigid-rotation SVG (cheap: one CSS
// transform, no per-frame JS). Disabled on mobile and under reduced motion via the
// `.spin-badge` rule in globals.css, not a per-component check — one rule, everywhere
// this badge is used.
export function RotatingBadge({
  text,
  color = "var(--color-coral)",
  size = 128,
}: {
  text: string;
  color?: string;
  size?: number;
}) {
  const pathId = useId();
  const r = size / 2 - 12;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="spin-badge" aria-hidden="true">
      <defs>
        <path id={pathId} d={`M ${cx - r},${cy} a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`} />
      </defs>
      <text fontSize="11" fontWeight={800} letterSpacing="3" fill={color}>
        <textPath href={`#${pathId}`}>{text}</textPath>
      </text>
    </svg>
  );
}
