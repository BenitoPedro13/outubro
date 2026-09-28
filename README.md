# Outubro Idiomas — website rebuild

**Status (2026-09-27):** Home is live in code in three languages (PT at `/`, EN at `/en`, ES at
`/es`) with 11 sections, now aligned to the client's brandbook (`docs/Outubro Idiomas_brandbook.pdf`):
exact palette, Source Sans 3, the official logo (traced to SVG) and a pricing section —
`docs/tasks/TASK-brand-alignment.md`. Testimonials and FAQ wait for Payload
(`docs/tasks/TASK-scaffold.md`, not yet executed); pricing sits in `lib/pricing.ts` until then.
Copy marked `[CONTENT]` in `content/home/*.ts` is draft wording pending
`docs/client-content-request.md` (EN/ES are unreviewed translations). The approved planning
document stays at `/apresentacao` (noindex).

Read `CLAUDE.md` first, then `docs/research.md` → `docs/architecture.md` →
`docs/visual-identity-spec.md`.

## Quickstart

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Payload admin, database, and Blob storage are not wired up yet (`TASK-scaffold.md`) — this
currently runs the Next.js app only.
