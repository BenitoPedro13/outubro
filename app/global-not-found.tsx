import type { Metadata } from "next";
import { sourceSans } from "@/lib/fonts";
import "./globals.css";

// Global 404 (next.config.ts experimental.globalNotFound). Renders outside every layout,
// so it can't know the visitor's locale: it speaks all three, PT first.
export const metadata: Metadata = {
  title: "404 | Outubro Idiomas",
  robots: { index: false },
};

const links = [
  { href: "/", lang: "pt-BR", label: "Voltar ao início" },
  { href: "/en", lang: "en", label: "Back to home" },
  { href: "/es", lang: "es", label: "Volver al inicio" },
];

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={sourceSans.variable}>
      <body>
        <main className="notebook-grid grid min-h-dvh place-items-center px-5 py-16 text-center">
          <div>
            <span aria-hidden="true" className="brand-symbol size-24 [--symbol-color:var(--color-cobalt)]" />
            <h1 className="type-display mt-6">Página não encontrada</h1>
            <p className="type-lead mx-auto mt-2 max-w-[36ch]">
              <span lang="en">Page not found</span> · <span lang="es">Página no encontrada</span>
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} hrefLang={link.lang} lang={link.lang} className="btn-cta btn-cta--sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </body>
    </html>
  );
}
