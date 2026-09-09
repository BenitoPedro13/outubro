"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

// The signature interaction — docs/visual-identity-spec.md §2. A hand-drawn cord
// untangles (stroke-dashoffset, scroll-scrubbed) exactly as the headline resolves.
// Tier 2 per docs/architecture.md §4 — no WebGL, ~40kb of GSAP+Lenis, mobile-safe.
export function UntangleHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const path = pathRef.current;
    const word = wordRef.current;
    const section = sectionRef.current;
    if (!path || !word || !section) return;

    gsap.registerPlugin(ScrollTrigger);

    // lenis@1.3.26: `smoothTouch` was removed from LenisOptions — `syncTouch` defaults to
    // false already, which is the "don't fight native touch scroll" behavior we want.
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;

    const ctx = gsap.context(() => {
      gsap.set(path, { strokeDashoffset: length });
      gsap.set(word, { opacity: 0.35, fontVariationSettings: "'wght' 400" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=500",
          scrub: 0.3,
          // Trigger positions are measured against layout at creation time; a late
          // font-swap/reflow can shift them (observed ~64px drift in testing).
          // invalidateOnRefresh + the refresh calls below keep start/end correct.
          invalidateOnRefresh: true,
        },
      });
      tl.to(path, { strokeDashoffset: 0, ease: "none" }, 0);
      tl.to(
        word,
        { opacity: 1, fontVariationSettings: "'wght' 800", ease: "none" },
        0
      );
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.requestAnimationFrame(refresh);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <svg
        viewBox="0 0 600 120"
        className="mx-auto mb-6 h-auto w-full max-w-[560px]"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M10,60 C40,10 60,110 90,60 C120,10 140,110 170,60 C200,20 220,100 250,55 C300,40 350,58 400,60 C460,60 520,60 590,60"
          fill="none"
          stroke="var(--color-cobalt)"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
      <h1 className="type-hero text-center">
        Bora destravar sua{" "}
        <span ref={wordRef} className="text-[var(--color-cobalt)]">
          língua
        </span>{" "}
        e seu futuro?
      </h1>
    </div>
  );
}
