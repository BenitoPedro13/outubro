import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // i18n (docs/tasks/TASK-brand-alignment.md §2.7): PT is served unprefixed. `/` renders
  // app/[lang] with lang=pt; the /pt URLs redirect to their unprefixed twin so each page
  // has exactly one public URL. Config-level, so no per-request proxy cost; no
  // Accept-Language redirect (the switcher is explicit).
  async rewrites() {
    return [{ source: "/", destination: "/pt" }];
  },
  async redirects() {
    return [
      { source: "/pt", destination: "/", permanent: true },
      // Metadata image routes (/pt/opengraph-image/…) aren't pages: they stay where the
      // generated og:image URL points.
      { source: "/pt/:path((?!opengraph-image).*)", destination: "/:path", permanent: true },
    ];
  },
  experimental: {
    // app/[lang] is a top-level dynamic root segment next to the (preview) root layout —
    // the case Next documents global-not-found for.
    globalNotFound: true,
  },
};

export default nextConfig;
