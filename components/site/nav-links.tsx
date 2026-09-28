"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routeFromPath, type RouteKey } from "@/content/i18n";

export type NavItem = { route: RouteKey; href: string; label: string };

// Client leaf only to mark the current page (aria-current). Matches on the route key, never
// the raw pathname, so server (internal path) and browser (public path) render the same
// markup — same reasoning as language-links.tsx.
export function NavLinks({ items, className, linkClassName, onNavigate }: { items: NavItem[]; className?: string; linkClassName: string; onNavigate?: () => void }) {
  const current = routeFromPath(usePathname());
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.route}>
          <Link href={item.href} aria-current={item.route === current ? "page" : undefined} className={linkClassName} onClick={onNavigate}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
