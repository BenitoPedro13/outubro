import { getDictionary } from "@/content/dictionaries";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaLink } from "@/components/site/cta-link";
import { CordDivider } from "@/components/site/cord";
import { BrandSymbol } from "@/components/site/brand-symbol";

// Band grounds in dictionary order (Educar, Empregar, Criar).
const tones = [
  // Lime on paper is too faint for a bullet, so pillar 1 marks in ink.
  { band: "bg-[var(--color-lime)] text-[var(--color-ink)]", symbol: "ink" },
  { band: "bg-[var(--color-pink)] text-[var(--color-ink)]", symbol: "pink" },
  { band: "bg-[var(--color-cobalt)] text-[var(--color-bg-alt)]", symbol: "cobalt" },
] as const;

// Home → Três Pilares (architecture.md §1.1.7). From 1024px the heading column is
// `position: sticky` while the three pillars scroll past it — the scrollytelling read
// without pinning or scroll-jacking (CSS only; pinning is what janks on mobile browsers
// with a collapsing address bar). Below 1024px it's a plain stack.
export async function Pilares() {
  const { pilares } = await getDictionary();
  return (
    <section id="pilares" aria-labelledby="pilares-title" className="border-b-2 border-[var(--color-ink)]">
      <div className="site-container grid gap-12 py-20 lg:grid-cols-[0.85fr_1fr] lg:gap-20 lg:py-28">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="pilares-title" title={pilares.title} lead={pilares.lead} />
          <CordDivider className="mt-8 h-auto w-44" color="var(--color-coral)" />
          <div className="mt-8 hidden lg:block">
            <CtaLink>{pilares.cta}</CtaLink>
          </div>
        </div>

        <ol className="grid gap-8">
          {pilares.items.map((pilar, i) => (
            <li key={pilar.title}>
              <article className="sticker overflow-hidden rounded-[28px] bg-[var(--color-bg-alt)]">
                <header className={`flex items-baseline gap-4 px-6 py-5 sm:px-8 ${tones[i].band}`}>
                  <span aria-hidden="true" className="text-4xl font-black leading-none">
                    {i + 1}.
                  </span>
                  <h3 className="type-heading">{pilar.title}</h3>
                </header>
                <div className="px-6 py-6 sm:px-8 sm:py-7">
                  <p className="text-xl font-bold leading-snug">{pilar.line}</p>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {pilar.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2.5 font-semibold">
                        <BrandSymbol color={tones[i].symbol} className="size-5" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t-2 border-dashed border-[var(--color-border)] pt-4 font-bold text-[var(--color-ink-soft)]">
                    {pilar.closing}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
