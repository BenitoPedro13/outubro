type SectionHeadingProps = {
  id: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  /** On saturated grounds (pink) ink-soft fails contrast; use full ink. */
  leadInk?: boolean;
  className?: string;
};

// One h2 treatment for every section, so the heading outline stays h1 → h2 → h3 with
// no skipped levels. `id` is what the section's aria-labelledby points at.
export function SectionHeading({ id, title, lead, align = "left", leadInk = false, className }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-[40rem] ${className ?? ""}`}>
      <h2 id={id} className="type-display">
        {title}
      </h2>
      {lead ? (
        // Inline style, not a utility: .type-lead is unlayered CSS and would beat any
        // Tailwind (layered) text colour class.
        <p className={`type-lead mt-4 ${center ? "mx-auto" : ""} max-w-[46ch]`} style={leadInk ? { color: "var(--color-ink)" } : undefined}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
