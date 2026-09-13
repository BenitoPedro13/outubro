import { marquee } from "@/content/home";
import { Marquee } from "@/components/ui/marquee";
import { StarBurst } from "@/components/site/doodles";

// Home → Trust marquee (architecture.md §1.1.3). Every fact here is also stated as
// plain text elsewhere on the page (hero stats, language cards), and Magic UI's Marquee
// repeats its children 4×, so the whole band is hidden from assistive tech rather than
// read out four times.
export function MarqueeBand() {
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-b-2 border-[var(--color-ink)] bg-[var(--color-ink)] py-3.5">
      <Marquee className="p-0 [--duration:36s] [--gap:2rem]" repeat={3}>
        {marquee.map((item) => (
          <span key={item} className="flex items-center gap-8 whitespace-nowrap text-lg font-extrabold text-[var(--color-lime)] sm:text-xl">
            {item}
            <StarBurst color="var(--color-pink)" points={9} size={20} />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
