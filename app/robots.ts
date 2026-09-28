import type { MetadataRoute } from "next";
import { indexable } from "@/lib/indexing";
import { siteUrl } from "@/lib/site-url";

// Crawling stays allowed even while the site is noindex (lib/indexing.ts): a crawler has to
// fetch a page to see its noindex. Blocking it here would let bare URLs get indexed anyway.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/apresentacao" },
    ...(indexable ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
