import { getDictionary } from "@/content/dictionaries";
import type { Dictionary } from "@/content/home/pt";
import { CtaLink } from "@/components/site/cta-link";
import { HeroCord } from "@/components/site/cord";
import { BrandSymbol } from "@/components/site/brand-symbol";

// Home → Hero (architecture.md §1.1.2). The h1 is the LCP element: real text, visible
// on first paint, never gated behind JS. The signature cord + highlight are CSS-only
// (globals.css), so this whole section ships zero client JS.
export async function Hero() {
  const t = await getDictionary();
  const { hero } = t;
  return (
    <section id="inicio" aria-labelledby="hero-title" className="notebook-grid relative overflow-hidden border-b-2 border-[var(--color-ink)]">
      <BrandSymbol color="pink" className="absolute -right-8 top-6 hidden size-24 rotate-12 sm:block" />
      <BrandSymbol color="coral" className="absolute bottom-8 right-[6%] hidden size-14 -rotate-12 lg:block" />

      <div className="site-container grid items-center gap-12 pb-16 pt-8 sm:pt-14 lg:grid-cols-[1.8fr_1fr] lg:gap-12 lg:pb-24 lg:pt-20">
        <div>
          <p className="type-caps inline-flex rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-bg-alt)] px-3.5 py-1.5">
            {hero.eyebrow}
          </p>

          <HeroCord className="mt-5 h-auto w-full max-w-[280px] sm:max-w-[360px]" />

          {/* Three composed lines, the highlighted word alone on the middle one: that keeps
              the phonetic note (brandbook §2.11 — the transcription as a teaching mark) off
              every other word at any wrap. Decorative, so screen readers get the headline. */}
          <h1 id="hero-title" className="type-hero isolate mt-2">
            <span className="block">{hero.headline.before} </span>
            <span className="block">
              <span className="word-highlight">{hero.headline.word}</span>{" "}
              <span aria-hidden="true" className="phonetic">
                {hero.phonetic}
              </span>
            </span>
            <span className="block">{hero.headline.after}</span>
          </h1>

          <p className="type-lead mt-5 max-w-[46ch]">{hero.sub}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CtaLink>{hero.cta}</CtaLink>
            <a
              href="#como-funciona"
              className="inline-flex min-h-11 items-center justify-center text-lg font-bold underline decoration-[var(--color-coral)] decoration-[3px] underline-offset-[6px] transition-colors duration-150 hover:decoration-[var(--color-cobalt)]"
            >
              {hero.secondary}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {hero.stats.map((stat) => (
              <li key={stat} className="flex items-center gap-2 text-base font-bold">
                <BrandSymbol color="cobalt" className="size-5" />
                {stat}
              </li>
            ))}
          </ul>
        </div>

        <ChatCard hero={hero} />
      </div>
    </section>
  );
}

// A WhatsApp-style exchange — the conversion channel itself, shown as the product.
// Decorative framing only: the messages are real <p>s so they read in order.
function ChatCard({ hero }: { hero: Dictionary["hero"] }) {
  return (
    <figure className="sticker relative mx-auto w-full max-w-[400px] rotate-[1.5deg] rounded-[28px] bg-[var(--color-bg-alt)] p-4 sm:p-5">
      <figcaption className="flex items-center gap-3 border-b-2 border-dashed border-[var(--color-border)] pb-3.5">
        <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-[var(--color-cobalt)]">
          <BrandSymbol color="lime" className="size-7" />
        </span>
        <span>
          <span className="block font-bold leading-tight">{hero.chatTitle}</span>
          <span className="block text-sm text-[var(--color-ink-soft)]">{hero.chatSubtitle}</span>
        </span>
      </figcaption>

      <div className="mt-4 flex flex-col gap-2.5">
        {hero.chat.map((msg) => (
          <p
            key={msg.text}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-base font-semibold leading-snug ${
              msg.from === "aluno"
                ? "self-start rounded-bl-md bg-[var(--color-border)]"
                : "self-end rounded-br-md bg-[var(--color-lime)]"
            }`}
          >
            <span className="sr-only">{msg.from === "aluno" ? hero.chatSpeakers.aluno : hero.chatSpeakers.outubro}</span>
            {msg.text}
          </p>
        ))}
      </div>

      <span
        aria-hidden="true"
        className="sticker absolute -left-4 -top-4 rotate-[-8deg] rounded-full bg-[var(--color-pink)] px-3 py-1 text-sm font-black"
      >
        {hero.chatSticker}
      </span>
    </figure>
  );
}
