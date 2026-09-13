import Image from "next/image";

// The starburst mark ships as the client's own PNG (no vector supplied yet —
// client-content-request.md item 7); the wordmark is live text so it stays crisp.
export function Logo({ tone = "azul", inverted = false }: { tone?: "azul" | "verde"; inverted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src={`/brand/logo-${tone}.png`} alt="" width={40} height={40} className="size-8 sm:size-9 lg:size-10" />
      <span
        className={`whitespace-nowrap text-[1.0625rem] font-extrabold leading-none tracking-tight sm:text-lg lg:text-xl ${
          inverted ? "text-[var(--color-bg)]" : "text-[var(--color-ink)]"
        }`}
      >
        outubro <span className="font-semibold">idiomas</span>
      </span>
    </span>
  );
}
