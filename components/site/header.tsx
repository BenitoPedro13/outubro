import Link from "next/link";
import { getDictionary, getLocale } from "@/content/dictionaries";
import { localePath, type RouteKey } from "@/content/i18n";
import { CtaLink } from "./cta-link";
import { Logo } from "./logo";
import { ScrollCord } from "./cord";
import { LanguageSwitcher } from "./language-switcher";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";

/** Pages in the header, in order. Careers and privacy live in the footer. */
const headerRoutes: RouteKey[] = ["metodo", "precos", "depoimentos", "faq", "contato"];

// Sticky, server-rendered. From 1024px: logo, page links, language, CTA. Below it: logo, CTA
// and a menu button (mobile-nav.tsx); the CTA never leaves reach.
// Height is --header-h in globals.css — keep h-16/lg:h-20 + border-b-2 in sync with it.
export async function Header() {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const items = headerRoutes.map((route) => ({ route, href: localePath(locale, route), label: t.nav[route] }));

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[var(--color-ink)] bg-[var(--color-bg)]">
      <div className="site-container flex h-16 items-center justify-between gap-3 lg:h-20">
        <Link href={localePath(locale, "home")} aria-label={t.ui.homeLabel} className="shrink-0">
          <Logo alt="" priority className="h-7 w-auto sm:h-8 lg:h-9" />
        </Link>

        <nav aria-label={t.ui.navLabel} className="hidden lg:block">
          <NavLinks
            items={items}
            className="flex items-center gap-1"
            linkClassName="rounded-full px-3.5 py-2 text-base font-bold transition-colors duration-150 hover:bg-[var(--color-lime)] aria-[current=page]:bg-[var(--color-ink)] aria-[current=page]:text-[var(--color-bg-alt)] xl:px-4"
          />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher label={t.ui.languageLabel} className="hidden sm:block" />
          <CtaLink size="sm" className="whitespace-nowrap">
            {t.header.cta}
            <span className="hidden sm:inline">{t.header.ctaSuffix}</span>
          </CtaLink>
          <MobileNav
            items={[{ route: "home" as const, href: localePath(locale, "home"), label: t.nav.home }, ...items]}
            locale={locale}
            labels={{ menu: t.ui.menu, closeMenu: t.ui.closeMenu, navLabel: t.ui.navLabel, languageLabel: t.ui.languageLabel }}
          />
        </div>
      </div>
      <ScrollCord />
    </header>
  );
}
