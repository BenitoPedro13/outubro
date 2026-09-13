// Canonical origin for metadata, sitemap, robots and JSON-LD. Falls back to the current
// Vercel deploy until the production domain is pointed
// ([VERIFY: outubroidiomas.com — client-content-request.md item 14]).
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://outubroidiomas.vercel.app").replace(/\/$/, "");
