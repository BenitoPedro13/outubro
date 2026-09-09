import type { Metadata } from "next";
import { sections } from "@/content/outubro-pitch";
import { DocHero } from "@/components/doc/hero";
import { Section } from "@/components/doc/section";
import { DocFooter } from "@/components/doc/footer";
import { DocCard, Grid, Label, Quote } from "@/components/doc/bits";
import { SignatureInteraction } from "@/components/motion/signature-interaction";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { RotatingBadge } from "@/components/doc/rotating-badge";

export const metadata: Metadata = {
  title: "Outubro Idiomas — pesquisa, decisões e plano",
  robots: { index: false, follow: false },
};

const s = sections;

export default function ApresentacaoPage() {
  return (
    <main>
      <DocHero />

      {/* 01 — contexto */}
      <Section n={s.contexto.n} title={s.contexto.title} lead={s.contexto.lead}>
        <Grid cols={2}>
          {s.contexto.points.map((p) => (
            <DocCard key={p.title} title={p.title}>
              {p.body}
            </DocCard>
          ))}
        </Grid>
      </Section>

      {/* 02 — problema */}
      <Section n={s.problema.n} title={s.problema.title} lead={s.problema.lead} bg="var(--color-pink)">
        <ul className="flex flex-wrap gap-2">
          {s.problema.evidence.map((e) => (
            <li key={e} className="doc-label rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-bg-alt)] px-3 py-2 text-[var(--color-ink)]">
              {e}
            </li>
          ))}
        </ul>
        <p className="type-body mt-8 max-w-[68ch]">{s.problema.body}</p>
      </Section>

      {/* 03 — referências */}
      <Section n={s.referencias.n} title={s.referencias.title} lead={s.referencias.lead} wide>
        <Grid cols={3}>
          {s.referencias.items.map((r) => (
            <div key={r.name} className="doc-card flex h-full flex-col">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="type-subheading">{r.name}</h3>
              </div>
              <Label>{r.scale}</Label>
              <div className="mt-5 space-y-4 text-sm leading-relaxed">
                <p>
                  <span className="doc-label block text-[var(--color-cobalt)]">Aproveitar</span>
                  <span className="mt-1.5 block text-[var(--color-ink-soft)]">{r.take}</span>
                </p>
                <p>
                  <span className="doc-label block text-[var(--color-coral)]">Evitar</span>
                  <span className="mt-1.5 block text-[var(--color-ink-soft)]">{r.avoid}</span>
                </p>
              </div>
            </div>
          ))}
        </Grid>
        <p className="type-body mt-8 max-w-[68ch]">{s.referencias.common}</p>
      </Section>

      {/* 04 — decisão */}
      <Section n={s.decisao.n} title={s.decisao.title} lead={s.decisao.lead} bg="var(--color-lime)">
        <Grid cols={2}>
          {s.decisao.pillars.map((p) => (
            <DocCard key={p.title} title={p.title}>
              {p.body}
            </DocCard>
          ))}
        </Grid>
      </Section>

      {/* 05 — estrutura */}
      <Section n={s.estrutura.n} title={s.estrutura.title} lead={s.estrutura.lead} wide>
        <div className="space-y-4">
          {s.estrutura.pages.map((p) => (
            <article key={p.no} className="doc-card sm:p-8">
              <div className="grid gap-6 sm:grid-cols-[1fr_1.4fr]">
                <div>
                  <div className="flex items-baseline gap-3">
                    <Label tone="cobalt">{p.no}</Label>
                    <h3 className="type-subheading">{p.name}</h3>
                  </div>
                  <p className="doc-label mt-4 block text-[var(--color-ink-soft)]">Para quem</p>
                  <p className="mt-1.5 text-sm">{p.audience}</p>
                  <p className="doc-label mt-4 block text-[var(--color-ink-soft)]">Objetivo</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{p.purpose}</p>
                </div>
                <div>
                  <p className="doc-label text-[var(--color-ink-soft)]">O que entra</p>
                  <ul className="mt-3 space-y-2">
                    {p.contents.map((c) => (
                      <li key={c} className="flex gap-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                        <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-[var(--color-ink)]" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="doc-card mt-6 border-dashed">
          <Label tone="pink">{s.estrutura.open.title}</Label>
          <p className="type-body mt-3 max-w-[68ch] text-[var(--color-ink-soft)]">{s.estrutura.open.body}</p>
        </div>
      </Section>

      {/* 06 — identidade + interação de assinatura */}
      <Section n={s.identidade.n} title={s.identidade.title} lead={s.identidade.lead} wide grid>
        <div className="mb-6 flex justify-end">
          <RotatingBadge text="BORA DESTRAVAR ✦ TIER 2 ✦ " color="var(--color-pink)" />
        </div>
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {s.identidade.palette.map((c) => (
            <div key={c.hex} className="overflow-hidden rounded-xl border-2 border-[var(--color-ink)]">
              <div className="h-16" style={{ background: c.hex }} />
              <div className="bg-[var(--color-bg-alt)] p-2">
                <p className="text-xs font-bold">{c.name}</p>
                <p className="doc-label text-[var(--color-ink-soft)]">{c.hex}</p>
              </div>
            </div>
          ))}
        </div>

        <SignatureInteraction />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="doc-card bg-[var(--color-bg-alt)]">
            <Label tone="cobalt">{s.identidade.interaction.label}</Label>
            <Quote>{s.identidade.interaction.statement}</Quote>
          </div>
          <div className="doc-card bg-[var(--color-bg-alt)]">
            <Label tone="pink">Alternativas descartadas</Label>
            <ul className="mt-4 space-y-2">
              {s.identidade.interaction.rejected.map((r) => (
                <li key={r} className="flex gap-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-[var(--color-ink)]" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 07 — próximos passos */}
      <Section n={s.proximosPassos.n} title={s.proximosPassos.title} lead={s.proximosPassos.lead} wide>
        <StaggerReveal as="ol" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.proximosPassos.items.map((p) => (
            <li key={p.no} className="doc-card">
              <Label>Passo {p.no}</Label>
              <h3 className="type-subheading mt-3">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{p.body}</p>
            </li>
          ))}
        </StaggerReveal>
      </Section>

      {/* 08 — perguntas abertas */}
      <Section n={s.perguntasAbertas.n} title={s.perguntasAbertas.title} lead={s.perguntasAbertas.lead} wide>
        <StaggerReveal className="grid gap-4">
          {s.perguntasAbertas.items.map((q, i) => (
            <div key={q.q} className="doc-card">
              <Label tone="cobalt">Pergunta {String(i + 1).padStart(2, "0")}</Label>
              <h3 className="type-subheading mt-3">{q.q}</h3>
              <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-[var(--color-ink-soft)]">{q.why}</p>
            </div>
          ))}
        </StaggerReveal>
      </Section>

      <DocFooter />
    </main>
  );
}
