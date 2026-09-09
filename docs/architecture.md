# Architecture — Outubro Idiomas website

Status: **proposal, not yet built.** Nothing under `app/`, `collections/`, etc. exists yet.
Read `docs/research.md` first for the brand/reference research this spec is built on. Content
selection (final copy, which testimonials, final pricing figures) is explicitly **out of scope**
here — this defines structure and system, not content.

---

## 0. Summary

A Next.js marketing site for an online language school, one primary landing page plus a small
number of supporting routes, all statically generated. Payload is scoped narrowly: media/blob
storage plus a handful of collections for content the client will actually want to edit without
a developer (pricing, testimonials, FAQ, teachers). Motion is **Awwwards `awwwards-v8` skill,
Tier 2** (GSAP + Lenis + SplitType-class techniques, React Bits / Magic UI components where they
fit) — see §4 for why Tier 3 (WebGL) is explicitly rejected for this project.

## 1. Page structure (proposal — needs sign-off, research.md §6 Q1)

One landing page carries the sales narrative end to end (this is the conversion path — every
section earns its place by moving a visitor toward WhatsApp/matrícula). Supporting pages exist
as **real routes**, not anchors, specifically so each one is independently indexable —
"excellent SEO on each page" requires each page to have its own crawlable URL, title, meta
description, and OG image, which an anchor (`#faq`) cannot provide.

```
/                     Home — full landing narrative (§1.1)
/precos               Pricing — same pricing content as the home section, but as its own
                       indexable page (people search "outubro idiomas preço" directly)
/metodo               Method/pillars deep-dive (Educar / Empregar / Criar) — expands what's a
                       condensed section on the home page
/depoimentos           Testimonials — full list, home page shows a curated subset
/faq                  FAQ — full list, home page shows a curated subset
/trabalhe-conosco      Careers ("Quero dar aulas") — replaces the current external form link
/contato              Contact — WhatsApp, email, social; also the natural 404/fallback CTA
/politica-de-privacidade  Privacy policy — required the moment any form collects personal data
                          (global invariant, carried from prior projects' convention — see
                          CLAUDE.md invariant 6)
/blog                 [VERIFY: research.md §6 Q2 — only if the Blogspot blog moves on-domain;
                       otherwise this route doesn't exist and the nav links out instead]
```

Each supporting page's content **duplicates a subset of the home page's narrative** rather than
fragmenting it — e.g. `/precos` repeats the pricing table verbatim, it doesn't require a visitor
to go back to `/` to see it. This is deliberate: a landing page's job is to convert an arriving
visitor regardless of which URL they land on first (an ad click, a Google result for "outubro
idiomas preço", a WhatsApp-shared link to `/depoimentos`).

### 1.1 Home page section order

1. **Header** — sticky, logo, anchor links to home sections, primary WhatsApp CTA button.
2. **Hero** — headline ("Bora destravar sua língua e seu futuro?"), subhead, primary CTA,
   signature interaction (visual-identity-spec.md §4 — the untangling-cord motif). This is the
   one section that gets the full motion budget.
3. **Trust marquee** — "+500 alunos destravados", "+25 professores formados", language chips
   (Inglês/Francês/Espanhol/Alemão) — Magic UI `Marquee`-class component, content-driven per
   anti-pattern rule (no lorem ipsum, no decoration-only marquees).
4. **"Só tem na Outubro"** — four communicative-approach bullets, current site's own copy.
5. **Languages/courses block** — 4 language cards. Layout candidate: speakPolish's overlapping
   numbered-card pattern (research.md §4b) adapted to Outubro's palette.
6. **How it works** — 3-step process (level → plan → learn), Babbly's sticky-note card pattern
   (research.md §4a).
7. **Three Pillars** — Educar / Empregar / Criar, candidate for a Tier-2 sticky-scrollytelling
   treatment (one pinned section, three internal steps) since it's the brand's most
   differentiated content (research.md §1) and deserves the narrative weight.
8. **Differentiators grid** — the six-item list (Contrato Transparente, etc.) as a card grid.
9. **Testimonials** — curated subset, links to `/depoimentos` for the full list.
10. **Pricing** — full table (individual/duo × 1-3×/week), current-year figures only on the
    home page, with a link to `/precos` for year-over-year comparison.
11. **FAQ** — curated subset (accordion), links to `/faq` for the full list.
12. **Final CTA band** — repeats the hero's headline as a closing hook + WhatsApp CTA.
13. **Footer** — contact, social, sitemap links, privacy policy link, careers link.

## 2. Payload scope

Deliberately narrow (research.md §5). Collections:

| Collection | Purpose | Notes |
|---|---|---|
| `media` | Images/video, backed by Vercel Blob | `@payloadcms/storage-vercel-blob`, per stack table |
| `testimonials` | Student testimonials | name, language studied, quote, optional photo/video |
| `faqs` | FAQ entries | question, rich-text answer, `order` field |
| `pricingPlans` | Pricing table rows | format (individual/duo), frequency, price, `effectiveYear` |
| `teamMembers` | Teachers/staff shown on `/metodo` or footer, if the client wants faces on the site | `[VERIFY: does the client want teacher photos public — not established in research]` |

**Not** in Payload: page layout/section order (lives in code, per §1 — this site does not need
a page builder, it has one landing page and a handful of fixed supporting pages), nor a
`careers`/job-application flow beyond a simple form (see §3).

This mirrors the same underlying principle as heavier Payload-CMS projects this workflow has
built before (editable content lives in the CMS, not hardcoded in components) — just applied to
a much smaller content surface, because a landing page's editable surface actually is smaller.

## 3. Forms

Two forms, both persisting to Postgres **and** sending a notification email (never email-only —
same rule as every project using this workflow, because relying on email alone loses submissions
silently when a provider hiccups):

- **Contact/lead form** (if used instead of/alongside WhatsApp as a CTA) — `[VERIFY: does the
  client want an on-site form at all, given WhatsApp is the established conversion path per
  research.md §1, or is WhatsApp the sole conversion mechanism]`.
- **Careers form** (`/trabalhe-conosco`) — replaces the external `lucky-bat.static.domains/vagas`
  link. Name, contact, languages taught, experience — exact fields `[VERIFY: not specified by
  the client yet]`.

Both forms: honeypot + rate limit at minimum (spam/abuse path, not assumed — same standard as
other projects on this workflow).

## 4. Motion: Tier 2, not Tier 3 — and why

The `awwwards-v8` skill's decision tree (its `anti-patterns.md`) asks "brand ambition, timeline,
technical confidence" — but for *this* project the deciding factor is the client's own stated
priority: **"excellent SEO on each page and excellent mobile."** Tier 3 (WebGL/shaders/Three.js)
directly fights that:

- WebGL adds 50-300kb of JS and GPU-bound rendering — hurts INP/mobile performance budgets the
  skill's own `tech-stack.md` sets (Tier 2 target: <120kb JS, mobile-first).
- A language school's buyer decision (a Brazilian adult choosing whether to commit R$350-1520/mo)
  is not won by spectacle; it's won by trust signals (pricing transparency, teacher quality,
  testimonials) landing fast and legibly on a phone, which is where research.md's own audience
  note says the traffic will be (Brazilian adults, WhatsApp-native, likely majority mobile).

**Tier 2 stack**: GSAP + ScrollTrigger + Lenis (`smoothTouch: false`) + SplitType-class text
techniques, wired through React per the skill's Astro-flavored patterns adapted to Next.js (same
`gsap.context()` cleanup discipline, same Lenis/ScrollTrigger sync pattern — just triggered from
a `useEffect` in a small client component instead of an Astro `<script>` tag, consistent with
this repo's own rendering convention: Server Components by default, motion logic pushed to a
leaf client component that does the GSAP wiring and nothing else).

**Component libraries** — used selectively, per the user's own framing ("use them when suited"),
not wholesale:
- **React Bits** — text-animation and background-effect primitives. `[VERIFY: exact component
  names/props against reactbits.dev's current docs before implementation — this spec does not
  invent an API surface it hasn't confirmed live]`.
- **Magic UI** — `Marquee` (trust bar, §1.1.3), `BentoGrid` (candidate for the differentiators
  grid, §1.1.8), `NumberTicker` (candidate for the "+500 alunos" stat), `Confetti` (candidate for
  a form-submission success moment). Installed via its shadcn-CLI-compatible flow.
- Both libraries render as React components; nothing here requires abandoning the
  Server-Components-by-default convention — each becomes a small `'use client'` leaf per the
  usual rule (global CLAUDE.md, "Rendering & effects conventions").

**One Tier-3-adjacent exception, deliberately cheap**: the signature interaction
(visual-identity-spec.md §4) uses `stroke-dashoffset` on an inline SVG path driven by scroll
progress — visually ambitious, but it's a few KB of SVG + a scroll listener, not a WebGL canvas.
It stays inside the Tier 2 performance budget.

**Anti-patterns to actively avoid** (skill's own list, the ones most likely to be reached for by
default and most damaging to this brand specifically):
- Generic display fonts (Poppins/Nunito/Lato/Raleway/Inter/Montserrat) — see
  visual-identity-spec.md §3 for the actual pick.
- Default Tailwind blue, pure `#000`/`#FFF` — the brand's own hot palette replaces both already.
- Plain `y:40px` stagger reveal on every headline — reserve for genuinely secondary text; the
  hero and pillar headlines get the signature untangling-cord treatment instead.

## 5. SEO (the client's own stated priority — "excellent SEO on each page")

- **Per-page metadata**: Next.js `generateMetadata` on every route in §1 — unique title,
  description, OG image per page (not one shared OG image site-wide).
- **Structured data**: `Organization` schema (site-wide), `FAQPage` schema on `/faq` and the
  home FAQ section, `Course`-adjacent schema for the languages block `[VERIFY: whether schema.org
  Course is the right type for a language-school offering vs. Service — check current
  schema.org guidance before implementing]`.
- **Sitemap + robots**: generated (`app/sitemap.ts`, `app/robots.ts`), every route in §1 included
  except any that stay external per research.md §6 Q2.
- **Static-first**: every route in §1 is SSG (`generateStaticParams`/default static rendering) —
  no CMS query on the cacheable request path, revalidated on demand from Payload hooks when
  testimonials/FAQ/pricing change. Same static-first invariant this workflow applies elsewhere,
  and it directly serves the SEO goal (fast TTFB/LCP correlates with ranking and with mobile
  Core Web Vitals).
- **Canonical URLs + hreflang**: `[VERIFY: research.md mentions an English mirror site
  (linktr.ee "WEBSITE IN ENGLISH") already exists externally — decide whether this rebuild
  absorbs it as a locale or leaves it as a separate site before this is load-bearing]`.

## 6. Stack

| Layer | Choice | Note |
|---|---|---|
| App | Next.js (App Router), latest stable, TypeScript | static-first |
| CMS | Payload, embedded in the same Next.js app | scoped per §2 — media + 4 light collections |
| Database | PostgreSQL | Payload's Postgres adapter — needed even for a small collection set, per Payload's own architecture |
| Media | Vercel Blob (`@payloadcms/storage-vercel-blob`) | per user's explicit instruction |
| Styling | Tailwind (latest) + shadcn/ui primitives | shadcn chosen specifically because Magic UI's components assume it |
| Animation | GSAP + Lenis + SplitType-class techniques (Tier 2) + selected React Bits / Magic UI components | §4 |
| Forms | Two hand-built typed forms (§3) | persisted + emailed, never email-only |
| Email | `[VERIFY: no transactional email provider chosen yet]` | |
| Analytics | `[VERIFY: not chosen yet — recommend cookieless (Plausible/self-hosted Umami) to avoid a cookie-banner requirement, consistent with prior projects' approach, but this is this project's own call to make]` | |
| Hosting | Vercel | matches Payload's Vercel Blob integration |

## 7. Open items before build starts

Everything tagged `[VERIFY]` above, plus research.md §6 in full. None of these block writing
the visual-identity-spec (next), but all of them block writing a `docs/tasks/TASK-*.md`
implementation plan.
