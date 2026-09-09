/**
 * Single source of truth for the /apresentacao planning document.
 *
 * Mirrors the structural pattern proven on the UniMeet project's own pitch page
 * (content/pitch.ts there): one document, numbered sections, real argument — sources
 * cited as `docs/research.md`, `docs/architecture.md`, `docs/visual-identity-spec.md`.
 * Content is Portuguese (PT-BR) because that's the site's own language (invariant 4).
 */

export const meta = {
  eyebrow: "OUTUBRO IDIOMAS · SITE NOVO",
  title: "O que pesquisamos, o que achamos ruim, o que decidimos fazer, e por quê",
  standfirst:
    "Antes de programar qualquer página, um resumo do que investigamos nas referências, no site atual e no Instagram da Outubro; o que concluímos disso; e o plano que isso virou. Esta página é o documento, não o site, cada seção termina em algo que se pode concordar ou corrigir.",
  preparedDate: "9 de setembro de 2026",
};

export const sections = {
  contexto: {
    n: "01",
    title: "O que a Outubro já é",
    lead: "Antes de desenhar qualquer coisa: o que já existe, para não jogar fora o que já funciona.",
    points: [
      {
        title: "Uma escola de idiomas online para adultos brasileiros",
        body: "Inglês, francês, espanhol e alemão. Aulas individuais ou em dupla, 100% online, abordagem comunicativa, fala desde a primeira aula, sem decoreba de gramática.",
      },
      {
        title: "+500 alunos e +25 professores, desde 2018",
        body: "Preços estáveis desde 2023. O diferencial público não é só o resultado do aluno, é como a escola trata o professor: remuneração justa, formação contínua, contrato transparente sem multa.",
      },
      {
        title: "A marca já passou por uma revolução, o site não",
        body: "Nas palavras da própria Outubro no Instagram: “Para crescer, fizemos revolução! Mudamos o nome, as cores, o visual...”. O selo-estrela, a paleta lima/pink/cobalto/coral e os rabiscos à mão já existem e já têm reconhecimento, isso é herança de marca, não uma escolha nossa.",
      },
      {
        title: "A conversão já acontece fora do site",
        body: "WhatsApp é o canal real de matrícula (“MATRICULE-SE JÁ”, no Linktree). O site precisa alimentar essa conversa, não substituí-la por um formulário que ninguém pediu.",
      },
    ],
  },

  problema: {
    n: "02",
    title: "Por que o site atual não converte",
    lead: "O conteúdo do site atual já está certo. O problema não é o que ele diz, é como ele diz.",
    evidence: [
      "identidade visual quase não aplicada",
      "nenhuma animação",
      "layout de template genérico",
      "grid e paleta do Instagram não chegam ao site",
      "nenhuma hierarquia visual clara",
    ],
    body: "Isso importa porque a marca já parece boa fora do site, divertida, colorida, cheia de rabiscos e gírias, no Instagram. O site, hoje, parece uma escola de idiomas qualquer. É um problema de execução, não de conteúdo: os pilares, os preços, o FAQ e os depoimentos do site atual continuam válidos, o que falta é dar a eles a mesma qualidade visual que a marca já tem fora do site.",
  },

  referencias: {
    n: "03",
    title: "As referências que olhamos",
    lead: "Três fontes, todas do acervo do próprio projeto, o que aproveitar de cada uma, e o que evitar.",
    items: [
      {
        name: "Babbly",
        scale: "estudo de caso (Behance) · referência principal, escolhida pelo cliente",
        take: "O grid de caderno em tela cheia, não como textura discreta, como fundo real, de ponta a ponta. Os balões de chat como microcopy (“Ready to speak?”). Os cartões de sticky note com clipe de papel. Os star-bursts desenhados à mão, espalhados sem medo.",
        avoid: "A paleta pastel. A Outubro já é mais saturada e mais quente que a Babbly, isso é uma diferença da marca, não um erro a corrigir.",
      },
      {
        name: "speakPolish",
        scale: "mockup (Dribbble) · referência secundária",
        take: "Os cartões numerados sobrepostos, levemente rotacionados, como um baralho jogado na mesa. O texto em arco girando ao redor de uma imagem.",
        avoid: "O fundo escuro, quase preto. A marca da Outubro é clara e quente, nunca sóbria.",
      },
      {
        name: "Instagram atual da Outubro",
        scale: "a própria marca, já em uso",
        take: "A tipografia bold condensada, a paleta lima/pink/cobalto/coral, as setas e círculos desenhados à mão, o selo-estrela do logo.",
        avoid: "Nada, é a base que estamos elevando, não substituindo.",
      },
    ],
    common:
      "As três apontam para a mesma direção: um caderno de estudos com bom humor, não um site de escola de idiomas engessado.",
  },

  decisao: {
    n: "04",
    title: "O que decidimos fazer, e por quê",
    lead: "A recomendação central: elevar a identidade que já existe até o nível de execução da Babbly, sem copiar a Babbly, sem reinventar a marca.",
    pillars: [
      {
        title: "Elevação, não rebranding",
        body: "O selo-estrela, a paleta e os rabiscos já existem e já têm reconhecimento no Instagram. Trocá-los jogaria fora reconhecimento de marca já conquistado.",
      },
      {
        title: "Mobile e SEO antes de espetáculo",
        body: "A maior parte do tráfego é um adulto brasileiro no celular, chegando pelo WhatsApp ou pelo Google. Por isso a motion é Tier 2 (GSAP + Lenis), bonita, mas sem o custo de performance de WebGL.",
      },
      {
        title: "Grid em tela cheia, do jeito que a Babbly usa",
        body: "Não como textura atrás de uma seção, como fundo real, de ponta a ponta. Esse é exatamente o ajuste feito depois da primeira versão desta prévia, que prendia o grid dentro de um cartão com margem.",
      },
      {
        title: "Next.js + Payload, com Payload só para o que precisa mudar sem programador",
        body: "Preços, depoimentos e FAQ ficam editáveis no painel. A estrutura das páginas fica no código, é “principalmente uma landing page”, o volume de conteúdo editável é pequeno de propósito.",
      },
    ],
  },

  estrutura: {
    n: "05",
    title: "As páginas, e o que vai em cada uma",
    lead: "Proposta de docs/architecture.md §1, ainda sem aprovação. Cada página é uma URL real, não uma âncora, porque cada uma precisa de SEO próprio.",
    pages: [
      {
        no: "1",
        name: "Home",
        audience: "Todo mundo que chega pelo Google, Instagram ou um link compartilhado",
        purpose: "Contar a história de venda inteira, do início ao fim, do gancho ao WhatsApp.",
        contents: [
          "Hero com a interação de assinatura (seção 06)",
          "Faixa de confiança: +500 alunos, +25 professores, idiomas oferecidos",
          "Os quatro idiomas, em cartões",
          "Como funciona: teste de nível → plano → conversação desde o dia 1",
          "Os três pilares (Educar, Empregar, Criar), a diferenciação mais forte da marca",
          "Depoimentos, preços, FAQ (versão curta) e CTA final",
        ],
      },
      {
        no: "2",
        name: "Preços",
        audience: "Quem já decidiu e quer confirmar o valor",
        purpose: "A mesma tabela da Home, mas como página própria, “outubro idiomas preço” é uma busca real.",
        contents: ["Tabela completa, individual e dupla, 1× a 3× por semana", "O mesmo preço desde 2023, como sinal de confiança"],
      },
      {
        no: "3",
        name: "Método",
        audience: "Quem quer entender antes de confiar",
        purpose: "Aprofundar os três pilares que só aparecem resumidos na Home.",
        contents: ["Educar com qualidade", "Empregar com dignidade", "Criar oportunidade"],
      },
      {
        no: "4",
        name: "Depoimentos",
        audience: "Quem está quase decidido",
        purpose: "Prova social completa, a Home mostra só uma seleção.",
        contents: ["Lista completa de depoimentos"],
      },
      {
        no: "5",
        name: "FAQ",
        audience: "Quem tem uma objeção específica",
        purpose: "Responder antes que a dúvida vire desistência.",
        contents: ["Lista completa de perguntas"],
      },
      {
        no: "6",
        name: "Trabalhe conosco",
        audience: "Professores em potencial",
        purpose: "Substituir o link externo atual (“QUERO DAR AULAS”) por uma página própria.",
        contents: ["Formulário de candidatura"],
      },
      {
        no: "7",
        name: "Contato",
        audience: "Quem prefere não usar o WhatsApp direto",
        purpose: "Rota alternativa de contato, e página de fallback natural.",
        contents: ["WhatsApp, e-mail, redes sociais"],
      },
    ],
    open: {
      title: "Em aberto: a biblioteca de materiais e o blog",
      body: "O Linktree atual aponta para uma biblioteca de materiais gratuitos e um blog no Blogspot, ambos fora do domínio principal. Reconstruir os dois no site novo dá SEO para o domínio certo, mas é conteúdo, não estrutura, e fica para a conversa de seleção de conteúdo (docs/research.md §6, pergunta 2).",
    },
  },

  identidade: {
    n: "06",
    title: "A identidade visual, e a interação de assinatura",
    lead: "docs/visual-identity-spec.md, produzido com o framework Invention Gate da skill awwwards-v8. Role até o final desta seção para ver a animação, ela é o item mais importante aqui, não um detalhe de fundo.",
    palette: [
      { name: "Lima", hex: "#C8E639" },
      { name: "Lima escuro", hex: "#9BB821" },
      { name: "Cobalto", hex: "#2E5FE0" },
      { name: "Cobalto escuro", hex: "#1F44AD" },
      { name: "Pink", hex: "#F0389C" },
      { name: "Coral", hex: "#FF5D3E" },
      { name: "Tinta", hex: "#14120F" },
    ],
    interaction: {
      label: "A interação de assinatura",
      statement:
        "Quando a pessoa rola a tela, a promessa da marca, destravar, se manifesta como um cordão emaranhado que se desenrola em sincronia com o scroll, resolvendo exatamente quando a palavra “língua” chega em foco.",
      rejected: [
        "Stagger genérico de texto (padrão batido, sem significado de marca)",
        "Partículas montando o texto (bonito, mas pesa demais no orçamento de mobile/SEO)",
        "Cadeado abrindo (óbvio demais, parece ícone de interface, não identidade)",
      ],
    },
  },

  proximosPassos: {
    n: "07",
    title: "Como estamos trabalhando",
    lead: "Seis passos. Os dois primeiros já aconteceram, o resto ainda não tem código.",
    items: [
      { no: "1", title: "Especificações", body: "docs/research.md, docs/architecture.md, docs/visual-identity-spec.md, feito." },
      { no: "2", title: "Esta prévia", body: "Alinhar direção visual e de motion antes de programar a Home de verdade, em andamento, esta é a segunda versão." },
      { no: "3", title: "Payload + Postgres + Blob", body: "Fundação de dados: mídia, depoimentos, preços, FAQ, equipe, ainda não instalado (TASK-scaffold.md)." },
      { no: "4", title: "Seleção de conteúdo", body: "Depoimentos finais, preços do ano vigente, perguntas do FAQ, deliberadamente adiado até aqui." },
      { no: "5", title: "Construção das páginas reais", body: "As sete páginas da seção 05, com o sistema visual da seção 06 aplicado de verdade." },
      { no: "6", title: "Lançamento", body: "Domínio, SEO por página, Lighthouse, acessibilidade, e handover." },
    ],
  },

  perguntasAbertas: {
    n: "08",
    title: "O que ainda está em aberto",
    lead: "docs/research.md §6, nada aqui bloqueia esta prévia, mas tudo bloqueia a próxima etapa.",
    items: [
      { q: "Quais páginas ficam como rota própria e quais continuam como seção da Home?", why: "Proposta na seção 05, precisa de aprovação antes da construção real." },
      { q: "A biblioteca de materiais e o blog entram no domínio novo, ou continuam externos?", why: "Muda a estratégia de SEO, um blog externo dá autoridade ao domínio antigo, não ao novo." },
      { q: "Depoimentos, FAQ e preços finais, quais entram no site?", why: "Seleção de conteúdo, adiada de propósito até esta prévia ser aprovada." },
      { q: "A tipografia atual da marca foi licenciada, ou Manrope é uma escolha nova?", why: "Decide se estamos reproduzindo uma fonte existente ou escolhendo uma nova." },
      { q: "Provedor de e-mail transacional e de analytics?", why: "Nenhum dos dois foi escolhido ainda, bloqueia os formulários e a medição." },
    ],
  },
} as const;
