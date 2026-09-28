import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { getDictionary, getLocale } from "@/content/dictionaries";
import { langTag, locales } from "@/content/i18n";
import { site, whatsappHref } from "@/content/site";
import { sourceSans } from "@/lib/fonts";
import { indexable } from "@/lib/indexing";
import { siteUrl } from "@/lib/site-url";
import "../globals.css";

// The site's root layout — one per locale (docs/tasks/TASK-brand-alignment.md §2.7).
// /apresentacao has its own root layout in (preview) and never gets this chrome.

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  // Absolute base so per-route OG images and canonicals resolve (lib/site-url.ts).
  metadataBase: new URL(siteUrl),
  title: site.name,
  // Draft-content guard (lib/indexing.ts). Pages don't set `robots`, so this applies to all.
  ...(indexable ? {} : { robots: { index: false, follow: false } }),
};

export default async function SiteLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const t = await getDictionary();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/brand/logo-azul.png`,
    slogan: t.tagline,
    foundingDate: String(site.foundingYear),
    sameAs: [site.instagram],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.telephone,
      contactType: "customer service",
      availableLanguage: ["Portuguese", "English", "Spanish"],
    },
  };

  return (
    <html lang={langTag[locale]} className={sourceSans.variable}>
      <body>
        <div className="has-mobile-cta">
          <a href="#conteudo" className="skip-link">
            {t.ui.skipLink}
          </a>
          <script
            type="application/ld+json"
            // Next.js JSON-LD guide: escape "<" so the payload can't close the script tag.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
          />
          <Header />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileCtaBar label={t.mobileCta} href={whatsappHref(t.whatsapp.default)} opensWhatsapp={t.ui.opensWhatsapp} />
          <SmoothScroll />
        </div>
      </body>
    </html>
  );
}
