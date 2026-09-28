import type { Metadata } from "next";
import { ArrowUpRight, AtSign, MessageCircle } from "lucide-react";
import { getDictionary, getLocale } from "@/content/dictionaries";
import { getPageDictionary } from "@/content/pages";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHero } from "@/components/site/page-hero";
import { CtaLink } from "@/components/site/cta-link";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getPageDictionary("contato")]);
  return pageMetadata(locale, "contato", t.seo);
}

// /contato — architecture.md §1. WhatsApp first (the enrolment channel), Instagram second.
// No contact form (roadmap.md decision 4, 2026-09-28). An email card is added once the
// client gives us an address (client-content-request.md).
export default async function ContatoPage() {
  const [home, t] = await Promise.all([getDictionary(), getPageDictionary("contato")]);
  // "+55-21-92011-5154" → "+55 21 92011-5154", the way a Brazilian number is written.
  const phone = site.telephone.replace(/^(\+\d+)-(\d+)-/, "$1 $2 ");

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      <div className="border-b-2 border-[var(--color-ink)]">
        <div className="site-container grid gap-8 py-16 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-6 lg:py-24">
          <article className="sticker flex flex-col rounded-[28px] bg-[var(--color-lime)] p-6 sm:p-8">
            <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-10" />
            <h2 className="type-heading mt-4" style={{ paddingBottom: 0 }}>
              {t.whatsapp.title}
            </h2>
            <p className="mt-1 text-2xl font-black tabular-nums">{phone}</p>
            <p className="mt-3 grow text-lg">{t.whatsapp.body}</p>
            <div className="mt-6">
              <CtaLink variant="ink">{t.whatsapp.cta}</CtaLink>
            </div>
          </article>

          <article className="sticker flex flex-col rounded-[28px] bg-[var(--color-bg-alt)] p-6 sm:p-8">
            <AtSign aria-hidden="true" strokeWidth={1.75} className="size-10 text-[var(--color-cobalt)]" />
            <h2 className="type-heading mt-4" style={{ paddingBottom: 0 }}>
              {t.instagram.title}
            </h2>
            <p className="mt-3 grow text-lg text-[var(--color-ink-soft)]">{t.instagram.body}</p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener"
              className="group mt-6 inline-flex min-h-11 items-center gap-1.5 self-start text-lg font-bold underline decoration-[var(--color-coral)] decoration-[3px] underline-offset-[6px] transition-colors duration-150 hover:decoration-[var(--color-cobalt)]"
            >
              {t.instagram.cta}
              <ArrowUpRight aria-hidden="true" strokeWidth={2} className="size-5 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only"> {home.ui.opensNewTab}</span>
            </a>
          </article>
        </div>
      </div>
    </>
  );
}
