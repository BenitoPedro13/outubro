import Image from "next/image";
import { getDictionary } from "@/content/dictionaries";
import { CtaLink } from "@/components/site/cta-link";
import { CordDivider } from "@/components/site/cord";
import { BrandSymbol } from "@/components/site/brand-symbol";
import mascotMegaphone from "@/public/brand/mascot-megaphone.png";

// Home → Final CTA band (architecture.md §1.1.12). The tagline comes back as the
// closing hook with the cord now resolved — the hero's tangle, straightened — and the
// brand mascot calling it out. No reassurance line: Diferenciais already says it.
export async function CtaFinal() {
  const { ctaFinal } = await getDictionary();
  return (
    <section id="cta-final" aria-labelledby="cta-final-title" className="relative overflow-hidden border-b-2 border-[var(--color-ink)] bg-[var(--color-lime)]">
      <BrandSymbol color="pink" className="absolute -left-8 top-10 size-20 -rotate-12" />
      <BrandSymbol color="cobalt" className="absolute -right-6 bottom-8 size-16 rotate-12" />

      <div className="site-container flex flex-col items-center gap-10 py-20 text-center lg:flex-row lg:justify-center lg:gap-16 lg:py-28 lg:text-left">
        <Image
          src={mascotMegaphone}
          alt=""
          sizes="(min-width: 1024px) 288px, 176px"
          className="h-auto w-44 shrink-0 lg:w-72"
        />
        <div className="flex flex-col items-center lg:items-start">
          <CordDivider className="h-auto w-48 sm:w-64" color="var(--color-cobalt)" />
          <h2 id="cta-final-title" className="type-hero mt-6 max-w-[14ch]">
            {ctaFinal.title}
          </h2>
          <div className="mt-6">
            <CtaLink variant="ink">{ctaFinal.cta}</CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
