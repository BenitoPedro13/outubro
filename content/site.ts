// Facts that don't change with the locale — docs/research.md §1-3.

const WHATSAPP_NUMBER = "5521920115154"; // VERBATIM — linktr.ee "MATRICULE-SE JÁ"

/** Every CTA is a WhatsApp link; the prefilled message comes from the locale dictionary. */
export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const site = {
  name: "Outubro Idiomas",
  foundingYear: 2018,
  telephone: "+55-21-92011-5154",
  instagram: "https://www.instagram.com/outubroidiomas/",
  careers: "https://lucky-bat.static.domains/vagas", // VERBATIM — linktr.ee "QUERO DAR AULAS"
  library: "https://outubro.link/biblioteca", // VERBATIM — linktr.ee
  blog: "https://outubroidiomas.blogspot.com", // VERBATIM — linktr.ee
} as const;
