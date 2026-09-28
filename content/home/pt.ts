/**
 * PT-BR dictionary — the source language. EN/ES (./en.ts, ./es.ts) must match this shape.
 *
 * Source tags:
 *   VERBATIM  — current outubroidiomas.com / Instagram bio, word for word (docs/research.md §1-3)
 *   COMPOSED  — rearranged from verbatim facts, no new claims
 *   [CONTENT] — draft wording with no source yet; listed in docs/client-content-request.md,
 *               must be replaced before launch
 *
 * Testimonials, FAQ and pricing figures are NOT here — they live in lib/testimonials.ts,
 * lib/faqs.ts and lib/pricing.ts, Payload-shaped until TASK-cms (TASK-pages-static.md §2.1);
 * only the labels are here. Copy for the other pages is in content/pages/.
 */
export const pt = {
  seo: {
    // [CONTENT] — final title/description, client-content-request.md
    title: "Outubro Idiomas | Aulas online de inglês, francês, espanhol e alemão",
    description:
      "Escola de idiomas online para trabalhadores brasileiros desde 2018. Aulas individuais ou em dupla, professores brasileiros, conversação desde o dia 1. Bora destravar?",
    ogAlt: "Outubro Idiomas: bora destravar sua língua e seu futuro?",
    ogChip: "Inglês · Francês · Espanhol · Alemão, aulas online",
  },

  ui: {
    skipLink: "Pular para o conteúdo",
    homeLabel: "Outubro Idiomas, página inicial",
    navLabel: "Principal",
    menu: "Menu",
    closeMenu: "Fechar menu",
    opensWhatsapp: "(abre o WhatsApp)",
    opensNewTab: "(abre em nova aba)",
    languageLabel: "Idioma do site",
    footerLinksLabel: "Links da Outubro",
    footerPagesLabel: "Páginas",
  },

  whatsapp: {
    default: "Oi! Vim pelo site e quero destravar meu idioma.", // [CONTENT] client-content-request.md item 5
    language: "Oi! Vim pelo site e quero aprender {language}.", // [CONTENT]
    plan: "Oi! Vim pelo site e quero saber das {plan}.", // [CONTENT]
  },

  // VERBATIM — Instagram bio
  tagline: "Bora destravar sua língua e seu futuro?",

  // One name per page in the route map (content/i18n.ts) — header, phone menu, footer.
  nav: {
    home: "Início",
    metodo: "Método",
    precos: "Preços",
    depoimentos: "Depoimentos",
    faq: "Dúvidas",
    contato: "Contato",
    "trabalhe-conosco": "Trabalhe conosco",
    "politica-de-privacidade": "Política de privacidade",
  },

  header: {
    cta: "Matricule-se", // VERBATIM — linktr.ee "MATRICULE-SE JÁ"
    ctaSuffix: " já",
  },

  mobileCta: "Falar no WhatsApp",

  hero: {
    // COMPOSED — current site H1 "Escola de Idiomas Online para Trabalhadores Brasileiros"
    eyebrow: "Escola de idiomas online para trabalhadores brasileiros",
    // h1 — VERBATIM tagline, split so "língua" can carry the highlight
    headline: { before: "Bora destravar sua", word: "língua", after: "e seu futuro?" },
    // Brandbook §2.11 — the phonetic transcription the brand's own posts use as a device
    phonetic: "/ˈlĩ.ɡwɐ/",
    // COMPOSED — languages + formats (current site) + VERBATIM "no seu tempinho e do seu jeitinho"
    sub: "Inglês, francês, espanhol e alemão em aulas online individuais ou em dupla. Estude um idioma no seu tempinho e do seu jeitinho.",
    cta: "Quero destravar meu idioma", // [CONTENT]
    secondary: "Ver como funciona", // [CONTENT]
    // VERBATIM — pillar 1 bullets
    stats: ["+500 alunos destravados", "+25 professores formados", "Excelência desde 2018"],
    chatTitle: "Outubro Idiomas",
    chatSubtitle: "Conversa no WhatsApp",
    chatSticker: "e aí?",
    chatSpeakers: { aluno: "Aluno: ", outubro: "Outubro: " },
    chat: [
      // [CONTENT] student line — voice per research.md §3 ("e aí", informal PT-BR)
      { from: "aluno", text: "E aí, dá pra aprender inglês trabalhando o dia todo?" },
      // VERBATIM — current site hero
      { from: "outubro", text: "Bora! Estude um idioma no seu tempinho e do seu jeitinho." },
      // VERBATIM — differentiators
      { from: "outubro", text: "Fale o idioma desde o dia 1." },
    ],
  },

  // VERBATIM facts
  marquee: [
    "+500 alunos destravados",
    "Inglês",
    "+25 professores formados",
    "Francês",
    "Aulas individuais ou em dupla",
    "Espanhol",
    "Excelência desde 2018",
    "Alemão",
  ],

  metodo: {
    title: "Só tem na Outubro!", // VERBATIM
    lead: "Usamos a Abordagem Comunicativa para:", // VERBATIM
    // VERBATIM
    points: [
      "Oferecer um ensino realista e humano",
      "Transformar alunos em comunicadores",
      "Formar professores referência",
      "Planejar cursos eficientes",
    ],
  },

  idiomas: {
    title: "Aulas online que funcionam de verdade!", // VERBATIM
    // VERBATIM (case normalized)
    lead: "Feita para trabalhadores brasileiros que precisam de flexibilidade, qualidade e organização.",
    formatsLabel: "Modalidades",
    formats: ["Aulas Individuais", "Aulas em Dupla"], // VERBATIM
    // name VERBATIM; inSentence is the mid-sentence form (lowercase in PT/ES, not in EN);
    // greeting is the language's own word for "hi". Order matches the
    // card colours in components/site/home/idiomas.tsx.
    languages: [
      { name: "Inglês", inSentence: "inglês", hello: "Hello!" },
      { name: "Francês", inSentence: "francês", hello: "Bonjour!" },
      { name: "Espanhol", inSentence: "espanhol", hello: "¡Hola!" },
      { name: "Alemão", inSentence: "alemão", hello: "Hallo!" },
    ],
    cardCta: "Quero aprender", // [CONTENT]
  },

  comoFunciona: {
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
  },

  pilares: {
    title: "Os Três Pilares da Outubro", // VERBATIM
    lead: "De trabalhadores para trabalhadores.", // VERBATIM — Instagram bio
    cta: "Quero fazer parte", // [CONTENT]
    // All VERBATIM — current site. Order matches the band colours in pilares.tsx.
    items: [
      {
        title: "Educar com Qualidade",
        line: "Conectamos pessoas com aulas eficientes.",
        bullets: ["Excelência desde 2018", "+500 alunos destravados", "+25 professores formados", "Educação antes do lucro"],
        closing: "Critério, organização e método.",
      },
      {
        title: "Empregar com Dignidade",
        line: "Professor valorizado = aulas melhores.",
        bullets: ["Remuneração justa", "Formação contínua", "Ambiente de troca", "Profes valorizados"],
        closing: "Respeito, suporte e valorização.",
      },
      {
        title: "Criar Oportunidade",
        line: "Evolução coletiva para todos.",
        bullets: ["Carreira internacional", "Viagens sem perrengue", "Conexões autênticas", "Troca de conhecimento"],
        closing: "Impacto, progresso e liberdade.",
      },
    ],
  },

  diferenciais: {
    title: "Na Outubro, aprender é assim:", // VERBATIM
    // All VERBATIM — current site. Order matches the icons in diferenciais.tsx.
    items: [
      { title: "Contrato Transparente", body: "Sem letras miúdas, sem multas ou amarras." },
      { title: "Formação Contínua de Docentes", body: "Equipe treinada semanalmente e acompanhada diariamente." },
      { title: "Foco em Conversação", body: "Aulas dinâmicas, relevantes e personalizadas. Fale o idioma desde o dia 1." },
      { title: "Professores Brasileiros", body: "Gente que te entende pra te ajudar a destravar." },
      { title: "Material Incluso", body: "Não precisa comprar livro caro que você vai jogar fora depois." },
      { title: "Equipe Engajada", body: "Profissionais compromissados e interessados que gostam do que fazem." },
    ],
    cta: "Quero me matricular", // VERBATIM
  },

  precos: {
    title: "Quanto custa destravar?", // [CONTENT]
    // COMPOSED — "Valores 2026", "por aluno", "por mês" (current site) + two verbatim differentiators
    lead: "Valores {year} por aluno, por mês. Material incluso, sem multas ou amarras.",
    perWeek: "{n}× por semana", // VERBATIM "1x semana", normalized
    unit: "/mês", // VERBATIM "por mês"
    perStudent: "por aluno", // VERBATIM
    formats: {
      individual: {
        title: "Aulas individuais", // VERBATIM
        who: "Você e o professor", // COMPOSED — 1:1 format
        cta: "Quero aulas individuais", // [CONTENT]
      },
      dupla: {
        title: "Aulas em dupla", // VERBATIM
        who: "Você, mais uma pessoa e o professor", // COMPOSED — 2:1 format
        cta: "Quero aulas em dupla", // [CONTENT]
      },
    },
    note: "Não sabe qual escolher? Chama no WhatsApp que a gente te ajuda.", // [CONTENT]
    noteCta: "Tirar dúvida no WhatsApp", // [CONTENT]
    seeAll: "Ver todos os valores", // [CONTENT]
  },

  // Entries come from lib/testimonials.ts (Payload-shaped until TASK-cms); only labels here.
  depoimentos: {
    title: "Quem destravou, conta", // [CONTENT]
    lead: "Alunos da Outubro, com as palavras deles.", // [CONTENT]
    placeholder: "exemplo", // marker on openly-placeholder cards (roadmap.md content policy)
    languages: { ingles: "Inglês", frances: "Francês", espanhol: "Espanhol", alemao: "Alemão" },
    seeAll: "Ver todos os depoimentos", // [CONTENT]
  },

  // Entries come from lib/faqs.ts (Payload-shaped until TASK-cms); only labels here.
  faq: {
    title: "Ficou alguma dúvida?", // [CONTENT]
    lead: "O que a galera mais pergunta antes de começar.", // [CONTENT]
    categories: { aulas: "Aulas", pagamento: "Pagamento", reposicao: "Faltas e reposição", cancelamento: "Cancelamento" },
    seeAll: "Ver todas as dúvidas", // [CONTENT]
  },

  ctaFinal: {
    title: "Bora destravar sua língua e seu futuro?", // VERBATIM
    cta: "Bora lá!", // VERBATIM ("BORA LÁ!!", case normalized)
  },

  footer: {
    about: "Aulas comunicativas 100% online. De trabalhadores para trabalhadores.", // VERBATIM — Instagram bio
    cta: "Falar no WhatsApp",
    links: {
      library: "Biblioteca: 200GB de materiais gratuitos", // VERBATIM — linktr.ee
      blog: "Blog",
      instagram: "Instagram",
    },
    // The user's own wording (2026-09-27 review)
    copyright: "© {year} Outubro Idiomas. Qualidade e profissionalismo desde 2018.",
  },
};

export type Dictionary = typeof pt;
