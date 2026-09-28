import type { MetadataRoute } from "next";
import { languageAlternates, locales, localePath, routeKeys } from "@/content/i18n";
import { siteUrl } from "@/lib/site-url";

// Every page in the route map (content/i18n.ts), one entry per locale with its hreflang
// siblings. /apresentacao is a noindex preview outside the map and never listed.

export default function sitemap(): MetadataRoute.Sitemap {
  const absolute = (path: string) => `${siteUrl}${path}`;
  return routeKeys.flatMap((route) =>
    locales.map((locale) => ({
      url: absolute(localePath(locale, route)),
      changeFrequency: "monthly" as const,
      priority: route === "home" ? (locale === "pt" ? 1 : 0.8) : 0.6,
      alternates: {
        languages: Object.fromEntries(Object.entries(languageAlternates(route)).map(([k, v]) => [k, absolute(v)])),
      },
    }))
  );
}
