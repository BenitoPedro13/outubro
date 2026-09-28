import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/content/dictionaries";
import { getPageDictionary } from "@/content/pages";
import { getTestimonials } from "@/lib/testimonials";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHero } from "@/components/site/page-hero";
import { TestimonialCard } from "@/components/site/testimonial-card";
import { CtaLink } from "@/components/site/cta-link";
import { CtaFinal } from "@/components/site/home/cta-final";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getPageDictionary("depoimentos")]);
  return pageMetadata(locale, "depoimentos", t.seo);
}

// /depoimentos — architecture.md §1: every testimonial (the Home shows the featured ones).
// Entries from lib/testimonials.ts (Payload-shaped until TASK-cms), openly placeholders
// until the client adds real ones.
export default async function DepoimentosPage() {
  const locale = await getLocale();
  const [home, t, testimonials] = await Promise.all([getDictionary(), getPageDictionary("depoimentos"), getTestimonials({ locale })]);

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      <div className="border-b-2 border-[var(--color-ink)] bg-[var(--color-cobalt)]">
        <div className="site-container py-16 lg:py-24">
          <ul className="reveal-deck grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {testimonials.map((testimonial) => (
              <li key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} labels={home.depoimentos} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section aria-labelledby="share-title" className="border-b-2 border-[var(--color-ink)]">
        <div className="site-container flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between lg:py-20">
          <div>
            <h2 id="share-title" className="type-heading">
              {t.share.title}
            </h2>
            <p className="type-lead max-w-[46ch]">{t.share.body}</p>
          </div>
          <CtaLink variant="ink" message={t.share.message} className="shrink-0">
            {t.share.cta}
          </CtaLink>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
