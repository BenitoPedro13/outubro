import { Source_Sans_3 } from "next/font/google";

// Brandbook §2.5: Source Sans is the brand's only family ("somente as fontes dessa família
// devem ser utilizadas"). next/font/google fetches it at build time and self-serves it, so
// there's no third-party request at runtime. Loaded as the variable font (no `weight`):
// one file covers every weight the site uses (900 display, 700 subheads/UI, 600 emphasis,
// 400 body). Listing static weights made Google answer with multi-query `/l/font?kit=…`
// URLs, which Turbopack's dev font loader rejects ("next/font/google queries have exactly
// one entry").
export const sourceSans = Source_Sans_3({
  // latin-ext carries the IPA in the hero's phonetic note (ĩ ɡ ɐ); unicode-range means
  // browsers only fetch it for pages that use those glyphs.
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-sans",
  display: "swap",
});
