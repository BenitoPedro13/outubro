import type { Faq } from "@/lib/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// FAQ accordion — shadcn Accordion (Radix), vendored unedited; restyled here via className
// (cn merges, so `transition-colors` replaces the vendored `transition-all`, a Tier 1
// anti-pattern). `forceMount` keeps every answer in the server HTML, so the text stays
// indexable and matches the FAQPage JSON-LD; Radix then leaves hiding to us, hence the
// data-state=closed rule on the root (the vendored Content takes no outer className).
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion
      type="multiple"
      className="sticker overflow-hidden rounded-[28px] bg-[var(--color-bg-alt)] [&_[data-slot=accordion-content][data-state=closed]]:hidden"
    >
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="border-[var(--color-ink)] not-last:border-b-2">
          <AccordionTrigger className="min-h-14 items-center gap-4 rounded-none px-5 py-4 text-lg font-bold leading-snug transition-colors duration-150 hover:bg-[var(--color-lime)] hover:no-underline focus-visible:bg-[var(--color-lime)] sm:px-7 **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-[var(--color-ink)]">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent forceMount className="px-5 pb-6 pt-1 text-base text-[var(--color-ink-soft)] sm:px-7">
            {faq.answer.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** schema.org FAQPage for exactly the entries rendered on the page (Google requires it to match visible content). */
export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer.join("\n\n") },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // Next.js JSON-LD guide: escape "<" so the payload can't close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
