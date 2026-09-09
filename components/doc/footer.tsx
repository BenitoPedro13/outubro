import { DocContainer, Label } from "./bits";

const COLUMNS = [
  {
    heading: "O documento",
    links: [
      { label: "Contexto", href: "#s01" },
      { label: "Referências", href: "#s03" },
      { label: "Decisão", href: "#s04" },
      { label: "Estrutura do site", href: "#s05" },
    ],
  },
  {
    heading: "Direção",
    links: [
      { label: "Identidade visual", href: "#s06" },
      { label: "Próximos passos", href: "#s07" },
      { label: "Perguntas abertas", href: "#s08" },
    ],
  },
  {
    heading: "A Outubro, hoje",
    links: [
      { label: "WhatsApp", href: "https://wa.me/5521920115154" },
      { label: "Instagram", href: "https://instagram.com/outubroidiomas" },
    ],
  },
] as const;

// A closing "Awwwards/Framer" footer, not a one-line afterthought: real link columns,
// then a full-bleed oversized wordmark as the signature closing statement — the
// pattern the user pointed at directly (speakPolish's giant blocked-letter close,
// Aristotle's pale ghost-text lockup over its own footer).
export function DocFooter() {
  return (
    <footer className="full-bleed border-t-2 border-[var(--color-ink)] bg-[var(--color-bg-alt)]">
      <DocContainer wide>
        <div className="grid gap-10 py-16 sm:grid-cols-[1.4fr_1fr_1fr_1fr] sm:py-20">
          <div>
            <p className="type-subheading">Bora destravar sua língua e seu futuro?</p>
            <p className="type-body mt-3 max-w-[36ch] text-[var(--color-ink-soft)]">
              Este documento vive em <code>docs/</code> e nesta página ao mesmo tempo —
              qualquer correção aqui volta para os arquivos antes da próxima etapa.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <Label>{col.heading}</Label>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-[var(--color-ink-soft)] underline-offset-4 hover:text-[var(--color-cobalt)] hover:underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DocContainer>

      <div aria-hidden="true" className="relative overflow-hidden border-t-2 border-[var(--color-ink)] bg-[var(--color-lime)] py-10">
        <p className="type-caps text-center text-[var(--color-ink)]">Bora destravar sua língua e seu futuro com a</p>
        <p
          className="mt-2 select-none text-center font-extrabold leading-none text-[var(--color-ink)]"
          style={{ fontSize: "clamp(4rem, 18vw, 13rem)" }}
        >
          outubro
        </p>
      </div>
    </footer>
  );
}
