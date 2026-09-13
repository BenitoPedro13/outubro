import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/content/home";

type CtaLinkProps = {
  children: React.ReactNode;
  /** Prefilled WhatsApp message; omit for the site-wide default. */
  message?: string;
  variant?: "lime" | "ink" | "on-dark";
  size?: "md" | "sm";
  className?: string;
};

// Every conversion point on the site is a WhatsApp link (research.md §1: WhatsApp is
// the real enrolment channel) — one component so the href, new-tab semantics and the
// "opens WhatsApp" hint for screen readers can't drift between sections.
// Lucide has no WhatsApp glyph (brand icons were removed), so MessageCircle stands in —
// a single off-system brand SVG would break the Lucide-only rule.
export function CtaLink({ children, message, variant = "lime", size = "md", className }: CtaLinkProps) {
  const classes = [
    "btn-cta",
    variant === "ink" && "btn-cta--ink",
    variant === "on-dark" && "btn-cta--on-dark",
    size === "sm" && "btn-cta--sm",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={whatsappHref(message)} target="_blank" rel="noopener" className={classes}>
      <MessageCircle aria-hidden="true" strokeWidth={2} className={size === "sm" ? "size-4" : "size-5"} />
      <span>{children}</span>
      <span className="sr-only"> (abre o WhatsApp)</span>
    </a>
  );
}
