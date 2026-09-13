import { hero } from "@/content/home";
import { CtaLink } from "@/components/site/cta-link";
import { HeroCord } from "@/components/site/cord";
import { StarBurst } from "@/components/site/doodles";

// Home → Hero (architecture.md §1.1.2). The h1 is the LCP element: real text, visible
// on first paint, never gated behind JS. The signature cord + "língua" highlight are
// CSS-only (globals.css), so this whole section ships zero client JS.
export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="notebook-grid relative overflow-hidden border-b-2 border-[var(--color-ink)]">
      <StarBurst className="absolute -right-6 top-6 hidden sm:block" color="var(--color-pink)" points={9} size={72} />
      <StarBurst className="absolute bottom-10 left-[46%] hidden lg:block" color="var(--color-coral)" points={5} size={40} />

      <div className="site-container grid items-center gap-12 pb-16 pt-8 sm:pt-14 lg:grid-cols-[1.6fr_1fr] lg:gap-12 lg:pb-24 lg:pt-20">
        <div>
          <p className="type-caps inline-flex rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-bg-alt)] px-3.5 py-1.5">
            {hero.eyebrow}
          </p>

          <HeroCord className="mt-5 h-auto w-full max-w-[280px] sm:max-w-[360px]" />

          <h1 id="hero-title" className="type-hero isolate mt-2">
            {hero.headline.before} <span className="word-highlight">{hero.headline.word}</span> {hero.headline.after}
          </h1>

          <p className="type-lead mt-5 max-w-[46ch] text-[var(--color-ink-soft)]">{hero.sub}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CtaLink>{hero.cta}</CtaLink>
            <a
              href="#como-funciona"
              className="inline-flex min-h-11 items-center justify-center font-bold underline decoration-[var(--color-coral)] decoration-[3px] underline-offset-[6px] transition-colors duration-150 hover:text-[var(--color-cobalt)]"
            >
              {hero.secondary}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {hero.stats.map((stat) => (
              <li key={stat} className="flex items-center gap-2 text-[0.9375rem] font-bold">
                <StarBurst color="var(--color-cobalt)" points={9} size={18} />
                {stat}
              </li>
            ))}
          </ul>
        </div>

        <ChatCard />
      </div>
    </section>
  );
}

// A WhatsApp-style exchange — the conversion channel itself, shown as the product.
// Decorative framing only: the messages are real <p>s so they read in order.
function ChatCard() {
  return (
    <figure className="sticker relative mx-auto w-full max-w-[400px] rotate-[1.5deg] rounded-[28px] bg-[var(--color-bg-alt)] p-4 sm:p-5">
      <figcaption className="flex items-center gap-3 border-b-2 border-dashed border-[var(--color-border)] pb-3.5">
        <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-[var(--color-cobalt)]">
          <StarBurst color="var(--color-bg-alt)" points={9} size={22} />
        </span>
        <span>
          <span className="block font-extrabold leading-tight">Outubro Idiomas</span>
          <span className="block text-sm text-[var(--color-ink-soft)]">Conversa no WhatsApp</span>
        </span>
      </figcaption>

      <div className="mt-4 flex flex-col gap-2.5">
        {hero.chat.map((msg) => (
          <p
            key={msg.text}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.9375rem] font-semibold leading-snug ${
              msg.from === "aluno"
                ? "self-start rounded-bl-md bg-[var(--color-border)]"
                : "self-end rounded-br-md bg-[var(--color-lime)]"
            }`}
          >
            <span className="sr-only">{msg.from === "aluno" ? "Aluno: " : "Outubro: "}</span>
            {msg.text}
          </p>
        ))}
      </div>

      <span
        aria-hidden="true"
        className="sticker absolute -left-4 -top-4 rotate-[-8deg] rounded-full bg-[var(--color-pink)] px-3 py-1 text-sm font-extrabold"
      >
        e aí?
      </span>
    </figure>
  );
}
