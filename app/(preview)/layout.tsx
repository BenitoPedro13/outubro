import type { Metadata } from "next";
import { sourceSans } from "@/lib/fonts";
import { siteUrl } from "@/lib/site-url";
import "../globals.css";

// Root layout for the brand/motion preview — docs/tasks/TASK-preview-page.md. A separate
// root from app/[lang] (TASK-brand-alignment.md §2.7): this route is a dated PT-only
// planning document, not site content, so it gets no header, footer or locale.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Outubro Idiomas",
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={sourceSans.variable}>
      <body>{children}</body>
    </html>
  );
}
