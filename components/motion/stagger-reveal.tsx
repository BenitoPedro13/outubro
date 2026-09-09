"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { shouldSkipDecorativeMotion } from "@/lib/motion";

// speakPolish-style settle-in for a row of cards (docs/research.md §4b's "thrown deck"
// of confetti cards) — each direct child fades/rises/un-rotates into place, staggered,
// once when the group scrolls into view. Runs on mobile too (the user's own call) —
// only off under reduced motion, via shouldSkipDecorativeMotion.
export function StaggerReveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Render as `ol`/`ul` when children are `li`s that form a real sequence — a
   * `<div>` wrapper around `<li>` elements is invalid HTML. */
  as?: "div" | "ol" | "ul";
}) {
  // Typed loosely on purpose: `Tag` varies (div/ol/ul), and TS's ref-prop typing for a
  // union-typed dynamic tag demands an intersection of every variant's element type —
  // a real TS limitation, not a meaningful error, so the escape hatch is scoped to
  // just this one ref rather than the whole component.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (shouldSkipDecorativeMotion()) return;

    const items = Array.from(el.children);
    if (items.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.set(items, {
      opacity: 0,
      y: 32,
      rotate: (i: number) => (i % 2 === 0 ? -2.5 : 2.5),
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 82%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.7,
          ease: "back.out(1.6)",
          stagger: 0.1,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
