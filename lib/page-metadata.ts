import type { Metadata } from "next";
import { languageAlternates, localePath, ogLocale, type Locale, type RouteKey } from "@/content/i18n";
import { site } from "@/content/site";

// Unique title, description, canonical and full hreflang set for every page
// (architecture.md §5, TASK-pages-static.md §5). The OG image comes from each page's own
// opengraph-image.tsx, which Next merges in.
export function pageMetadata(locale: Locale, route: RouteKey, seo: { title: string; description: string }): Metadata {
  const url = localePath(locale, route);
  const title = `${seo.title} | ${site.name}`;
  return {
    title: { absolute: title },
    description: seo.description,
    alternates: { canonical: url, languages: languageAlternates(route) },
    openGraph: { type: "website", locale: ogLocale[locale], url, siteName: site.name, title, description: seo.description },
    twitter: { card: "summary_large_image", title, description: seo.description },
  };
}
