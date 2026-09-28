// /depoimentos — architecture.md §1. Entries come from lib/testimonials.ts; card labels from
// content/home/*.ts → depoimentos.
const depoimentos = {
  seo: {
    title: "Depoimentos", // [CONTENT]
    description: "O que dizem os alunos da Outubro Idiomas sobre as aulas online de inglês, francês, espanhol e alemão.", // [CONTENT]
  },
  hero: {
    eyebrow: "Depoimentos",
    title: "Quem destravou, conta", // [CONTENT] — same line as the Home section
    lead: "Alunos da Outubro, com as palavras deles.", // [CONTENT]
  },
  share: {
    title: "Estudou com a gente?", // [CONTENT]
    body: "Conta como foi. Seu depoimento pode ajudar outra pessoa a destravar.", // [CONTENT]
    cta: "Mandar meu depoimento", // [CONTENT]
    message: "Oi! Sou aluno da Outubro e quero mandar meu depoimento.", // [CONTENT]
  },
};

export type DepoimentosDictionary = typeof depoimentos;
export default depoimentos;
