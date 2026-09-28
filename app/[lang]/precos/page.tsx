import type { Metadata } from "next";
import { fill, getDictionary, getLocale } from "@/content/dictionaries";
import { getPageDictionary } from "@/content/pages";
import { CURRENT_PRICING_YEAR, NEXT_PRICING_YEAR, formatBRL, getPricingPlans, type PricingFormat } from "@/lib/pricing";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHero } from "@/components/site/page-hero";
import { PricingCards } from "@/components/site/pricing-cards";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaFinal } from "@/components/site/home/cta-final";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getPageDictionary("precos")]);
  return pageMetadata(locale, "precos", t.seo);
}

const formats: PricingFormat[] = ["individual", "dupla"];

// /precos — architecture.md §1: the Home's pricing table as its own indexable page, plus the
// next year's table as a plain comparison and the "entenda o reajuste" copy. Figures from
// lib/pricing.ts (Payload-shaped until TASK-cms).
export default async function PrecosPage() {
  const [locale, home, t, current, next] = await Promise.all([
    getLocale(),
    getDictionary(),
    getPageDictionary("precos"),
    getPricingPlans(CURRENT_PRICING_YEAR),
    getPricingPlans(NEXT_PRICING_YEAR),
  ]);

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={fill(t.hero.lead, { year: CURRENT_PRICING_YEAR })} />

      <section aria-label={fill(t.next.title, { year: CURRENT_PRICING_YEAR })} className="border-b-2 border-[var(--color-ink)]">
        <div className="site-container py-16 lg:py-24">
          <PricingCards plans={current} />
          <p className="mt-10 text-center text-lg font-semibold">{home.precos.note}</p>
        </div>
      </section>

      <section aria-labelledby="next-title" className="border-b-2 border-[var(--color-ink)] bg-[var(--color-bg-alt)]">
        <div className="site-container grid gap-12 py-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:py-24">
          <div>
            <SectionHeading id="next-title" title={fill(t.next.title, { year: NEXT_PRICING_YEAR })} lead={fill(t.next.lead, { year: NEXT_PRICING_YEAR })} />
            {/* A real table: two years × six rows is tabular data, and it reads as one on a
                screen reader. Scrolls inside its own box if 375px is ever too narrow. */}
            <div className="sticker mt-8 overflow-x-auto rounded-[28px] bg-[var(--color-bg)]">
              <table className="w-full min-w-[20rem] border-collapse text-left">
                <caption className="caption-bottom border-t-2 border-[var(--color-ink)] px-5 py-3 text-left text-sm text-[var(--color-ink-soft)] sm:px-6">{fill(t.next.caption, { current: CURRENT_PRICING_YEAR, next: NEXT_PRICING_YEAR })}</caption>
                <thead>
                  <tr className="border-b-2 border-[var(--color-ink)]">
                    <th scope="col" className="px-5 py-4 font-black sm:px-6">
                      {t.next.format}
                    </th>
                    <th scope="col" className="px-3 py-4 text-right font-black">
                      {CURRENT_PRICING_YEAR}
                    </th>
                    <th scope="col" className="px-5 py-4 text-right font-black sm:px-6">
                      {NEXT_PRICING_YEAR}
                    </th>
                  </tr>
                </thead>
                {formats.map((format) => (
                  <tbody key={format} className="border-b-2 border-[var(--color-ink)] last:border-b-0">
                    <tr>
                      <th scope="colgroup" colSpan={3} className="bg-[var(--color-border)] px-5 py-2 text-sm font-black uppercase tracking-wide sm:px-6">
                        {home.precos.formats[format].title}
                      </th>
                    </tr>
                    {next[format].map((plan) => {
                      const before = current[format].find((p) => p.timesPerWeek === plan.timesPerWeek);
                      const same = before?.priceBRL === plan.priceBRL;
                      return (
                        <tr key={plan.timesPerWeek} className="border-t border-dashed border-[var(--color-border)]">
                          <th scope="row" className="px-5 py-3 font-bold sm:px-6">
                            {fill(home.precos.perWeek, { n: plan.timesPerWeek })}
                          </th>
                          <td className="px-3 py-3 text-right tabular-nums text-[var(--color-ink-soft)]">{before ? formatBRL(before.priceBRL, locale) : "—"}</td>
                          <td className="px-5 py-3 text-right font-black tabular-nums sm:px-6">
                            {formatBRL(plan.priceBRL, locale)}
                            {same ? <span className="block text-xs font-bold text-[var(--color-ink-soft)]">{t.next.noChange}</span> : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                ))}
              </table>
            </div>
          </div>

          <div className="lg:pt-4">
            <h2 className="type-heading">{t.reajuste.title}</h2>
            <p className="mt-2 inline-block -rotate-1 rounded-xl bg-[var(--color-lime)] px-3 py-1 text-lg font-black">{t.reajuste.since}</p>
            <div className="mt-5 grid gap-4 text-lg">
              {t.reajuste.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
