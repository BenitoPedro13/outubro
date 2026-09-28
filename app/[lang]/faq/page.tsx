import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/content/dictionaries";
import { getPageDictionary } from "@/content/pages";
import { faqCategories, getFaqs } from "@/lib/faqs";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHero } from "@/components/site/page-hero";
import { FaqJsonLd, FaqList } from "@/components/site/faq-list";
import { CtaLink } from "@/components/site/cta-link";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getPageDictionary("faq")]);
  return pageMetadata(locale, "faq", t.seo);
}

// /faq — architecture.md §1: every entry, grouped by category, with FAQPage JSON-LD for
// exactly what's on the page. Entries from lib/faqs.ts (Payload-shaped until TASK-cms).
export default async function FaqPage() {
  const locale = await getLocale();
  const [home, t, faqs] = await Promise.all([getDictionary(), getPageDictionary("faq"), getFaqs({ locale })]);
  const groups = faqCategories.map((category) => ({ category, faqs: faqs.filter((f) => f.category === category) })).filter((g) => g.faqs.length > 0);

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead}>
        <nav aria-label={t.jumpLabel} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {groups.map(({ category }) => (
              <li key={category}>
                <a
                  href={`#${category}`}
                  className="inline-flex min-h-11 items-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-bg-alt)] px-4 font-bold transition-colors duration-150 hover:bg-[var(--color-lime)]"
                >
                  {home.faq.categories[category]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="border-b-2 border-[var(--color-ink)]">
        <div className="site-container grid gap-14 py-16 lg:py-24">
          {groups.map(({ category, faqs: entries }) => (
            <section key={category} id={category} aria-labelledby={`${category}-title`} className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
              <h2 id={`${category}-title`} className="type-heading lg:sticky lg:top-32 lg:self-start">
                {home.faq.categories[category]}
              </h2>
              <FaqList faqs={entries} />
            </section>
          ))}
        </div>
      </div>

      <section id="cta-final" aria-labelledby="more-title" className="bg-[var(--color-lime)]">
        <div className="site-container flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between lg:py-20">
          <h2 id="more-title" className="type-display">
            {t.more.title}
          </h2>
          <CtaLink variant="ink" className="shrink-0">
            {t.more.cta}
          </CtaLink>
        </div>
      </section>

      <FaqJsonLd faqs={faqs} />
    </>
  );
}
