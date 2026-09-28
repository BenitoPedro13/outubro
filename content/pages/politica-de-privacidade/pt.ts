// /politica-de-privacidade — architecture.md §1. DRAFT, NEEDS LEGAL REVIEW (roadmap.md content
// policy): the whole file is [CONTENT]. LGPD structure (Lei 13.709/2018) for exactly what the
// site handles today: no forms, no cookies, no analytics; hosting logs (Vercel) and the
// WhatsApp/Instagram links. Must be revised before TASK-careers-form ships a form and before
// analytics lands (TASK-launch). The controller's legal name and CNPJ come from the client
// (roadmap.md "Waiting on the client").
const politica = {
  seo: {
    title: "Política de privacidade",
    description: "Como a Outubro Idiomas trata dados pessoais no site: o que é coletado, para quê, com quem é compartilhado e como exercer seus direitos pela LGPD.",
  },
  hero: {
    eyebrow: "Privacidade",
    title: "Política de privacidade",
    lead: "Sem letras miúdas: o que acontece com os seus dados quando você visita este site.",
  },
  draftNotice: "Rascunho em revisão jurídica. Este texto ainda pode mudar.",
  updated: "Última atualização: {date}",
  sections: [
    {
      title: "Quem é responsável pelos seus dados",
      body: [
        "A Outubro Idiomas é a controladora dos dados pessoais tratados neste site, nos termos da Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018). Razão social e CNPJ: [a confirmar].",
      ],
    },
    {
      title: "O que este site coleta",
      body: [
        "Este site não tem formulários, não usa cookies e não usa ferramentas de análise ou publicidade.",
        "Como qualquer site, o servidor que o hospeda (Vercel) registra dados técnicos de cada acesso: endereço IP, navegador, página acessada e horário. Esses registros servem para manter o site no ar e seguro.",
      ],
    },
    {
      title: "WhatsApp e Instagram",
      body: [
        "Os botões do site abrem o WhatsApp ou o Instagram. A partir daí, a conversa acontece nesses aplicativos, que têm suas próprias políticas de privacidade.",
        "O que você nos conta no WhatsApp (nome, telefone, idioma de interesse, disponibilidade) usamos só para responder, montar seu plano e fazer sua matrícula.",
      ],
    },
    {
      title: "Base legal",
      body: [
        "Registros de acesso: legítimo interesse em manter o site funcionando e seguro (LGPD, art. 7º, IX). Conversas de matrícula: procedimentos preliminares a um contrato que você pediu (LGPD, art. 7º, V).",
      ],
    },
    {
      title: "Com quem compartilhamos",
      body: [
        "Não vendemos nem alugamos dados pessoais. Os registros de acesso ficam com o provedor de hospedagem (Vercel), que pode processá-los fora do Brasil, com as garantias previstas na LGPD.",
      ],
    },
    {
      title: "Por quanto tempo",
      body: [
        "Registros de acesso são mantidos pelo prazo do provedor de hospedagem e pelo mínimo exigido pelo Marco Civil da Internet (Lei 12.965/2014). Dados de matrícula ficam enquanto durar a relação com a escola e pelos prazos legais depois dela.",
      ],
    },
    {
      title: "Seus direitos",
      body: [
        "Você pode pedir, a qualquer momento: confirmação de que tratamos seus dados, acesso, correção, anonimização ou eliminação, portabilidade, informação sobre compartilhamento e revogação de consentimento (LGPD, art. 18).",
        "Para exercer qualquer um deles, fale com a gente pelo WhatsApp. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).",
      ],
    },
    {
      title: "Mudanças nesta política",
      body: ["Se o site passar a coletar outros dados (por exemplo, um formulário), esta página é atualizada antes, com a nova data no topo."],
    },
  ],
};

export type PoliticaDictionary = typeof politica;
export default politica;
