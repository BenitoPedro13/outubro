import { getDictionary } from "@/content/dictionaries";
import { CtaLink } from "./cta-link";
import { Logo } from "./logo";
import { ScrollCord } from "./cord";
import { LanguageSwitcher } from "./language-switcher";

// Sticky, server-rendered. Below 1024px it's logo + CTA (+ language links from 640px):
// on a one-page narrative a phone visitor scrolls, and the CTA is the one thing that must
// never leave reach (a menu toggle would be one more widget to get right for no gain).
// Height is --header-h in globals.css — keep h-16/lg:h-20 + border-b-2 in sync with it.
export async function Header() {
  const t = await getDictionary();
  return (
    <header className="sticky top-0 z-50 border-b-2 border-[var(--color-ink)] bg-[var(--color-bg)]">
      <div className="site-container flex h-16 items-center justify-between gap-3 lg:h-20">
        <a href="#inicio" aria-label={t.ui.homeLabel} className="shrink-0">
          <Logo alt="" priority className="h-7 w-auto sm:h-8 lg:h-9" />
        </a>

        <nav aria-label={t.ui.navLabel} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {t.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-base font-bold transition-colors duration-150 hover:bg-[var(--color-lime)] xl:px-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher label={t.ui.languageLabel} className="hidden sm:block" />
          <CtaLink size="sm" className="whitespace-nowrap">
            {t.header.cta}
            <span className="hidden sm:inline">{t.header.ctaSuffix}</span>
          </CtaLink>
        </div>
      </div>
      <ScrollCord />
    </header>
  );
}
