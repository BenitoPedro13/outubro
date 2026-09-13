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

**Anti-pattern check first** (`anti-patterns.md` #1): Poppins, Nunito, Lato, Raleway, Inter,
Montserrat are all forbidden as headline faces — and the current Instagram content's bold
condensed sans (research.md §3) risks landing exactly in that generic-geometric-sans family if
approximated carelessly.

**Pick**: **Manrope** for headlines (weights 700-800) — chosen deliberately because it's
Babbly's own type choice (research.md §4a type specimen slide) and reads as a considered,
slightly warmer alternative to the fully-generic names above, while still being widely available
and variable-capable. Paired with **Manrope** at regular/medium weight for body text as well
(one family, two weight ranges — simpler than a serif/sans pairing, and consistent with the
brand's existing single-typeface Instagram usage). `[VERIFY: license/self-hosting terms for
Manrope — it's Google Fonts-licensed (OFL) so self-hosting per invariant 5-equivalent (no
third-party font requests) is straightforward, but confirm the variable-font file before
committing]`.

**Scale**: the skill's golden-ratio `clamp()` scale (`aesthetic-foundations.md`), applied as-is
— `--font-hero` through `--font-micro`. Descender clearance: **`0.31em`** — measured 2026-09-13 with the
canvas technique in `references/descender-safety.md` (Manrope "gyjpq" at 100px descends 25.5px
at both 400 and 800 weight; +20% buffer), replacing the original `0.14em` estimate — and apply the full Descender Safety Protocol
to every display-text element (>48px) — `overflow: visible`, never `clip`.

## 4. Color

**Anti-pattern check**: no default Tailwind blue, no pure `#000`/`#FFF` (`anti-patterns.md`
#2-3). The existing brand palette (research.md §3) is high-saturation by design — that's a
point of difference from Babbly's softer pastel take, not something to correct.

Proposed tokens (author these as CSS custom properties in the global stylesheet, per invariant
7 — no raw hex outside the token file):

```css
:root {
  /* Off-white base, not pure #FFF */
  --color-bg: #FAF9F5;
  --color-bg-alt: #FFFDF7;         /* sticky-note/card background */

  /* Off-black, not pure #000 */
  --color-ink: #14120F;

  /* Brand hues — authored shades, not swatch-picker defaults */
  --color-lime: #C8E639;           /* primary accent, from current mark */
  --color-lime-deep: #9BB821;      /* hover/active state */
  --color-cobalt: #2E5FE0;         /* secondary mark color, links */
  --color-cobalt-deep: #1F44AD;
  --color-pink: #F0389C;           /* doodle/highlight accent */
  --color-coral: #FF5D3E;          /* underline-scribble accent, from IG content */

  /* Neutrals for text hierarchy */
  --color-ink-soft: #4A4740;
  --color-border: #E7E3D8;
}
```

**Resolved 2026-09-13** (`TASK-home-static.md` §2.0): pixel-sampled from the logo PNGs, which
are flat single-colour fills — `logo verde 1.png` = **`#CFEA27`**, `logo azul 1.png` =
**`#3B6DD8`** (identical to the live site's own `--lime`/`--blue`). `--color-lime` and
`--color-cobalt` now use those exact values; pink, coral, ink and neutrals stay as approved
(the live site's pink is a light `#FF97D2`, but the client approved the hot pink as presented).

WCAG contrast, measured (use only passing pairs for text):

| Text on ground | Ratio | Use |
|---|---|---|
| ink on bg | 17.75 | any |
| ink-soft on bg / bg-alt | 8.79 / 9.11 | any |
| ink on lime | 13.76 | any |
| ink-soft on lime | 6.82 | any |
| ink on pink | 5.12 | any |
| ink on coral | 6.13 | any |
| bg-alt on cobalt | 4.73 | any (just) |
| cobalt on bg | 4.57 | any (just) |
| bg-alt on pink | 3.59 | ≥24px / ≥18.66px bold only |
| bg-alt on coral | 3.00 | ≥24px / ≥18.66px bold only |
| pink on bg | 3.47 | large text / decoration only |
| coral on bg | 2.89 | decoration only, never text |
| ink-soft on pink | ~2.8 | never |

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

- ~~Exact hex sampling from source logo files (§4).~~ Done 2026-09-13.
- Final micro-copy wording (§5) — content selection, deferred.
- Manrope variable-font self-hosting confirmation (§3).
- ~~Descender clearance measured against the actual Manrope files, not estimated (§3).~~ Done 2026-09-13 (0.31em).
