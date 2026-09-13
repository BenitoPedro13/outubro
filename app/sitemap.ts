import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// Real routes only — each supporting page's own task adds its entry
// (architecture.md §1). /apresentacao is a noindex preview and never listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
