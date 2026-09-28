// Search-engine indexing switch — docs/tasks/TASK-brand-alignment.md §8.
// OFF unless SITE_INDEXABLE=true: while copy, prices and translations are still drafts
// (client-content-request.md), a public deploy must not land in Google or compete with the
// current live site. Read at build time; flip it in the Vercel project env at launch and
// redeploy.
export const indexable = process.env.SITE_INDEXABLE === "true";
