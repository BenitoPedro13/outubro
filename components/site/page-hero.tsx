import { BrandSymbol } from "@/components/site/brand-symbol";

// The opening block of every supporting page: eyebrow, the page's one h1, lead. Notebook grid
// like the Home hero (visual-identity-spec.md §5). Descender safety: .type-hero pads its own
// descenders and stays overflow-visible; the section is the overflow-hidden container.
export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section aria-labelledby="page-title" className="notebook-grid relative overflow-hidden border-b-2 border-[var(--color-ink)]">
      <BrandSymbol color="lime" className="absolute -right-6 top-8 hidden size-24 rotate-12 sm:block lg:right-10 lg:size-32" />
      <div className="site-container relative py-14 sm:py-20 lg:py-24">
        <p className="type-caps inline-block rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-lime)] px-3 py-1">{eyebrow}</p>
        <h1 id="page-title" className="type-hero mt-5 max-w-[18ch]">
          {title}
        </h1>
        {lead ? <p className="type-lead mt-2 max-w-[48ch]">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
