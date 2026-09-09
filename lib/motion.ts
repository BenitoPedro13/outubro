// Shared gate for the decorative motion (section entrance, staggered card reveal,
// rotating badge): off only under reduced motion, same as the core signature
// interaction — mobile gets the same motion as desktop, per the user's own call.
export function shouldSkipDecorativeMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
