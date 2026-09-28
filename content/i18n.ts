// Locales — docs/tasks/TASK-brand-alignment.md §2.7. PT is the default and lives unprefixed;
// EN and ES are prefixed. Localized page URLs come from `routes` below
// (docs/tasks/TASK-pages-static.md §2.3).

export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** BCP 47 tag for <html lang>, hreflang and Intl. */
export const langTag: Record<Locale, string> = { pt: "pt-BR", en: "en", es: "es" };

/** Intl locale for number/currency formatting. es-419 (Latin American Spanish). */
export const intlLocale: Record<Locale, string> = { pt: "pt-BR", en: "en-US", es: "es-419" };

export const ogLocale: Record<Locale, string> = { pt: "pt_BR", en: "en_US", es: "es_LA" };

// Every page, once. The key is the folder under app/[lang]/ (the internal path is
// `/{locale}/{key}`, `/{locale}` for home); the values are the public URLs, without the
// locale prefix. next.config.ts builds one rewrite + redirect per entry from this map
// (lib/localized-routes.ts) — never a catch-all, so /admin, /api and anything else not listed
// here are never touched. Adding a page = a folder under app/[lang]/ + an entry here.
export const routes = {
  home: { pt: "/", en: "/", es: "/" },
  precos: { pt: "/precos", en: "/pricing", es: "/precios" },
  metodo: { pt: "/metodo", en: "/method", es: "/metodo" },
  depoimentos: { pt: "/depoimentos", en: "/testimonials", es: "/testimonios" },
  faq: { pt: "/faq", en: "/faq", es: "/preguntas-frecuentes" },
  contato: { pt: "/contato", en: "/contact", es: "/contacto" },
  "trabalhe-conosco": { pt: "/trabalhe-conosco", en: "/careers", es: "/trabaja-con-nosotros" },
  "politica-de-privacidade": { pt: "/politica-de-privacidade", en: "/privacy-policy", es: "/politica-de-privacidad" },
} as const satisfies Record<string, Record<Locale, `/${string}`>>;

export type RouteKey = keyof typeof routes;
export const routeKeys = Object.keys(routes) as RouteKey[];

/** Public URL of a page in a locale: PT unprefixed, others under /en, /es. */
export function localePath(locale: Locale, route: RouteKey = "home") {
  const slug = routes[route][locale];
  if (locale === defaultLocale) return slug;
  return slug === "/" ? `/${locale}` : `/${locale}${slug}`;
}

/** The app/[lang] path Next actually renders for a page. */
export function internalPath(locale: Locale, route: RouteKey) {
  return route === "home" ? `/${locale}` : `/${locale}/${route}`;
}

/** hreflang map for Metadata `alternates.languages` and the sitemap. */
export function languageAlternates(route: RouteKey = "home") {
  return {
    ...Object.fromEntries(locales.map((l) => [langTag[l], localePath(l, route)])),
    "x-default": localePath(defaultLocale, route),
  };
}

// Public and internal paths both resolve: under a rewrite, usePathname() reads the internal
// path while prerendering and the public one in the browser (Next's use-pathname docs,
// "Avoid hydration mismatch with rewrites"). Mapping both to the same key keeps whatever
// renders from it identical on server and client.
const routeByPath = new Map<string, RouteKey>(
  routeKeys.flatMap((route) => locales.flatMap((l) => [[localePath(l, route), route] as const, [internalPath(l, route), route] as const]))
);

/** Which page a pathname is, or undefined for anything outside the map (404, /apresentacao). */
export function routeFromPath(pathname: string) {
  return routeByPath.get(pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname);
}
