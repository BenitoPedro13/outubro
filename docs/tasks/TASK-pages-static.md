# TASK-pages-static — every page built first, the CMS plugged in afterwards

Status: **proposed 2026-09-28, awaiting alignment.** Supersedes the narrower "pages that need no
CMS" scope in `roadmap.md` step 3. User direction 2026-09-28: build all pages first, apply the
CMS on them afterwards, and "find a workaround so [`/admin`] doesn't break".

## 1. Current scenario

As of `886f3aa`:

- Only the Home exists (`app/[lang]/page.tsx`, PT at `/`, EN at `/en`, ES at `/es`), with 11 of
  13 sections. Depoimentos and FAQ are missing because the plan was to build them straight from
  Payload (`roadmap.md` step 2).
- None of the supporting routes in `architecture.md` §1 exist: `/precos`, `/metodo`,
  `/depoimentos`, `/faq`, `/trabalhe-conosco`, `/contato`, `/politica-de-privacidade`.
- Payload/Postgres/Blob are not installed. Neon `outubro-db` and Blob `outubro-media` are
  provisioned and their env vars pulled (`roadmap.md` step 1).
- The pattern this task generalizes already exists once: `lib/pricing.ts` holds rows typed
  exactly like the future `pricingPlans` collection, behind `getPricingPlans()`. Only that
  function's body changes when Payload lands.
- Routing: `next.config.ts` rewrites only `/` → `/pt`; `/pt/*` redirects to the unprefixed URL.
  `app/[lang]/layout.tsx` sets `dynamicParams = false`. Two root layouts today: `app/[lang]`
  and `app/(preview)`, plus `app/global-not-found.tsx`.
- Header: Home anchors only (`#metodo`…), hidden below 1024px; no phone nav
  (`components/site/header.tsx`).

## 2. Planned changes

### 2.1 The data contract: one function per collection, Payload-shaped

Every piece of content that will live in Payload is read through **one async function in
`lib/`**, returning **the exact shape the collection will return** for one locale. Components
never import a content file for CMS-bound data.

| Function | File | Future collection | Stand-in source now |
|---|---|---|---|
| `getPricingPlans(year)` | `lib/pricing.ts` | `pricingPlans` | exists, unchanged |
| `getFaqs({ locale, featured? })` | `lib/faqs.ts` | `faqs` | typed array in the same file |
| `getTestimonials({ locale, featured? })` | `lib/testimonials.ts` | `testimonials` | typed array in the same file |

Shapes, fixed now so the CMS task doesn't redesign them:

- **`Faq`**: `id`, `question` (string, localized), `answer` (**plain text paragraphs**,
  localized: `string[]`), `category` (`"aulas" | "pagamento" | "reposicao" | "cancelamento"`),
  `order` (number), `featured` (boolean: shown on the Home).
  Plain text, not Lexical rich text: the answers are short policy statements, plain text keeps
  `FAQPage` JSON-LD a straight copy, and a textarea is simpler for the client to edit. The
  Payload field becomes `textarea`, split on blank lines. *Rejected:* rich text, which would
  force a Lexical-to-JSON-LD serializer for no editorial gain today.
- **`Testimonial`**: `id`, `studentName`, `language` (`"ingles" | "frances" | "espanhol" |
  "alemao"`), `quote` (localized), `consent` (boolean), `placeholder` (boolean), `featured`
  (boolean), `order`. `getTestimonials` **never returns an entry with `consent: false`**.
  `placeholder: true` renders the card with a visible "exemplo" marker. Seeded with the 3 openly
  placeholder entries from `roadmap.md`'s content policy, never invented quotes.
- Localized fields are resolved **inside** the function (it takes `locale`, returns strings),
  matching what Payload's Local API returns with `locale` set. Components never see
  `{ pt, en, es }` objects.

These files carry the same `TEMPORARY HOME` header comment as `lib/pricing.ts`. The CMS task
replaces the function bodies only.

### 2.2 Pages

All under `app/[lang]/`, each with its own `generateMetadata` (title, description, canonical,
hreflang via `languageAlternates`, OG image) and a `sitemap.ts` entry.

| Page | Content | Data |
|---|---|---|
| Home: **Depoimentos** section | curated subset, placeholder cards visible | `getTestimonials({ featured: true })` |
| Home: **FAQ** section | 5-6 curated, accordion (shadcn Accordion via its CLI, Radix) + `FAQPage` JSON-LD | `getFaqs({ featured: true })` |
| `/precos` | full 2026 table + 2027 comparison + "entenda o reajuste" | `getPricingPlans` |
| `/metodo` | essence, three pillars in depth, Communicative Approach, how classes run | dictionary (brandbook words) |
| `/depoimentos` | full list | `getTestimonials` |
| `/faq` | full list grouped by category, `FAQPage` JSON-LD | `getFaqs` |
| `/contato` | WhatsApp (primary), Instagram, email if the client has one. No form | `content/site.ts` |
| `/trabalhe-conosco` | intro + what we look for + how to apply. **The form itself stays in `TASK-careers-form`** (it must persist to Payload *and* email, never email-only), so this page ships with the intro only until then | dictionary |
| `/politica-de-privacidade` | draft, flagged "needs legal review" | dictionary |

Page copy that isn't CMS-bound goes in the per-locale dictionaries, split per page
(`content/pages/{metodo,contato,...}/{pt,en,es}.ts`) so the Home dictionary doesn't grow into one
file. Every drafted string gets the `[CONTENT]` tag and an entry in `client-content-request.md`.

### 2.3 Localized URLs: an allowlist slug map (this is the `/admin` fix)

**The break we'd otherwise ship.** Localized PT URLs need `/metodo` → `/pt/metodo`. The obvious
way is a catch-all rewrite `/:path*` → `/pt/:path*`. Per Next's own rewrite docs
(`node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/rewrites.md`),
`afterFiles` rewrites (the default) run **before dynamic routes** are matched. Payload's routes
are dynamic (`app/(payload)/admin/[[...segments]]`, `app/(payload)/api/[...slug]`), so the
catch-all would turn `/admin` into `/pt/admin`, which hits `[lang]` with no page and returns 404.
The admin and Payload's REST API would both break.

**The fix: no catch-all rewrite, ever.** A slug map in `content/i18n.ts` lists every page once:

```ts
export const routes = {
  precos:   { pt: "/precos",   en: "/pricing",      es: "/precios" },
  metodo:   { pt: "/metodo",   en: "/method",       es: "/metodo" },
  // …one entry per page
} as const;
```

`next.config.ts` generates **one explicit rewrite per (page, locale)** from it
(`/metodo` → `/pt/metodo`, `/en/method` → `/en/metodo`), plus the matching `/pt/...` redirects.
Anything not in the map (`/admin`, `/api/*`, `/_next/*`, files in `public/`) is never rewritten.
`localePath()`, `languageAlternates()`, the language switcher and the sitemap all read the same
map, so a URL exists in exactly one place.

A build-time guard in the same file: a unit-style assertion (run by `pnpm lint` via a tiny
`scripts/check-routes.ts`, or a top-level throw in `next.config.ts`; picked at implementation)
fails if any localized slug's first segment is `admin`, `api`, `pt`, `en` or `es`.

**The other ways `/admin` could break, and why they don't:**

- *Root layouts.* `app/(payload)/layout.tsx` becomes a third root layout (Payload's own
  `RootLayout` renders `<html>`). Next supports several root layouts; `app/(preview)` already
  proves it in this repo. Navigating between root layouts is a full page load, so the site's
  `globals.css` (Tailwind preflight) never reaches the admin.
- *Segment matching.* `admin` and `api` are static first segments, and static beats `[lang]`.
  `[lang]` keeps `dynamicParams = false`.
- *`global-not-found.tsx`.* Only renders for URLs no route matches; `/admin/*` is matched.
- *`X-Robots-Tag: noindex` header.* Applies to `/admin` too, which is what we want (and stays
  wanted after launch: the launch task scopes the header to `/admin` and `/api` instead of
  dropping it).
- *`withPayload(nextConfig)`.* Wraps our config. `[VERIFY: at install, confirm withPayload
  preserves our rewrites/redirects/headers — build, then curl /admin, /api/users, /metodo,
  /en/method]`.
- *Fallback if something still collides:* Payload's config lets the admin and API move
  (`routes.admin`, `routes.api`, `[VERIFY: exact option names in current Payload docs]`), e.g.
  to `/painel`. Not planned, just the escape hatch.

**Spike to prove it before the CMS task, not after.** Once this task's routing lands, a
throwaway branch installs Payload per its manual-install docs against the Neon `outubro-db`
development branch and checks: `/admin` loads, `/api/users` answers, every localized page still
returns 200 in all three locales, `/pt/metodo` still redirects. The branch is discarded; the
findings go into `TASK-scaffold.md`. This keeps the one risky integration from landing right
before launch.

### 2.4 Navigation and icons (carried from `roadmap.md` step 3)

- Header links to real pages (anchors only when already on the Home); footer gets a sitemap
  column; phones get a menu on shadcn **Sheet** (Radix Dialog) via its CLI, not a hand-rolled
  toggle. The mobile CTA bar stays.
- `app/icon.svg` from the traced symbol + `apple-icon.png` + `app/manifest.ts`, replacing the
  38 KB `app/icon.png`.

### 2.5 What the CMS task then does (for the record, not this task)

`TASK-cms` (merging the old `home-cms` and `pages-cms`): install Payload, create the collections
**from the types in §2.1**, seed them once from the stand-in arrays, swap the three function
bodies for Local API queries, add `afterChange` revalidation for every route that reads the
collection in all three locales, delete the stand-in arrays.

## 3. Why

- The remaining work is mostly layout and copy. Building it now lets the client review whole
  pages on the preview while Payload is set up separately.
- The contract in §2.1 is what makes "CMS later" cheap. Without it, plugging in the CMS means
  rewriting components. With it, it means changing three function bodies.
- The allowlist rewrite removes the one concrete way the pages-first order would break
  `/admin`, and the spike proves it before the CMS task depends on it.

## 4. Affected files

| Path | Change | Notes |
|---|---|---|
| `lib/faqs.ts`, `lib/testimonials.ts` | new | stand-in data + `getFaqs` / `getTestimonials` |
| `lib/pricing.ts` | edit | 2027 rows for `/precos` |
| `content/i18n.ts` | edit | `routes` slug map; `localePath` takes a route key |
| `next.config.ts` | edit | per-route rewrites/redirects generated from the map |
| `scripts/check-routes.ts` (or inline) | new | reserved-segment guard |
| `app/[lang]/{precos,metodo,depoimentos,faq,contato,trabalhe-conosco,politica-de-privacidade}/page.tsx` | new | one per page, with `generateMetadata` |
| `app/[lang]/.../opengraph-image.tsx` | new | per page |
| `app/[lang]/page.tsx`, `components/site/home/*` | edit | Depoimentos + FAQ sections |
| `components/site/{header,footer}.tsx`, `components/site/mobile-nav.tsx` | edit/new | multi-page nav |
| `components/ui/{accordion,sheet}.tsx` | new | shadcn CLI, vendored |
| `content/pages/**` | new | per-page dictionaries, PT/EN/ES |
| `app/sitemap.ts` | edit | every page from the slug map |
| `app/icon.svg`, `app/apple-icon.png`, `app/manifest.ts` | new | `app/icon.png` removed |
| `docs/client-content-request.md` | edit | every new `[CONTENT]` string |
| `docs/roadmap.md`, `CLAUDE.md`, `docs/architecture.md` §1 | edit | new order, stand-in exception, localized URLs |

## 5. Verification

- `pnpm build` and `pnpm lint` pass.
- Every route in the slug map returns 200 at its PT, EN and ES URL; each `/pt/...` URL 301s to
  its unprefixed twin; an unknown path returns the global 404.
- `/admin` and `/api/anything` are **not** rewritten: before Payload exists they return the
  global 404 (not a `[lang]` page, not a redirect to `/pt/...`). Checked with `curl -I`.
- The route guard fails the build when a slug starting with `admin` is added (tried once, then
  reverted).
- Every page has a unique `<title>`, meta description, canonical, full hreflang set (pt-BR, en,
  es, x-default) and an OG image; `sitemap.xml` lists every page × 3 locales.
- No component imports `lib/faqs.ts`/`lib/testimonials.ts` data arrays directly (grep: only the
  `get*` functions are exported).
- No testimonial with `consent: false` renders; placeholder cards show the "exemplo" marker.
- `FAQPage` JSON-LD validates (Rich Results Test or schema.org validator) on `/faq` and the Home.
- 375 / 768 / 1440px: no horizontal scroll; phone menu opens, traps focus, closes on Escape and
  returns focus to its trigger; keyboard-only pass through every page; reduced-motion respected.
- The spike (§2.3) is recorded in `TASK-scaffold.md` with the curl results.

## 6. Explicitly out of scope

- Installing Payload for real, collections, migrations, revalidation (`TASK-cms`). The spike is
  thrown away.
- The careers form (`TASK-careers-form`): persistence + email, needs Payload and an email
  provider.
- Real testimonials, final prices, native EN/ES review: client content pass
  (`client-content-request.md`).
- `/blog` (`research.md` §6 Q2 still open).
- `teamMembers` and teacher photos (no consent yet).
