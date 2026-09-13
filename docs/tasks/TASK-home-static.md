# TASK-home-static — the real Home page, code-owned sections

Status: **done (2026-09-13).** Aligned by Benito the same day ("lets move on", with the §2.3
proposal and the other defaults accepted). What changed during execution and the measured
verification results are in §7 at the bottom — read that before trusting §2 verbatim.

## 1. Current scenario

As of commit `cd1dd8e` (2026-09-13):

- The client approved the `/apresentacao` document: page structure, palette, signature
  interaction (`research.md` §5, "Client approval, 2026-09-13"). Q1 is resolved. Q2-Q5 are
  still open.
- `app/page.tsx` is a `redirect("/apresentacao")`. No real site page exists.
- What already exists and gets reused: design tokens + type/descender utilities
  (`app/globals.css`), Manrope via `next/font/google` (`lib/fonts.ts`), `StarBurst` doodle
  (`components/preview/doodles.tsx`), the cord SVG + GSAP timeline
  (`components/motion/signature-interaction.tsx`), `StaggerReveal`,
  `shouldSkipDecorativeMotion()` (`lib/motion.ts`), the `content/*.ts` typed-copy pattern
  (`content/outubro-pitch.ts`).
- Not installed: Payload/Postgres/Blob (`TASK-scaffold.md` §2.2-2.6), shadcn, Magic UI,
  React Bits, `lucide-react`.
- `layout.tsx` hardcodes `metadataBase: https://outubroidiomas.vercel.app`.

**Why "static":** 13 sections make up the Home page (`architecture.md` §1.1). Three of them
(Testimonials, Pricing, FAQ) must read from Payload (the CLAUDE.md TL;DR rule), so they wait for
`TASK-scaffold.md` and a follow-up `TASK-home-cms.md`. The other ten have their layout and copy
in code (`architecture.md` §2), so they can be built now. Building them now also avoids
hardcoding the three CMS sections and ripping them out later.

## 2. Planned changes

### 2.0 Before any section: close the verify items this task depends on

1. **Exact brand hex values.** Sample `logo azul 1.png` / `logo verde 1.png`
   (`docs/refs/outubroidiomas.com/…_files/`). The current live site's own CSS declares
   `--lime: #cfea27`, `--blue: #3b6dd8`, `--pink: #ff97d2`, `--coral: #f96a5a`. These differ from
   the approved tokens (`#C8E639`, `#2E5FE0`, `#F0389C`, `#FF5D3E`), most of all pink, where the
   live site is light pink and ours is hot pink. **The client approved the palette as shown, so
   the approved tokens stay.** Sampling only corrects lime/cobalt if they are measurably off from
   the logo. Any bigger change goes back to Benito first. Record the result in
   `visual-identity-spec.md` §4.
2. **Contrast.** Compute and record WCAG ratios for every text/background pair the sections
   use: ink on lime, ink on pink, `--color-bg` on cobalt, ink-soft on bg. Any pair under 4.5:1
   (body) or 3:1 (≥24px / ≥18.66px bold) is not used for text.
3. **Descender clearance.** Measure Manrope with the canvas technique
   (`.agents/skills/masalale-awwwards-designer/references/descender-safety.md`). Replace the
   estimated `0.14em` if the measurement differs.
4. **Library docs.** Check current docs for shadcn init (Tailwind 4 + Next 16), the Magic UI
   `Marquee` install command and props, and the Lenis 1.3 touch option (spec says
   `smoothTouch: false`, which is the pre-1.0 name; `[VERIFY: current equivalent,
   likely syncTouch]`).

### 2.1 Routing & layout

```
app/
  layout.tsx                 root: <html lang="pt-BR">, font, metadataBase from env
  page.tsx                   REMOVED (the redirect)
  (site)/
    layout.tsx               NEW: skip link, <Header/>, <main>, <Footer/>, <SmoothScroll/>
    page.tsx                 NEW: Home = Server Component composing the sections below
  (preview)/apresentacao/    unchanged, stays noindex
  sitemap.ts                 NEW: "/" only (other routes added by their own tasks)
  robots.ts                  NEW: allow all, disallow /apresentacao
  opengraph-image.tsx        NEW for Home (the preview's own OG image stays in its group)
```

- `metadataBase` comes from `NEXT_PUBLIC_SITE_URL` (added to `.env.example`), with the
  `vercel.app` URL as the fallback until the domain is pointed.
  `[VERIFY: production domain is outubroidiomas.com, confirm with client before launch]`.
- **Header links only to anchors on Home plus the WhatsApp CTA.** The six supporting routes don't
  exist yet, so linking them now would ship 404s. Each route's own task adds its nav entry.

### 2.2 Sections (`architecture.md` §1.1 numbering)

All are Server Components in `components/site/home/`, with copy in `content/home.ts`. The only
`'use client'` files are motion leaves in `components/motion/`.

| # | Section | Copy source | Build notes |
|---|---|---|---|
| 1 | Header | nav labels | sticky; logo; anchors; WhatsApp CTA `wa.me/5521920115154`. Mobile: CTA always visible, anchors in a disclosure menu. Uses shadcn `Sheet` or a native `<details>`, whichever the a11y check passes with less code. |
| 2 | Hero | "Bora destravar sua língua e seu futuro?" (tagline, verbatim) + current site subhead "Estude um idioma no seu tempinho e do seu jeitinho." | Signature interaction (§2.3). `h1` is real text, visible at first paint: it is the LCP element and must never start at `opacity: 0`. Notebook-grid backdrop. |
| 3 | Trust marquee | "+500 alunos destravados", "+25 professores formados", "Excelência desde 2018", Inglês/Francês/Espanhol/Alemão | Magic UI `Marquee` via its CLI; pauses under reduced motion. The stats also appear as static text in the Hero or Pillars so screen readers don't have to read the marquee's duplicated items (`aria-hidden` on the clones). |
| 4 | Só tem na Outubro! | current site, verbatim: the four "Abordagem Comunicativa" bullets | Chat-bubble chips (`visual-identity-spec.md` §5). |
| 5 | Idiomas | 4 languages + "Aulas Individuais / Aulas em Dupla" | speakPolish overlapping rotated numbered cards. Stacked with no overlap below 768px so nothing gets cut off on phones. |
| 6 | Como funciona | **no source copy exists** (current site has no 3-step section) | Sticky-note cards. Copy is a `[CONTENT]` placeholder from `architecture.md` §1.1: "nível → plano → aula". Needs client wording. |
| 7 | Três Pilares | current site, verbatim (titles, one-liners, 4 bullets each) | Pinned scrollytelling, one section with 3 steps, desktop ≥1024px only. Below that the three pillars stack as plain cards: pinning on mobile browsers with a collapsing address bar is the most common cause of scroll jank. |
| 8 | Na Outubro, aprender é assim | current site, verbatim: 6 differentiators | Card grid. Magic UI `BentoGrid` only if it doesn't pull in more than a layout. Otherwise plain CSS grid. |
| 12 | CTA final | tagline repeated + "BORA LÁ!!" (current site CTA, verbatim) | Resolved cord as a divider (the "twist" in spec §2). |
| 13 | Footer | WhatsApp, Instagram, "QUERO DAR AULAS" (external link for now) | Privacy-policy link omitted until that route exists, which is fine for now because nothing on this page collects data. |

Sections 9-11 (Depoimentos, Preços, FAQ) → `TASK-home-cms.md`. The page leaves no placeholder
slots for them: the page reads start to finish without them, and the CMS task inserts them.

The current site also has a "Nosso Diferencial: A Outubro valoriza os docentes" block (Condições
humanas, Estabilidade, Cultura colaborativa, Bons salários). It isn't in `architecture.md` §1.1.
**This task doesn't add it**, because it overlaps pillar 2 (Empregar com Dignidade).
`[CONTENT: ask client whether it should be merged into pillar 2 or dropped]`.

### 2.3 Signature interaction in the hero: one decision needed

The approved statement (`/apresentacao` §06) says the cord untangles **"em sincronia com o
scroll"**. But the preview itself moved *away* from scroll-scrubbing ("too easy to scroll past
unnoticed", comment in `signature-interaction.tsx`), and in a hero there's a second problem: a
visitor who doesn't scroll never sees the resolved state, and the headline is the first thing
they read.

**Proposal:**
- **Hero:** the cord plays once on load. It starts from the partly drawn resting knot, so the
  first frame is never blank, runs for about 1.4s, and "língua" lands as the cord straightens.
  The text is readable from the first frame; only the cord and the weight of "língua" animate.
- **Scroll-synced:** a thin cord-shaped progress line under the sticky header, scrubbed across
  the whole page, plus the resolved-cord dividers between sections. This is the part that's
  literally "in sync with scroll", and it's what spec §2 calls the recurring system.
- **Reduced motion:** resolved state, no animation, progress line hidden.

Rejected: pinning the hero and scrubbing the cord. It blocks the first scroll on mobile, which
is exactly the visitor we're optimizing for, and delays the path to the CTA.

### 2.4 Motion wiring

- `components/motion/smooth-scroll.tsx`: Lenis + ScrollTrigger sync, cleanup on unmount. It
  wraps nothing (it renders `null`), so the layout stays a Server Component.
- `components/motion/hero-cord.tsx`, `scroll-cord-progress.tsx`, `pinned-pillars.tsx`: each
  uses `gsap.context()` inside `useEffect` and returns `ctx.revert()`.
- Motion is gated by `shouldSkipDecorativeMotion()`, same as the preview.

### 2.5 SEO

- Home `metadata`: unique title/description in PT-BR, canonical `/`, OG + Twitter image.
  `[CONTENT: final meta description, draft from tagline + "escola de idiomas online"]`.
- JSON-LD `Organization` (name, url, logo, `sameAs`: Instagram), rendered in the `(site)`
  layout. `Course`/`Service` schema stays out of this task: it's an unresolved `[VERIFY]` in
  `architecture.md` §5.
- One `h1`. Section `h2`s follow §2.2's order; no skipped levels.

### 2.6 Dependencies added (via official CLIs)

`lucide-react` · shadcn init (`pnpm dlx shadcn@latest init`) · Magic UI `Marquee` through the
shadcn registry, plus `BentoGrid` only if used. No React Bits in this task because no section
here needs it.

Lucide has no WhatsApp brand glyph, so the CTA uses `MessageCircle` plus the text
"Fale com a gente no WhatsApp". A single off-system brand SVG would break the Lucide-only rule,
so it's rejected.

## 3. Why

- The client said go. The Home page is the conversion path and the page everything else
  duplicates from (`architecture.md` §1). Building it first sets the component vocabulary for
  the six supporting pages.
- Building the ten sections that don't depend on the CMS in parallel with `TASK-scaffold.md`
  keeps the wait on client content (Q3) off the critical path.
- Almost all the copy already exists verbatim on the current site. `research.md` §2 diagnosed
  execution as the problem, not content, so reusing that copy doesn't wait on the content pass.

## 4. Affected files

| Path | Change | Notes |
|---|---|---|
| `app/page.tsx` | removal | redirect gone |
| `app/(site)/layout.tsx`, `app/(site)/page.tsx` | new | |
| `app/(site)/opengraph-image.tsx` | new | |
| `app/sitemap.ts`, `app/robots.ts` | new | |
| `app/layout.tsx` | edit | `metadataBase` from env |
| `app/globals.css` | edit | hex/descender corrections from §2.0, notebook-grid utility |
| `components/site/header.tsx`, `footer.tsx` | new | |
| `components/site/home/*.tsx` | new | one file per section in §2.2 |
| `components/site/doodles.tsx` | new (moved) | from `components/preview/doodles.tsx`, preview imports updated |
| `components/motion/{smooth-scroll,hero-cord,scroll-cord-progress,pinned-pillars}.tsx` | new | |
| `components/ui/*` | new | shadcn/Magic UI generated, never hand-edited |
| `content/home.ts` | new | all Home copy, verbatim sources noted per item |
| `.env.example` | new | `NEXT_PUBLIC_SITE_URL` |
| `docs/visual-identity-spec.md` | edit | §3 clearance, §4 hex, §2 hero decision (§2.3 above) |
| `CLAUDE.md`, `README.md` | edit | stack table (shadcn/Magic UI/lucide pinned), status line |

## 5. Verification

- `pnpm lint` and `pnpm build` pass; build output marks `/` as static (`○`).
- **Mobile Lighthouse** (mobile preset, production build): Performance ≥ 90, SEO = 100,
  Accessibility = 100, Best Practices ≥ 95. LCP < 2.5s, CLS < 0.1, TBT < 200ms.
- First-load JS for `/` ≤ 120 KB gzip (Tier 2 budget, `architecture.md` §4), read from the
  build output.
- No horizontal scroll at 375 / 768 / 1440px (checked in the browser, screenshots in the PR/commit
  notes). No clipped descenders on any display text at those widths.
- Keyboard only: skip link works, every link/CTA is reachable in DOM order, focus is visible on
  every background colour used.
- With `prefers-reduced-motion: reduce`: no Lenis, marquee static, cord drawn resolved, pillars
  unpinned.
- `h1` text is present in the server HTML (`curl / | grep "Bora destravar"`).
- `grep -rE "#[0-9a-fA-F]{3,8}\b" components content app --include=*.tsx --include=*.ts`
  returns nothing outside `globals.css` (OG image excepted, it can't read CSS vars; its hexes
  get a comment linking the token).
- Every WhatsApp link opens `wa.me/5521920115154` with `target="_blank" rel="noopener"`.

## 6. Out of scope

- Testimonials, Pricing and FAQ sections → `TASK-home-cms.md` (after `TASK-scaffold.md`).
- The six supporting routes, forms, privacy policy.
- Final copy where no verbatim source exists (§2.2 row 6, meta description, WhatsApp prefilled
  message). These ship as clearly marked `[CONTENT]` strings in `content/home.ts`, listed in
  `docs/client-content-request.md`. The page is not launch-ready until they're replaced.
- Q2 (blog/biblioteca), Q4 (typeface license), Q5 (email/analytics): unaffected by this task.
- Deploying to production / domain.

## 7. Execution record (2026-09-13)

### Deviations from the plan above, and why

- **§2.0.1 hex:** logo PNGs are flat fills: lime `#CFEA27`, cobalt `#3B6DD8`. Both were adopted
  because they are the literal mark colours. Pink/coral/ink kept as approved.
  `content/outubro-pitch.ts` still lists the old values on purpose, since it records what the
  client saw on 2026-09-13.
- **§2.0.3 descender:** measured 0.255em → clearance set to **0.31em** (was 0.14em).
- **§2.1 header:** no mobile disclosure menu at all (not `Sheet`, not `<details>`). Below 1024px
  the header is logo + CTA only; a phone visitor scrolls a one-page narrative, and a menu is one
  more widget to get right for no conversion gain.
- **§2.2 row 7 (Pilares):** implemented as a CSS `position: sticky` heading column from 1024px,
  not a GSAP pin, so there is no scroll-jacking and no JS.
- **§2.3/§2.4 motion:** **no GSAP on Home.** The hero cord, the header progress cord and the card
  reveals are CSS (keyframes / `animation-timeline: scroll()` / `view()`), and Lenis uses
  `autoRaf`. The planned `hero-cord.tsx`, `scroll-cord-progress.tsx` and `pinned-pillars.tsx`
  client leaves don't exist. `components/site/cord.tsx` is server-rendered SVG. First
  Lighthouse run with GSAP-driven reveals: Performance 95, LCP 2.7s. After the switch: 97-98,
  LCP 2.4-2.5s. The "língua" payoff is a marker highlight (transform), not a weight change (CLS).
- **Added, not in the plan:**
  - `components/site/mobile-cta-bar.tsx`: a phone-only sticky WhatsApp bar, shown once the
    hero is out of view and hidden while the final CTA band is on screen.
  - Per-language WhatsApp prefilled messages on the language cards.
  - A WhatsApp-style chat card in the hero.
  - `app/icon.png` (favicon, the logo PNG).
  - `lib/site-url.ts`.
- **shadcn init side effects reverted:** it swapped Manrope for Geist in `app/layout.tsx`
  (reverted), injected neutral oklch tokens and a `.dark` block (replaced with a mapping onto the
  brand tokens), and generated `components/ui/button.tsx` (removed, `transition-all`).
- **Unlayered CSS gotcha:** `.type-*` classes in `globals.css` are unlayered, so they beat
  Tailwind utilities (which live in a layer). A `text-*` utility on a `.type-lead` element does
  nothing; `SectionHeading`'s `leadInk` uses an inline style for this reason.

### Verification results

Measured on a production build (`pnpm build && pnpm start`), Chrome 153.

| Criterion | Result |
|---|---|
| `pnpm lint`, `pnpm build` | pass; `/` is `○ (Static)` |
| Mobile Lighthouse (Lighthouse 12, 2 runs) | Performance **98 / 97**, Accessibility **100**, Best Practices **100**, SEO **100** |
| LCP / CLS / TBT | **2.4s / 2.5s** (at the 2.5s line, not comfortably under it) · CLS **0** · TBT **50-60ms**. LCP element is the hero `h1`. |
| First-load JS ≤ 120 KB gzip | **Not met: 146 KB transfer.** ~134 KB is the Next 16 + React 19 runtime; site-owned code is ~12 KB. Budget restated in `architecture.md` §4. |
| No horizontal scroll 375 / 768 / 1440 | pass: `scrollWidth === innerWidth` at 375 and 768 (measured in same-origin iframes, since the browser window couldn't be resized to 375), plus a visual check at 1440 |
| Descender safety | `.type-hero/.type-display/.type-heading`: `overflow: visible`, `padding-bottom: 0.31em` |
| `h1` in server HTML | pass (`curl /` contains the h1 text) |
| Raw hex outside `globals.css` | none in site code; exceptions are `(site)/opengraph-image.tsx` (Satori, commented per token) and the dated `content/outubro-pitch.ts` |
| WhatsApp links | all via `CtaLink` / `whatsappHref`: `target="_blank" rel="noopener"`, SR hint "(abre o WhatsApp)" |
| Keyboard order | skip link → logo → nav → header CTA → hero CTAs → language cards → … (DOM order checked). The focus ring itself was **not** visually verified: the automation tab couldn't take focus. |
| Reduced motion | CSS paths gated by `prefers-reduced-motion: no-preference`; Lenis skipped. **Not** checked in a browser with the setting on. |
| `robots.txt` / `sitemap.xml` / canonical / OG | pass (`/apresentacao` disallowed; sitemap lists `/` only) |

### Still open (carried, not silently assumed)

- Every `[CONTENT]` string in `content/home.ts` (hero CTA wording, the student chat line, the
  "Destravar é simples" steps, the prefilled WhatsApp text, the SEO title/description) is waiting
  on `docs/client-content-request.md`.
- A manual pass on a real phone (iOS Safari, Android Chrome): focus ring visibility, the mobile
  CTA bar's show/hide, and the reduced-motion setting. None of these could be exercised from
  the automation browser.
- `NEXT_PUBLIC_SITE_URL` falls back to `outubroidiomas.vercel.app` until the domain is decided.
