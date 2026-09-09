# TASK-scaffold — Next.js + Payload project scaffold

Status: **partially executed as a side effect of `TASK-preview-page.md`.** §2.1 (the
`create-next-app` base) is done — see that task doc. §2.2-2.6 (Payload, Postgres, Vercel Blob,
the 4 collections, shadcn init) are still proposed and awaiting alignment. Package manager is
resolved as **pnpm**, not npm (§2.1's original `[VERIFY]`) — Payload's own current install docs
state a preference for it, and the user asked explicitly to follow official docs/CLIs.

**CLI note carried over from `TASK-preview-page.md`**: `create-payload-app`'s interactive
wizard requires a real TTY (confirmed by trying it — it fails with a libuv TTY init error
under this environment's non-interactive shell, even under a `script`-allocated pseudo-tty the
prompt navigation isn't reliably automatable). When this task executes, use Payload's
documented **manual install** path instead (`pnpm add payload @payloadcms/next` + a db adapter,
then the documented `payload.config.ts` / `withPayload` snippets) — still 100% sourced from
Payload's own current docs, just not the wizard.

## 1. Current scenario

The repo (`github.com/BenitoPedro13/outubro`, `main` branch, commit `060d0b8`) currently
contains only documentation and reference material — no app code exists yet:

```
CLAUDE.md
docs/research.md
docs/architecture.md
docs/visual-identity-spec.md
docs/refs/                          (Babbly, speakPolish, Instagram, current-site references)
.agents/skills/masalale-awwwards-designer/   (awwwards-v8 skill, installed but not yet applied in code)
```

There is no `package.json`, no `app/`, no `collections/`, no database, nothing scaffolded. This
task is the first one that touches code: it stands up the Next.js + Payload foundation the three
existing specs describe, with **no page-structure build, no motion, no content** — those are
separate follow-up tasks once this foundation exists and once `research.md` §6's open questions
are resolved (they don't block scaffolding itself, only the work that comes after).

## 2. Planned changes

### 2.1 App scaffold

- `create-next-app@latest` — TypeScript, App Router, Tailwind, ESLint, `src/` disabled (this
  repo already uses `app/`, `docs/`, etc. at root per `CLAUDE.md` §4's layout).
- **Directory conflict**: `create-next-app` refuses a non-empty target directory.
  `docs/`, `CLAUDE.md`, `.agents/` already exist at repo root. Plan: scaffold into a throwaway
  temp directory, then move the generated files (`app/`, `public/`, config files) into the repo
  root, merging `.gitignore` rather than overwriting it. Verify no generated file collides with
  an existing path before moving (`ls` diff first).
- Package manager: **npm** (Next.js's own zero-config default; no existing convention in this
  repo dictates otherwise, and `[VERIFY: ask if a different package manager is preferred]` — not
  blocking, defaulting to npm is reversible).

### 2.2 Payload install

- Payload's documented **manual install into an existing Next.js app** (not
  `create-payload-app`, which scaffolds its own Next.js shell — this repo's Next.js app already
  exists per 2.1). Adds the `app/(payload)` route group for `/admin` and the REST/GraphQL API
  routes, `payload.config.ts` at repo root.
- Postgres adapter (`@payloadcms/db-postgres`).
- Vercel Blob storage adapter (`@payloadcms/storage-vercel-blob`) — per the client's explicit
  instruction (`docs/architecture.md` §6) this is the concrete reason Payload is in the stack.
- **Local Postgres via Docker** for dev (`docker-compose.yml`, Postgres 16 — same version prior
  projects on this workflow have used, no reason to deviate). Production database provisioning
  (Neon/Vercel Postgres or similar) is `[VERIFY: not decided — out of scope for local scaffold,
  needed before first deploy]`.

### 2.3 Collections (schema only, no seed content)

Per `docs/architecture.md` §2 — four light collections plus the media collection:

- `media` — Payload's upload collection, backed by the Vercel Blob adapter.
- `testimonials` — fields: `studentName`, `language` (select: en/fr/es/de), `quote` (textarea),
  `photo` (relationship → `media`, optional).
- `faqs` — fields: `question`, `answer` (richText), `order` (number).
- `pricingPlans` — fields: `format` (select: individual/duo), `frequencyPerWeek` (select: 1/2/3),
  `price` (number), `effectiveYear` (number).
- `teamMembers` — fields: `name`, `role`, `photo` (relationship → `media`), `bio` (textarea).
  Included per `architecture.md` §2's note that this one is `[VERIFY: does the client want
  teacher photos public]` — scaffolding the collection now costs nothing and doesn't commit to
  using it on the live site until that's answered.

No page-builder collection, no `pages` collection — per `architecture.md` §1/§2, this site's
page structure lives in code (`app/`), not in a CMS-driven layout.

### 2.4 Styling foundation

- Tailwind (ships with `create-next-app`).
- shadcn/ui `init` — chosen specifically because Magic UI's components assume it
  (`CLAUDE.md` stack table). No shadcn components are *added* yet (no UI is being built in this
  task) — just the CLI init (`components.json`, `lib/utils.ts`, base Tailwind config additions).
- Design tokens from `docs/visual-identity-spec.md` §4 (color) and §3 (type scale, golden-ratio
  `clamp()` values from the `awwwards-v8` skill's `aesthetic-foundations.md`) go into
  `app/globals.css` as CSS custom properties — this is the one piece of real design system work
  in this task, because every subsequent task depends on the tokens existing. **No components
  are styled with them yet** — that starts in the next task.
- Manrope self-hosted per `visual-identity-spec.md` §3 (`[VERIFY: confirm the variable-font
  file before committing]` — flagged there already; if unresolved when this task is executed,
  use Manrope's standard Google Fonts static weights as an interim measure via `next/font`
  rather than blocking the whole scaffold on one open verification).

### 2.5 Placeholder route

- `app/layout.tsx` — root layout, loads the font and global stylesheet, no nav/footer yet.
- `app/page.tsx` — minimal placeholder (e.g. "Outubro Idiomas — site em construção") so
  `next build` has something to render. **Not** the real home page from `architecture.md` §1.1 —
  that's `TASK-home-page` (future, not started).

### 2.6 Environment and docs

- `.env.example` — `DATABASE_URI`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`, plus any var the
  Postgres adapter or Blob adapter requires per their own current docs (verify at implementation
  time, don't guess var names).
- `README.md` — status line ("scaffold only, no page content yet") and quickstart (`docker
  compose up`, `npm install`, `npm run dev`, first-admin-user creation at `/admin`).
- `CLAUDE.md` stack table — **pin the actual installed versions** (Next.js, Payload, Postgres
  adapter, Blob adapter, Tailwind) the moment `package.json` exists, per `CLAUDE.md` §3's own
  instruction to itself. This edit happens at the end of this task, not before.

## 3. Why

This is the standard "foundation" task every project on this workflow does before any visual or
content work — it turns three markdown specs into a running (if empty) app so every later task
has a real `next dev` / `/admin` to build against, instead of continuing to plan in the
abstract. Scoping it to schema-only collections and a placeholder page (rather than pulling in
motion, React Bits/Magic UI, or the real page sections) keeps this task reviewable on its own
and avoids baking in decisions that `research.md` §6 hasn't resolved yet (exact page structure
sign-off, content selection, email/analytics provider).

**Alternative considered and rejected**: scaffolding with `create-payload-app`'s own blank
template instead of manual-installing into a `create-next-app` base. Rejected because the prior
UniMeet project on this same workflow already hit this exact problem (`research.md`-equivalent
note in that project: the Payload blank template tracks the monorepo's unreleased HEAD, not a
tagged release, so its dependency versions can run ahead of what the pinned `payload` package
actually exports). Manual install into a known-good `create-next-app` base avoids that class of
version-mismatch bug.

## 4. Affected files

| Path | Change | Notes |
|---|---|---|
| `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.*` | new | from `create-next-app` |
| `.gitignore` | edit | merge Next.js/Payload defaults with any existing entries |
| `app/layout.tsx`, `app/page.tsx`, `app/globals.css` | new | placeholder shell + design tokens |
| `app/(payload)/**` | new | generated by Payload's install |
| `payload.config.ts` | new | Postgres + Vercel Blob adapters wired in |
| `collections/media.ts`, `collections/testimonials.ts`, `collections/faqs.ts`, `collections/pricingPlans.ts`, `collections/teamMembers.ts` | new | schema per §2.3, no seed data |
| `docker-compose.yml` | new | local Postgres 16 for dev |
| `components.json`, `lib/utils.ts` | new | shadcn init |
| `.env.example` | new | every var the code reads |
| `README.md` | edit | status + quickstart |
| `CLAUDE.md` | edit | pin installed versions in the stack table (§3 self-instruction) |

## 5. Verification

- `npm install && npm run build` succeeds with no TypeScript errors.
- `docker compose up -d && npm run dev` boots; `/` renders the placeholder page; `/admin` is
  reachable and allows creating the first admin user.
- All five collections (`media`, `testimonials`, `faqs`, `pricingPlans`, `teamMembers`) appear
  in the Payload admin sidebar and can each create/save a record.
- Uploading a file in the `media` collection actually lands in Vercel Blob (not local disk) —
  confirms the storage adapter is wired correctly, not just installed.
- `.env.example` lists every environment variable the running app actually reads (grep
  `process.env` against the file).
- ESLint runs clean (`npm run lint`) — this repo scaffolds ESLint fresh via `create-next-app`,
  so there's no excuse for the "lint script exists but ESLint was never installed" gap a prior
  project on this workflow shipped with.
- `CLAUDE.md`'s stack table shows real pinned version numbers, not "latest stable."

## 6. Explicitly out of scope

- The real home page and any supporting route from `architecture.md` §1 (separate future task,
  e.g. `TASK-home-page`).
- GSAP/Lenis setup, the signature scroll interaction, any React Bits/Magic UI component
  (separate future task, e.g. `TASK-motion-foundation`).
- Any actual copy, pricing figures, testimonial content, or FAQ content — collections are
  schema-only per §2.3; `research.md` §6 Q3 (content selection) is still open.
- Forms (`architecture.md` §3) — contact/lead and careers forms are a separate task.
- Production database/hosting provisioning — local Docker Postgres only in this task.
- Resolving any `[VERIFY]` item not directly blocking the scaffold itself (e.g. email provider,
  analytics tool, hreflang/English-mirror decision) — those block later tasks, not this one.
