import { nav } from "@/content/home";
import { CtaLink } from "./cta-link";
import { Logo } from "./logo";
import { ScrollCord } from "./cord";

// Sticky, server-rendered. Below 1024px it's logo + CTA only: on a one-page
// narrative a phone visitor scrolls, and the CTA is the one thing that must never
// leave reach (a menu toggle would be one more widget to get right for no gain).
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-[var(--color-ink)] bg-[var(--color-bg)]">
      <div className="site-container flex h-16 items-center justify-between gap-3 lg:h-20">
        <a href="#inicio" aria-label="Outubro Idiomas, voltar ao início">
          <Logo />
        </a>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-4 py-2 text-[0.9375rem] font-bold transition-colors duration-150 hover:bg-[var(--color-lime)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <CtaLink size="sm" className="whitespace-nowrap">
          Matricule-se<span className="hidden sm:inline"> já</span>
        </CtaLink>
      </div>
      <ScrollCord />
    </header>
  );
}
