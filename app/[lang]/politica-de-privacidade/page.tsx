import type { Metadata } from "next";
import { TriangleAlert } from "lucide-react";
import { fill, getLocale } from "@/content/dictionaries";
import { getPageDictionary } from "@/content/pages";
import { intlLocale } from "@/content/i18n";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHero } from "@/components/site/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getPageDictionary("politica-de-privacidade")]);
  return pageMetadata(locale, "politica-de-privacidade", t.seo);
}

/** Bump whenever the policy text changes (its "Mudanças" section promises a new date). */
const UPDATED = "2026-09-28";

// /politica-de-privacidade — architecture.md §1. DRAFT pending legal review (roadmap.md
// content policy), and says so on the page. Must be revised before any form or analytics ships.
export default async function PoliticaPage() {
  const [locale, t] = await Promise.all([getLocale(), getPageDictionary("politica-de-privacidade")]);
  const date = new Intl.DateTimeFormat(intlLocale[locale], { dateStyle: "long", timeZone: "UTC" }).format(new Date(UPDATED));

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead}>
        <p className="mt-6 text-sm font-semibold text-[var(--color-ink-soft)]">
          {fill(t.updated, { date })}
        </p>
      </PageHero>

      <div className="border-b-2 border-[var(--color-ink)]">
        <div className="site-container py-16 lg:py-24">
          <p role="note" className="sticker flex max-w-[65ch] items-start gap-3 rounded-2xl bg-[var(--color-pink)] px-5 py-4 font-bold">
            <TriangleAlert aria-hidden="true" strokeWidth={2} className="mt-0.5 size-5 shrink-0" />
            {t.draftNotice}
          </p>
          <div className="mt-12 grid max-w-[65ch] gap-10">
            {t.sections.map((section) => (
              <section key={section.title} aria-labelledby={`${slug(section.title)}-title`}>
                <h2 id={`${slug(section.title)}-title`} className="type-subheading">
                  {section.title}
                </h2>
                <div className="mt-3 grid gap-3 text-lg">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function slug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
