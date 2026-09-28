import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fill, getDictionary, getLocale } from "@/content/dictionaries";
import { localePath, routeKeys } from "@/content/i18n";
import { site } from "@/content/site";
import { Logo } from "./logo";
import { CtaLink } from "./cta-link";
import { LanguageSwitcher } from "./language-switcher";

// The vertical lockup is brandbook §2.1's preferred version; here it's the footer's anchor,
// big, in §2.3's on-black colourway.
export async function Footer() {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  // External links. Careers is now a page (in the sitemap column); its external form link
  // lives on that page until TASK-careers-form.
  const links = [
    { href: site.library, label: t.footer.links.library },
    { href: site.blog, label: t.footer.links.blog },
    { href: site.instagram, label: t.footer.links.instagram },
  ];

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-bg)]">
      <div className="site-container grid gap-12 py-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:py-24">
        <Logo variant="vertical" inverse className="h-auto w-full max-w-[280px] md:max-w-[360px]" />

        <div className="grid gap-12 sm:grid-cols-2 sm:gap-10">
          <div className="sm:col-span-2">
            <p className="max-w-[34ch] text-lg text-[var(--color-border)]">{t.footer.about}</p>
            <p className="mt-6 text-2xl font-black leading-tight text-[var(--color-lime)]">{t.tagline}</p>
            <div className="mt-8">
              <CtaLink variant="on-dark">{t.footer.cta}</CtaLink>
            </div>
          </div>

          <nav aria-label={t.ui.footerPagesLabel}>
            <ul className="grid gap-1">
              {routeKeys.map((route) => (
                <li key={route}>
                  <Link href={localePath(locale, route)} className="inline-block py-2 text-lg font-bold leading-snug transition-colors duration-150 hover:text-[var(--color-lime)]">
                    {t.nav[route]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.ui.footerLinksLabel}>
            <ul className="grid gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className="group inline-block py-2.5 text-lg font-bold leading-snug transition-colors duration-150 hover:text-[var(--color-lime)]"
                  >
                    {/* The arrow stays glued to the last word so it never wraps alone. */}
                    {link.label.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="whitespace-nowrap">
                      {link.label.split(" ").at(-1)}
                      <ArrowUpRight aria-hidden="true" strokeWidth={2} className="ml-1.5 inline size-4 align-[-0.1em] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="sr-only"> {t.ui.opensNewTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-[var(--color-ink-soft)]">
        <div className="site-container flex flex-col items-center gap-3 py-6 text-center">
          <LanguageSwitcher label={t.ui.languageLabel} tone="dark" />
          <p className="text-sm text-[var(--color-border)]">{fill(t.footer.copyright, { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
