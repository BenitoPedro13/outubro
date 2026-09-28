import { internalPath, localePath, locales, routeKeys } from "../content/i18n";

// Localized URLs as explicit per-page rules — docs/tasks/TASK-pages-static.md §2.3.
// No catch-all (`/:path*` → `/pt/:path*`): afterFiles rewrites run before dynamic routes, so a
// catch-all would turn Payload's /admin and /api into /pt/admin and 404 them. Every rule here
// has an exact source taken from the `routes` map; nothing outside the map is ever rewritten.
// Relative import: next.config.ts loads this outside the bundler's `@/` alias.

/** First segments a public slug may never start with: Payload, Next internals, the preview root layout, locale prefixes. */
const reserved = new Set(["admin", "api", "_next", "apresentacao", ...locales]);

const pages = routeKeys.flatMap((route) =>
  locales.map((locale) => ({ route, locale, publicPath: localePath(locale, route), internal: internalPath(locale, route) }))
);

// Build-time guard: next.config.ts calls this, so `next dev` and `next build` both refuse to
// start with a slug that would shadow /admin or /api or collide with another page.
export function assertRoutes() {
  const errors: string[] = [];
  const internals = new Set(pages.map((p) => p.internal));
  const seen = new Map<string, string>();
  for (const { route, locale, publicPath, internal } of pages) {
    const where = `routes.${route}.${locale} (${publicPath})`;
    if (route !== "home" && !/^\/[a-z0-9]+(-[a-z0-9]+)*$/.test(publicPath.replace(/^\/(en|es)(?=\/)/, ""))) {
      errors.push(`${where}: one lowercase, hyphenated segment, no trailing slash`);
    }
    const first = (locale === "pt" ? publicPath : publicPath.slice(locale.length + 1)).split("/")[1];
    if (route !== "home" && reserved.has(first)) errors.push(`${where}: "${first}" is reserved`);
    const other = seen.get(publicPath);
    if (other) errors.push(`${where}: same URL as ${other}`);
    seen.set(publicPath, where);
    if (publicPath !== internal && internals.has(publicPath)) errors.push(`${where}: shadows another page's internal path`);
  }
  if (errors.length) throw new Error(`content/i18n.ts routes:\n  ${errors.join("\n  ")}`);
}

/** Public URL → the app/[lang] page that renders it (`/metodo` → `/pt/metodo`, `/en/method` → `/en/metodo`). */
export function localizedRewrites() {
  return pages.filter((p) => p.publicPath !== p.internal).map((p) => ({ source: p.publicPath, destination: p.internal }));
}

/**
 * Internal path → public URL, so each page has exactly one URL. Exact sources: the page's
 * metadata image routes (/pt/metodo/opengraph-image-…) stay where the generated og:image
 * points.
 */
export function localizedRedirects() {
  return pages
    .filter((p) => p.publicPath !== p.internal)
    .map((p) => ({ source: p.internal, destination: p.publicPath, permanent: true }));
}
