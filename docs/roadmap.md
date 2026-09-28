# Roadmap to launch

Written 2026-09-27, after `TASK-brand-alignment.md`. The user's direction: **"u can create the
content yourself for now, we can change it later"**. Each step below becomes its own
`docs/tasks/TASK-<slug>.md` before any code (CLAUDE.md §1).

## Where we are

| Area | State |
|---|---|
| Home (`/`, `/en`, `/es`) | 11 of 13 sections live on `outubroidiomas.vercel.app` (noindex). Missing: Depoimentos, FAQ |
| Supporting pages (`architecture.md` §1) | none built: `/precos`, `/metodo`, `/depoimentos`, `/faq`, `/trabalhe-conosco`, `/contato`, `/politica-de-privacidade` |
| CMS (Payload + Postgres + Blob) | not installed. Pricing lives in `lib/pricing.ts` as a Payload-shaped stand-in |
| Forms, email, analytics, domain | none |

**Compatibility checked 2026-09-27:** `@payloadcms/next` 3.90.2 peer range includes
`next >=16.3.3 <17`. We run 16.3.4, so Payload 3 installs without downgrading Next.

## Content policy: what "create the content yourself" covers

Every drafted string gets the existing `[CONTENT]` tag and an entry in
`client-content-request.md`, so the client pass knows exactly what to review.

| Content | Drafted by us | Source it's grounded in |
|---|---|---|
| FAQ (≈8-10 Q&A, PT/EN/ES) | yes | the client's own rules panel in `docs/Imagens da Outubro/Manual calendarios/` (postponing: 1 class × weekly frequency per month; make-ups: up to 50% of monthly classes; cancelling: pay the next invoice after notice; rescheduling windows) + site facts (formats, frequencies, materials included, no fines) |
| `/metodo` page copy | yes | brandbook (manifesto, essence, purpose, values, tone of voice) + pillars already on the site |
| `/contato`, careers intro, 404 copy | yes | site facts |
| Careers form fields | proposed by us | a standard teacher-application set; client confirms |
| Privacy policy | **drafted by us, marked "needs legal review"** | LGPD structure for exactly the data we collect |
| Prices 2027 | yes (shown on `/precos` only) | verbatim from the current site capture |
| **Testimonials** | **visible example cards, never invented quotes** | User decision 2026-09-28: "dont hide, he will change on the admin afterwards". The section and `/depoimentos` render from the CMS from day one, seeded with 3 entries that are **openly placeholders** ("Nome do aluno · Inglês", "Aqui entra o depoimento real de um aluno…"), never fake quotes presented as real students'. The client replaces them in the admin with real ones (name, language, quote, consent) |
| Team/teacher photos | no | needs real people's consent; `teamMembers` stays deferred |

## The sequence

Each step's blockers are listed; everything else can start right away.

### 1. `TASK-scaffold` (finish it): Payload, Postgres, Blob

**Provisioning done 2026-09-28** (user-approved): repo linked to Vercel project
`benitopedro13s-projects/outubroidiomas`; **Neon Postgres** `outubro-db` (free plan, region
`gru1` São Paulo, Neon auth off since Payload has its own) and **Vercel Blob** store
`outubro-media` (public, `gru1`), both connected to production/preview/development. Env vars in
the Vercel project and pulled to the gitignored `.env.local`: `DATABASE_URL` (+ unpooled/`PG*`/
`POSTGRES_*` variants) and `BLOB_READ_WRITE_TOKEN`. Still to add: `PAYLOAD_SECRET`, set
the functions region to `gru1` so functions sit next to the database, and **a Neon development
branch** for local/preview work: today development and preview point at production's database
(found by the 2026-09-28 spike, `TASK-scaffold.md`).

- Link the repo to the Vercel project (`vercel link`), provision **Neon Postgres** via the Vercel
  Marketplace (`vercel integration add neon`) and a **Vercel Blob** store, then `vercel env pull`.
  Env vars arrive automatically (connection string, `BLOB_READ_WRITE_TOKEN`); we add
  `PAYLOAD_SECRET`. All go in `.env.example` by name.
- Payload's documented **manual install into the existing Next app** (`payload`,
  `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/storage-vercel-blob`,
  `@payloadcms/richtext-lexical`). The `app/(payload)` route group becomes a third root layout
  next to `app/[lang]` and `(preview)`. `/admin` is a static segment, so it wins over `[lang]`.
- **Localization on** (`pt` default, `en`, `es`). Every text field in the collections is
  localized, so one entry holds all three languages.
- Collections: `media`, `testimonials`, `faqs`, `pricingPlans`, `users` (admin only).
  `teamMembers` is deferred (no consent yet).
- Migrations through Payload's workflow, reviewed by hand before commit.
- **Blocked by:** the user approving the link and provisioning in their Vercel account (both have
  free tiers; account-level actions, so the user confirms before we run them).

### 2. `TASK-cms` (was `home-cms` + `pages-cms`): every page reads from Payload
**Order changed 2026-09-28** (user: build all pages first, apply the CMS afterwards). The Home's
FAQ/Depoimentos sections and `/precos`, `/faq`, `/depoimentos` are now built in step 3 on
Payload-shaped stand-ins (`TASK-pages-static.md` §2.1). This step installs Payload, creates the
collections from those types, seeds them once, and swaps the `get*` function bodies. What
follows is what it still covers:
- `lib/pricing.ts` body → Payload query. 2026 + 2027 rows seeded once (initial seed only; edits
  happen in the admin panel afterwards).
- **`Course`/`Service` structured data** for the language offer (open `[VERIFY]` in
  `architecture.md` §5: check current schema.org/Google guidance first).
- **FAQ section** on the Home (curated 5-6, accordion from a vetted primitive: shadcn/Radix
  Accordion, not hand-rolled) + `FAQPage` JSON-LD.
- **Depoimentos section**, visible from day one with the openly-placeholder entries (see
  content policy); the client swaps in real ones in the admin.
- On-demand revalidation: Payload `afterChange` hooks revalidate the affected pages in all three
  locales. Pages stay static.
- Data fetching: Server Components call Payload's Local API through one function per collection
  in `lib/` (no client fetching → no TanStack Query needed yet; it comes in if a client
  component ever needs server data).

### 3. `TASK-pages-static`: every page, built first
Scope widened 2026-09-28: all pages, including the CMS-bound ones on stand-ins, plus the
`/admin`-safe routing (explicit per-page rewrites from a slug map, never a catch-all) and a
throwaway Payload spike that proves `/admin` and the localized pages coexist (**passed
2026-09-28**; install findings in `TASK-scaffold.md`). Full plan in
`docs/tasks/TASK-pages-static.md`.
- `/metodo`: brand essence, the three pillars in depth, the Communicative Approach, how classes
  run. Built from the brandbook's own words.
- `/contato`: WhatsApp (primary), Instagram, email if the client has one. **No contact form**
  (recommended: WhatsApp is the real enrolment channel, and a form adds a data-collection
  surface plus an email dependency for no conversion gain).
- `/politica-de-privacidade`: draft, flagged for legal review. Must exist before any form ships.
- **Localized URLs** — **done 2026-09-28**: `/metodo` · `/en/method` · `/es/metodo`, from the
  `routes` map in `content/i18n.ts`; `lib/localized-routes.ts` turns it into one exact rewrite
  and one redirect per page and locale. No general `/:path` → `/pt/:path` rewrite: that
  catch-all is what would have broken `/admin` (task doc §2.3).
- Each page gets its own title, description, canonical, hreflang, OG image and sitemap entry.
- **Navigation for a multi-page site** (gap found 2026-09-28): today the header only has Home
  anchors (`#metodo`…) and phones get no nav at all. Once real pages exist, the header links to
  them (anchors only on the Home), the footer gets a sitemap column, and phones get a menu built
  on a vetted accessible primitive (shadcn Sheet / Radix Dialog), not a hand-rolled toggle.
- **Icons** (gap): `app/icon.png` is the 1080px, 38 KB symbol PNG. Replace it with an `icon.svg`
  from the traced symbol, plus an `apple-icon.png` and a web manifest.

### 4. ~~`TASK-pages-cms`~~: folded into steps 2 and 3 (2026-09-28)
- `/precos`: the full 2026 table and the 2027 comparison + "entenda o reajuste" copy (drafted).
- `/faq`: the full list, grouped (Aulas, Pagamento, Reposição, Cancelamento), `FAQPage` JSON-LD.
- `/depoimentos`: renders the CMS entries (placeholders until the client replaces them).
- **Blocked by:** step 1.

### 5. `TASK-careers-form`: `/trabalhe-conosco`
- Typed form (react-hook-form + zod or the platform's native form + a Server Action; pick in the
  task doc), **persisted** to a Payload `applications` collection **and** emailed to the school.
  Never email-only, never logged. Honeypot + rate limit.
- Email provider via the Vercel Marketplace `messaging` category (decided in that task doc).
- **Blocked by:** steps 1 and 3 (privacy policy), plus the client's email address for
  notifications.

### 5b. `TASK-cms-handoff`: the client can actually use the admin
- Admin accounts for the client (not shared credentials), with roles if more than one editor.
- A short PT guide (`docs/guia-do-admin.md`): editing prices, FAQ and testimonials in all three
  languages, uploading images, and what a "published" change triggers (the page revalidates).
- Backups: confirm Neon's restore window on the free plan and write down how to restore.

### 6. `TASK-launch`
- **Analytics: Vercel Web Analytics.** Cookieless and first-party, so no cookie banner (resolves
  `architecture.md` §6's open item).
- Point `outubroidiomas.com` to Vercel, set `NEXT_PUBLIC_SITE_URL`, redirect the old site's URLs
  (and the linktr.ee "WEBSITE IN ENGLISH" link → `/en`).
- Final content pass with the client (every `[CONTENT]` tag), native EN/ES review.
- Performance budget check at 375/768/1440 (LCP, CLS, JS weight: Tier 2 budget,
  `architecture.md` §4).
- **WCAG 2.2 AA audit** across every page at 375/768/1440: keyboard-only pass, screen-reader
  pass (VoiceOver), contrast re-check, reduced-motion check. The standard is non-negotiable
  (global CLAUDE.md); this is the explicit end-to-end pass, not a replacement for doing it per
  task.
- **Conversion measurement**: count WhatsApp CTA clicks per section/locale. Vercel Web
  Analytics custom events depend on the Vercel plan `[VERIFY: current plan limits]`; decide the
  tool in the task doc.
- **Legal footer details**: company name and CNPJ (the privacy policy must name the data
  controller). Needs the client.
- **Old-site redirect map**: list the current `outubroidiomas.com` URLs (needs access to the old
  host or a crawl) and 301 each to its new equivalent.
- Decide `/apresentacao`'s fate: delete, or keep it noindex behind the preview layout.
- A smoke test that runs before each deploy: every route returns 200 in all three locales, the
  forms submit, no page is missing its title/description/hreflang. None exists yet; Playwright
  is the likely pick, confirmed in the task doc.
- `SITE_INDEXABLE=true` → redeploy → submit the sitemap in Google Search Console.

## Waiting on the client (not buildable until answered)

Tracked in `client-content-request.md`. None of these block the steps above; they fill them in.

- Real testimonials (replace the placeholders), prices confirmation, 2027 switch date.
- Native review of EN/ES, and who the EN/ES visitor is.
- Logo vector files, brandbook §2.2 illustration files.
- Free-materials library and Blogspot blog: stay external or move on-domain (`research.md` §6
  Q2)? A `/blog` route exists only if they move.
- Teacher photos on `/metodo` (`teamMembers`), only with each person's consent.
- Email address for teacher applications; CNPJ/company name for the legal footer.
- Domain access for `outubroidiomas.com`.

## Housekeeping

- `docs/Imagens da Outubro/` and the brandbook PDF (20 MB) are untracked: commit or gitignore?
- `.claude/` and `skills-lock.json` (added by the Neon agent-skill install): commit or ignore?

## Order and parallelism

```
3 pages-static (all pages on stand-ins + routing + Payload spike) ──┐
                                                                     ├─► 2 cms ──► 5 careers-form ──► 5b cms-handoff ──► 6 launch
1 scaffold (Payload install, informed by the spike) ─────────────────┘
```

Step 3 goes first; step 1 finishes once the spike has shown the install is safe.

## Decisions (answered by the user 2026-09-28)

1. **Provisioning**: yes, link the repo and add Neon Postgres + a Blob store to the Vercel project.
2. **Testimonials**: don't hide them. Visible, openly-placeholder entries the client replaces in
   the admin (no invented quotes; see content policy).
3. **EN/ES URLs**: localized slugs (`/metodo` · `/en/method` · `/es/metodo`).
4. **Contact**: WhatsApp-only `/contato`, no contact form.
5. **Order**: build every page first on Payload-shaped stand-ins, plug the CMS in afterwards,
   and make sure `/admin` can't break (`TASK-pages-static.md` §2.3). Testimonials therefore
   render from a stand-in array, still openly placeholders, until `TASK-cms`.
