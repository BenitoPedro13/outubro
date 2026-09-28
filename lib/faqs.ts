import type { Locale } from "@/content/i18n";

// FAQ entries — docs/tasks/TASK-pages-static.md §2.1.
//
// TEMPORARY HOME. The invariant is "the FAQ lives in Payload" (architecture.md §2, `faqs`).
// Payload isn't installed yet, so the entries sit here, typed exactly like that collection,
// behind the one function the UI calls. TASK-cms replaces only getFaqs()'s body with a Local
// API query; nothing that renders the FAQ changes.
//
// Every entry is [CONTENT] (client-content-request.md item 3): drafted by us, grounded in
// the client's own rules panel ("Lembretes" + "Reposição ou cancelamento?",
// docs/Imagens da Outubro/Manual calendarios/manual calendarios 1.png, quoted per entry as
// PANEL) and the site's verbatim differentiators (content/home/pt.ts, quoted as SITE).

export type FaqCategory = "aulas" | "pagamento" | "reposicao" | "cancelamento";

export const faqCategories: FaqCategory[] = ["aulas", "pagamento", "reposicao", "cancelamento"];

/** One entry as the Local API returns it with `locale` set: localized fields are strings. */
export type Faq = {
  id: string;
  question: string;
  /** Plain-text paragraphs (the Payload textarea, split on blank lines). */
  answer: string[];
  category: FaqCategory;
  order: number;
  /** Shown on the Home. */
  featured: boolean;
};

type Localized<T> = Record<Locale, T>;
type Row = Omit<Faq, "question" | "answer"> & { question: Localized<string>; answer: Localized<string[]> };

const rows: Row[] = [
  // ─── Aulas ────────────────────────────────────────────────────────────────
  {
    id: "como-sao-as-aulas",
    category: "aulas",
    order: 1,
    featured: true,
    // SITE: formats, "Foco em Conversação", "Professores Brasileiros"
    question: {
      pt: "Como são as aulas?",
      en: "What are the classes like?",
      es: "¿Cómo son las clases?",
    },
    answer: {
      pt: [
        "Online e ao vivo, individuais (você e o professor) ou em dupla (você, mais uma pessoa e o professor), de 1× a 3× por semana.",
        "O foco é conversação: aulas dinâmicas, relevantes e personalizadas, com professores brasileiros. Você fala o idioma desde o dia 1.",
      ],
      en: [
        "Live and online, one-to-one (you and the teacher) or in pairs (you, one more person and the teacher), 1 to 3 times a week.",
        "The focus is conversation: dynamic, relevant, personalized classes with Brazilian teachers. You speak the language from day 1.",
      ],
      es: [
        "En vivo y online, individuales (tú y el profesor) o en pareja (tú, una persona más y el profesor), de 1 a 3 veces por semana.",
        "El foco es la conversación: clases dinámicas, relevantes y personalizadas, con profesores brasileños. Hablas el idioma desde el día 1.",
      ],
    },
  },
  {
    id: "quais-idiomas",
    category: "aulas",
    order: 2,
    featured: true,
    // SITE: languages
    question: {
      pt: "Quais idiomas eu posso estudar?",
      en: "Which languages can I study?",
      es: "¿Qué idiomas puedo estudiar?",
    },
    answer: {
      pt: ["Inglês, francês, espanhol e alemão."],
      en: ["English, French, Spanish and German."],
      es: ["Inglés, francés, español y alemán."],
    },
  },
  {
    id: "material",
    category: "aulas",
    order: 3,
    featured: true,
    // SITE: "Material Incluso"
    question: {
      pt: "Preciso comprar livro ou material?",
      en: "Do I need to buy books or materials?",
      es: "¿Tengo que comprar libros o material?",
    },
    answer: {
      pt: ["Não. O material está incluso: não precisa comprar livro caro que você vai jogar fora depois."],
      en: ["No. Materials are included: no need to buy an expensive book you'll throw away later."],
      es: ["No. El material está incluido: no necesitas comprar un libro caro que después vas a tirar."],
    },
  },
  {
    id: "trocar-horario-ou-formato",
    category: "aulas",
    order: 4,
    featured: false,
    // PANEL: "Pode trocar o dia/horário regular, ou de individual <> dupla? Se possível."
    question: {
      pt: "Posso trocar o dia e horário das aulas, ou passar de individual para dupla?",
      en: "Can I change my class day and time, or switch between one-to-one and pairs?",
      es: "¿Puedo cambiar el día y horario de las clases, o pasar de individual a pareja?",
    },
    answer: {
      pt: ["Se for possível na agenda, sim. É só falar com a gente."],
      en: ["If the schedule allows it, yes. Just let us know."],
      es: ["Si la agenda lo permite, sí. Solo avísanos."],
    },
  },

  // ─── Pagamento ────────────────────────────────────────────────────────────
  {
    id: "quanto-custa",
    category: "pagamento",
    order: 1,
    featured: true,
    // SITE: pricing table shape (figures stay in lib/pricing.ts, not duplicated here)
    question: {
      pt: "Quanto custa?",
      en: "How much does it cost?",
      es: "¿Cuánto cuesta?",
    },
    answer: {
      pt: [
        "Depende do formato (individual ou em dupla) e de quantas aulas por semana você faz. Os valores são por aluno, por mês, com material incluso.",
        "A tabela completa está na página de preços.",
      ],
      en: [
        "It depends on the format (one-to-one or pairs) and how many classes a week you take. Prices are per student, per month, materials included.",
        "The full table is on the pricing page.",
      ],
      es: [
        "Depende del formato (individual o en pareja) y de cuántas clases por semana tomes. Los precios son por alumno, por mes, con material incluido.",
        "La tabla completa está en la página de precios.",
      ],
    },
  },
  {
    id: "multa-fidelidade",
    category: "pagamento",
    order: 2,
    featured: false,
    // SITE: "Contrato Transparente — Sem letras miúdas, sem multas ou amarras."
    question: {
      pt: "Tem multa ou fidelidade?",
      en: "Is there a fee for leaving, or a minimum term?",
      es: "¿Hay multa o permanencia mínima?",
    },
    answer: {
      pt: ["Não. O contrato é transparente: sem letras miúdas, sem multas ou amarras."],
      en: ["No. The contract is transparent: no fine print, no fees, no strings attached."],
      es: ["No. El contrato es transparente: sin letra pequeña, sin multas ni ataduras."],
    },
  },

  // ─── Reposição ────────────────────────────────────────────────────────────
  {
    id: "quantas-aulas-adiar",
    category: "reposicao",
    order: 1,
    featured: true,
    // PANEL: "Quantas aulas pode postergar no mês? 1 aula x frequência semanal."
    //        "Quantas reposições pode acumular? 50% do total de aulas mensais."
    question: {
      pt: "E se eu precisar faltar? Quantas aulas posso adiar?",
      en: "What if I have to miss a class? How many can I postpone?",
      es: "¿Y si tengo que faltar? ¿Cuántas clases puedo aplazar?",
    },
    answer: {
      pt: [
        "Por mês, você pode adiar uma aula para cada aula semanal do seu plano: quem faz 1× por semana adia 1, quem faz 2× adia 2, quem faz 3× adia 3.",
        "A aula adiada vira reposição. Você pode acumular reposições até 50% do total de aulas do mês.",
      ],
      en: [
        "Each month you can postpone one class for every weekly class in your plan: 1× a week means 1, 2× means 2, 3× means 3.",
        "A postponed class becomes a make-up class. You can build up make-ups to 50% of your monthly classes.",
      ],
      es: [
        "Cada mes puedes aplazar una clase por cada clase semanal de tu plan: 1× por semana, 1; 2×, 2; 3×, 3.",
        "La clase aplazada se convierte en reposición. Puedes acumular reposiciones hasta el 50% del total de clases del mes.",
      ],
    },
  },
  {
    id: "prazo-aviso",
    category: "reposicao",
    order: 2,
    featured: false,
    // PANEL: "Reposição ou cancelamento?" — the whole column, times as written.
    question: {
      pt: "Até quando preciso avisar que vou faltar?",
      en: "How far in advance do I need to tell you I'll miss a class?",
      es: "¿Con cuánta antelación tengo que avisar que voy a faltar?",
    },
    answer: {
      pt: [
        "Aulas de segunda, entre 7h e 12h: avise até as 13h do domingo.",
        "Aulas de segunda (a partir das 13h) a sábado (até as 16h): se a aula é das 7h às 14h, avise até as 20h do dia anterior; das 15h às 18h, até as 10h do dia da aula; a partir das 18h, até as 13h do dia da aula.",
        "Com o aviso no prazo, a aula é reposta. Fora desses horários, a aula conta como cancelada, sem reposição.",
      ],
      en: [
        "Monday classes between 7am and 12pm: let us know by 1pm on Sunday.",
        "Classes from Monday (from 1pm) to Saturday (until 4pm): for a class between 7am and 2pm, let us know by 8pm the day before; between 3pm and 6pm, by 10am on the day; from 6pm on, by 1pm on the day.",
        "With notice in time, you get a make-up class. Outside these times, the class counts as cancelled, with no make-up.",
      ],
      es: [
        "Clases del lunes entre las 7h y las 12h: avisa hasta las 13h del domingo.",
        "Clases de lunes (desde las 13h) a sábado (hasta las 16h): si la clase es de 7h a 14h, avisa hasta las 20h del día anterior; de 15h a 18h, hasta las 10h del día de la clase; desde las 18h, hasta las 13h del día de la clase.",
        "Con el aviso a tiempo, la clase se repone. Fuera de estos horarios, la clase cuenta como cancelada, sin reposición.",
      ],
    },
  },
  {
    id: "como-reagendar",
    category: "reposicao",
    order: 3,
    featured: false,
    // PANEL: "Como reagenda uma aula? Use o link fornecido pelo seu professor."
    //        "Marquei reposição, pode desmarcar, ou remarcar a reposição? Não pode."
    //        "Faz aula em dupla? Rep com a dupla." — the panel's second half ("Faz sozinho?
    //        Rep em dupla.") is ambiguous and left out: client-content-request.md item 3.
    question: {
      pt: "Como eu remarco uma aula?",
      en: "How do I reschedule a class?",
      es: "¿Cómo reprogramo una clase?",
    },
    answer: {
      pt: [
        "Pelo link que o seu professor te passa.",
        "Depois de marcada, a reposição não pode ser desmarcada nem remarcada. Se você faz aula em dupla, a reposição é com a sua dupla.",
      ],
      en: [
        "Through the link your teacher gives you.",
        "Once booked, a make-up class can't be cancelled or moved. If you study in a pair, the make-up is with your partner.",
      ],
      es: [
        "Con el enlace que te pasa tu profesor.",
        "Una vez agendada, la reposición no se puede desmarcar ni reprogramar. Si estudias en pareja, la reposición es con tu pareja.",
      ],
    },
  },

  // ─── Cancelamento ─────────────────────────────────────────────────────────
  {
    id: "como-cancelar",
    category: "cancelamento",
    order: 1,
    featured: true,
    // PANEL: "Como cancela o curso? Paga o boleto seguinte ao aviso de cancelamento."
    // SITE: "sem multas ou amarras"
    question: {
      pt: "Como eu cancelo o curso?",
      en: "How do I cancel the course?",
      es: "¿Cómo cancelo el curso?",
    },
    answer: {
      pt: ["Avise a gente. Você paga só o boleto seguinte ao aviso de cancelamento, sem multa."],
      en: ["Let us know. You only pay the next invoice after your cancellation notice, with no fee."],
      es: ["Avísanos. Solo pagas la factura siguiente al aviso de cancelación, sin multa."],
    },
  },
];

export async function getFaqs({ locale, featured }: { locale: Locale; featured?: boolean }): Promise<Faq[]> {
  return rows
    .filter((row) => featured === undefined || row.featured === featured)
    .sort((a, b) => faqCategories.indexOf(a.category) - faqCategories.indexOf(b.category) || a.order - b.order)
    .map((row) => ({ ...row, question: row.question[locale], answer: row.answer[locale] }));
}
