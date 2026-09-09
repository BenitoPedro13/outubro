"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { shouldSkipDecorativeMotion } from "@/lib/motion";
import { DocContainer } from "./bits";

type SectionProps = {
  n: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  wide?: boolean;
  bg?: string;
  grid?: boolean;
};

// Numbered editorial section — same rhythm as the UniMeet pitch page's Section
// component: a rule, a number, a title, an optional lead, then content. `bg`/`grid`
// let a section break from the default page background (full-bleed color or
// notebook-grid), which is how Babbly's own case study alternates slides.
//
// Climb-over, take 2: `position: sticky` (tried first) pins a section at `top: 0`
// for exactly its own height's worth of scroll — fine for speakPolish's own short
// bite-sized bars, but a section taller than one viewport gets stuck with its lower
// content permanently below the fold, unreachable (confirmed live: it trapped the
// footer under section 08). Fixed here with a static, non-trapping version of the
// same read: each section is a rounded-top "sheet" with a lifting shadow that rises
// into place on scroll — looks like the next sheet climbing over the last one,
// never pins anything, so tall sections scroll normally start to finish.
export function Section({ n, title, lead, children, wide = false, bg, grid = false }: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || shouldSkipDecorativeMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.set(el, { y: 48, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={ref}
      id={`s${n}`}
      className={`full-bleed relative rounded-t-[40px] py-20 shadow-[0_-24px_48px_-24px_rgba(20,18,15,0.25)] sm:py-28 ${grid ? "notebook-grid" : ""}`}
      style={{ background: bg ?? "var(--color-bg)", zIndex: 10 + Number(n) }}
    >
      <DocContainer wide={wide}>
        <header className="mb-10">
          <hr className="doc-rule" />
          <div className="mt-3">
            <span className="doc-label">{n}</span>
          </div>
          <h2 className="type-display mt-4">{title}</h2>
          {lead ? <p className="type-lead mt-4 max-w-[62ch]">{lead}</p> : null}
        </header>
        {children}
      </DocContainer>
    </section>
  );
}
