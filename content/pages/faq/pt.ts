// /faq — architecture.md §1. Entries come from lib/faqs.ts; category names from
// content/home/*.ts → faq.categories.
const faq = {
  seo: {
    title: "Perguntas frequentes", // [CONTENT]
    // COMPOSED — the FAQ's own topics + "sem letras miúdas" (current site)
    description:
      "Como são as aulas, quanto custa, o que acontece se você faltar e como cancelar: as regras da Outubro Idiomas, sem letras miúdas.",
  },
  hero: {
    eyebrow: "Dúvidas",
    title: "Perguntas frequentes", // [CONTENT]
    lead: "Aulas, pagamento, faltas e cancelamento: as regras da Outubro, sem letras miúdas.", // [CONTENT]
  },
  jumpLabel: "Ir para o tema", // [CONTENT]
  more: {
    title: "Não achou sua dúvida?", // [CONTENT]
    cta: "Perguntar no WhatsApp", // [CONTENT]
  },
};

export type FaqDictionary = typeof faq;
export default faq;
