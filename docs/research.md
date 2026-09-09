# Research — Outubro Idiomas website rebuild

Synthesis of everything under `docs/refs/`, read 2026-09-09. This is the project's memory of
*why* — update it when a question below gets answered or a new reference is added.

---

## 1. What the brand actually is

**Outubro Idiomas** — Brazilian online language school, teaching **English, French, Spanish,
German** to Brazilian adults ("Trabalhadores Brasileiros") via 1:1 or 2:1 (duo) live online
classes. Communicative-approach method — speak from lesson 1, not grammar-first. Founded 2018.
Currently: **+500 alunos destravados, +25 professores formados**.

Tagline: **"Bora destravar sua língua e seu futuro?"** ("Let's unstick your tongue and your
future?") — `destravar` (to un-jam/un-stick/unlock) is the core brand verb and recurs everywhere
(Instagram bio, current site H1, this research doc's brand metaphor in
`visual-identity-spec.md`).

Three pillars, each with its own bullet list (source: current site full-text extract):
1. **Educar com Qualidade** — excellence since 2018, critério/organização/método.
2. **Empregar com Dignidade** — teacher pay/training/culture. Distinctive: the brand's public
   differentiator is *how it treats its teachers*, not just student outcomes.
3. **Criar Oportunidade** — international career, travel, authentic connections.

Differentiators list (current site, verbatim, six items): Contrato Transparente (no letras
miúdas/multas), Formação Contínua de Docentes, Foco em Conversação, Professores Brasileiros,
Material Incluso (no buying throwaway textbooks), Equipe Engajada.

Pricing (current site, R$/student/month, 2026 vs. 2027 — **content selection deferred**, but
the shape matters for the page structure): individual and duo (dupla) lessons, at 1×/2×/3× per
week frequency. Six line items per year. Client note: "mesmos preços desde 2023" — pricing
stability is itself a trust signal worth surfacing.

**Contact/conversion paths already in use** (from `linktr.ee/content.html`): WhatsApp
(`wa.me/5521920115154`, label "MATRICULE-SE JÁ"), a free-materials library
(`outubro.link/biblioteca`, "200GB DE MATERIAIS GRATUITOS"), a Blogspot blog
(`outubroidiomas.blogspot.com`), a careers/teacher-recruitment link ("QUERO DAR AULAS"), an
English-language mirror site, and anchors for Depoimentos/FAQ. **`[VERIFY: whether the free
materials library and Blogspot blog get rebuilt on-domain or stay as external links — content
selection is a follow-up conversation, not decided here]`.**

## 2. Current site's actual problem

The current site (`docs/refs/outubroidiomas.com/*.htm`, full-text extracted 2026-09-09) has all
the right *content* — clear pillars, real pricing, FAQ, testimonials section, transparent
differentiators — but zero visual system: default template look, no motion, no distinctive
type, generic layout. The client's own words (Instagram caption, `posts/0/content.md`):

> "Para crescer, fizemos revolução! ✨ Nossa nova identidade reflete uma nova fase e posição de
> nosso projeto... Mudamos o nome, as cores, o visual, e nossa forma de nos organizar."

So the *brand* already went through a redesign (this is why the current site logo forms
"OUTUBRO IDIOMAS" — previously a different name/identity per that caption) — it's the **website**
that never caught up to the new identity. This is a rebuild, not a rebrand.

## 3. The current visual identity (already exists — do not replace it, elevate it)

Confirmed from the current site's own asset files and Instagram grid:

- **Logo mark**: a scalloped/wavy-edge starburst badge (like a wax seal or a sticker-punch
  shape) in **cobalt blue** or **lime green**, containing a simple white smiling-mouth glyph.
  Two color variants shipped (`logo azul 1.png`, `logo verde 1.png`).
- **Palette already in active use** on Instagram: **lime/chartreuse green**, **hot
  pink/magenta**, **cobalt blue**, **coral/red** (used as an accent underline/circle-highlight),
  black, white. High saturation, high contrast, no pastel-only palette.
- **Type**: bold, heavy, condensed/rounded geometric sans for headlines (Instagram slides —
  "E AÍ, BELEZA?", "PRECISA SABER SOBRE OS ALUNOS?"), all-caps, tight leading.
  **`[VERIFY: exact typeface — the client hasn't supplied files; treat current usage as a
  direction, not a pinned family]`.**
- **Doodle/marker layer**: hand-drawn arrows, circle-highlights (drawn freehand, not a perfect
  ellipse), underline scribbles, phonetic-spelling call-outs (e.g. "/be'lɛzɛl/"). This is the
  brand already reaching for a "notebook margin" visual language — see below.
- **Voice**: informal Brazilian Portuguese, second person, slang ("bora", "beleza?", "e aí"),
  emoji used sparingly and intentionally (✨).

**Conclusion for the rebuild**: keep the mark, the palette family, and the marker-doodle
instinct — they're good and already recognized on Instagram. What's missing is a *system*:
consistent tokens instead of ad-hoc colors, a real type scale, and the craft/motion layer the
current static site has none of.

## 4. Reference analysis

### 4a. Babbly (Behance case study, `refs/behance/babbly/`) — the primary reference, client's favorite

Babbly is a fictional/concept language-learning brand case study. What makes it work, and why
it's close to Outubro's existing identity already (this is why the client liked it — it's not a
foreign direction, it's a polished version of a direction the brand already half-has):

- **Notebook-grid canvas**: every screen sits on a faint graph-paper grid background (off-white,
  thin grey lines) — reads instantly as "study/learning," never twee.
- **Paper/sticker layer, not illustration**: hand-drawn-outline star-bursts (5- and 9-point),
  stars, a paperclip glyph, sticky-note rectangles with a folded corner — all rendered as
  clean vector line art (not photographic, not skeuomorphic), colored in flat brand hues.
  Outubro's own doodle-arrow/circle-highlight instinct is the same family of gesture.
- **Chat-bubble UI as a content pattern, not just decoration**: "Ready to speak?", "Oops, I'm
  fluent now", "Just start" — short first-person/imperative phrases in rounded speech-bubble
  chips. Directly maps to Outubro's communicative-approach pitch ("fale desde o dia 1").
  **Reuse this pattern for micro-copy throughout Outubro's site** (see visual-identity-spec §5).
  Palette: pink `#F2A6C6`-ish, lime `#C6E06B`-ish, powder blue `#AECBE0`-ish, mustard yellow,
  black/white — softer/pastel version of Outubro's current hot-saturation palette. Recommend
  Outubro keep its higher-saturation version rather than pastel-ify to match Babbly exactly —
  the client's brand is already louder/warmer than Babbly's, and that's a point of difference,
  not a flaw to fix.
- **Wordmark**: rounded lowercase logotype (Manrope, per the type-specimen slide) with a small
  pink spark/tick mark at the end — a "personality accent" on an otherwise clean wordmark.
  Outubro's starburst mark already serves this exact function; no change needed there.
- **Numbered step cards** ("How Babbly works" — 01/02/03, each a sticky-note-styled card with a
  paperclip icon) — good direct pattern for Outubro's "how it works" / method section.
- **Tutor marketplace cards** (photo + rate + rating + book button) — not directly applicable;
  Outubro sells fixed-price plans, not a tutor marketplace, so this pattern is **not reused**.
- **Merch shots** (t-shirt, cap, tote, phone case) — brand-extension inspiration only, out of
  scope for the website itself.

### 4b. speakPolish (Dribbble mockup, `refs/dribbble/speakPolish/`) — secondary reference

Dark-navy/near-black shell with saturated confetti-card accents (orange/teal/purple/pink/green),
overlapping numbered course cards at slight rotation, a circular/arced rotating-text badge, and
an angled photo collage in the gallery section. Two patterns worth borrowing narrowly:

- **Overlapping numbered cards at a slight rotation** (their course list) — more energetic
  alternative/variant to Babbly's flat sticky-note cards for Outubro's 4-language block.
- **Arced/circular text badge** — a nice, cheap (SVG `<textPath>`, no WebGL) motion idea for a
  "seal of approval" style badge (e.g. around a testimonial avatar or the "+500 alunos" stat).

Not recommended: the dark-navy base — Outubro's brand is warm/bright, not moody/dark, and every
other reference (current IG, Babbly) points bright/light. Speakpolish is texture reference only,
not a direction to adopt wholesale.

### 4c. Instagram grid (`refs/instagram/`) — voice and doodle-layer confirmation

Three sample posts confirm the informal-Portuguese voice and the doodle/circle-highlight/arrow
layer described in §3. Nothing here contradicts or adds beyond what's already captured.

### 4d. Linktree + current site — content inventory only

Already folded into §1/§2 above. No additional visual signal (Linktree uses its own default
theme, not brand-authored).

## 5. Decisions made 2026-09-09 (Benito + client's existing brand, reconciled)

- **Framework**: Next.js (App Router) + Payload, Payload scoped for now to **media/blob
  storage** (`@payloadcms/storage-vercel-blob`) plus a small set of editable collections
  (pricing, testimonials, FAQ — see `architecture.md` §2) rather than the full event-engine-scale
  CMS UniMeet-style projects use. Reason: this is "mostly a landing page" per the client's own
  framing — a heavy admin-driven content model is more machinery than the actual content surface
  (pricing table + testimonials + FAQ + static marketing copy) needs. Revisit if the site grows
  page-per-course or similar.
- **Design direction**: elevate the existing Outubro identity (starburst mark, hot palette,
  doodle layer) to Babbly's execution quality — not a rebrand, not a Babbly clone. Full rationale
  and token decisions in `visual-identity-spec.md`.
- **Animation ambition**: Awwwards-methodology **Tier 2** (GSAP + Lenis + SplitType-class
  techniques; React Bits / Magic UI components where they fit) — deliberately **not** Tier 3
  WebGL. Reason: the client's own ask is "excellent SEO on each page and excellent mobile" for
  what is fundamentally a conversion landing page; WebGL's bundle/GPU cost fights that goal
  directly. Full reasoning in `architecture.md` §4.
- **`awwwards-v8` skill applied, stack deviated**: the skill's own tech-stack guide defaults to
  Astro; this project uses Next.js + Payload per the client's explicit instruction. The skill's
  *aesthetic/technique/anti-pattern doctrine* (Invention Gate, descender safety, spacing/timing
  scales, forbidden-pattern list) is followed regardless of framework — none of it is
  Astro-specific.

## 6. Open questions (unblock before the affected work starts)

- **Q1**: Which pages get full standalone routes vs. stay as sections on one landing page?
  Proposed structure in `architecture.md` §1 — needs sign-off before build.
- **Q2**: Does the free-materials library (`outubro.link/biblioteca`) and the Blogspot blog get
  rebuilt on-domain, or stay as external links from the new site? Affects the SEO story (an
  external blog earns the *old* domain the SEO value, not the new one).
- **Q3**: Content selection — which testimonials, which FAQ entries, final pricing figures for
  the *current* year — deferred to a follow-up pass once this spec is approved (per the user's
  own framing: "then we can look at the references and select the contents").
- **Q4**: Exact current-brand typeface, if one was ever licensed, vs. a new pick — `[VERIFY]`,
  see §3.
- **Q5**: Transactional email provider and analytics tool are not yet chosen — see
  `architecture.md` §6.
