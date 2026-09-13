import { ArrowUpRight } from "lucide-react";
import { footer, site } from "@/content/home";
import { Logo } from "./logo";
import { CtaLink } from "./cta-link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-bg)]">
      <div className="site-container grid gap-10 py-14 md:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <Logo tone="verde" inverted />
          <p className="mt-5 max-w-[36ch] text-[var(--color-border)]">{footer.about}</p>
          <p className="mt-6 text-xl font-extrabold text-[var(--color-lime)]">{site.tagline}</p>
          <div className="mt-6">
            <CtaLink variant="on-dark">Falar no WhatsApp</CtaLink>
          </div>
        </div>

        <nav aria-label="Links da Outubro">
          <ul className="grid gap-1">
            {footer.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex min-h-11 items-center gap-2 py-2 font-bold transition-colors duration-150 hover:text-[var(--color-lime)]"
                >
                  {link.label}
                  <ArrowUpRight aria-hidden="true" strokeWidth={2} className="size-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-[var(--color-ink-soft)]">
        <p className="site-container py-6 text-sm text-[var(--color-border)]">
          © {new Date().getFullYear()} {site.name}. Escola de idiomas online desde 2018.
        </p>
      </div>
    </footer>
  );
}
