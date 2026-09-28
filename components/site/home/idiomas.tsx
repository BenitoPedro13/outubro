import { ArrowRight } from "lucide-react";
import { fill, getDictionary } from "@/content/dictionaries";
import { whatsappHref } from "@/content/site";
import { SectionHeading } from "@/components/site/section-heading";

// Card grounds in dictionary order (EN, FR, ES, DE). Text on cobalt must be paper (4.61);
// pink, lime and coral are light and take ink.
const tones = [
  "bg-[var(--color-cobalt)] text-[var(--color-bg-alt)]",
  "bg-[var(--color-pink)] text-[var(--color-ink)]",
  "bg-[var(--color-lime)] text-[var(--color-ink)]",
  "bg-[var(--color-coral)] text-[var(--color-ink)]",
];

const tilts = ["-4deg", "3deg", "-2deg", "4deg"];

// Home → Idiomas (architecture.md §1.1.5). speakPolish's thrown deck (research.md §4b).
// Each whole card is one WhatsApp link with the language already in the message — the
// shortest path from "I want French" to a conversation.
export async function Idiomas() {
  const t = await getDictionary();
  const { idiomas } = t;
  return (
    <section id="idiomas" aria-labelledby="idiomas-title" className="overflow-hidden border-b-2 border-[var(--color-ink)]">
      <div className="site-container py-20 lg:py-28">
        <SectionHeading id="idiomas-title" title={idiomas.title} lead={idiomas.lead} />

        <ul className="mt-6 flex flex-wrap gap-2" aria-label={idiomas.formatsLabel}>
          {idiomas.formats.map((format) => (
            <li key={format} className="type-caps rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-bg-alt)] px-3.5 py-1.5">
              {format}
            </li>
          ))}
        </ul>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-0 lg:px-4">
          {idiomas.languages.map((lang, i) => (
            <li
              key={lang.name}
              className={`deck-card sticker relative flex min-h-[260px] flex-col rounded-[28px] p-6 lg:min-h-[340px] lg:not-first:-ml-5 ${tones[i]}`}
              style={{ "--tilt": tilts[i] } as React.CSSProperties}
            >
              <span className="type-caps">{String(i + 1).padStart(2, "0")}</span>
              <span aria-hidden="true" className="mt-6 block text-[2.75rem] font-black leading-none tracking-tight">
                {lang.hello}
              </span>
              <h3 className="type-subheading mt-auto pt-8">{lang.name}</h3>
              <a
                href={whatsappHref(fill(t.whatsapp.language, { language: lang.inSentence }))}
                target="_blank"
                rel="noopener"
                className="mt-2 inline-flex items-center gap-2 font-bold underline decoration-2 underline-offset-4 after:absolute after:inset-0 after:rounded-[28px] after:content-['']"
              >
                {idiomas.cardCta} {lang.inSentence}
                <ArrowRight aria-hidden="true" strokeWidth={2} className="size-4" />
                <span className="sr-only"> {t.ui.opensWhatsapp}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
