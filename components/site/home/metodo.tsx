import { Check } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { SectionHeading } from "@/components/site/section-heading";

// Home → "Só tem na Outubro" (architecture.md §1.1.4). The four points are chat
// bubbles — the communicative approach literally shown as conversation.
export async function Metodo() {
  const { metodo } = await getDictionary();
  return (
    <section id="metodo" aria-labelledby="metodo-title" className="border-b-2 border-[var(--color-ink)] bg-[var(--color-pink)]">
      <div className="site-container grid gap-10 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">
        <SectionHeading id="metodo-title" title={metodo.title} lead={metodo.lead} leadInk />

        <ul className="reveal-deck flex flex-col gap-3">
          {metodo.points.map((point, i) => (
            <li
              key={point}
              className={`sticker flex max-w-[92%] items-center gap-3 rounded-3xl bg-[var(--color-bg-alt)] px-5 py-4 text-lg font-bold leading-snug ${
                i % 2 === 0 ? "self-start rounded-bl-md" : "self-end rounded-br-md"
              }`}
            >
              <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--color-lime)]">
                <Check strokeWidth={2.5} className="size-4" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
