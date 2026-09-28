import type { PoliticaDictionary } from "./pt";

// [CONTENT: translation — native review pending] Translation of ./pt.ts, itself a draft that
// needs legal review. The Portuguese version is the one that governs.
const politica: PoliticaDictionary = {
  seo: {
    title: "Privacy policy",
    description:
      "How Outubro Idiomas handles personal data on this website: what is collected, why, who it is shared with and how to exercise your rights under Brazil's LGPD.",
  },
  hero: {
    eyebrow: "Privacy",
    title: "Privacy policy",
    lead: "No fine print: what happens to your data when you visit this website.",
  },
  draftNotice: "Draft under legal review. This text may still change. The Portuguese version governs.",
  updated: "Last updated: {date}",
  sections: [
    {
      title: "Who is responsible for your data",
      body: [
        "Outubro Idiomas is the controller of the personal data processed on this website, under Brazil's General Data Protection Law (LGPD, Law 13.709/2018). Company name and CNPJ: [to be confirmed].",
      ],
    },
    {
      title: "What this website collects",
      body: [
        "This website has no forms, uses no cookies and uses no analytics or advertising tools.",
        "Like any website, the server that hosts it (Vercel) logs technical data for each visit: IP address, browser, page visited and time. These logs keep the site running and secure.",
      ],
    },
    {
      title: "WhatsApp and Instagram",
      body: [
        "The buttons on this site open WhatsApp or Instagram. From there, the conversation happens in those apps, which have their own privacy policies.",
        "What you tell us on WhatsApp (name, phone number, language of interest, availability) is used only to reply, put together your plan and enrol you.",
      ],
    },
    {
      title: "Legal basis",
      body: [
        "Access logs: legitimate interest in keeping the site running and secure (LGPD, art. 7, IX). Enrolment conversations: steps prior to a contract you asked for (LGPD, art. 7, V).",
      ],
    },
    {
      title: "Who we share it with",
      body: [
        "We don't sell or rent personal data. Access logs stay with the hosting provider (Vercel), which may process them outside Brazil, with the safeguards the LGPD requires.",
      ],
    },
    {
      title: "How long we keep it",
      body: [
        "Access logs are kept for the hosting provider's retention period and at least the minimum required by Brazil's Internet Civil Framework (Law 12.965/2014). Enrolment data is kept for as long as you study with us and for the legal periods afterwards.",
      ],
    },
    {
      title: "Your rights",
      body: [
        "At any time you can ask for: confirmation that we process your data, access, correction, anonymization or deletion, portability, information about sharing, and withdrawal of consent (LGPD, art. 18).",
        "To exercise any of them, message us on WhatsApp. You can also file a complaint with Brazil's National Data Protection Authority (ANPD).",
      ],
    },
    {
      title: "Changes to this policy",
      body: ["If the site starts collecting other data (a form, for example), this page is updated first, with the new date at the top."],
    },
  ],
};

export default politica;
