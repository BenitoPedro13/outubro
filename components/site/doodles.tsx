// Doodle/sticker layer — docs/visual-identity-spec.md §5. Brand illustration, deliberately
// separate from the Lucide interface-icon system (§6): these mean "notebook margin," never
// "settings" or "close". The generic StarBurst polygon was replaced by the brand's own
// symbol (brand-symbol.tsx) — TASK-brand-alignment.md §2.3.

type StickyNoteProps = {
  color?: string;
  rotate?: number;
  children: React.ReactNode;
  className?: string;
};

export function StickyNote({ color = "var(--color-lime)", rotate = -2, children, className }: StickyNoteProps) {
  return (
    <div
      className={`relative w-full max-w-[220px] p-5 shadow-[0_6px_0_0_rgb(0_0_0/0.08)] ${className ?? ""}`}
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

// Pink is a light fill now (brandbook #FF97D2), so it takes ink text, not paper.
const toneStyles: Record<NonNullable<ChatBubbleProps["tone"]>, string> = {
  ink: "bg-[var(--color-bg-alt)] text-[var(--color-ink)] border border-[var(--color-border)]",
  cobalt: "bg-[var(--color-cobalt)] text-[var(--color-bg-alt)]",
  pink: "bg-[var(--color-pink)] text-[var(--color-ink)]",
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
