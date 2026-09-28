// /metodo — architecture.md §1: the method/pillars deep-dive. Built from the client's
// brandbook (docs/Outubro Idiomas_brandbook.pdf §1.3-1.7) and the current site's own copy.
// The Home's "Só tem na Outubro" points and the three pillars are reused from
// content/home/*.ts (metodo, pilares), not repeated here.
const metodo = {
  seo: {
    title: "Método", // [CONTENT]
    // COMPOSED — brandbook "Essência da Marca" + current site ("Abordagem Comunicativa", "Fale o idioma desde o dia 1")
    description:
      "Ensino de idiomas com metodologia feita de e para trabalhadores brasileiros: Abordagem Comunicativa, conversação desde o dia 1 e professores brasileiros. Conheça o método da Outubro.",
  },
  hero: {
    eyebrow: "Método",
    title: "Metodologia feita de e para trabalhadores brasileiros", // VERBATIM — brandbook "Essência da Marca" (subject dropped)
    // VERBATIM — brandbook "Propósito"
    lead: "Empoderar alunos a se expressarem através da língua e oferecer uma jornada significativa para os professores.",
  },
  abordagem: {
    title: "Abordagem Comunicativa", // VERBATIM — current site
    // [CONTENT] COMPOSED — "Foco em Conversação … Fale o idioma desde o dia 1" (current site)
    body: [
      "Você aprende o idioma usando o idioma. Desde a primeira aula, a conversa é o centro: situações reais, do seu dia a dia e do seu trabalho.",
      "Gramática e vocabulário entram quando a conversa pede, não numa lista para decorar antes de falar.",
    ],
  },
  aula: {
    title: "Como é uma aula", // [CONTENT]
    // [CONTENT] COMPOSED — formats (current site) + the client's class-record panel
    // (docs/Imagens da Outubro/Manual calendarios/: every class logged with Content,
    // Resources, Extra Practice and a Bio column the teacher keeps about the student).
    steps: [
      { title: "Ao vivo e online", body: "Individual ou em dupla, com professor brasileiro, no horário que cabe na sua rotina." },
      { title: "Do seu jeitinho", body: "O professor conhece seus objetivos e sua rotina, e a aula parte disso." },
      { title: "Tudo registrado", body: "Cada aula fica anotada no seu calendário: o que foi visto, o material e a prática extra." },
    ],
  },
  experiencia: {
    title: "Uma escola que cuida dos dois lados", // [CONTENT]
    // VERBATIM — brandbook "Experiência da Marca"
    items: [
      {
        title: "Para alunos",
        body: "Um ambiente de aprendizado onde cada aluno se sinta apoiado e confiante, com acesso a recursos personalizados e relevantes, e tenha a flexibilidade necessária para um aprendizado efetivo.",
      },
      {
        title: "Para professores",
        body: "Uma plataforma que oferece estabilidade, remuneração justa e oportunidades de crescimento, em um ambiente que valoriza e respeita seu trabalho.",
      },
    ],
  },
  valores: {
    title: "Nossos valores", // [CONTENT] — brandbook "Valores Centrais"
    // VERBATIM — brandbook "Valores Centrais"
    items: [
      { title: "Brasilidade", body: "Orgulhosos de nossas raízes e culturalmente conectados com nossos alunos e professores." },
      { title: "Qualidade", body: "Sempre buscando a excelência e o aprimoramento contínuo em todos os aspectos da nossa atuação." },
      { title: "Integralidade", body: "Criamos um ambiente de respeito que aprecia a diversidade de perspectivas e histórias individuais." },
      { title: "Transformação", body: "Comprometidos em criar mudanças significativas nos objetivos dos nossos alunos e professores." },
      { title: "Flexibilidade", body: "Adaptamos nossos serviços e abordagens para atender às necessidades individuais." },
    ],
  },
};

export type MetodoDictionary = typeof metodo;
export default metodo;
