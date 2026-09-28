# Visual Identity Spec — Outubro Idiomas

Produced using the `awwwards-v8` skill's Invention Gate framework
(`.agents/skills/masalale-awwwards-designer/references/invention-gate.md`), applied to an
**existing** brand rather than a blank one — see `research.md` §3 for why this is an elevation,
not a rebrand. Read `research.md` and `architecture.md` first.

---

## 1. Brand metaphors

Extracted from the brand's own core verb (**destravar** — to unstick/unjam/unlock) and its
existing doodle/notebook visual instinct (research.md §3):

1. **The unstuck tongue.** Physical sensation: a jammed drawer that finally slides open; a knot
   in a shoelace loosening under patient fingers; the small-scale relief of a zipper that was
   stuck and now isn't. This is the brand's namesake mechanic — everything else follows from it.
2. **The notebook margin.** Materiality: spiral-notebook paper, a sticky note with a folded
   corner, highlighter ink, a doodled star drawn in the margin while half-listening. Already
   present in the brand's Instagram content (arrows, circle-highlights) and the reason Babbly
   (research.md §4a) resonated — it's the same gesture, executed with more craft.
3. **Off-hours confidence.** Emotional trigger: the private pride of squeezing a lesson into a
   lunch break and later, unplanned, saying the thing you wanted to say in the other language —
   a small victory noticed by no one but you. Not classroom triumph, not an exam score — a real
   moment in a real week.

## 2. Signature interaction

**Paradigm**: Typography × Scroll (Family 5 × Family 2, `technique-families.md`).

**The interaction**: as the visitor scrolls into the hero, a hand-drawn-style tangled cord/thread
(SVG path, drawn like a doodled squiggle — not a straight line) animates via
`stroke-dashoffset` tied to scroll progress. As the cord straightens/untangles, the headline
"Bora destravar sua língua e seu futuro?" resolves word by word in sync — the *tongue* word
(`língua`) is the one that lands exactly as the cord fully straightens.

**Brand-to-interaction mapping**: the untangling cord *is* `destravar`, literally rendered —
not a metaphor once removed (like a generic unlock icon), but the physical sensation from
metaphor 1 drawn as a line. The doodle rendering style (slightly irregular hand-drawn path, not
a perfect Bézier) ties it to metaphor 2.

**Rejected alternatives**:
- Generic `SplitText` character stagger (y:40px, fade-in) — this is the skill's own Tier-2
  overused pattern (`anti-patterns.md` #2) and carries no brand meaning; rejected outright.
- Particle-assembly text (Matter.js physics) — visually strong but WebGL/canvas-adjacent enough
  to threaten the mobile/SEO performance budget (`architecture.md` §4); rejected on cost, not
  taste.
- A literal padlock-unlocking icon animation — too literal, reads as a UI affordance
  ("this is locked content") rather than a brand statement.

**The twist**: the untangling-cord motif is **not a one-off hero gimmick** — it recurs as the
site's scroll-progress indicator and as a section-divider motif (a short straightened-cord rule
between sections, echoing the hero's resolved state). One signature moment becomes a running
system instead of a single trick spent on page load.

**As built on Home (2026-09-13, `TASK-home-static.md` §2.3):** the hero half plays **once on
load**, not scroll-scrubbed — a scrubbed hero never resolves for a visitor who doesn't scroll, and
the headline is the first thing read. It's pure CSS (`pathLength="1"` + `stroke-dashoffset`,
~22% drawn at rest), and the "língua" payoff is a lime marker highlight scaling in behind the word
rather than a font-weight change (weight animation reflows the LCP line → CLS). The scroll-synced
half is the page-long cord under the sticky header (CSS `animation-timeline: scroll()`,
progressive enhancement) plus resolved-cord dividers (`components/site/cord.tsx`).

**Signature statement** (skill's required format): *"When the visitor scrolls into the hero,
the brand's core promise of destravar (unsticking) manifests as a tangled cord illustration that
untangles in sync with scroll progress, resolving exactly as the headline reaches focus — using
a scroll-scrubbed SVG stroke-dashoffset technique reused across the site as a progress/divider
motif."*

**Pattern Blacklist self-check**: no forbidden pattern present. No mixed icon libraries (§6),
no generic display font (§3), no pure `#000`/`#FFF` (§4), no `transition: all`.

**`INVENTION.md`**: per the skill, this document *is* that contract — see §8 for the compact
version to drop at the project root once implementation starts (the skill asks for it at
`/INVENTION.md`; this repo keeps it inside `docs/` alongside its sibling specs instead, since
that's this repo's own doc convention — `[note: intentional deviation from the skill's literal
file path, not an oversight]`).

## 3. Typography

**Superseded 2026-09-27 by the client's brandbook** (`docs/Outubro Idiomas_brandbook.pdf` §2.5,
`TASK-brand-alignment.md` §2.2): **Source Sans 3 is the only family** ("somente as fontes dessa
família devem ser utilizadas"). The earlier Manrope pick (Babbly's face) is retired everywhere,
`/apresentacao` included.

- Loaded as the variable font through `next/font/google` (`lib/fonts.ts`), subsets `latin` +
  `latin-ext` (the latter carries the hero's IPA glyphs ĩ ɡ ɐ). Weights in use: **900** display
  (`.type-hero/.type-display/.type-heading`, matches the logo's heavy wordmark), **700**
  subheads/CTAs, **600** emphasis, **400** body.
- The brandbook's "uso restrito" Verdana is for email/system contexts only, never the site.
- **Descender clearance: `0.27em`**, measured 2026-09-27 with the canvas technique: "gyjpq" at
  100px descends 22.4px (400) / 21.1px (700) / 20.6px (900); worst case +20%. The full Descender
  Safety Protocol still applies to every display element >48px.
- Scale: unchanged golden-ratio `clamp()` tokens, with `--font-hero` capped at 5rem so the hero's
  first line ("Bora destravar sua") holds at 1440px.
- **The logo is never set in Source Sans** (brandbook §2.4 "não reproduza em outra
  tipografia"): the lockups are the official artwork, traced to SVG (`public/brand/`).

## 4. Color

**Superseded 2026-09-27 by the brandbook's palette** (§2.6, confirmed by the user with the coolors
link `cfea27-3b6dd8-ff97d2-f96a5a-000000-e7e7e9-fef2e9`). Tokens in `app/globals.css`:

| Token | Hex | Brandbook name |
|---|---|---|
| `--color-lime` | `#CFEA27` | Verde limão |
| `--color-lime-deep` | `#C0D921` | Verde limão contraste |
| `--color-cobalt` | `#3B6DD8` | Azul |
| `--color-pink` | `#FF97D2` | Rosa |
| `--color-coral` | `#F96A5A` | Vermelho / Vibrant Coral |
| `--color-ink` | `#000000` | Preto |
| `--color-bg` | `#FEF2E9` | Nude / Seashell |
| `--color-border` | `#E7E7E9` | Alabaster Grey |
| `--color-bg-alt` | `#FFF9F4` | *derived* tint of Seashell (card "paper") |
| `--color-ink-soft` | `#4D4845` | *derived* warm neutral (secondary text) |

Pure `#000` is a deliberate exception to awwwards-v8 anti-pattern #3: it is the brand's own black
and the official logo files are drawn in it. `#FFF` stays out (the brandbook has no white).

WCAG contrast, measured (use only passing pairs for text):

| Text on ground | Ratio | Use |
|---|---|---|
| ink on bg / bg-alt | 19.09 / 20.11 | any |
| ink-soft on bg / bg-alt | 8.20 / 8.64 | any |
| ink on lime | 15.45 | any |
| ink on pink | 10.61 | any |
| ink on coral | 7.24 | any |
| bg-alt (paper) on cobalt | 4.61 | any — **the only light that passes on cobalt** |
| bg on cobalt / ink on cobalt | 4.37 / 4.36 | ≥24px or ≥18.66px bold only |
| cobalt on bg | 4.37 | large text / decoration only |
| lime / bg on ink | 15.45 / 19.09 | any |
| pink on bg | 1.80 | **never text** — fill only |
| coral on bg | 2.64 | **never text** — fill only |

Brandbook §2.3 colourways for the logo: blue mark + black word (default, `logo-*.svg`); lime mark
+ Seashell word on black (`logo-*-inverse.svg`); lime mark + black word on blue (OG images).

## 5. The doodle/sticker layer (Babbly pattern, adapted)

Reuse research.md §4a's vocabulary directly, rendered as inline SVG (matching the icon system's
own no-random-SVG discipline, §6):

- **Sticky-note chip**: rounded-rect with a folded-corner triangle, used for the "how it works"
  3-step cards (architecture.md §1.1.6) and for micro-copy call-outs.
- **Chat-bubble micro-copy**: short first-person/imperative phrases in a rounded speech-bubble
  chip — directly reused for Outubro's communicative-approach pitch. Example phrases (voice per
  research.md §3 — informal PT-BR, "bora"/"beleza" register): "Fala desde o dia 1", "Sem
  decoreba", "Seu professor é brasileiro". **`[VERIFY: final micro-copy wording is content
  selection, deferred per architecture.md's scope note]`.**
- **Star-burst accents**: 5- and 9-point outline stars, placed as scatter accents near headlines
  — echoes both Babbly's stars and the brand's own starburst logo mark, tying the two together.
- **Notebook-grid backdrop**: faint graph-paper grid as a section background texture (very low
  contrast — a texture, not a pattern that competes with content), used behind the hero and the
  "how it works" section specifically (not site-wide — restraint per global CLAUDE.md's "YAGNI
  over preemptive optimization").

## 6. Icons

Per the skill's own rule (`aesthetic-foundations.md` §Icon System, `anti-patterns.md` #5):
**Lucide only**, no mixing. Stroke width 1.5 default, 1 for large decorative uses, 2 for small
utilitarian icons (nav, form fields). The hand-drawn doodle layer (§5) is a separate, explicitly
non-icon system — stars/bursts/scribbles are brand illustration, not interface icons, and should
never be reached for to mean "settings" or "close."

## 7. Motion timing & spacing

Adopt the skill's scales as-is (`aesthetic-foundations.md`): 8px spacing scale
(`--space-xs` through `--space-7xl`), animation timing scale (150ms micro through 1000ms macro),
easing tokens (`--ease-out`, `--ease-back`, etc.). No project-specific deviation identified yet —
apply and revisit only if a specific section proves the defaults wrong in build.

## 8. Compact INVENTION.md (for `/INVENTION.md` once implementation starts)

```
BRAND: Outubro Idiomas
METAPHORS: unstuck tongue (destravar) · notebook margin · off-hours confidence
SIGNATURE: hero cord-untangle, scroll-scrubbed SVG stroke-dashoffset, reused as
           scroll-progress + section-divider motif site-wide
REJECTED: generic SplitText stagger (no brand meaning) · particle-assembly text
          (WebGL cost vs. mobile/SEO priority) · literal padlock icon (too on-the-nose)
TIER: 2 (GSAP + Lenis + SplitType-class) — Tier 3 WebGL explicitly rejected, architecture.md §4
```

## 9. Open items before build starts

- ~~Exact hex sampling from source logo files (§4).~~ Done 2026-09-13; superseded by the
  brandbook palette 2026-09-27.
- The brand symbol (brandbook §2.1) replaces the generic StarBurst polygon as the site's
  sticker/bullet (`components/site/brand-symbol.tsx`, CSS mask over `public/brand/symbol.svg`).
  Brandbook §2.2 illustrations are wanted but no files were delivered yet.
- Final micro-copy wording (§5) — content selection, deferred.
- ~~Manrope variable-font self-hosting confirmation (§3).~~ Moot — Source Sans 3 per the brandbook (2026-09-27).
- ~~Descender clearance measured against the actual font files (§3).~~ Re-measured for Source Sans 3 2026-09-27 (0.27em).
