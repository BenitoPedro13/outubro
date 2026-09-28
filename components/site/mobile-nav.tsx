"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Locale } from "@/content/i18n";
import { NavLinks, type NavItem } from "./nav-links";
import { LanguageLinks } from "./language-links";

type MobileNavProps = {
  items: NavItem[];
  locale: Locale;
  labels: { menu: string; closeMenu: string; navLabel: string; languageLabel: string };
};

// Phone/tablet menu (below 1024px) on shadcn Sheet = Radix Dialog: focus trap, Escape, focus
// returned to the trigger and the inert background come from the primitive, not from us.
// Vendored close button is off (showCloseButton) because it renders the generated Button,
// which uses `transition-all`; ours is the same SheetClose with a site style. Open state is
// lifted only so a tapped link closes the sheet before the next page renders.
export function MobileNav({ items, locale, labels }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-bg-alt)] transition-colors duration-150 hover:bg-[var(--color-lime)] lg:hidden">
        <Menu aria-hidden="true" strokeWidth={2.25} className="size-5" />
        <span className="sr-only">{labels.menu}</span>
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false} className="w-[min(88vw,360px)] gap-0 border-l-2 border-[var(--color-ink)] bg-[var(--color-bg)] p-0">
        <div className="flex h-16 items-center justify-between border-b-2 border-[var(--color-ink)] px-5">
          <SheetTitle className="type-caps text-[var(--color-ink)]">{labels.menu}</SheetTitle>
          <SheetClose className="grid size-11 place-items-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-bg-alt)] transition-colors duration-150 hover:bg-[var(--color-lime)]">
            <X aria-hidden="true" strokeWidth={2.25} className="size-5" />
            <span className="sr-only">{labels.closeMenu}</span>
          </SheetClose>
        </div>
        <nav aria-label={labels.navLabel} className="grow overflow-y-auto px-3 py-4">
          <NavLinks
            items={items}
            onNavigate={() => setOpen(false)}
            className="grid gap-1"
            linkClassName="flex min-h-12 items-center rounded-2xl px-4 text-2xl font-black transition-colors duration-150 hover:bg-[var(--color-lime)] aria-[current=page]:bg-[var(--color-lime)]"
          />
        </nav>
        <nav aria-label={labels.languageLabel} className="border-t-2 border-[var(--color-ink)] px-4 py-4">
          <LanguageLinks current={locale} tone="light" />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
