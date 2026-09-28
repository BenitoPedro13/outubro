import type { MetadataRoute } from "next";
import { languageAlternates, locales, localePath } from "@/content/i18n";
import { siteUrl } from "@/lib/site-url";

// Real routes only, one entry per locale with its hreflang siblings — each supporting
// page's own task adds its path here (architecture.md §1). /apresentacao is a noindex
// preview and never listed.
const paths = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const absolute = (path: string) => `${siteUrl}${path}`;
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absolute(localePath(locale, path)),
      changeFrequency: "monthly" as const,
      priority: locale === "pt" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(Object.entries(languageAlternates(path)).map(([k, v]) => [k, absolute(v)])),
      },
    }))
  );
}
