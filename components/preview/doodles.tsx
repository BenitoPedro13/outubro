// Doodle/sticker layer — docs/visual-identity-spec.md §5. Brand illustration, deliberately
// separate from the Lucide interface-icon system (§6): these mean "notebook margin," never
// "settings" or "close."

type StarBurstProps = {
  points?: number;
  size?: number;
  color?: string;
  className?: string;
};

export function StarBurst({ points = 9, size = 32, color = "var(--color-lime)", className }: StarBurstProps) {
  const outerR = size / 2;
  const innerR = outerR * 0.55;
  const coords: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const x = outerR + r * Math.cos(angle);
    const y = outerR + r * Math.sin(angle);
    coords.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      <polygon
        points={coords.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  );
}

type StickyNoteProps = {
  color?: string;
  rotate?: number;
  children: React.ReactNode;
  className?: string;
};

export function StickyNote({ color = "var(--color-lime)", rotate = -2, children, className }: StickyNoteProps) {
  return (
    <div
      className={`relative w-full max-w-[220px] p-5 shadow-[0_6px_0_0_rgba(20,18,15,0.08)] ${className ?? ""}`}
      style={{
        background: color,
        transform: `rotate(${rotate}deg)`,
        clipPath: "polygon(0 0, 82% 0, 100% 18%, 100% 100%, 0 100%)",
      }}
    >
      {children}
    </div>
  );
}

type ChatBubbleProps = {
  children: React.ReactNode;
  tone?: "ink" | "cobalt" | "pink";
  className?: string;
};

const toneStyles: Record<NonNullable<ChatBubbleProps["tone"]>, string> = {
  ink: "bg-[var(--color-bg-alt)] text-[var(--color-ink)] border border-[var(--color-border)]",
  cobalt: "bg-[var(--color-cobalt)] text-[var(--color-bg-alt)]",
  pink: "bg-[var(--color-pink)] text-[var(--color-bg-alt)]",
};

export function ChatBubble({ children, tone = "ink", className }: ChatBubbleProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${toneStyles[tone]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
