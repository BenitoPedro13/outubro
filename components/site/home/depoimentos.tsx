import { getDictionary, getLocale } from "@/content/dictionaries";
import { localePath } from "@/content/i18n";
import { getTestimonials } from "@/lib/testimonials";
import { SectionHeading } from "@/components/site/section-heading";
import { TestimonialCard } from "@/components/site/testimonial-card";
import { ArrowLink } from "@/components/site/arrow-link";

// Home → Testimonials (architecture.md §1.1.9): the curated subset, linking to /depoimentos.
// Entries from lib/testimonials.ts (Payload-shaped until TASK-cms).
export async function Depoimentos() {
  const locale = await getLocale();
  const [t, testimonials] = await Promise.all([getDictionary(), getTestimonials({ locale, featured: true })]);
  if (testimonials.length === 0) return null;

  return (
    <section id="depoimentos" aria-labelledby="depoimentos-title" className="border-b-2 border-[var(--color-ink)] bg-[var(--color-cobalt)]">
      <div className="site-container py-20 lg:py-28">
        {/* Paper panel behind the heading: ink/ink-soft on cobalt fails contrast. */}
        <div className="sticker inline-block rounded-[28px] bg-[var(--color-bg-alt)] px-6 py-5 sm:px-8">
          <SectionHeading id="depoimentos-title" title={t.depoimentos.title} lead={t.depoimentos.lead} />
        </div>

        <ul className="reveal-deck mt-12 grid gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} labels={t.depoimentos} />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <span className="rounded-full bg-[var(--color-bg-alt)] px-5">
            <ArrowLink href={localePath(locale, "depoimentos")}>{t.depoimentos.seeAll}</ArrowLink>
          </span>
        </div>
      </div>
    </section>
  );
}
