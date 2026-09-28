import Image from "next/image";
import { fill, getDictionary, getLocale } from "@/content/dictionaries";
import { whatsappHref } from "@/content/site";
import { formatBRL, getPricingPlans, CURRENT_PRICING_YEAR, type PricingFormat } from "@/lib/pricing";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaLink } from "@/components/site/cta-link";
import mascotClipboard from "@/public/brand/mascot-clipboard.png";

// Card bands per format. Text on cobalt must be paper (4.61); pink takes ink.
const bands: Record<PricingFormat, string> = {
  individual: "bg-[var(--color-cobalt)] text-[var(--color-bg-alt)]",
  dupla: "bg-[var(--color-pink)] text-[var(--color-ink)]",
};

// Home → Preços (architecture.md §1.1.10, TASK-brand-alignment.md §2.6). Both formats
// side by side, every price visible at once: no tabs, no toggle, zero JS. Figures come
// from lib/pricing.ts (Payload-shaped until TASK-home-cms.md).
export async function Precos() {
  const [t, locale, plans] = await Promise.all([getDictionary(), getLocale(), getPricingPlans()]);
  const { precos } = t;
  const formats: PricingFormat[] = ["individual", "dupla"];

  return (
    <section id="precos" aria-labelledby="precos-title" className="relative overflow-hidden border-b-2 border-[var(--color-ink)]">
      <div className="site-container py-20 lg:py-28">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading id="precos-title" title={precos.title} lead={fill(precos.lead, { year: CURRENT_PRICING_YEAR })} />
          <Image
            src={mascotClipboard}
            alt=""
            sizes="(min-width: 768px) 176px, 96px"
            className="h-auto w-24 shrink-0 -rotate-6 md:w-44"
          />
        </div>

        <ul className="reveal-deck mt-12 grid gap-8 md:grid-cols-2 md:gap-6 lg:mt-16">
          {formats.map((format) => {
            const copy = precos.formats[format];
            return (
              <li key={format} className="sticker flex flex-col overflow-hidden rounded-[28px] bg-[var(--color-bg-alt)]">
                <div className={`px-6 py-5 sm:px-8 ${bands[format]}`}>
                  <h3 className="type-heading" style={{ paddingBottom: 0 }}>
                    {copy.title}
                  </h3>
                  <p className="mt-1 text-lg font-semibold">{copy.who}</p>
                </div>

                <dl className="grow divide-y-2 divide-dashed divide-[var(--color-border)] px-6 sm:px-8">
                  {plans[format].map((plan) => (
                    <div key={plan.timesPerWeek} className="flex items-baseline justify-between gap-4 py-5">
                      <dt className="text-lg font-bold">{fill(precos.perWeek, { n: plan.timesPerWeek })}</dt>
                      <dd className="text-right">
                        <span className="text-[2rem] font-black leading-none tracking-tight sm:text-[2.5rem]">{formatBRL(plan.priceBRL, locale)}</span>
                        <span className="text-base font-semibold text-[var(--color-ink-soft)]">{precos.unit}</span>
                        <span className="block text-sm text-[var(--color-ink-soft)]">{precos.perStudent}</span>
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="px-6 pb-7 pt-2 sm:px-8">
                  <CtaLink size="sm" className="w-full" message={fill(t.whatsapp.plan, { plan: copy.title.toLowerCase() })}>
                    {copy.cta}
                  </CtaLink>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 flex flex-col items-center gap-1 text-center text-lg font-semibold sm:flex-row sm:justify-center sm:gap-3">
          {precos.note}
          <a
            href={whatsappHref(t.whatsapp.default)}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center font-bold underline decoration-[var(--color-coral)] decoration-[3px] underline-offset-[6px] transition-colors duration-150 hover:decoration-[var(--color-cobalt)]"
          >
            {precos.noteCta}
            <span className="sr-only"> {t.ui.opensWhatsapp}</span>
          </a>
        </p>
      </div>
    </section>
  );
}
