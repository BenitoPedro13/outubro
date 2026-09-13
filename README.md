# Outubro Idiomas — website rebuild

**Status (2026-09-13):** Home (`/`) is live in code with its 10 code-owned sections —
`docs/tasks/TASK-home-static.md`. Testimonials, pricing and FAQ wait for Payload
(`docs/tasks/TASK-scaffold.md`, not yet executed). Copy marked `[CONTENT]` in `content/home.ts`
is draft wording pending `docs/client-content-request.md`. The approved planning document stays at
`/apresentacao` (noindex).

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
