// Locales — docs/tasks/TASK-brand-alignment.md §2.7. PT is the default and lives at `/`
// (next.config.ts rewrites `/` → `/pt`); EN and ES are prefixed.

export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** BCP 47 tag for <html lang>, hreflang and Intl. */
export const langTag: Record<Locale, string> = { pt: "pt-BR", en: "en", es: "es" };

/** Intl locale for number/currency formatting. es-419 (Latin American Spanish). */
export const intlLocale: Record<Locale, string> = { pt: "pt-BR", en: "en-US", es: "es-419" };

export const ogLocale: Record<Locale, string> = { pt: "pt_BR", en: "en_US", es: "es_LA" };

/** Public URL path for a locale: PT unprefixed, others under /en, /es. */
export function localePath(locale: Locale, path = "/") {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** hreflang map for Metadata `alternates.languages` and the sitemap. */
export function languageAlternates(path = "/") {
  return {
    ...Object.fromEntries(locales.map((l) => [langTag[l], localePath(l, path)])),
    "x-default": localePath(defaultLocale, path),
  };
}
