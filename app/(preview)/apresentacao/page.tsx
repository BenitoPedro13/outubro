import type { Metadata } from "next";
import { UntangleHero } from "@/components/motion/untangle-hero";
import { StarBurst, StickyNote, ChatBubble } from "@/components/preview/doodles";

// Preview document, not real site content — excluded from indexing.
// docs/tasks/TASK-preview-page.md §2.
export const metadata: Metadata = {
  title: "Outubro Idiomas — prévia de identidade e motion",
  robots: { index: false, follow: false },
};

const PALETTE: { name: string; token: string; hex: string; ink?: boolean }[] = [
  { name: "Lima", token: "--color-lime", hex: "#C8E639", ink: true },
  { name: "Lima escuro", token: "--color-lime-deep", hex: "#9BB821", ink: true },
  { name: "Cobalto", token: "--color-cobalt", hex: "#2E5FE0" },
  { name: "Cobalto escuro", token: "--color-cobalt-deep", hex: "#1F44AD" },
  { name: "Pink", token: "--color-pink", hex: "#F0389C" },
  { name: "Coral", token: "--color-coral", hex: "#FF5D3E" },
  { name: "Tinta", token: "--color-ink", hex: "#14120F" },
];

const STEPS = [
  { n: "01", title: "Teste de nível", body: "Descobre seu ponto de partida em poucos minutos.", color: "var(--color-lime)" },
  { n: "02", title: "Plano personalizado", body: "Sem decoreba genérica — o plano segue seu objetivo.", color: "var(--color-pink)" },
  { n: "03", title: "Fala desde o dia 1", body: "Acompanhamento real, professor brasileiro, conversação de verdade.", color: "var(--color-cobalt)" },
] as const;

export default function ApresentacaoPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24">
      <div className="sticky top-0 z-10 -mx-6 mb-12 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 px-6 py-3 text-center backdrop-blur">
        <p className="type-caps text-[var(--color-ink-soft)]">
          Prévia de direção — identidade visual &amp; motion, ainda não é o site final
        </p>
      </div>

      {/* 1. Hero — signature interaction */}
      <section className="notebook-grid mb-20 rounded-2xl px-6 py-16">
        <UntangleHero />
        <p className="type-lead mx-auto mt-6 max-w-md text-center">
          Role a página para ver o cordão se desenrolar — a mesma interação que abre o
          site de verdade.
        </p>
      </section>

      {/* 2. Palette */}
      <section className="mb-20">
        <h2 className="type-heading mb-6">Paleta</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {PALETTE.map((c) => (
            <div key={c.token} className="overflow-hidden rounded-xl border border-[var(--color-border)]">
              <div className="h-20" style={{ background: c.hex }} />
              <div className="p-3">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="type-caps text-[var(--color-ink-soft)]">{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Type specimen */}
      <section className="mb-20">
        <h2 className="type-heading mb-6">Tipografia — Manrope</h2>
        <div className="flex flex-col gap-6">
          <p className="type-display">Bora aprender de verdade</p>
          <p className="type-heading">Página, professor, já — sem corte no descendente</p>
          <p className="type-subheading">Aulas individuais ou em dupla</p>
          <p className="type-lead">
            Fala desde o dia 1, com professores brasileiros e método comunicativo.
          </p>
          <p className="type-body">
            +500 alunos destravados desde 2018, com formação contínua para os professores.
          </p>
        </div>
      </section>

      {/* 4. Doodle layer */}
      <section className="mb-20">
        <h2 className="type-heading mb-6">Camada de rabiscos</h2>
        <div className="relative flex flex-wrap items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-8">
          <StarBurst color="var(--color-lime)" />
          <ChatBubble tone="cobalt">Fala desde o dia 1</ChatBubble>
          <ChatBubble tone="pink">Sem decoreba</ChatBubble>
          <ChatBubble tone="ink">Seu professor é brasileiro</ChatBubble>
          <StarBurst color="var(--color-coral)" points={5} size={24} />
        </div>
      </section>

      {/* 5. How it works — sticky-note cards */}
      <section className="mb-8">
        <h2 className="type-heading mb-6">Como funciona</h2>
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:justify-between">
          {STEPS.map((step, i) => (
            <StickyNote key={step.n} color={step.color} rotate={i % 2 === 0 ? -2 : 2}>
              <p className="type-caps mb-2 opacity-70">{step.n}</p>
              <p className="mb-1 font-bold">{step.title}</p>
              <p className="text-sm">{step.body}</p>
            </StickyNote>
          ))}
        </div>
      </section>
    </main>
  );
}
