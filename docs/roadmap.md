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
| **Testimonials** | **no, never invented** | Inventing quotes attributed to students would be fake reviews on a public site. The section and page get built and wired to the CMS, but they **render only when at least one real, published testimonial exists**. The client sends 3-6 real ones (name, language, quote, consent) |
| Team/teacher photos | no | needs real people's consent; `teamMembers` stays deferred |

## The sequence

Each step's blockers are listed; everything else can start right away.

### 1. `TASK-scaffold` (finish it): Payload, Postgres, Blob
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

### 2. `TASK-home-cms`: Home reads from Payload
- `lib/pricing.ts` body → Payload query. 2026 + 2027 rows seeded once (initial seed only; edits
  happen in the admin panel afterwards).
- **FAQ section** on the Home (curated 5-6, accordion from a vetted primitive: shadcn/Radix
  Accordion, not hand-rolled) + `FAQPage` JSON-LD.
- **Depoimentos section**, hidden until real content exists (see content policy).
- On-demand revalidation: Payload `afterChange` hooks revalidate the affected pages in all three
  locales. Pages stay static.
- Data fetching: Server Components call Payload's Local API through one function per collection
  in `lib/` (no client fetching → no TanStack Query needed yet; it comes in if a client
  component ever needs server data).

### 3. `TASK-pages-static`: pages that need no CMS
- `/metodo`: brand essence, the three pillars in depth, the Communicative Approach, how classes
  run. Built from the brandbook's own words.
- `/contato`: WhatsApp (primary), Instagram, email if the client has one. **No contact form**
  (recommended: WhatsApp is the real enrolment channel, and a form adds a data-collection
  surface plus an email dependency for no conversion gain).
- `/politica-de-privacidade`: draft, flagged for legal review. Must exist before any form ships.
- **Localized URLs** (recommended): `/metodo` · `/en/method` · `/es/metodo`, via a slug map in
  `content/i18n.ts` + rewrites, so EN/ES URLs read naturally. Needs the general PT rewrite
  (`/:path` → `/pt/:path`) that only `/` has today.
- Each page gets its own title, description, canonical, hreflang, OG image and sitemap entry.

### 4. `TASK-pages-cms`: pages fed by Payload
- `/precos`: the full 2026 table and the 2027 comparison + "entenda o reajuste" copy (drafted).
- `/faq`: the full list, grouped (Aulas, Pagamento, Reposição, Cancelamento), `FAQPage` JSON-LD.
- `/depoimentos`: renders once real testimonials exist; until then it's a 404 (not an empty
  page) and stays out of the sitemap and nav.
- **Blocked by:** step 1.

### 5. `TASK-careers-form`: `/trabalhe-conosco`
- Typed form (react-hook-form + zod or the platform's native form + a Server Action; pick in the
  task doc), **persisted** to a Payload `applications` collection **and** emailed to the school.
  Never email-only, never logged. Honeypot + rate limit.
- Email provider via the Vercel Marketplace `messaging` category (decided in that task doc).
- **Blocked by:** steps 1 and 3 (privacy policy), plus the client's email address for
  notifications.

### 6. `TASK-launch`
- **Analytics: Vercel Web Analytics.** Cookieless and first-party, so no cookie banner (resolves
  `architecture.md` §6's open item).
- Point `outubroidiomas.com` to Vercel, set `NEXT_PUBLIC_SITE_URL`, redirect the old site's URLs
  (and the linktr.ee "WEBSITE IN ENGLISH" link → `/en`).
- Final content pass with the client (every `[CONTENT]` tag), native EN/ES review.
- Performance budget check at 375/768/1440 (LCP, CLS, JS weight: Tier 2 budget,
  `architecture.md` §4).
- `SITE_INDEXABLE=true` → redeploy → submit the sitemap in Google Search Console.

## Order and parallelism

```
1 scaffold ──► 2 home-cms ──► 4 pages-cms ──┐
   │                                          ├─► 6 launch
3 pages-static (starts now, no blockers) ──► 5 careers-form ─┘
```

Step 3 can run while the user handles the Vercel provisioning for step 1.

## Decisions needed from the user

1. **Provisioning**: OK to `vercel link` this repo and add Neon Postgres + a Blob store to the
   Vercel project? (Unblocks steps 1, 2, 4, 5.)
2. **Testimonials**: agree the section/page stay hidden until real testimonials arrive, rather
   than invented placeholders?
3. **EN/ES URLs**: localized slugs (`/en/method`, recommended) or the same PT slugs under each
   prefix (`/en/metodo`)?
4. **Contact**: WhatsApp-only `/contato`, with no contact form (recommended)?
