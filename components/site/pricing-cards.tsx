import { fill, getDictionary, getLocale } from "@/content/dictionaries";
import { formatBRL, type PricingFormat, type PricingPlan } from "@/lib/pricing";
import { CtaLink } from "@/components/site/cta-link";

// Card bands per format. Text on cobalt must be paper (4.61); pink takes ink.
const bands: Record<PricingFormat, string> = {
  individual: "bg-[var(--color-cobalt)] text-[var(--color-bg-alt)]",
  dupla: "bg-[var(--color-pink)] text-[var(--color-ink)]",
};

const formats: PricingFormat[] = ["individual", "dupla"];

// The two format cards, every price visible at once — Home → Preços and /precos.
export async function PricingCards({ plans, className }: { plans: Record<PricingFormat, PricingPlan[]>; className?: string }) {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const { precos } = t;

  return (
    <ul className={`reveal-deck grid gap-8 md:grid-cols-2 md:gap-6 ${className ?? ""}`}>
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
  );
}
