import { Manrope } from "next/font/google";

// Interim loader — docs/visual-identity-spec.md §3 flags the self-hosted variable-font
// file as still unverified. next/font/google avoids a third-party runtime request either
// way (fonts are fetched at build time and self-served), so it doesn't block this task.
export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});
