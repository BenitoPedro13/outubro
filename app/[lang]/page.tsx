import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/content/dictionaries";
import { languageAlternates, localePath, ogLocale } from "@/content/i18n";
import { site } from "@/content/site";
import { Hero } from "@/components/site/home/hero";
import { MarqueeBand } from "@/components/site/home/marquee-band";
import { Metodo } from "@/components/site/home/metodo";
import { Idiomas } from "@/components/site/home/idiomas";
import { ComoFunciona } from "@/components/site/home/como-funciona";
import { Pilares } from "@/components/site/home/pilares";
import { Diferenciais } from "@/components/site/home/diferenciais";
import { Precos } from "@/components/site/home/precos";
import { CtaFinal } from "@/components/site/home/cta-final";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { seo } = await getDictionary();
  const url = localePath(locale);
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: url, languages: languageAlternates() },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url,
      siteName: site.name,
      title: seo.title,
      description: seo.description,
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

// Home — architecture.md §1.1. Depoimentos and FAQ come from Payload and slot in around
// Precos (TASK-home-cms.md).
export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <Metodo />
      <Idiomas />
      <ComoFunciona />
      <Pilares />
      <Diferenciais />
      <Precos />
      <CtaFinal />
    </>
  );
}
