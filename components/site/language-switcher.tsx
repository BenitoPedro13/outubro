import { getLocale } from "@/content/dictionaries";
import { LanguageLinks } from "./language-links";

// Three plain links, not a dropdown: nothing to open, nothing to get wrong for keyboard or
// screen-reader users. Sighted users see the code; assistive tech hears the language's own
// name, in that language (lang attribute).
export async function LanguageSwitcher({ label, tone = "light", className }: { label: string; tone?: "light" | "dark"; className?: string }) {
  return (
    <nav aria-label={label} className={className}>
      <LanguageLinks current={await getLocale()} tone={tone} />
    </nav>
  );
}
