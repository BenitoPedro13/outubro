// /contato — architecture.md §1. WhatsApp only, no form (roadmap.md decision 4, 2026-09-28).
// Numbers and handles live in content/site.ts.
const contato = {
  seo: {
    title: "Contato", // [CONTENT]
    description: "Fale com a Outubro Idiomas pelo WhatsApp ou pelo Instagram. É pelo WhatsApp que a matrícula acontece.", // [CONTENT]
  },
  hero: {
    eyebrow: "Contato",
    title: "E aí, bora conversar?", // [CONTENT] — voice per brandbook §1.3 "E aí, beleza? Fala comigo!"
    lead: "O jeito mais rápido de falar com a gente é o WhatsApp. É por lá que a matrícula acontece.", // [CONTENT]
  },
  whatsapp: {
    title: "WhatsApp",
    body: "Tira dúvidas, escolhe seu plano e faz a matrícula.", // [CONTENT]
    cta: "Chamar no WhatsApp", // [CONTENT]
  },
  instagram: {
    title: "Instagram",
    body: "Dicas de idioma e o dia a dia da Outubro.", // [CONTENT]
    cta: "Seguir @outubroidiomas",
  },
};

export type ContatoDictionary = typeof contato;
export default contato;
