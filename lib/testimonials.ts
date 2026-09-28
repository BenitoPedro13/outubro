import type { Locale } from "@/content/i18n";

// Testimonials — docs/tasks/TASK-pages-static.md §2.1.
//
// TEMPORARY HOME. The invariant is "testimonials live in Payload" (architecture.md §2,
// `testimonials`). Payload isn't installed yet, so the entries sit here, typed exactly like
// that collection, behind the one function the UI calls. TASK-cms replaces only
// getTestimonials()'s body with a Local API query; nothing that renders testimonials changes.

export type TestimonialLanguage = "ingles" | "frances" | "espanhol" | "alemao";

/** One entry as the Local API returns it with `locale` set: localized fields are strings. */
export type Testimonial = {
  id: string;
  studentName: string;
  language: TestimonialLanguage;
  quote: string;
  /** The student authorized publishing. Entries without it are never returned. */
  consent: boolean;
  /** Openly a stand-in: rendered with a visible "exemplo" marker. */
  placeholder: boolean;
  /** Shown on the Home. */
  featured: boolean;
  order: number;
};

type Localized<T> = Record<Locale, T>;
type Row = Omit<Testimonial, "studentName" | "quote"> & { studentName: Localized<string>; quote: Localized<string> };

// OPENLY PLACEHOLDERS, never invented quotes (roadmap.md content policy; user decision
// 2026-09-28: "dont hide, he will change on the admin afterwards"). The client replaces these
// with real students' words, name, language and consent (client-content-request.md item 1).
const placeholderQuote: Localized<string> = {
  pt: "Aqui entra o depoimento real de um aluno da Outubro, com as palavras dele e a autorização para publicar.",
  en: "A real Outubro student's testimonial goes here, in their own words and with their permission to publish.",
  es: "Aquí va el testimonio real de un alumno de Outubro, con sus propias palabras y su autorización para publicarlo.",
};
const placeholderName: Localized<string> = { pt: "Nome do aluno", en: "Student's name", es: "Nombre del alumno" };

const rows: Row[] = (["ingles", "frances", "espanhol"] as const).map((language, i) => ({
  id: `placeholder-${language}`,
  studentName: placeholderName,
  language,
  quote: placeholderQuote,
  consent: true,
  placeholder: true,
  featured: true,
  order: i + 1,
}));

export async function getTestimonials({ locale, featured }: { locale: Locale; featured?: boolean }): Promise<Testimonial[]> {
  return rows
    .filter((row) => row.consent && (featured === undefined || row.featured === featured))
    .sort((a, b) => a.order - b.order)
    .map((row) => ({ ...row, studentName: row.studentName[locale], quote: row.quote[locale] }));
}
