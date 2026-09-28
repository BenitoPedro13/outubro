import Image from "next/image";
import { fill, getDictionary, getLocale } from "@/content/dictionaries";
import { localePath } from "@/content/i18n";
import { whatsappHref } from "@/content/site";
import { getPricingPlans, CURRENT_PRICING_YEAR } from "@/lib/pricing";
import { SectionHeading } from "@/components/site/section-heading";
import { PricingCards } from "@/components/site/pricing-cards";
import { ArrowLink } from "@/components/site/arrow-link";
import mascotClipboard from "@/public/brand/mascot-clipboard.png";

// Home → Preços (architecture.md §1.1.10, TASK-brand-alignment.md §2.6). Both formats
// side by side, every price visible at once: no tabs, no toggle, zero JS. Figures come
// from lib/pricing.ts (Payload-shaped until TASK-cms); the cards are shared with /precos.
export async function Precos() {
  const [t, locale, plans] = await Promise.all([getDictionary(), getLocale(), getPricingPlans()]);
  const { precos } = t;

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

        <PricingCards plans={plans} className="mt-12 lg:mt-16" />

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
        <div className="mt-4 flex justify-center">
          <ArrowLink href={localePath(locale, "precos")}>{precos.seeAll}</ArrowLink>
        </div>
      </div>
    </section>
  );
}
