import type { Dictionary } from "./pt";

/**
 * EN dictionary. [CONTENT: tradução — revisão nativa pendente] — the whole file is a
 * translation of ./pt.ts by the dev team, keeping the brand's informal, direct voice
 * (brandbook "Tom de voz": amigável, sincero, inspirador). See client-content-request.md.
 */
export const en: Dictionary = {
  seo: {
    title: "Outubro Idiomas | Online English, French, Spanish and German classes",
    description:
      "Online language school for Brazilian working adults since 2018. One-on-one or pair classes, Brazilian teachers, real conversation from day one. Ready to get unstuck?",
    ogAlt: "Outubro Idiomas: ready to unlock your language and your future?",
    ogChip: "English · French · Spanish · German, online classes",
  },

  ui: {
    skipLink: "Skip to content",
    homeLabel: "Outubro Idiomas, back to top",
    navLabel: "Sections",
    opensWhatsapp: "(opens WhatsApp)",
    opensNewTab: "(opens in a new tab)",
    languageLabel: "Site language",
    footerLinksLabel: "Outubro links",
  },

  whatsapp: {
    default: "Hi! I found you on your website and I want to get my language unstuck.",
    language: "Hi! I found you on your website and I want to learn {language}.",
    plan: "Hi! I found you on your website and I'd like to know more about {plan}.",
  },

  tagline: "Ready to unlock your language and your future?",

  nav: [
    { href: "#metodo", label: "Method" },
    { href: "#idiomas", label: "Languages" },
    { href: "#como-funciona", label: "How it works" },
    { href: "#precos", label: "Pricing" },
  ],

  header: {
    cta: "Enroll",
    ctaSuffix: " now",
  },

  mobileCta: "Chat on WhatsApp",

  hero: {
    eyebrow: "Online language school for Brazilian working adults",
    headline: { before: "Ready to unlock your", word: "language", after: "and your future?" },
    phonetic: "/ˈlæŋ.ɡwɪdʒ/",
    sub: "English, French, Spanish and German in online one-on-one or pair classes. Learn a language in your own time and your own way.",
    cta: "I want to get unstuck",
    secondary: "See how it works",
    stats: ["500+ students unstuck", "25+ teachers trained", "Excellence since 2018"],
    chatTitle: "Outubro Idiomas",
    chatSubtitle: "WhatsApp chat",
    chatSticker: "hey!",
    chatSpeakers: { aluno: "Student: ", outubro: "Outubro: " },
    chat: [
      { from: "aluno", text: "Hey, can I really learn English while working full time?" },
      { from: "outubro", text: "Let's go! Learn a language in your own time and your own way." },
      { from: "outubro", text: "Speak the language from day one." },
    ],
  },

  marquee: [
    "500+ students unstuck",
    "English",
    "25+ teachers trained",
    "French",
    "One-on-one or pair classes",
    "Spanish",
    "Excellence since 2018",
    "German",
  ],

  metodo: {
    title: "Only at Outubro!",
    lead: "We use the Communicative Approach to:",
    points: [
      "Offer realistic, human teaching",
      "Turn students into communicators",
      "Train benchmark teachers",
      "Plan efficient courses",
    ],
  },

  idiomas: {
    title: "Online classes that actually work!",
    lead: "Made for Brazilian working adults who need flexibility, quality and organization.",
    formatsLabel: "Formats",
    formats: ["One-on-one classes", "Pair classes"],
    languages: [
      { name: "English", inSentence: "English", hello: "Hello!" },
      { name: "French", inSentence: "French", hello: "Bonjour!" },
      { name: "Spanish", inSentence: "Spanish", hello: "¡Hola!" },
      { name: "German", inSentence: "German", hello: "Hallo!" },
    ],
    cardCta: "I want to learn",
  },

  comoFunciona: {
    title: "Getting unstuck is simple",
    steps: [
      {
        title: "Message us on WhatsApp",
        body: "Tell us which language you want and what you need to unlock.",
      },
      {
        title: "Pick your plan",
        body: "One-on-one or pair classes, 1× to 3× a week.",
      },
      {
        title: "Speak from day one",
        body: "Dynamic, relevant, personalized classes with a Brazilian teacher.",
      },
    ],
    cta: "Get started",
  },

  pilares: {
    title: "Outubro's Three Pillars",
    lead: "By workers, for workers.",
    cta: "I want to be part of it",
    items: [
      {
        title: "Quality Education",
        line: "We connect people through efficient classes.",
        bullets: ["Excellence since 2018", "500+ students unstuck", "25+ teachers trained", "Education before profit"],
        closing: "Rigor, organization and method.",
      },
      {
        title: "Dignified Employment",
        line: "Valued teachers = better classes.",
        bullets: ["Fair pay", "Ongoing training", "A culture of exchange", "Teachers who feel valued"],
        closing: "Respect, support and recognition.",
      },
      {
        title: "Creating Opportunity",
        line: "Collective growth for everyone.",
        bullets: ["International careers", "Hassle-free travel", "Authentic connections", "Knowledge sharing"],
        closing: "Impact, progress and freedom.",
      },
    ],
  },

  diferenciais: {
    title: "At Outubro, learning looks like this:",
    items: [
      { title: "Transparent Contract", body: "No fine print, no penalties, no strings attached." },
      { title: "Ongoing Teacher Training", body: "A team trained every week and supported every day." },
      { title: "Focus on Conversation", body: "Dynamic, relevant, personalized classes. Speak the language from day one." },
      { title: "Brazilian Teachers", body: "People who get you, helping you get unstuck." },
      { title: "Materials Included", body: "No need to buy pricey textbooks you'll throw away later." },
      { title: "Engaged Team", body: "Committed, curious professionals who love what they do." },
    ],
    cta: "I want to enroll",
  },

  precos: {
    title: "How much does it cost?",
    lead: "{year} prices, per student, per month. Materials included, no penalties or strings attached.",
    perWeek: "{n}× a week",
    unit: "/month",
    perStudent: "per student",
    formats: {
      individual: {
        title: "One-on-one classes",
        who: "You and your teacher",
        cta: "I want one-on-one classes",
      },
      dupla: {
        title: "Pair classes",
        who: "You, one more person and your teacher",
        cta: "I want pair classes",
      },
    },
    note: "Not sure which to pick? Message us on WhatsApp and we'll help.",
    noteCta: "Ask on WhatsApp",
  },

  ctaFinal: {
    title: "Ready to unlock your language and your future?",
    cta: "Let's go!",
  },

  footer: {
    about: "Communicative classes, 100% online. By workers, for workers.",
    cta: "Chat on WhatsApp",
    links: {
      library: "Library: 200GB of free materials",
      blog: "Blog (in Portuguese)",
      careers: "I want to teach",
      instagram: "Instagram",
    },
    copyright: "© {year} Outubro Idiomas. Quality and professionalism since 2018.",
  },
};
