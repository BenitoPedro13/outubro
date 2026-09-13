import { BookOpen, FileCheck, GraduationCap, HeartHandshake, MessagesSquare, Smile, type LucideIcon } from "lucide-react";
import { diferenciais } from "@/content/home";
import { CtaLink } from "@/components/site/cta-link";

const icons: Record<(typeof diferenciais.items)[number]["icon"], LucideIcon> = {
  contract: FileCheck,
  training: GraduationCap,
  conversation: MessagesSquare,
  teachers: Smile,
  material: BookOpen,
  team: HeartHandshake,
};

// Home → Differentiators (architecture.md §1.1.8) — the objection-handling block
// (fees, contracts, textbooks), so it ends in a CTA instead of handing off to a footer.
export function Diferenciais() {
  return (
    <section id="diferenciais" aria-labelledby="diferenciais-title" className="bg-[var(--color-ink)] text-[var(--color-bg)]">
      <div className="site-container py-20 lg:py-28">
        <h2 id="diferenciais-title" className="type-display max-w-[20ch] text-[var(--color-lime)]">
          {diferenciais.title}
        </h2>

        <ul className="reveal-deck mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciais.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className="rounded-3xl bg-[var(--color-bg-alt)] p-6 text-[var(--color-ink)] sm:p-7">
                <span aria-hidden="true" className="grid size-12 place-items-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-lime)]">
                  <Icon strokeWidth={1.5} className="size-6" />
                </span>
                <h3 className="type-subheading mt-5">{item.title}</h3>
                <p className="mt-2 text-[var(--color-ink-soft)]">{item.body}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 flex justify-center">
          <CtaLink variant="on-dark">{diferenciais.cta}</CtaLink>
        </div>
      </div>
    </section>
  );
}
