import { intlLocale, type Locale } from "@/content/i18n";

// Pricing rows — docs/tasks/TASK-brand-alignment.md §2.6.
//
// TEMPORARY HOME. The invariant is "pricing lives in Payload" (architecture.md §2,
// `pricingPlans`: format, frequency, price, effectiveYear). Payload isn't installed yet
// (TASK-scaffold.md), so the rows sit here, typed exactly like that collection, behind the
// one function the UI calls. TASK-home-cms.md replaces only getPricingPlans()'s body with a
// Payload query; nothing that renders prices changes.

export type PricingFormat = "individual" | "dupla";

export type PricingPlan = {
  format: PricingFormat;
  timesPerWeek: 1 | 2 | 3;
  /** Monthly price per student, whole reais. */
  priceBRL: number;
  effectiveYear: number;
};

// VERBATIM — current site, "Valores 2026" (docs/refs/outubroidiomas.com capture).
// [CONTENT] client-content-request.md item 2: confirm figures; 2027 rows once the client
// decides whether/when to show them.
const plans: PricingPlan[] = [
  { format: "individual", timesPerWeek: 1, priceBRL: 520, effectiveYear: 2026 },
  { format: "individual", timesPerWeek: 2, priceBRL: 935, effectiveYear: 2026 },
  { format: "individual", timesPerWeek: 3, priceBRL: 1400, effectiveYear: 2026 },
  { format: "dupla", timesPerWeek: 1, priceBRL: 350, effectiveYear: 2026 },
  { format: "dupla", timesPerWeek: 2, priceBRL: 650, effectiveYear: 2026 },
  { format: "dupla", timesPerWeek: 3, priceBRL: 950, effectiveYear: 2026 },
];

/** The year shown on the Home — the current table, not next year's. */
export const CURRENT_PRICING_YEAR = 2026;

export async function getPricingPlans(year = CURRENT_PRICING_YEAR): Promise<Record<PricingFormat, PricingPlan[]>> {
  const rows = plans.filter((p) => p.effectiveYear === year).sort((a, b) => a.timesPerWeek - b.timesPerWeek);
  return {
    individual: rows.filter((p) => p.format === "individual"),
    dupla: rows.filter((p) => p.format === "dupla"),
  };
}

/** BRL in every locale ("R$ 1.400" / "R$1,400"), no cents — the table has none. */
export function formatBRL(value: number, locale: Locale) {
  return new Intl.NumberFormat(intlLocale[locale], {
    style: "currency",
    currency: "BRL",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(value);
}
