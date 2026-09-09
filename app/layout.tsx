import type { Metadata } from "next";
import { manrope } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  // Live preview deploy — docs/tasks/TASK-preview-page.md. Needed so the
  // opengraph-image route resolves to an absolute URL for real link previews
  // instead of defaulting to localhost.
  metadataBase: new URL("https://outubroidiomas.vercel.app"),
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
