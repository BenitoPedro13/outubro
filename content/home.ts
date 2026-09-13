/**
 * All Home copy — docs/tasks/TASK-home-static.md §2.2.
 *
 * Source tags on each block:
 *   VERBATIM  — current outubroidiomas.com / Instagram bio, word for word (docs/research.md §1-3)
 *   COMPOSED  — rearranged from verbatim facts, no new claims
 *   [CONTENT] — draft wording with no source yet; listed in docs/client-content-request.md,
 *               must be replaced before launch
 *
 * Testimonials, pricing and FAQ are NOT here — they come from Payload
 * (TASK-home-cms.md), never hardcoded.
 */

const WHATSAPP_NUMBER = "5521920115154"; // VERBATIM — linktr.ee "MATRICULE-SE JÁ"

/** [CONTENT] prefilled message — client-content-request.md item 5. */
export function whatsappHref(message = "Oi! Vim pelo site e quero destravar meu idioma.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const site = {
  name: "Outubro Idiomas",
  // VERBATIM — Instagram bio
  tagline: "Bora destravar sua língua e seu futuro?",
  instagram: "https://www.instagram.com/outubroidiomas/",
  careers: "https://lucky-bat.static.domains/vagas", // VERBATIM — linktr.ee "QUERO DAR AULAS"
  library: "https://outubro.link/biblioteca", // VERBATIM — linktr.ee
  blog: "https://outubroidiomas.blogspot.com", // VERBATIM — linktr.ee
} as const;

export const nav = [
  { href: "#metodo", label: "Método" },
  { href: "#idiomas", label: "Idiomas" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#pilares", label: "Pilares" },
] as const;

export const hero = {
  // COMPOSED — current site H1 "Escola de Idiomas Online para Trabalhadores Brasileiros"
  eyebrow: "Escola de idiomas online para trabalhadores brasileiros",
  // h1 — VERBATIM tagline, split so "língua" can carry the highlight
  headline: { before: "Bora destravar sua", word: "língua", after: "e seu futuro?" },
  // COMPOSED — languages + formats (current site) + VERBATIM "no seu tempinho e do seu jeitinho"
  sub: "Inglês, francês, espanhol e alemão em aulas online individuais ou em dupla. Estude um idioma no seu tempinho e do seu jeitinho.",
  cta: "Quero destravar meu idioma", // [CONTENT]
  secondary: "Ver como funciona", // [CONTENT]
  // VERBATIM — pillar 1 bullets
  stats: ["+500 alunos destravados", "+25 professores formados", "Excelência desde 2018"],
  chat: [
    // [CONTENT] student line — voice per research.md §3 ("e aí", informal PT-BR)
    { from: "aluno", text: "E aí, dá pra aprender inglês trabalhando o dia todo?" },
    // VERBATIM — current site hero
    { from: "outubro", text: "Bora! Estude um idioma no seu tempinho e do seu jeitinho." },
    // VERBATIM — differentiators
    { from: "outubro", text: "Fale o idioma desde o dia 1." },
  ],
} as const;

export const marquee = [
  // VERBATIM facts
  "+500 alunos destravados",
  "Inglês",
  "+25 professores formados",
  "Francês",
  "Aulas individuais ou em dupla",
  "Espanhol",
  "Excelência desde 2018",
  "Alemão",
] as const;

export const metodo = {
  title: "Só tem na Outubro!", // VERBATIM
  lead: "Usamos a Abordagem Comunicativa para:", // VERBATIM
  // VERBATIM
  points: [
    "Oferecer um ensino realista e humano",
    "Transformar alunos em comunicadores",
    "Formar professores referência",
    "Planejar cursos eficientes",
  ],
} as const;

export const idiomas = {
  title: "Aulas online que funcionam de verdade!", // VERBATIM
  // VERBATIM (case normalized)
  lead: "Feita para trabalhadores brasileiros que precisam de flexibilidade, qualidade e organização.",
  formats: ["Aulas Individuais", "Aulas em Dupla"], // VERBATIM
  languages: [
    // name VERBATIM; greeting is the language's own word for "hi"
    { slug: "ingles", name: "Inglês", hello: "Hello!", tone: "cobalt" },
    { slug: "frances", name: "Francês", hello: "Bonjour!", tone: "pink" },
    { slug: "espanhol", name: "Espanhol", hello: "¡Hola!", tone: "lime" },
    { slug: "alemao", name: "Alemão", hello: "Hallo!", tone: "coral" },
  ],
  cardCta: "Quero aprender", // [CONTENT]
} as const;

export const comoFunciona = {
  title: "Destravar é simples", // [CONTENT]
  // COMPOSED — every step restates a verbatim fact; no level test is claimed
  // (research never established one — client-content-request.md item 4).
  steps: [
    {
      title: "Chama no WhatsApp",
      body: "Conta pra gente qual idioma você quer e o que precisa destravar.", // [CONTENT]
    },
    {
      title: "Escolhe seu plano",
      body: "Aulas individuais ou em dupla, de 1× a 3× por semana.", // COMPOSED — pricing table
    },
    {
      title: "Fala desde o dia 1",
      body: "Aulas dinâmicas, relevantes e personalizadas, com professor brasileiro.", // COMPOSED — differentiators
    },
  ],
  cta: "Começar agora", // [CONTENT]
} as const;

export const pilares = {
  title: "Os Três Pilares da Outubro", // VERBATIM
  lead: "De trabalhadores para trabalhadores.", // VERBATIM — Instagram bio
  // All VERBATIM — current site
  items: [
    {
      title: "Educar com Qualidade",
      line: "Conectamos pessoas com aulas eficientes.",
      bullets: ["Excelência desde 2018", "+500 alunos destravados", "+25 professores formados", "Educação antes do lucro"],
      closing: "Critério, organização e método.",
      tone: "lime",
    },
    {
      title: "Empregar com Dignidade",
      line: "Professor valorizado = aulas melhores.",
      bullets: ["Remuneração justa", "Formação contínua", "Ambiente de troca", "Profes valorizados"],
      closing: "Respeito, suporte e valorização.",
      tone: "pink",
    },
    {
      title: "Criar Oportunidade",
      line: "Evolução coletiva para todos.",
      bullets: ["Carreira internacional", "Viagens sem perrengue", "Conexões autênticas", "Troca de conhecimento"],
      closing: "Impacto, progresso e liberdade.",
      tone: "cobalt",
    },
  ],
} as const;

export const diferenciais = {
  title: "Na Outubro, aprender é assim:", // VERBATIM
  // All VERBATIM — current site
  items: [
    { icon: "contract", title: "Contrato Transparente", body: "Sem letras miúdas, sem multas ou amarras." },
    { icon: "training", title: "Formação Contínua de Docentes", body: "Equipe treinada semanalmente e acompanhada diariamente." },
    { icon: "conversation", title: "Foco em Conversação", body: "Aulas dinâmicas, relevantes e personalizadas. Fale o idioma desde o dia 1." },
    { icon: "teachers", title: "Professores Brasileiros", body: "Gente que te entende pra te ajudar a destravar." },
    { icon: "material", title: "Material Incluso", body: "Não precisa comprar livro caro que você vai jogar fora depois." },
    { icon: "team", title: "Equipe Engajada", body: "Profissionais compromissados e interessados que gostam do que fazem." },
  ],
  cta: "Quero me matricular", // VERBATIM
} as const;

export const ctaFinal = {
  title: "Bora destravar sua língua e seu futuro?", // VERBATIM
  reassurance: "Contrato transparente: sem letras miúdas, sem multas ou amarras.", // VERBATIM
  cta: "Bora lá!", // VERBATIM ("BORA LÁ!!", case normalized)
} as const;

export const footer = {
  about: "Aulas comunicativas 100% online. De trabalhadores para trabalhadores.", // VERBATIM — Instagram bio
  links: [
    { href: site.library, label: "Biblioteca: 200GB de materiais gratuitos" }, // VERBATIM — linktr.ee
    { href: site.blog, label: "Blog" },
    { href: site.careers, label: "Quero dar aulas" }, // VERBATIM — linktr.ee
    { href: site.instagram, label: "Instagram" },
  ],
} as const;

export const seo = {
  // [CONTENT] — final title/description, client-content-request.md
  title: "Outubro Idiomas | Aulas online de inglês, francês, espanhol e alemão",
  description:
    "Escola de idiomas online para trabalhadores brasileiros desde 2018. Aulas individuais ou em dupla, professores brasileiros, conversação desde o dia 1. Bora destravar?",
} as const;
