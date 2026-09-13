import type { Metadata } from "next";
import { manrope } from "@/lib/fonts";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  // Absolute base so per-route OG images and canonicals resolve (lib/site-url.ts).
  metadataBase: new URL(siteUrl),
  title: "Outubro Idiomas",
  description: "Bora destravar sua língua e seu futuro?",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
