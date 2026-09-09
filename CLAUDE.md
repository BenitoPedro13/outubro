# Workflow Guidelines — Outubro Idiomas website

> Ported from the `plexus` → `reelcast` → `flora` → `unimeet` workflow (plan before you touch
> anything, lean on existing tooling while you work, treat documentation as part of the
> deliverable when you finish), retargeted to this project.

---

## 0. Project context

**Outubro Idiomas** is a Brazilian online language school (English, French, Spanish, German),
teaching Brazilian working adults via 1:1 or 2:1 live online classes with a communicative
approach — speak from lesson 1. Founded 2018, +500 students, +25 teachers trained. Tagline and
core brand verb: **"Bora destravar sua língua e seu futuro?"** — `destravar` (to unstick/unjam)
is the brand's namesake mechanic, not just a slogan; see `docs/visual-identity-spec.md` §1-2.

**This is a rebuild, not a rebrand.** The brand already redesigned its identity (new name,
colors, mark) before this project started — the *website* never caught up. Read
`docs/research.md` first: §1-2 for what the brand is and why the current site fails it despite
having the right content, §3 for the visual identity that already exists and must be elevated
(not replaced), §4 for the reference analysis (Babbly is the primary reference, client's
favorite; speakPolish secondary), §5 for decisions made 2026-09-09, §6 for open questions.

**Status (2026-09-09): specs written, no code yet.** `docs/architecture.md` (page structure,
Payload scope, motion tier decision, SEO plan, stack) and `docs/visual-identity-spec.md` (brand
metaphors, signature interaction, type/color/doodle-layer system — produced via the
`awwwards-v8` skill's Invention Gate, `.agents/skills/masalale-awwwards-designer/`) are both
proposals awaiting sign-off, not built systems. **Content selection (final copy, which
testimonials, current-year pricing figures) is explicitly deferred** — these specs define
structure and system, not content; that's a follow-up pass once the specs are approved.

### The one thing to keep in mind while building

This is **mostly a landing page that needs to be pretty and needs to convert.** Every visual and
motion decision is judged by three things, in order: (1) does it move a visitor toward the
WhatsApp/matrícula CTA, (2) is it excellent on mobile — most traffic will be a Brazilian adult on
a phone, WhatsApp-native, and (3) is it excellent SEO on every single page, not just the home
page. A beautiful interaction that hurts mobile performance or ships on a page with no unique
metadata has failed the brief regardless of how it looks in a screen recording.

**Build mobile-first.** Every layout starts at the smallest breakpoint and adds complexity
upward (`min-width` media queries, not `max-width`). Default test widths: **375 / 768 / 1440px**
(no signed contract dictates otherwise for this project, unlike prior clients on this
workflow — these are the `awwwards-v8` skill's own defaults; revise here if the client specifies
real device targets later).

### Stack (see `docs/architecture.md` §6 for the full table and rationale)

| Layer | Choice | Note |
|---|---|---|
| App | Next.js (App Router), latest stable, TypeScript | static-first, one app |
| CMS | Payload, embedded in the same Next.js app | **scoped narrowly**: media/blob storage + 4 light collections (pricing, testimonials, FAQ, team) — not a full page-builder CMS. This is "mostly a landing page," the editable surface is genuinely small. |
| Database | PostgreSQL | Payload's Postgres adapter |
| Media | **Vercel Blob** (`@payloadcms/storage-vercel-blob`) | per the client's explicit instruction — this is the concrete reason Payload is in the stack at all right now |
| Styling | Tailwind (latest) + shadcn/ui primitives | shadcn chosen because Magic UI's components assume it |
| Animation | GSAP + Lenis + SplitType-class techniques (**Tier 2**, `awwwards-v8` skill) + selected **React Bits** / **Magic UI** components | Tier 3 (WebGL) deliberately rejected — see `docs/architecture.md` §4. Use React Bits (reactbits.dev) and Magic UI (magicui.design) *where they fit*, not wholesale — verify exact component names/props against their live docs before use, never invent one (see §5 below). |
| Forms | Two hand-built typed forms (contact/lead, careers) | persisted + emailed, never email-only |
| Email | `[VERIFY: no transactional provider chosen yet]` | |
| Analytics | `[VERIFY: not chosen yet]` | recommend cookieless (Plausible/self-hosted Umami) to avoid a cookie-banner requirement, but this project's own call |
| Hosting | Vercel | matches the Blob integration |

Version numbers are intentionally **not pinned yet** — this project has no signed contract
dictating exact versions the way some prior clients on this workflow did. Pin them in this table
the moment the scaffold is actually created (`create-next-app`, Payload's installer), and
re-verify against each tool's own current docs before bumping a major thereafter.

### Frontend state, rendering, and restraint conventions

**Follow the global `~/.claude/CLAUDE.md` Frontend: Next.js/React section as-written** — Server
Components by default with `'use client'` pushed to leaves, TanStack Query for server state (one
`queryOptions()` per Payload endpoint, never inline `useQuery`), Zustand reserved only for
genuinely every-tick state (unlikely to be needed on a landing page — a pricing calculator's
local state, if one exists, is almost certainly a lifted `useState`, not a store), `useEffect`
only for real external-system synchronization, no reflexive `useMemo`/`useCallback`. Nothing
about this project's stack changes those defaults — restated here only where it's project
specific:

- **GSAP/Lenis wiring lives in small client-component leaves**, same discipline as any other
  browser-API synchronization: a component whose only job is to call `gsap.context()` inside a
  `useEffect`, wire the Lenis/ScrollTrigger sync pattern, and return the cleanup function. Server
  Components above it stay Server Components — motion logic never justifies promoting a whole
  page to `'use client'`.
- **React Bits / Magic UI components** are still subject to the same custom-hook-abstraction
  rule as anything else with an API surface: if a component needs data (e.g. `NumberTicker` fed
  from a Payload-sourced stat), the data comes from an abstracted hook in `hooks/`, not fetched
  inline inside the component tree.

### How to write in this repo

- **Never invent an API, a component prop, a plugin's behaviour, an exact hex value, or a
  library's current component name.** This matters more than usual here because two of the
  named tools (React Bits, Magic UI) were researched by fetching their docs live, and the fetch
  was incomplete for React Bits specifically (its component catalog is JS-rendered and wasn't
  fully enumerable) — `docs/architecture.md` §4 already flags this. Write
  `[VERIFY: what to check and where]` inline instead, and resolve it before the code depending
  on it ships.
- **Be specific to the point of discomfort**: exact field names, exact hex values (sampled from
  the actual logo files, not eyeballed off a screen render), exact contrast ratios, exact
  page-weight budgets. No acceptance criterion may rest on "works", "fast", or "looks good".
- **Cite the design by page and section** (`Home → Three Pillars`, per `architecture.md` §1.1).
  There is no Figma yet.
- **Quote the client/brand voice, don't paraphrase it.** The brand's Instagram/current-site copy
  is informal Brazilian Portuguese with specific slang ("bora", "beleza", "e aí") — when a
  content decision rests on tone, quote the source line (`docs/research.md` §3) rather than
  inventing a paraphrase that drifts the voice.

## 1. Plan before executing — write a task document first

**Rule:** Before editing or creating **any** code file, write a task document at
`docs/tasks/TASK-<slug>.md`.

### 1.1 Required sections

1. **Current scenario** — what exists today, what's missing or blocked, with concrete file
   names and the commit it describes.
2. **Planned changes** — file by file, what's added/modified/removed and how it connects.
   Note alternatives considered and rejected.
3. **Why** — the justification, so a reviewer can push back before code exists.
4. **Affected files** — a table: path, change type (new/edit/removal), notes.
5. **Verification** — measurable criteria.

Also record what is **explicitly out of scope** — the biggest current risk is that content
selection (research.md §6 Q3) and several `[VERIFY]` items (architecture.md §7,
visual-identity-spec.md §9) are unresolved; a task doc that quietly assumes an answer to one of
these is a bug in the plan, not a shortcut.

### 1.2 How to apply it

- Write the document, summarize in 2-3 lines, and wait for alignment on anything non-trivial
  before writing code.
- One document per task, short kebab-case slug: `TASK-scaffold.md`, `TASK-hero-motion.md`,
  `TASK-pricing-collection.md`.
- Keep it in sync if the plan changes mid-task — it's a living record, not write-once.

---

## 2. Use CLIs, generators, and SDKs — don't write everything by hand

### 2.0 Check current docs before scaffolding anything

Before scaffolding or adding a dependency for **any** part of this stack — Next.js, Payload and
its plugins, Tailwind, shadcn, React Bits, Magic UI, GSAP/Lenis, the database adapter, the
storage adapter — check the tool's own current docs first, then use its official CLI or
generator. This applies with extra force to React Bits and Magic UI specifically: both ship
CLI-based installers, and hand-authoring a component that a CLI would generate correctly is the
wrong default, same as it would be for a shadcn component.

### 2.1 In practice

- The app is scaffolded by `create-next-app`, then Payload's documented manual install into an
  existing Next.js app. Not by hand.
- Payload plugins (storage adapter, and whichever else prove necessary for the 4 light
  collections in `architecture.md` §2) are used before anything equivalent is hand-rolled.
- React Bits and Magic UI components are added via their own CLIs where available, not
  copy-pasted from memory of what their API looked like at training time (`awwwards-v8`'s own
  "no version pinned, use Context7 or equivalent to pull current docs before integrating"
  guidance applies directly here).
- Database schema changes go through Payload's migration workflow, always reviewed by hand
  before commit.
- Images go through Next.js' image pipeline and Payload's upload sizes — no hand-rolled
  resizing, no full-resolution originals shipped to a browser.
- Content edits (once the 4 light collections exist) are made in the admin panel, not by editing
  seed files.

---

## 3. Update documentation after executing

**Rule:** Before considering a task done, update every doc the change affects.

- **`CLAUDE.md`** (this file) — if the change alters the stack, an invariant, or a convention.
  In particular: **pin version numbers in the stack table the moment the scaffold exists** —
  they're deliberately left unpinned above only because nothing has been scaffolded yet.
- **`docs/research.md`** — if a question in §6 gets answered or a reference decision changes.
  Record the answer and who gave it, with the date.
- **`docs/architecture.md`** / **`docs/visual-identity-spec.md`** — if the change resolves a
  `[VERIFY]` or changes the page structure, Payload scope, motion tier, or brand system. Update
  the specific section; don't append.
- **The privacy policy** (`/politica-de-privacidade`, once it exists) — if you added anything
  that touches personal data.
- **`.env.example`** — every environment variable the code reads must be listed.
- **`README.md`** — status line and quickstart.
- Grep `docs/*.md` for the names of things you changed (collection, field, route, token) to
  catch stale references.

---

## 4. Project conventions

```
app/                Next.js App Router — see docs/architecture.md §1 for the route list
components/
  ui/               shadcn primitives, vendored — restyle via tokens, never edit
  site/             product composites (Header, Footer, PricingTable, ...)
  motion/           GSAP/Lenis client-leaf components — see §0's rendering-conventions note
collections/        Payload collections (media, testimonials, faqs, pricingPlans, teamMembers)
lib/                shared utilities, form schemas, email
hooks/              every TanStack Query call, Payload SDK call, and React Bits/Magic UI
                    data-feeding hook lives here — never inline in a component
docs/
  research.md              brand/reference research   ← read first
  architecture.md          page structure, Payload scope, motion tier, SEO plan, stack
  visual-identity-spec.md  brand metaphors, signature interaction, type/color/doodle system
  tasks/                   TASK-<slug>.md
```

This layout is provisional until `architecture.md` says otherwise — change it there first, not
here.

- One TypeScript config source. No per-directory compiler settings.
- A Payload collection and any React component that renders its data live conceptually paired —
  don't let a collection's shape drift from what the frontend actually reads.

### 4.1 Commit conventions

- Commit automatically once a task doc's work is complete and verified (build/lint/tests passing
  per its own scope) — don't wait to be asked for each one. Standing authorization scoped to
  work that followed the task-doc process in §1; not blanket permission for destructive git
  operations, which still need explicit confirmation.
- **Never add a `Co-Authored-By` trailer to commits in this repo.**

---

## 5. The `awwwards-v8` skill

Installed at `.agents/skills/masalale-awwwards-designer/` (see `docs/research.md` §5 for how/why
it was installed, including the supply-chain caveat that installing it required running an
unaudited third-party `npx` package — already done and already reviewed file-by-file, not a
standing risk for future work in this repo).

**Use its aesthetic/technique/anti-pattern doctrine; do not use its default tech-stack
guidance.** The skill's own `tech-stack.md` defaults to Astro — this project uses Next.js +
Payload per the client's explicit instruction (`docs/architecture.md` §6), and that deviation is
intentional, not a gap to fix. What *does* carry over regardless of framework:

- The **Invention Gate** — already run once, output in `docs/visual-identity-spec.md` §1-2.
  Don't re-run it casually; a new signature interaction for the same brand needs a real reason
  (a new page type the current one doesn't cover), not restlessness.
- **Descender Safety Protocol** — mandatory for every display-text element >48px
  (`visual-identity-spec.md` §3): `padding-bottom: var(--descender-clearance)`,
  `overflow: visible` (never `clip`) on the text element, `overflow: hidden` on its container.
- **The anti-pattern list** (`.agents/skills/masalale-awwwards-designer/references/anti-patterns.md`)
  — Tier 1 items are non-negotiable (no generic display fonts, no default Tailwind blue, no pure
  `#000`/`#FFF`, no `transition: all`, no mixed icon libraries, no unmodified stock photography,
  no `overflow: hidden` on hero text without descender safety). Tier 2 items need a documented
  twist if used. This repo's own picks (Manrope, the authored palette in
  `visual-identity-spec.md` §4, Lucide-only icons) already clear the Tier 1 list.
- **Spacing/timing/type scales** (`aesthetic-foundations.md`) — adopted as-is,
  `visual-identity-spec.md` §7.
- **Motion tier discipline** — this project is Tier 2, deliberately, and that decision has a
  documented reason (`docs/architecture.md` §4) tied to the client's own SEO/mobile priority.
  Don't casually escalate a specific section to Tier 3 without updating that reasoning first.

---

## TL;DR

Read `docs/research.md` → `docs/architecture.md` → `docs/visual-identity-spec.md` → resolve the
open `[VERIFY]` items that block the work at hand → plan (`docs/tasks/TASK-<slug>.md`) → align →
build with official generators/CLIs (Next.js, Payload, shadcn, React Bits, Magic UI), never
invented APIs → update the specs, `.env.example`, `README.md` → commit (no `Co-Authored-By`) →
done. Never broken: mobile-first at 375/768/1440px, static-first with on-demand revalidation,
unique SEO metadata per page (not just the home page), every form submission persisted *and*
emailed and never logged, no raw hex outside the token file, Descender Safety on all display
text, Lucide-only icons, Tier 2 motion (not Tier 3 WebGL) unless the reasoning in
`architecture.md` §4 is explicitly revisited, editable content (pricing/testimonials/FAQ/team)
lives in Payload not hardcoded in components.
