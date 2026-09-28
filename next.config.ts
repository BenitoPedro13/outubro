import type { NextConfig } from "next";
import { indexable } from "./lib/indexing";
import { assertRoutes, localizedRedirects, localizedRewrites } from "./lib/localized-routes";

assertRoutes();

const nextConfig: NextConfig = {
  // i18n (docs/tasks/TASK-pages-static.md §2.3): one explicit rewrite per page and locale from
  // the `routes` map in content/i18n.ts (`/` → `/pt`, `/metodo` → `/pt/metodo`, `/en/method` →
  // `/en/metodo`), and the internal paths redirect to their public twin so each page has one
  // URL. Never a catch-all: /admin and /api must reach Payload untouched. Config-level, so no
  // per-request proxy cost; no Accept-Language redirect (the switcher is explicit).
  async rewrites() {
    return localizedRewrites();
  },
  // Belt-and-braces with the <meta name="robots"> in app/[lang]/layout.tsx: the header also
  // covers non-HTML responses (OG images, sitemap). Dropped once SITE_INDEXABLE=true.
  async headers() {
    return indexable ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  async redirects() {
    return localizedRedirects();
  },
  experimental: {
    // app/[lang] is a top-level dynamic root segment next to the (preview) root layout —
    // the case Next documents global-not-found for.
    globalNotFound: true,
  },
};

export default nextConfig;
