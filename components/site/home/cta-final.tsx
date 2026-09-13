import { ctaFinal } from "@/content/home";
import { CtaLink } from "@/components/site/cta-link";
import { CordDivider } from "@/components/site/cord";
import { StarBurst } from "@/components/site/doodles";

// Home → Final CTA band (architecture.md §1.1.12). The tagline comes back as the
// closing hook with the cord now resolved — the hero's tangle, straightened.
export function CtaFinal() {
  return (
    <section id="cta-final" aria-labelledby="cta-final-title" className="relative overflow-hidden border-b-2 border-[var(--color-ink)] bg-[var(--color-lime)]">
      <StarBurst className="absolute -left-6 top-10" color="var(--color-pink)" points={9} size={80} />
      <StarBurst className="absolute -right-4 bottom-8" color="var(--color-cobalt)" points={5} size={64} />

      <div className="site-container flex flex-col items-center py-20 text-center lg:py-32">
        <CordDivider className="h-auto w-48 sm:w-64" color="var(--color-cobalt)" />
        <h2 id="cta-final-title" className="type-hero mt-8 max-w-[16ch]">
          {ctaFinal.title}
        </h2>
        <p className="mt-6 max-w-[40ch] text-lg font-semibold">{ctaFinal.reassurance}</p>
        <div className="mt-10">
          <CtaLink variant="ink">{ctaFinal.cta}</CtaLink>
        </div>
      </div>
    </section>
  );
}
