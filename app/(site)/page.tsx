import type { Metadata } from "next";
import { seo } from "@/content/home";
import { Hero } from "@/components/site/home/hero";
import { MarqueeBand } from "@/components/site/home/marquee-band";
import { Metodo } from "@/components/site/home/metodo";
import { Idiomas } from "@/components/site/home/idiomas";
import { ComoFunciona } from "@/components/site/home/como-funciona";
import { Pilares } from "@/components/site/home/pilares";
import { Diferenciais } from "@/components/site/home/diferenciais";
import { CtaFinal } from "@/components/site/home/cta-final";

export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Outubro Idiomas",
    title: seo.title,
    description: seo.description,
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
};

// Home — architecture.md §1.1. Sections 9-11 (Depoimentos, Preços, FAQ) come from
// Payload and slot in between Diferenciais and CtaFinal (TASK-home-cms.md).
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
      <CtaFinal />
    </>
  );
}
