import { DocContainer } from "./bits";

type SectionProps = {
  n: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  wide?: boolean;
  bg?: string;
  grid?: boolean;
};

// Numbered editorial section — same rhythm as the UniMeet pitch page's Section
// component: a rule, a number, a title, an optional lead, then content. `bg`/`grid`
// let a section break from the default page background (full-bleed color or
// notebook-grid), which is how Babbly's own case study alternates slides.
export function Section({ n, title, lead, children, wide = false, bg, grid = false }: SectionProps) {
  return (
    <section
      id={`s${n}`}
      className={`full-bleed py-20 sm:py-28 ${grid ? "notebook-grid" : ""}`}
      style={bg ? { background: bg } : undefined}
    >
      <DocContainer wide={wide}>
        <header className="mb-10">
          <hr className="doc-rule" />
          <div className="mt-3">
            <span className="doc-label">{n}</span>
          </div>
          <h2 className="type-display mt-4">{title}</h2>
          {lead ? <p className="type-lead mt-4 max-w-[62ch]">{lead}</p> : null}
        </header>
        {children}
      </DocContainer>
    </section>
  );
}
