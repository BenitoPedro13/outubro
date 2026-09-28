// /precos — architecture.md §1: the full table as its own indexable page, plus next year's.
// Card labels (formats, "por aluno", "/mês") are shared with the Home: content/home/*.ts → precos.
const precos = {
  seo: {
    title: "Preços", // [CONTENT]
    // COMPOSED — formats, frequencies, "Material Incluso", "sem multas" (current site)
    description:
      "Valores das aulas online de inglês, francês, espanhol e alemão na Outubro Idiomas: individuais ou em dupla, de 1× a 3× por semana. Material incluso, sem multas.",
  },
  hero: {
    eyebrow: "Preços",
    title: "Quanto custa destravar?", // [CONTENT] — same line as the Home section
    lead: "Valores {year} por aluno, por mês. Material incluso, sem multas ou amarras.", // COMPOSED — as the Home
  },
  next: {
    title: "Valores {year}", // VERBATIM pattern — current site "Valores 2027"
    // [CONTENT] client-content-request.md item 2: switch date not decided yet
    lead: "A tabela que passa a valer em {year}, lado a lado com a atual.",
    format: "Formato",
    caption: "Valores por aluno, por mês, em {current} e em {next}",
    noChange: "Sem reajuste", // VERBATIM — current site
  },
  reajuste: {
    title: "Entenda o reajuste", // VERBATIM — current site "Clique aqui e entenda o reajuste"
    since: "Estamos com os mesmos preços desde 2023!", // VERBATIM — current site
    // [CONTENT] client-content-request.md item 2: the client's own "entenda o reajuste" text
    // replaces this. Grounded in pillar 2 (VERBATIM "Professor valorizado = aulas melhores.",
    // "Remuneração justa", "Formação contínua") and "Material Incluso".
    body: [
      "Na Outubro, professor valorizado = aulas melhores. O reajuste existe para manter o que sustenta isso: remuneração justa e formação contínua para quem te dá aula.",
      "O resto não muda: material incluso, contrato transparente, sem letras miúdas, sem multas ou amarras.",
    ],
  },
};

export type PrecosDictionary = typeof precos;
export default precos;
