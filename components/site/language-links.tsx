"use client";

import { usePathname } from "next/navigation";
import { langTag, localePath, locales, routeFromPath, type Locale } from "@/content/i18n";

const labels: Record<Locale, { short: string; name: string }> = {
  pt: { short: "PT", name: "Português" },
  en: { short: "EN", name: "English" },
  es: { short: "ES", name: "Español" },
};

// Client leaf only to learn which page we're on (the layout that renders the switcher can't).
// Each link goes to this page's twin in that language (/metodo ↔ /en/method), or that
// language's home outside the route map. Renders from the route key, never the raw pathname,
// so the server's internal path and the browser's public one produce the same markup.
export function LanguageLinks({ current, tone }: { current: Locale; tone: "light" | "dark" }) {
  const route = routeFromPath(usePathname()) ?? "home";
  return (
    <ul className="flex items-center gap-1">
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <li key={locale}>
            <a
              href={localePath(locale, route)}
              hrefLang={langTag[locale]}
              lang={langTag[locale]}
              aria-current={active ? "true" : undefined}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-2 text-sm font-bold transition-colors duration-150 ${
                active
                  ? tone === "dark"
                    ? "bg-[var(--color-lime)] text-[var(--color-ink)]"
                    : "bg-[var(--color-ink)] text-[var(--color-bg-alt)]"
                  : tone === "dark"
                    ? "hover:text-[var(--color-lime)]"
                    : "hover:bg-[var(--color-lime)]"
              }`}
            >
              <span aria-hidden="true">{labels[locale].short}</span>
              <span className="sr-only">{labels[locale].name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
