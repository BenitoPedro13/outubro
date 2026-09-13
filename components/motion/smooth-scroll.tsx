"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Site-wide Lenis. Renders nothing, so the (site) layout above it stays a Server
// Component. Runs its own rAF loop (autoRaf) instead of GSAP's ticker: Home has no
// ScrollTrigger to keep in sync (its scroll-linked motion is CSS scroll/view
// timelines), so importing GSAP here would only add bundle weight. When a page does
// need ScrollTrigger, wire the README's sync pattern (lenis.on("scroll",
// ScrollTrigger.update) + gsap.ticker) in that page's own leaf.
// Touch keeps native scrolling (syncTouch defaults to false; the pre-1.0 option the
// spec named, smoothTouch, no longer exists). Off entirely under reduced motion.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Anchor offset matches the sticky header height (globals.css scroll-margin-top).
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -88 } });
    return () => lenis.destroy();
  }, []);

  return null;
}
