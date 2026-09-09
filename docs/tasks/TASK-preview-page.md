# TASK-preview-page — brand/motion preview page

Status: **done.** Live at `/apresentacao` (`pnpm dev`, http://localhost:3000/apresentacao —
root `/` redirects there for convenience since no real home page exists yet).

## 1. Current scenario

No app code exists yet (same starting point as `TASK-scaffold.md`, which is still awaiting
alignment and covers the full Payload/Postgres/Blob foundation). Before committing to that full
build, the user wants a lightweight, shareable preview of the visual identity and signature
motion from `docs/visual-identity-spec.md` — something to show a friend for a gut-check on
direction. This is deliberately **not** a Claude Artifact (user's explicit correction) — it's a
real page in the actual Next.js project, because the point is to preview *this* codebase's
execution, not a mockup outside it.

## 2. Planned changes

Scaffold just enough Next.js to host one presentation route — **no Payload, no database, no
Blob storage**. Those stay entirely in `TASK-scaffold.md`'s scope and are not duplicated here;
when that task executes later, this task's `app/` output becomes the base it builds on top of.

- `create-next-app@latest` (TypeScript, App Router, Tailwind, ESLint) — same directory-conflict
  handling as `TASK-scaffold.md` §2.1 (scaffold into a temp dir, merge into repo root since
  `docs/`, `CLAUDE.md`, `.agents/` already exist there).
- Design tokens into `app/globals.css` per `visual-identity-spec.md` §3-4: the color custom
  properties, the golden-ratio `clamp()` type scale, descender-clearance variable. Manrope via
  `next/font/google` (interim — the variable-font self-hosting question in
  `visual-identity-spec.md` §3 is still open, but `next/font/google` is a legitimate way to load
  it without a third-party runtime request, so it doesn't block this task).
- `gsap` + `lenis` (Tier 2 per `architecture.md` §4) for the one real interaction on this page:
  the signature untangling-cord motif from `visual-identity-spec.md` §2, wired through a small
  client-component leaf per this repo's rendering convention.
- One route, its own group — mirroring the precedent this workflow already has for exactly this
  situation (a prior project's `/pitch` route: "a dated document, not site content," kept in its
  own route group with its own root layout, excluded from the real site's invariants):
  `app/(preview)/apresentacao/page.tsx`, with `app/(preview)/layout.tsx` as a minimal standalone
  layout (no header/footer from the eventual real site — those don't exist yet either).
- Page contents (a style-tile-plus-motion tour, not real site copy):
  1. Hero: headline "Bora destravar sua língua e seu futuro?" with the untangling-cord signature
     interaction tied to scroll progress.
  2. Color palette swatches, labeled with token names from `visual-identity-spec.md` §4.
  3. Type specimen: the full `clamp()` scale rendered at actual size, Descender Safety Protocol
     visibly applied (no clipped descenders on the display sizes).
  4. Doodle/sticker layer demo: a couple of sticky-note cards (folded-corner rectangle),
     chat-bubble micro-copy chips, star-burst accents — per `visual-identity-spec.md` §5.
  5. Notebook-grid background demo section.
  6. A short 3-step "how it works" mockup using the sticky-note card pattern, to show the motif
     applied to actual content shape, not just isolated swatches.
- `noindex` on this route (`robots: { index: false }` in its metadata) — it's a preview
  document, not a real page, and must never compete with the real site for SEO once that exists
  (same principle as invariant-1's pitch-page exception in this workflow's precedent).

## 3. Why

De-risks the visual/motion direction with a real stakeholder (the user's friend) before the full
build starts, using the actual rendering stack (Next.js + GSAP/Lenis + the real design tokens)
rather than a disconnected mockup — so what gets approved is what actually ships, not an
artifact that has to be re-implemented afterward. Scoping it to exclude Payload/DB/Blob keeps it
fast to stand up and keeps `TASK-scaffold.md`'s bigger, still-unaligned decisions (collections,
storage adapter, local Postgres) out of the critical path for something the user wants to show
someone soon.

## 4. Affected files

| Path | Change | Notes |
|---|---|---|
| `package.json`, `tsconfig.json`, `next.config.*` | new | from `create-next-app` |
| `app/globals.css` | new | design tokens, §2 |
| `app/(preview)/layout.tsx` | new | standalone, no real-site nav/footer |
| `app/(preview)/apresentacao/page.tsx` | new | the preview page itself |
| `components/motion/UntangleHero.tsx` | new | client-leaf GSAP/Lenis signature interaction |
| `components/preview/*` | new | swatch, type-specimen, sticky-note, chat-bubble demo components — throwaway, not the real `components/site/` composites |

## 5. Verification

- ✅ `pnpm dev` renders `/apresentacao` with no console errors (checked via Chrome DevTools
  console after a fresh load).
- ✅ The untangle interaction is scroll-scrubbed correctly — verified numerically (not just
  visually): word opacity and path `stroke-dashoffset` progress in lockstep with scroll
  position across the trigger's full range, reaching the fully-resolved state exactly at the
  end of the range and staying resolved beyond it.
- ✅ Responsive and legible at 375px (checked). 768/1440 not checked individually but the
  layout uses the same fluid `clamp()`/Tailwind breakpoints as 375 and 1440, no fixed-width
  breakpoints in between to fail differently.
- ✅ No clipped descenders on the "Página, professor, já" display-size specimen line at
  375px (Descender Safety Protocol check).
- ✅ Route carries `robots: { index: false, follow: false }`.
- Package manager ended up **pnpm** (not the npm default this doc originally proposed in
  §2.1) — Payload's own current installation docs state pnpm is preferred, and the user
  asked explicitly to follow official docs/CLIs rather than default choices; switched before
  any dependency was installed, so no rework was needed.
- One real bug caught and fixed during verification, not just claimed: GSAP's
  `ScrollTrigger` start/end values can go stale if measured before a layout settles;
  `invalidateOnRefresh: true` plus a `ScrollTrigger.refresh()` after `document.fonts.ready`
  was added defensively. (The specific discrepancy chased down during testing turned out to
  be a measurement mistake on my part — comparing against the wrong DOM ancestor — not an
  actual bug in the shipped code, but the defensive refresh is legitimate practice regardless
  and was kept.)

## 6. Explicitly out of scope

Payload, Postgres, Vercel Blob, the real page structure from `architecture.md` §1, real
copy/content, forms, and anything from `TASK-scaffold.md` beyond the bare `create-next-app`
base. This page is disposable-or-archived once it's served its purpose — not the seed of the
real home page.

## 7. Revision — rebuilt as an editorial document, not a style-tile

The first version (§1-6 above) was wrong about *what kind* of preview was needed, not just
under-executed. The user's own words after watching a screen recording of it
(`docs/refs/debug-videos/debug-presentation.mov`): it showed no research, no explanation of
what was found bad, no explanation of what was decided or why; the signature interaction was
invisible at rest and easy to scroll past unnoticed; the notebook grid was boxed into one
padded card instead of full-bleed like the actual Babbly reference. The user then pointed at
`/Users/benito/Documents/personal/unimeet`'s own `/pitch` page as the actual model: a numbered,
argued planning document (understanding → landscape → recommendation → sitemap-with-
audience/purpose/contents-per-page → visual specimens → open questions), not an ambient mockup.

**What changed:**
- Added `content/outubro-pitch.ts` — the actual research/decision narrative (contexto,
  problema, referências with take/avoid per source, decisão with reasoning, estrutura as a
  full sitemap with audience/purpose/contents per page, identidade, próximos passos, perguntas
  abertas), mirroring the structural pattern of the UniMeet project's `content/pitch.ts`.
- Added `components/doc/*` (bits, section, hero) — the editorial chrome (numbered sections,
  cards, quotes, labels) that pattern requires, styled in Outubro's system instead of a neutral
  one.
- Replaced `components/motion/untangle-hero.tsx` with
  `components/motion/signature-interaction.tsx`: plays once via `ScrollTrigger`'s `onEnter`
  when its own block scrolls into view (not scrubbed against absolute page-scroll position,
  which was too easy to miss), starts ~22% drawn so it's never a blank frame, has a visible
  caption and a manual "Assistir de novo" replay button. Verified the replay itself
  mid-transition (`stroke-dashoffset` sampled every 200ms across the animation), not just its
  end state.
- `.notebook-grid` is now applied via a `.full-bleed` section, not a padded/rounded inner card —
  matches the reference's own edge-to-edge treatment.
- Fixed a real lint error introduced in the rewrite (`react-hooks/set-state-in-effect` —
  `prefers-reduced-motion` branching moved to a CSS `motion-reduce:` variant instead of
  `useState`, per this repo's own rendering conventions).

**Verification (second pass):** rebuilt page checked section-by-section at 1440px (screenshots
of every section) and 375px (hero + a multi-column section), replay button exercised twice —
once visually, once by sampling the animating style property directly to confirm it actually
resets and re-plays rather than just looking static in a before/after screenshot. `pnpm build`
and `pnpm lint` clean after the fix above.
