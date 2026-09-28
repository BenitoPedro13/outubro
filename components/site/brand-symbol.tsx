// The brand symbol as a decorative sticker/bullet (brandbook §2.1 "Símbolo"). Rendered as
// a CSS mask over public/brand/symbol.svg (globals.css .brand-symbol), so one cached file
// takes any colour token. Size it with Tailwind size-* utilities.

type BrandSymbolProps = {
  color?: "cobalt" | "lime" | "pink" | "coral" | "ink" | "paper";
  className?: string;
};

export function BrandSymbol({ color = "cobalt", className }: BrandSymbolProps) {
  return (
    <span
      aria-hidden="true"
      className={`brand-symbol ${className ?? ""}`}
      style={{ "--symbol-color": `var(--color-${color === "paper" ? "bg-alt" : color})` } as React.CSSProperties}
    />
  );
}
