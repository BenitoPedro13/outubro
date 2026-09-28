// /trabalhe-conosco — architecture.md §1. Intro only: the application form is
// TASK-careers-form (persisted + emailed, never email-only). Until then "how to apply" links
// to the current external form (content/site.ts → careers, linktr.ee "QUERO DAR AULAS").
const trabalheConosco = {
  seo: {
    title: "Trabalhe conosco", // [CONTENT]
    // COMPOSED — pillar 2 (current site) + brandbook "Para professores"
    description:
      "Quer dar aulas de idiomas online? Na Outubro, professor valorizado = aulas melhores: remuneração justa, formação contínua e um ambiente de troca.",
  },
  hero: {
    eyebrow: "Trabalhe conosco",
    title: "Quero dar aulas", // VERBATIM — linktr.ee "QUERO DAR AULAS"
    lead: "Professor valorizado = aulas melhores.", // VERBATIM — pillar 2
  },
  oferta: {
    title: "O que a Outubro oferece", // [CONTENT]
    // VERBATIM — brandbook "Experiência da Marca → Para professores"
    lead: "Uma plataforma que oferece estabilidade, remuneração justa e oportunidades de crescimento, em um ambiente que valoriza e respeita seu trabalho.",
    // VERBATIM — pillar 2 bullets (current site) + "Formação Contínua de Docentes" differentiator
    items: [
      { title: "Remuneração justa", body: "Professor bem pago dá aula melhor." }, // body [CONTENT]
      { title: "Formação contínua", body: "Equipe treinada semanalmente e acompanhada diariamente." }, // body VERBATIM
      { title: "Ambiente de troca", body: "Uma comunidade de professores que aprende junto." }, // body [CONTENT]
      { title: "Profes valorizados", body: "Respeito, suporte e valorização." }, // body VERBATIM — pillar 2 closing
    ],
  },
  perfil: {
    title: "Quem a gente procura", // [CONTENT]
    // VERBATIM — brandbook "Ecossistema Outubro → Professores"
    items: [
      "Professores autônomos que buscam estabilidade, reconhecimento e uma comunidade.",
      "Educadores que querem trabalhar com flexibilidade e capacitação.",
      "Professores comprometidos que desejam uma participação ativa e contribuir para o ecossistema da Outubro.",
    ],
  },
  candidatura: {
    title: "Como se candidatar", // [CONTENT]
    body: "Preencha o formulário de candidatura. A gente lê tudo e entra em contato.", // [CONTENT]
    cta: "Abrir o formulário", // [CONTENT]
  },
};

export type TrabalheConoscoDictionary = typeof trabalheConosco;
export default trabalheConosco;
