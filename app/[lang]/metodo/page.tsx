import type { Metadata } from "next";
import { getLocale } from "@/content/dictionaries";
import { getPageDictionary } from "@/content/pages";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { BrandSymbol } from "@/components/site/brand-symbol";
import { Metodo } from "@/components/site/home/metodo";
import { Pilares } from "@/components/site/home/pilares";
import { CtaFinal } from "@/components/site/home/cta-final";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getPageDictionary("metodo")]);
  return pageMetadata(locale, "metodo", t.seo);
}

const symbolColors = ["cobalt", "pink", "coral", "lime", "ink"] as const;

// /metodo — architecture.md §1: the method deep-dive. Brandbook essence/purpose/values
// (content/pages/metodo) around the Home's own "Só tem na Outubro" and Três Pilares
// sections, reused as-is (a supporting page repeats the Home's narrative, §1).
export default async function MetodoPage() {
  const t = await getPageDictionary("metodo");

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      <section aria-labelledby="abordagem-title" className="border-b-2 border-[var(--color-ink)]">
        <div className="site-container grid gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <h2 id="abordagem-title" className="type-display">
              {t.abordagem.title}
            </h2>
            <div className="mt-4 grid max-w-[52ch] gap-4 text-lg">
              {t.abordagem.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="type-heading">{t.aula.title}</h3>
            <ol className="reveal-deck mt-4 grid gap-4">
              {t.aula.steps.map((step, i) => (
                <li key={step.title} className="sticker flex gap-4 rounded-3xl bg-[var(--color-bg-alt)] p-5 sm:p-6">
                  <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-lime)] text-lg font-black">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-lg font-black leading-snug">{step.title}</p>
                    <p className="mt-1 text-[var(--color-ink-soft)]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Metodo />
      <Pilares />

      <section aria-labelledby="experiencia-title" className="border-b-2 border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-bg)]">
        <div className="site-container py-16 lg:py-24">
          <h2 id="experiencia-title" className="type-display max-w-[20ch] text-[var(--color-lime)]">
            {t.experiencia.title}
          </h2>
          <ul className="reveal-deck mt-10 grid gap-5 md:grid-cols-2">
            {t.experiencia.items.map((item) => (
              <li key={item.title} className="rounded-3xl bg-[var(--color-bg-alt)] p-6 text-[var(--color-ink)] sm:p-8">
                <h3 className="type-heading" style={{ paddingBottom: 0 }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-lg text-[var(--color-ink-soft)]">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="valores-title" className="border-b-2 border-[var(--color-ink)]">
        <div className="site-container py-16 lg:py-24">
          <SectionHeading id="valores-title" title={t.valores.title} />
          <ul className="reveal-deck mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.valores.items.map((item, i) => (
              <li key={item.title} className="sticker rounded-3xl bg-[var(--color-bg-alt)] p-6">
                <BrandSymbol color={symbolColors[i % symbolColors.length]} className="size-10" />
                <h3 className="type-subheading mt-4">{item.title}</h3>
                <p className="mt-2 text-[var(--color-ink-soft)]">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
