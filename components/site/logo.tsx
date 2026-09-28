// The official lockups — brandbook §2.1, traced from the client's own PNGs into
// public/brand/*.svg (TASK-brand-alignment.md §2.3; provisional until the client's vector
// files arrive, client-content-request.md item 7). Never re-set as live text: brandbook §2.4
// "não reproduza em outra tipografia". Plain <img>: an SVG gains nothing from the image
// optimizer, and the file is cached across pages.

type LogoProps = {
  variant?: "horizontal" | "vertical";
  /** Lime mark + Seashell wordmark — brandbook §2.3's on-black colourway. */
  inverse?: boolean;
  className?: string;
  /** Empty when a wrapping link already names the destination. */
  alt?: string;
  priority?: boolean;
};

const ratio = { horizontal: [1502, 287], vertical: [1701, 957] } as const;

export function Logo({ variant = "horizontal", inverse = false, className, alt = "Outubro Idiomas", priority = false }: LogoProps) {
  const [width, height] = ratio[variant];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG, see note above
    <img
      src={`/brand/logo-${variant}${inverse ? "-inverse" : ""}.svg`}
      width={width}
      height={height}
      alt={alt}
      className={className}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
