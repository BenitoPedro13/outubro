// Editorial chrome for the planning-document preview — mirrors the structural pattern
// proven on the UniMeet project's own pitch page (components/pitch/bits.tsx there),
// restyled in Outubro's own system instead of a neutral/editorial one.

import { StaggerReveal } from "@/components/motion/stagger-reveal";

export function Label({ children, tone = "ink" }: { children: React.ReactNode; tone?: "ink" | "cobalt" | "pink" }) {
  const color = tone === "cobalt" ? "var(--color-cobalt)" : tone === "pink" ? "var(--color-pink)" : "var(--color-ink)";
  return <span className="doc-label" style={{ color }}>{children}</span>;
}

export function DocContainer({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return <div className={wide ? "doc-container-wide" : "doc-container"}>{children}</div>;
}

export function DocCard({
  eyebrow,
  title,
  children,
  accent,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="doc-card h-full" style={accent ? { borderColor: accent } : undefined}>
      {eyebrow ? <Label>{eyebrow}</Label> : null}
      <h3 className={`type-subheading ${eyebrow ? "mt-2" : ""}`}>{title}</h3>
      {children ? <div className="type-body mt-3 text-[var(--color-ink-soft)]">{children}</div> : null}
    </div>
  );
}

export function Quote({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <figure className="doc-quote">
      <blockquote>&ldquo;{children}&rdquo;</blockquote>
      {cite ? <figcaption className="doc-label mt-4 not-italic text-[var(--color-ink-soft)]">{cite}</figcaption> : null}
    </figure>
  );
}

export function Rule() {
  return <hr className="doc-rule" />;
}

// speakPolish-style settle-in (docs/research.md §4b) via StaggerReveal — off on
// mobile/reduced-motion there, so this needs no branching of its own.
export function Grid({ children, cols = 2 }: { children: React.ReactNode; cols?: 2 | 3 | 4 }) {
  const map = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };
  return <StaggerReveal className={`grid gap-5 ${map[cols]}`}>{children}</StaggerReveal>;
}
