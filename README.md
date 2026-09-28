# Outubro Idiomas — website rebuild

**Status (2026-09-28):** every page is built in three languages (PT unprefixed, EN under `/en`, ES
under `/es`, localized slugs): the full Home plus Preços, Método, Depoimentos, FAQ, Contato,
Trabalhe conosco and a draft Política de privacidade (`docs/tasks/TASK-pages-static.md`), aligned
to the client's brandbook. Pricing, FAQ and testimonials read Payload-shaped stand-ins in `lib/`
until Payload is installed (`docs/tasks/TASK-scaffold.md`, then `TASK-cms`); testimonials are
openly-placeholder cards. Copy marked `[CONTENT]` in `content/home/*.ts`, `content/pages/**` and
`lib/faqs.ts` is draft wording pending
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

**Launch checklist item:** deploys are `noindex` until `SITE_INDEXABLE=true` is set in the
Vercel project env (`lib/indexing.ts`); set it only when content is final, then redeploy.

Payload admin, database, and Blob storage are not wired up yet (`TASK-scaffold.md`) — this
currently runs the Next.js app only.
