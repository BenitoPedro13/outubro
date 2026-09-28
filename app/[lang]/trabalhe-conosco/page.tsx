import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { getDictionary, getLocale } from "@/content/dictionaries";
import { getPageDictionary } from "@/content/pages";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getPageDictionary("trabalhe-conosco")]);
  return pageMetadata(locale, "trabalhe-conosco", t.seo);
}

// /trabalhe-conosco — architecture.md §1. Intro only: the on-site application form is
// TASK-careers-form (persisted to Payload + emailed, never email-only). Until it ships,
// "how to apply" points at the school's current external form (content/site.ts → careers).
// Not a student page, so no WhatsApp enrolment band at the end.
export default async function TrabalheConoscoPage() {
  const [home, t] = await Promise.all([getDictionary(), getPageDictionary("trabalhe-conosco")]);

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      <section aria-labelledby="oferta-title" className="border-b-2 border-[var(--color-ink)] bg-[var(--color-pink)]">
        <div className="site-container py-16 lg:py-24">
          <SectionHeading id="oferta-title" title={t.oferta.title} lead={t.oferta.lead} leadInk />
          <ul className="reveal-deck mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.oferta.items.map((item) => (
              <li key={item.title} className="sticker rounded-3xl bg-[var(--color-bg-alt)] p-6">
                <h3 className="type-subheading">{item.title}</h3>
                <p className="mt-2 text-[var(--color-ink-soft)]">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="perfil-title" className="border-b-2 border-[var(--color-ink)]">
        <div className="site-container grid gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <SectionHeading id="perfil-title" title={t.perfil.title} />
            <ul className="mt-8 grid gap-4">
              {t.perfil.items.map((item) => (
                <li key={item} className="flex gap-3 text-lg">
                  <span aria-hidden="true" className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[var(--color-lime)]">
                    <Check strokeWidth={2.5} className="size-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="sticker self-start rounded-[28px] bg-[var(--color-lime)] p-6 sm:p-8">
            <h2 className="type-heading">{t.candidatura.title}</h2>
            <p className="text-lg">{t.candidatura.body}</p>
            <a href={site.careers} target="_blank" rel="noopener" className="btn-cta btn-cta--ink mt-6">
              <span>{t.candidatura.cta}</span>
              <ArrowUpRight aria-hidden="true" strokeWidth={2} className="size-5" />
              <span className="sr-only"> {home.ui.opensNewTab}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
