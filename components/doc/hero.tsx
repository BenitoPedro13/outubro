import { meta } from "@/content/outubro-pitch";
import { StarBurst } from "@/components/preview/doodles";
import { RotatingBadge } from "./rotating-badge";
import { DocContainer, Label } from "./bits";

// Full-bleed, immediately legible on load — no animation gate. The signature
// interaction lives in section 06 as its own labeled specimen (docs/architecture.md's
// preview task originally hid it here, invisible until scrolled; moved deliberately).
export function DocHero() {
  return (
    <header className="full-bleed notebook-grid relative overflow-hidden border-b-2 border-[var(--color-ink)] pb-16 pt-14 sm:pb-24 sm:pt-20">
      <StarBurst className="absolute -left-10 top-16 opacity-90 sm:-left-6" color="var(--color-lime)" points={9} size={90} />
      <StarBurst className="absolute -right-10 top-8 opacity-90 sm:-right-8" color="var(--color-pink)" points={5} size={64} />
      <StarBurst className="absolute -bottom-8 left-1/4 opacity-80" color="var(--color-coral)" points={5} size={44} />
      <StarBurst className="absolute right-1/4 bottom-4 opacity-70" color="var(--color-cobalt)" points={9} size={30} />
      <div className="absolute right-2 top-20 scale-75 sm:right-6 sm:top-28 sm:scale-100">
        <RotatingBadge text="OUTUBRO IDIOMAS ✦ SITE NOVO ✦ " color="var(--color-cobalt)" />
      </div>

      <DocContainer wide>
        <div className="relative rounded-3xl border-2 border-[var(--color-ink)] bg-[var(--color-bg-alt)] p-8 sm:p-12">
          <Label tone="pink">{meta.eyebrow}</Label>
          <h1 className="type-hero mt-6">{meta.title}</h1>
          <p className="type-lead mt-7 max-w-[64ch]">{meta.standfirst}</p>

          <dl className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            <div className="border-t-2 border-[var(--color-ink)] pt-3">
              <dt className="doc-label text-[var(--color-ink-soft)]">Sobre este documento</dt>
              <dd className="mt-1.5 text-sm">Prévia de direção não é o site final, é a etapa antes dele.</dd>
            </div>
            <div className="border-t-2 border-[var(--color-ink)] pt-3">
              <dt className="doc-label text-[var(--color-ink-soft)]">Data</dt>
              <dd className="mt-1.5 text-sm">{meta.preparedDate}</dd>
            </div>
          </dl>
        </div>
      </DocContainer>
    </header>
  );
}
