import { getDictionary, getLocale } from "@/content/dictionaries";
import { localePath } from "@/content/i18n";
import { getFaqs } from "@/lib/faqs";
import { SectionHeading } from "@/components/site/section-heading";
import { FaqJsonLd, FaqList } from "@/components/site/faq-list";
import { ArrowLink } from "@/components/site/arrow-link";

// Home → FAQ (architecture.md §1.1.11): the featured entries, linking to /faq for the rest.
// Entries from lib/faqs.ts (Payload-shaped until TASK-cms).
export async function Faq() {
  const locale = await getLocale();
  const [t, faqs] = await Promise.all([getDictionary(), getFaqs({ locale, featured: true })]);
  if (faqs.length === 0) return null;

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-b-2 border-[var(--color-ink)] notebook-grid">
      <div className="site-container grid gap-10 py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-28">
        <div>
          <SectionHeading id="faq-title" title={t.faq.title} lead={t.faq.lead} />
          <ArrowLink href={localePath(locale, "faq")} className="mt-6 hidden lg:inline-flex">
            {t.faq.seeAll}
          </ArrowLink>
        </div>
        <div>
          <FaqList faqs={faqs} />
          <ArrowLink href={localePath(locale, "faq")} className="mt-8 lg:hidden">
            {t.faq.seeAll}
          </ArrowLink>
        </div>
      </div>
      <FaqJsonLd faqs={faqs} />
    </section>
  );
}
