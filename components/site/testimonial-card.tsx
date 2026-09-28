import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";
import type { Dictionary } from "@/content/home/pt";

// One card for the Home subset and /depoimentos. Openly-placeholder entries carry a visible
// "exemplo" tag (roadmap.md content policy), so nobody mistakes the stand-in for a student's
// words. <figure>/<blockquote>/<figcaption>: the quote and who said it, as HTML means it.
export function TestimonialCard({ testimonial, labels }: { testimonial: Testimonial; labels: Dictionary["depoimentos"] }) {
  return (
    <figure className="sticker relative flex h-full flex-col rounded-[28px] bg-[var(--color-bg-alt)] p-6 sm:p-7">
      {testimonial.placeholder ? (
        <span className="type-caps absolute -top-3 right-6 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-pink)] px-3 py-0.5">
          {labels.placeholder}
        </span>
      ) : null}
      <Quote aria-hidden="true" strokeWidth={2} className="size-8 text-[var(--color-cobalt)]" />
      <blockquote className="mt-4 grow text-lg font-semibold leading-snug">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t-2 border-dashed border-[var(--color-border)] pt-5">
        <span className="font-black">{testimonial.studentName}</span>
        <span className="rounded-full bg-[var(--color-lime)] px-3 py-0.5 text-sm font-bold">{labels.languages[testimonial.language]}</span>
      </figcaption>
    </figure>
  );
}
