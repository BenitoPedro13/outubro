import { Paperclip } from "lucide-react";
import { comoFunciona } from "@/content/home";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaLink } from "@/components/site/cta-link";

const notes = [
  { bg: "bg-[var(--color-lime)]", rotate: "sm:-rotate-2" },
  { bg: "bg-[var(--color-bg-alt)]", rotate: "sm:rotate-1" },
  { bg: "bg-[var(--color-pink)]", rotate: "sm:-rotate-1" },
];

// Home → Como funciona (architecture.md §1.1.6). Babbly's numbered sticky notes with a
// paperclip (research.md §4a), on the notebook grid (visual-identity-spec.md §5).
export function ComoFunciona() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="notebook-grid border-b-2 border-[var(--color-ink)]">
      <div className="site-container py-20 lg:py-28">
        <SectionHeading id="como-funciona-title" title={comoFunciona.title} align="center" />

        <ol className="reveal-deck mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {comoFunciona.steps.map((step, i) => (
            <li
              key={step.title}
              className={`sticker relative rounded-md p-7 pt-10 [clip-path:polygon(0_0,100%_0,100%_calc(100%-28px),calc(100%-28px)_100%,0_100%)] ${notes[i].bg} ${notes[i].rotate}`}
            >
              <Paperclip aria-hidden="true" strokeWidth={1.5} className="absolute -top-1 left-6 size-9 -rotate-12" />
              <span aria-hidden="true" className="block text-[3.5rem] font-extrabold leading-none">
                {i + 1}
              </span>
              <h3 className="type-subheading mt-4">{step.title}</h3>
              <p className="mt-2 text-[var(--color-ink)]">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex justify-center">
          <CtaLink>{comoFunciona.cta}</CtaLink>
        </div>
      </div>
    </section>
  );
}
