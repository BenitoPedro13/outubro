import { getLocale } from "@/content/dictionaries";
import type { Locale } from "@/content/i18n";

// Per-page copy that isn't CMS-bound — docs/tasks/TASK-pages-static.md §2.2. One folder per
// page, one file per locale; ./<page>/pt.ts is the source shape, en/es must match it.
// Same source tags as content/home/pt.ts (VERBATIM / COMPOSED / [CONTENT]).

const pages = {
  precos: { pt: () => import("./precos/pt"), en: () => import("./precos/en"), es: () => import("./precos/es") },
  metodo: { pt: () => import("./metodo/pt"), en: () => import("./metodo/en"), es: () => import("./metodo/es") },
  depoimentos: { pt: () => import("./depoimentos/pt"), en: () => import("./depoimentos/en"), es: () => import("./depoimentos/es") },
  faq: { pt: () => import("./faq/pt"), en: () => import("./faq/en"), es: () => import("./faq/es") },
  contato: { pt: () => import("./contato/pt"), en: () => import("./contato/en"), es: () => import("./contato/es") },
  "trabalhe-conosco": {
    pt: () => import("./trabalhe-conosco/pt"),
    en: () => import("./trabalhe-conosco/en"),
    es: () => import("./trabalhe-conosco/es"),
  },
  "politica-de-privacidade": {
    pt: () => import("./politica-de-privacidade/pt"),
    en: () => import("./politica-de-privacidade/en"),
    es: () => import("./politica-de-privacidade/es"),
  },
};

export type PageKey = keyof typeof pages;
export type PageDictionary<K extends PageKey> = Awaited<ReturnType<(typeof pages)[K]["pt"]>>["default"];

/** A page's copy in an explicit locale (OG image routes, which get `lang` as a param). */
export async function loadPageDictionary<K extends PageKey>(key: K, locale: Locale): Promise<PageDictionary<K>> {
  return (await pages[key][locale]()).default as PageDictionary<K>;
}

/** A page's copy in the current request's locale (Server Components under app/[lang]). */
export async function getPageDictionary<K extends PageKey>(key: K) {
  return loadPageDictionary(key, await getLocale());
}
