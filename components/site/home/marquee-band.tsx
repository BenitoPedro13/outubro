import { getDictionary } from "@/content/dictionaries";
import { Marquee } from "@/components/ui/marquee";
import { BrandSymbol } from "@/components/site/brand-symbol";

// Home → Trust marquee (architecture.md §1.1.3). Every fact here is also stated as
// plain text elsewhere on the page (hero stats, language cards), and Magic UI's Marquee
// repeats its children, so the whole band is hidden from assistive tech rather than
// read out several times.
export async function MarqueeBand() {
  const { marquee } = await getDictionary();
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-b-2 border-[var(--color-ink)] bg-[var(--color-ink)] py-3.5">
      <Marquee className="p-0 [--duration:36s] [--gap:2rem]" repeat={3}>
        {marquee.map((item) => (
          <span key={item} className="flex items-center gap-8 whitespace-nowrap text-xl font-black text-[var(--color-lime)] sm:text-2xl">
            {item}
            <BrandSymbol color="pink" className="size-6" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
