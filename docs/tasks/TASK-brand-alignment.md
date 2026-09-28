# TASK-brand-alignment — Brandbook alignment, pricing section, PT/EN/ES

Status: **done** (2026-09-27). The user asked to proceed without a separate alignment round
("pense sobre tudo isso e defina o melhor caminho, pode seguir"). Results in §7.

## 1. Current scenario

Commit `26c8b94` ships the Home (10 of 13 sections, `TASK-home-static.md`). Since then the
client delivered the official **brandbook** (`docs/Outubro Idiomas_brandbook.pdf`, 35 pp.) and
an art folder (`docs/Imagens da Outubro/`). The user also sent a checklist and review notes:

| # | Request (user's words, PT) | What's wrong today |
|---|---|---|
| 1 | "checar as cores" + palette `cfea27-3b6dd8-ff97d2-f96a5a-000000-e7e7e9-fef2e9` | `app/globals.css` uses a hot pink `#F0389C`, coral `#FF5D3E`, off-black `#14120F` and a cream `#FAF9F5` that don't appear in brandbook §2.6 |
| 2 | "Pegar a logo correta" | `components/site/logo.tsx` sets "outubro idiomas" as live Manrope text next to the PNG mark. Brandbook §2.4 says "não reproduza em outra tipografia" |
| 3 | "precisa padronizar a fonte, Source Sans 3" | Manrope everywhere (`lib/fonts.ts`). Brandbook §2.5: "somente as fontes dessa família [Source Sans] devem ser utilizadas" |
| 4 | "Inserir os preços na home", and the client asks whether a pricing section is worth it | Section 10 (Preços) of `architecture.md` §1.1 was planned but waits on Payload, which isn't installed yet |
| 5 | "Internacionalização": "só precisa de PT, EN e ES" | PT only, hardcoded `lang="pt-BR"` |
| 6 | Clicking an anchor leaves a strip of the previous section showing under the header | `[id] { scroll-margin-top: 88px }` **and** Lenis `anchors.offset: -88` both apply, so the offset is counted twice (~88px overshoot, which matches the screenshot) |
| 7 | CTA final repeats "Contrato transparente…", which Diferenciais, the section just before it, already says | `content/home.ts` `ctaFinal.reassurance` |
| 8 | Footer: logo "mais em evidência"; centered "© 2026 Outubro Idiomas. Qualidade e profissionalismo desde 2018." | Small logo; left-aligned "Escola de idiomas online desde 2018." |

## 2. Planned changes

### 2.1 Color tokens: brandbook §2.6, exact

| Token | Old | New | Brandbook name |
|---|---|---|---|
| `--color-lime` | `#CFEA27` | `#CFEA27` | Verde limão |
| `--color-lime-deep` | `#9BB821` | `#C0D921` | "Verde limão contraste" (§2.6 top band) |
| `--color-cobalt` | `#3B6DD8` | `#3B6DD8` | Azul |
| `--color-pink` | `#F0389C` | `#FF97D2` | Rosa |
| `--color-coral` | `#FF5D3E` | `#F96A5A` | Vermelho / Vibrant Coral |
| `--color-ink` | `#14120F` | `#000000` | Preto |
| `--color-bg` | `#FAF9F5` | `#FEF2E9` | Nude / Seashell |
| `--color-border` | `#E7E3D8` | `#E7E7E9` | Alabaster Grey |
| `--color-bg-alt` (card "paper") | `#FFFDF7` | `#FFF9F4` | *derived* tint of Seashell (no new hue) |
| `--color-ink-soft` | `#4A4740` | `#4D4845` | *derived* warm neutral for secondary text |

- **Deliberate deviation from awwwards-v8 anti-pattern #3 (no pure `#000`)**: the client's own
  brandbook specifies `#000000` and the official logo files are drawn in it. The brand system wins
  over a generic taste rule. `#FFF` stays banned: the brandbook has no white.
- **Contrast** (measured, WCAG 2.x): ink/bg 19.09 · ink-soft/bg 8.20 · ink/lime 15.45 ·
  ink/pink 10.61 · ink/coral 7.24 · **paper/cobalt 4.61** (text on cobalt must use paper;
  seashell/cobalt is 4.37 and ink/cobalt is 4.36, both fail for body text) · cobalt/bg 4.37
  (large text or decoration only). Pink and coral are now light, so they are **fills only, never
  text colour** (1.80 / 2.64 on bg).
- `--color-cobalt-deep` is unused and gets removed.

### 2.2 Typography: Source Sans 3

- `lib/fonts.ts`: `Source_Sans_3` via `next/font/google` (self-served at build time, same
  reasoning as before), weights 400/600/700/900. Brandbook §2.5 lists Black, Bold, Semibold,
  Regular, Light and Extralight. The site uses 900 for display, 700 for subheads, 600 for UI
  and 400 for body.
- Token rename `--font-manrope` → `--font-source-sans`. `/apresentacao` inherits it, so the whole
  repo speaks one family ("padronizar").
- **Descender Safety**: re-measure Source Sans 3 "gyjpq" with the canvas technique and update
  `--descender-clearance`.
- Display weight: 800 → 900 (Source Sans Black matches the logo's heavy wordmark better).

### 2.3 Logo: official artwork, vectorised

- The art folder has the official lockups as PNG only (`logo linear.png` horizontal 1600×337,
  `DESENHOS COM O LOGO (4).png` vertical 1700×953, `LOGO OUTUBRO.png` symbol 3240²). Each colour
  layer was **traced to SVG with potrace** (run in the scratchpad, not a project dependency) and
  checked side by side against the source: `public/brand/logo-horizontal.svg`,
  `logo-vertical.svg`, `symbol.svg` plus `-inverse` variants (lime mark + Seashell wordmark: the
  on-black colourway of brandbook §2.3). **Provisional**: replace these with the client's own
  vector files when they arrive (`client-content-request.md` item 7). Tracing is faithful, not
  a redraw.
- Header: horizontal lockup (the layout the user liked, now with the *correct* wordmark
  typography). Footer: vertical lockup, the one brandbook §2.1 marks as preferred, large and
  inverse.
- The symbol replaces the generic `StarBurst` polygon as the decorative sticker/bullet. It is
  rendered with CSS `mask-image` so one file takes any colour token. `components/site/doodles.tsx`
  drops `StarBurst`.

### 2.4 Anchor offset

- `--header-h` (66px mobile, 82px from 1024px) drives `scroll-margin-top`. Lenis `anchors` →
  `true` (no extra offset), so the header height is counted once. Verify in a browser that
  `#idiomas` lands flush at 375 and 1440.

### 2.5 CTA final and footer

- Remove `ctaFinal.reassurance`. Add the megaphone mascot (`LEMBRETE AUMENTO DE VALORES (7).png`,
  trimmed to `public/brand/mascot-megaphone.png`) beside the headline from 768px.
- Footer: vertical inverse logo at ~200px wide as the anchor of the left column; bottom line
  centered and reworded to "© {year} Outubro Idiomas. Qualidade e profissionalismo desde 2018."
  (the user's wording). The footer also gets the language switcher.

### 2.6 Pricing section: yes, on the Home

**Answer to the client**: yes. It was already in the approved structure (`architecture.md` §1.1
item 10). Price is the top objection of a working adult comparing schools, and the brand's voice
is "sincero e transparente" (brandbook, Tom de voz). Hiding the price behind a WhatsApp chat
contradicts the "Contrato transparente" claim one section earlier.

- `components/site/home/precos.tsx`: two cards (Aulas individuais / Aulas em dupla), each listing
  1×/2×/3× por semana → R$/aluno/mês, 2026 figures, CTA per card with a prefilled WhatsApp
  message naming the plan. The clipboard mascot (`DESENHOS COM O LOGO.png` →
  `public/brand/mascot-clipboard.png`) sits beside the heading. The section goes between
  Diferenciais and CTA final. Nav gets "Preços".
- Figures are VERBATIM from the current site capture (`docs/refs/outubroidiomas.com`,
  "Valores 2026"): individual 520 / 935 / 1.400 · dupla 350 / 650 / 950.
- **Deviation, documented and temporary**: the invariant is "pricing lives in Payload". Payload
  isn't installed (`TASK-scaffold.md` needs a provisioned Postgres). The rows therefore live in
  `lib/pricing.ts`, typed exactly like the planned `pricingPlans` collection (`format`,
  `timesPerWeek`, `priceBRL`, `effectiveYear`) behind one `getPricingPlans(year)` function.
  `TASK-home-cms.md` swaps only that function body for a Payload query.
- Currency formatting via `Intl.NumberFormat` per locale (BRL in every locale).

### 2.7 Internationalisation: PT (default), EN, ES

Follows Next 16's bundled guide (`node_modules/next/dist/docs/01-app/02-guides/internationalization.md`):

- `app/[lang]/` becomes the site's root layout (`<html lang>` from `next/root-params`),
  `generateStaticParams` → `pt`, `en`, `es`, `dynamicParams = false`. All three are prerendered.
- **PT stays at `/`** (no `/pt` prefix: the brand is Brazilian and the old domain's PT URLs
  shouldn't move). This uses a `next.config.ts` rewrite `/` → `/pt` plus permanent redirects
  `/pt` → `/` and `/pt/:path*` → `/:path*`, so no duplicate URLs. **No `proxy.ts`**: a config
  rewrite costs nothing per request, and we don't auto-redirect by `Accept-Language` (Google
  advises against forced locale redirects; the switcher is explicit).
- `app/(preview)/layout.tsx` becomes its own root layout (`lang="pt-BR"`). `/apresentacao` is
  a static route and wins over `[lang]`.
- `app/global-not-found.tsx` (+ `experimental.globalNotFound`) is the documented 404 for
  top-level dynamic root segments.
- Dictionaries: `content/home/{pt,en,es}.ts` (typed: `en`/`es` must satisfy `typeof pt`'s shape),
  loaded by `content/dictionaries.ts` `getDictionary()`, which reads `lang` from
  `next/root-params`. Sections read their own slice; no prop drilling of `lang`.
- SEO per locale: unique title/description, `alternates.canonical`, `alternates.languages`
  (`pt-BR`, `en`, `es`, `x-default` → `/`), `openGraph.locale`, per-locale OG image, sitemap
  entries with `alternates.languages`.
- Language switcher: three plain links (`PT · EN · ES`, `hreflang`, `aria-current`) in the
  header from 640px and in the footer at every width. No dropdown widget.
- **EN/ES copy is Claude's translation** of the PT source, keeping the brand's informal tone. Tag
  `[CONTENT: tradução — revisão nativa pendente]`. Added to `client-content-request.md`, together
  with the audience question: who is the EN/ES visitor? The site sells to Brazilian workers.

### 2.8 Brand graphic elements (brandbook §2.11)

- Hero: a phonetic annotation under the highlighted word (`/ˈlĩ.ɡwɐ/` in PT, `/ˈlæŋ.ɡwɪdʒ/` in EN,
  `/iˈðjo.ma/` in ES) with a small cobalt arrow. Brandbook §2.11: "os fonemas realçados formam a
  base sólida para dominar a pronúncia"; the client's own posts do this ("/is.tu.'dẽ.tʃis/").
  It is set in Source Sans, not a handwriting font (§2.5 allows no other family).

## 3. Why

The brandbook is the client's authority on identity. Everything above is either a direct
brandbook rule (colours, family, logo integrity, graphic elements) or a direct user request
(anchors, CTA duplicate, footer, pricing, locales). Pricing and i18n reuse structure the
architecture already approved; they don't change it.

Alternatives rejected:
- **Keep the logo as live text in Source Sans**: violates brandbook §2.4 ("não reproduza em
  outra tipografia").
- **Ship PNG logos via next/image**: soft at 2× in the footer, one file per colour. The traced
  SVG is crisp and small (≈10 KB gzip for the horizontal lockup).
- **`proxy.ts` locale negotiation**: per-request cost, and forced redirects are an SEO
  anti-pattern.
- **next-intl**: a dependency for three static dictionaries is not needed (restraint rule).
- **Tabs (Individual | Dupla) for pricing**: an interactive widget that hides half the table.
  Two cards show all six prices at once, with zero JS.

## 4. Affected files

| Path | Change | Notes |
|---|---|---|
| `app/globals.css` | edit | tokens §2.1, font token, `--header-h`, `.brand-symbol`, display weight, descender |
| `lib/fonts.ts` | edit | Source Sans 3 |
| `app/layout.tsx` | removal | replaced by `app/[lang]/layout.tsx` |
| `app/(site)/*` | removal → `app/[lang]/*` | layout, page, opengraph-image |
| `app/[lang]/layout.tsx`, `page.tsx`, `opengraph-image.tsx` | new | i18n root layout |
| `app/(preview)/layout.tsx` | edit | now a root layout (`html`/`body`, font, css) |
| `app/global-not-found.tsx` | new | 404 |
| `app/sitemap.ts` | edit | 3 locales + alternates |
| `next.config.ts` | edit | rewrite/redirects, `globalNotFound` |
| `content/home.ts` | removal → `content/home/{pt,en,es}.ts` | dictionaries |
| `content/dictionaries.ts`, `content/i18n.ts` | new | `getDictionary`, locales |
| `lib/pricing.ts` | new | Payload-shaped pricing rows |
| `components/site/logo.tsx` | edit | official SVG lockups |
| `components/site/brand-symbol.tsx` | new | mask-image symbol |
| `components/site/doodles.tsx` | removal | `StarBurst` moved to `components/doc/`; `StickyNote`/`ChatBubble` were unused |
| `components/site/language-switcher.tsx` | new | |
| `components/site/{header,footer,cta-link,mobile-cta-bar,section-heading}.tsx` | edit | dictionary text, footer redesign |
| `components/site/home/*.tsx` | edit | dictionary text, symbol, hero phonetic |
| `components/site/home/precos.tsx` | new | pricing |
| `components/motion/smooth-scroll.tsx` | edit | Lenis anchor offset |
| `public/brand/*.svg`, `mascot-*.png` | new | traced logos, trimmed mascots |
| `docs/*.md`, `CLAUDE.md`, `README.md` | edit | §3 of CLAUDE.md |

## 5. Verification

- `pnpm lint` and `pnpm build` pass. Build output lists `/pt`, `/en`, `/es` as prerendered (●/SSG).
- `/` serves PT (`<html lang="pt-BR">`), `/en` `lang="en"`, `/es` `lang="es"`; `/pt` 308 → `/`;
  `/xyz` → 404; `/apresentacao` still renders.
- Every page's `<head>` has a unique title and description, a canonical, and hreflang for
  pt-BR/en/es/x-default.
- `grep -rn "#[0-9a-fA-F]\{6\}" components app --include=*.tsx` only matches the documented
  Satori OG literals.
- Browser at 375 / 768 / 1440: clicking each nav anchor puts the target section's top border flush
  under the header (0 ± 2px, measured with `getBoundingClientRect`); the header logo is the
  official lockup; no horizontal scroll; the pricing cards show all six prices.
- `grep -rn "Manrope\|manrope" app components lib` → none.

## 6. Out of scope

- Installing Payload (`TASK-scaffold.md`). Pricing moves there in `TASK-home-cms.md`.
- 2027 prices and the "entenda o reajuste" text: the client hasn't confirmed which year to show
  (content request item 2). The data model already carries `effectiveYear`.
- Brandbook §2.2 illustrations (capybara, parrot, chairs…): the brandbook shows them, but no
  files were delivered. Requested from the client.
- Final EN/ES copy review and the EN/ES audience question (added to the content request).
- `/apresentacao`'s written content (a dated record of what was approved). It only picks up the
  new tokens and font.

## 7. Results (2026-09-27)

- `pnpm lint` clean; `pnpm build` prerenders `/pt`, `/en`, `/es` (SSG), `/apresentacao`, sitemap,
  robots, per-locale OG images.
- Routing (prod server): `/` 200 `lang="pt-BR"`, `/en` 200 `lang="en"`, `/es` 200 `lang="es"`,
  `/pt` → 308 `/`, `/pt/foo` → 308 `/foo`, `/xyz` → 404 (global-not-found), `/apresentacao` 200.
  Each locale has its own title, description, canonical, og:locale, og:image and hreflang
  pt-BR/en/es/x-default.
- Anchors (CDP, real nav clicks through Lenis): section top − header bottom = **0-1px** for
  `#metodo`, `#idiomas`, `#como-funciona`, `#precos` at 1440 in all three locales. At 375/768
  (where the nav is hidden), direct `/en#precos`-style links and `scrollIntoView` also land at 0px.
  Root cause confirmed in Lenis's source (`scrollTo` subtracts the target's
  `scroll-margin-top`), so the old `offset: -88` counted the header twice.
- `scrollWidth − innerWidth` = 0 at 375/768/1440 in every locale.
- Descender clearance re-measured: 0.27em (see visual-identity-spec.md §3).
- Deviations from the plan: the font loads as the **variable** file with no `weight` list,
  because static weights made Turbopack dev fail with "next/font/google queries have exactly one
  entry". `latin-ext` was added for the IPA glyphs. `.brand-symbol` lives in `@layer components`
  so `hidden`/`sm:block` utilities win. Nav swaps "Pilares" for "Preços" (four items keep the
  1024px header from crowding once the language links sit beside the CTA). `StarBurst` moved to
  `components/doc/` for `/apresentacao` rather than being deleted.
- `public/brand/logo-verde.png` removed (unused). `logo-azul.png` stays for the JSON-LD
  `Organization.logo`, which needs a raster.

### Follow-up from the user's review (2026-09-27)

- **Idiomas cards, "hovering card 2 moves card 1"**: a controlled CDP test showed card 1 does
  *not* move when the pointer enters card 2 directly, and hover never ping-pongs on the seam. The
  movement was the card the pointer had just crossed returning with `--ease-back`, which
  overshoots past its tilt and springs back. The return now uses ease-out (lift stays springy), and
  the leaving card keeps `z-index: 5` until the return ends (explicit `z-index: 0` at rest, since
  `5 → auto` can't transition). Measured: card 1 eases monotonically 0° → −4° in ~200ms, no
  overshoot, z 5 → 0 on landing.
- **Como funciona cut corner**: a `clip-path` "folded note" corner that sliced the border and
  shadow with no fold drawn, so it read as a glitch. It isn't in the brandbook either. Removed;
  the cards now have a full border and shadow.

## 8. Pre-launch noindex switch (2026-09-27, user: "add no index and push")

The site deploys publicly to `outubroidiomas.vercel.app` for client review while content is
still draft, so indexing is **off unless `SITE_INDEXABLE=true`** (`lib/indexing.ts`, read at
build time):
- `app/[lang]/layout.tsx` → `<meta name="robots" content="noindex, nofollow">` on every page.
- `next.config.ts` → `X-Robots-Tag: noindex, nofollow` on every response (covers OG images).
- `app/robots.ts` keeps crawling **allowed**, because a crawler must fetch a page to see its
  noindex. The sitemap line is only advertised when indexable.
- Verified against `next start`: default → header + meta on `/`, `/en`, OG image, no sitemap in
  robots.txt. `SITE_INDEXABLE=true` → neither, and the sitemap is listed.
- **Launch step**: set `SITE_INDEXABLE=true` in the Vercel project (Production) and redeploy.
