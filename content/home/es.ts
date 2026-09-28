import type { Dictionary } from "./pt";

/**
 * ES dictionary (Latin American Spanish). [CONTENT: tradução — revisão nativa pendente] — the
 * whole file is a translation of ./pt.ts by the dev team, keeping the brand's informal,
 * direct voice (brandbook "Tom de voz"). See client-content-request.md.
 */
export const es: Dictionary = {
  seo: {
    title: "Outubro Idiomas | Clases online de inglés, francés, español y alemán",
    description:
      "Escuela de idiomas online para trabajadores brasileños desde 2018. Clases individuales o en pareja, profesores brasileños y conversación desde el primer día. ¿Vamos a destrabar?",
    ogAlt: "Outubro Idiomas: ¿vamos a destrabar tu lengua y tu futuro?",
    ogChip: "Inglés · Francés · Español · Alemán, clases online",
  },

  ui: {
    skipLink: "Saltar al contenido",
    homeLabel: "Outubro Idiomas, volver al inicio",
    navLabel: "Secciones",
    opensWhatsapp: "(abre WhatsApp)",
    opensNewTab: "(abre en una pestaña nueva)",
    languageLabel: "Idioma del sitio",
    footerLinksLabel: "Enlaces de Outubro",
  },

  whatsapp: {
    default: "¡Hola! Los encontré en su sitio web y quiero destrabar mi idioma.",
    language: "¡Hola! Los encontré en su sitio web y quiero aprender {language}.",
    plan: "¡Hola! Los encontré en su sitio web y quiero saber más sobre las {plan}.",
  },

  tagline: "¿Vamos a destrabar tu lengua y tu futuro?",

  nav: [
    { href: "#metodo", label: "Método" },
    { href: "#idiomas", label: "Idiomas" },
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#precos", label: "Precios" },
  ],

  header: {
    cta: "Inscríbete",
    ctaSuffix: " ya",
  },

  mobileCta: "Hablar por WhatsApp",

  hero: {
    eyebrow: "Escuela de idiomas online para trabajadores brasileños",
    headline: { before: "¿Vamos a destrabar tu", word: "lengua", after: "y tu futuro?" },
    phonetic: "/ˈleŋ.ɡwa/",
    sub: "Inglés, francés, español y alemán en clases online individuales o en pareja. Estudia un idioma a tu ritmo y a tu manera.",
    cta: "Quiero destrabar mi idioma",
    secondary: "Ver cómo funciona",
    stats: ["+500 alumnos destrabados", "+25 profesores formados", "Excelencia desde 2018"],
    chatTitle: "Outubro Idiomas",
    chatSubtitle: "Chat de WhatsApp",
    chatSticker: "¿qué tal?",
    chatSpeakers: { aluno: "Alumno: ", outubro: "Outubro: " },
    chat: [
      { from: "aluno", text: "Oye, ¿se puede aprender inglés trabajando todo el día?" },
      { from: "outubro", text: "¡Claro! Estudia un idioma a tu ritmo y a tu manera." },
      { from: "outubro", text: "Habla el idioma desde el primer día." },
    ],
  },

  marquee: [
    "+500 alumnos destrabados",
    "Inglés",
    "+25 profesores formados",
    "Francés",
    "Clases individuales o en pareja",
    "Español",
    "Excelencia desde 2018",
    "Alemán",
  ],

  metodo: {
    title: "¡Solo en Outubro!",
    lead: "Usamos el Enfoque Comunicativo para:",
    points: [
      "Ofrecer una enseñanza realista y humana",
      "Transformar alumnos en comunicadores",
      "Formar profesores de referencia",
      "Planificar cursos eficientes",
    ],
  },

  idiomas: {
    title: "¡Clases online que funcionan de verdad!",
    lead: "Hechas para trabajadores brasileños que necesitan flexibilidad, calidad y organización.",
    formatsLabel: "Modalidades",
    formats: ["Clases individuales", "Clases en pareja"],
    languages: [
      { name: "Inglés", inSentence: "inglés", hello: "Hello!" },
      { name: "Francés", inSentence: "francés", hello: "Bonjour!" },
      { name: "Español", inSentence: "español", hello: "¡Hola!" },
      { name: "Alemán", inSentence: "alemán", hello: "Hallo!" },
    ],
    cardCta: "Quiero aprender",
  },

  comoFunciona: {
    title: "Destrabar es simple",
    steps: [
      {
        title: "Escríbenos por WhatsApp",
        body: "Cuéntanos qué idioma quieres y qué necesitas destrabar.",
      },
      {
        title: "Elige tu plan",
        body: "Clases individuales o en pareja, de 1 a 3 veces por semana.",
      },
      {
        title: "Habla desde el primer día",
        body: "Clases dinámicas, relevantes y personalizadas, con profesor brasileño.",
      },
    ],
    cta: "Empezar ahora",
  },

  pilares: {
    title: "Los Tres Pilares de Outubro",
    lead: "De trabajadores para trabajadores.",
    cta: "Quiero ser parte",
    items: [
      {
        title: "Educar con Calidad",
        line: "Conectamos personas con clases eficientes.",
        bullets: ["Excelencia desde 2018", "+500 alumnos destrabados", "+25 profesores formados", "Educación antes que lucro"],
        closing: "Criterio, organización y método.",
      },
      {
        title: "Emplear con Dignidad",
        line: "Profesor valorado = mejores clases.",
        bullets: ["Remuneración justa", "Formación continua", "Ambiente de intercambio", "Profes valorados"],
        closing: "Respeto, apoyo y valoración.",
      },
      {
        title: "Crear Oportunidades",
        line: "Evolución colectiva para todos.",
        bullets: ["Carrera internacional", "Viajes sin complicaciones", "Conexiones auténticas", "Intercambio de conocimiento"],
        closing: "Impacto, progreso y libertad.",
      },
    ],
  },

  diferenciais: {
    title: "En Outubro, aprender es así:",
    items: [
      { title: "Contrato Transparente", body: "Sin letra pequeña, sin multas ni ataduras." },
      { title: "Formación Continua de Docentes", body: "Equipo capacitado cada semana y acompañado cada día." },
      { title: "Enfoque en Conversación", body: "Clases dinámicas, relevantes y personalizadas. Habla el idioma desde el primer día." },
      { title: "Profesores Brasileños", body: "Gente que te entiende para ayudarte a destrabar." },
      { title: "Material Incluido", body: "No necesitas comprar libros caros que vas a tirar después." },
      { title: "Equipo Comprometido", body: "Profesionales comprometidos e interesados a quienes les gusta lo que hacen." },
    ],
    cta: "Quiero inscribirme",
  },

  precos: {
    title: "¿Cuánto cuesta destrabar?",
    lead: "Precios {year} por alumno, por mes. Material incluido, sin multas ni ataduras.",
    perWeek: "{n}× por semana",
    unit: "/mes",
    perStudent: "por alumno",
    formats: {
      individual: {
        title: "Clases individuales",
        who: "Tú y tu profesor",
        cta: "Quiero clases individuales",
      },
      dupla: {
        title: "Clases en pareja",
        who: "Tú, otra persona y tu profesor",
        cta: "Quiero clases en pareja",
      },
    },
    note: "¿No sabes cuál elegir? Escríbenos por WhatsApp y te ayudamos.",
    noteCta: "Preguntar por WhatsApp",
  },

  ctaFinal: {
    title: "¿Vamos a destrabar tu lengua y tu futuro?",
    cta: "¡Vamos!",
  },

  footer: {
    about: "Clases comunicativas 100% online. De trabajadores para trabajadores.",
    cta: "Hablar por WhatsApp",
    links: {
      library: "Biblioteca: 200GB de materiales gratuitos",
      blog: "Blog (en portugués)",
      careers: "Quiero dar clases",
      instagram: "Instagram",
    },
    copyright: "© {year} Outubro Idiomas. Calidad y profesionalismo desde 2018.",
  },
};
