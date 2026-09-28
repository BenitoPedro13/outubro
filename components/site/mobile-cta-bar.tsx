"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

type MobileCtaBarProps = {
  label: string;
  href: string;
  opensWhatsapp: string;
};

// Phone-only sticky WhatsApp bar (hidden from 1024px). Appears once the hero's own CTA
// has scrolled away and steps aside while the final CTA band is on screen, so there's
// never two identical CTAs in view. Syncs with an external system (IntersectionObserver)
// — a real Effect, with cleanup. Text comes from the server layout's dictionary.
export function MobileCtaBar({ label, href, opensWhatsapp }: MobileCtaBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const finalCta = document.getElementById("cta-final");
    if (!hero) return;

    let heroInView = true;
    let finalInView = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) heroInView = entry.isIntersecting;
        if (entry.target === finalCta) finalInView = entry.isIntersecting;
      }
      setVisible(!heroInView && !finalInView);
    });
    observer.observe(hero);
    if (finalCta) observer.observe(finalCta);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t-2 border-[var(--color-ink)] bg-[var(--color-bg)] p-3 transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a href={href} target="_blank" rel="noopener" className="btn-cta w-full">
        <MessageCircle aria-hidden="true" strokeWidth={2} className="size-5" />
        <span>{label}</span>
        <span className="sr-only"> {opensWhatsapp}</span>
      </a>
    </div>
  );
}
