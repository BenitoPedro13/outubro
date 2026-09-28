import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./i18n";

// Next 16's documented i18n pattern (node_modules/next/dist/docs/01-app/02-guides/
// internationalization.md): the locale is a root param of app/[lang], so any Server
// Component can read it without `lang` being prop-drilled. Server-only by construction —
// importing next/root-params from a Client Component fails the build.

const dictionaries = {
  pt: () => import("./home/pt").then((m) => m.pt),
  en: () => import("./home/en").then((m) => m.en),
  es: () => import("./home/es").then((m) => m.es),
};

export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
}

export async function getDictionary() {
  return dictionaries[await getLocale()]();
}

/** Fills `{name}` placeholders in a dictionary string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
