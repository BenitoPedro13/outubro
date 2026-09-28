import Link from "next/link";
import { ArrowRight } from "lucide-react";

// The "see all" link from a Home section to its full page. Internal, so next/link.
export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2 text-lg font-bold underline decoration-[var(--color-coral)] decoration-[3px] underline-offset-[6px] transition-colors duration-150 hover:decoration-[var(--color-cobalt)] ${className ?? ""}`}
    >
      {children}
      <ArrowRight aria-hidden="true" strokeWidth={2.5} className="size-5 transition-transform duration-150 group-hover:translate-x-1" />
    </Link>
  );
}
