import { getLocale } from "@/content/dictionaries";
import { langTag, localePath, locales, type Locale } from "@/content/i18n";

const labels: Record<Locale, { short: string; name: string }> = {
  pt: { short: "PT", name: "Português" },
  en: { short: "EN", name: "English" },
  es: { short: "ES", name: "Español" },
};

// Three plain links, not a dropdown: nothing to open, nothing to get wrong for keyboard or
// screen-reader users. Sighted users see the code; assistive tech hears the language's own
// name, in that language (lang attribute).
export async function LanguageSwitcher({ label, tone = "light", className }: { label: string; tone?: "light" | "dark"; className?: string }) {
  const current = await getLocale();
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center gap-1">
        {locales.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <a
                href={localePath(locale)}
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
    </nav>
  );
}
