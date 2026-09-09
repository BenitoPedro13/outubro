"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { StarBurst } from "@/components/preview/doodles";

// The signature interaction, as a labeled specimen — docs/visual-identity-spec.md §2.
// Plays once when this block enters view (not scroll-scrubbed against the whole page,
// which was too easy to scroll past unnoticed) and can be replayed on demand. Starts
// partially drawn so it's never a blank frame, even before the animation runs.
export function SignatureInteraction() {
  const boxRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const playRef = useRef<() => void>(() => {});

  useEffect(() => {
    // Reduced-motion UI branching is done in CSS (`motion-reduce:` below), not React
    // state — matchMedia can't be read during render, and setState-in-effect for a
    // value like this just adds a redundant render.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const path = pathRef.current;
    const word = wordRef.current;
    const box = boxRef.current;
    if (!path || !word || !box) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;

    if (prefersReducedMotion) {
      path.style.strokeDashoffset = "0";
      gsap.set(word, { opacity: 1, fontVariationSettings: "'wght' 800" });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Starts ~22% drawn — a visible tangled knot at rest, never a blank box.
    const restOffset = length * 0.78;
    gsap.set(path, { strokeDashoffset: restOffset });
    gsap.set(word, { opacity: 0.4, fontVariationSettings: "'wght' 400" });

    const tl = gsap.timeline({ paused: true });
    tl.to(path, { strokeDashoffset: 0, duration: 1.4, ease: "power2.out" }, 0);
    tl.to(word, { opacity: 1, fontVariationSettings: "'wght' 800", duration: 1.4, ease: "power2.out" }, 0);

    const play = () => {
      tl.pause(0);
      gsap.set(path, { strokeDashoffset: restOffset });
      gsap.set(word, { opacity: 0.4, fontVariationSettings: "'wght' 400" });
      tl.play(0);
    };
    playRef.current = play;

    const trigger = ScrollTrigger.create({
      trigger: box,
      start: "top 75%",
      once: true,
      onEnter: play,
    });

    return () => {
      trigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className="notebook-grid relative overflow-hidden rounded-3xl border-2 border-[var(--color-ink)] px-6 py-16 sm:py-24"
    >
      <StarBurst className="absolute -left-4 top-8 opacity-80" color="var(--color-pink)" size={40} />
      <StarBurst className="absolute -right-6 bottom-10 opacity-80" color="var(--color-coral)" points={5} size={48} />
      <StarBurst className="absolute right-10 top-6 opacity-70" color="var(--color-lime-deep)" points={5} size={22} />

      <svg viewBox="0 0 600 140" className="mx-auto mb-6 h-auto w-full max-w-[560px]" aria-hidden="true">
        <path
          ref={pathRef}
          d="M10,70 C40,15 65,125 95,70 C125,15 150,125 180,70 C210,25 235,115 265,65 C310,45 360,62 410,68 C470,68 530,68 590,68"
          fill="none"
          stroke="var(--color-cobalt)"
          strokeWidth={6}
          strokeLinecap="round"
        />
      </svg>

      <p className="type-heading text-center">
        Bora destravar sua{" "}
        <span ref={wordRef} className="text-[var(--color-cobalt)]">
          língua
        </span>{" "}
        e seu futuro?
      </p>

      <div className="mt-8 flex flex-col items-center gap-3">
        <p className="type-caps hidden text-[var(--color-ink-soft)] motion-reduce:block">
          Movimento reduzido no seu sistema — mostrando o estado final.
        </p>
        <p className="type-caps block text-[var(--color-ink-soft)] motion-reduce:hidden">
          Essa é a animação de abertura do site de verdade.
        </p>
        <button
          type="button"
          onClick={() => playRef.current()}
          className="block rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-lime)] px-5 py-2 text-sm font-bold transition-transform hover:-translate-y-0.5 motion-reduce:hidden"
        >
          Assistir de novo
        </button>
      </div>
    </div>
  );
}
