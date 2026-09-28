import { hasLocale } from "@/content/i18n";
import { pt } from "@/content/home/pt";
import { en } from "@/content/home/en";
import { es } from "@/content/home/es";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

// Home OG image, per locale — the tagline on the brand card (lib/og-image.tsx).

export const size = ogSize;
export const contentType = ogContentType;

const dictionaries = { pt, en, es };

export async function generateImageMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = hasLocale(lang) ? dictionaries[lang] : pt;
  return [{ id: "og", alt: t.seo.ogAlt, size, contentType }];
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = hasLocale(lang) ? dictionaries[lang] : pt;
  return renderOgImage({ title: t.tagline, chip: t.seo.ogChip });
}
