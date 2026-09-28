import { hasLocale, defaultLocale } from "@/content/i18n";
import { pt } from "@/content/home/pt";
import { en } from "@/content/home/en";
import { es } from "@/content/home/es";
import { loadPageDictionary, type PageKey } from "@/content/pages";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

// The two functions every page's opengraph-image.tsx re-exports: the page's h1 on the brand
// card (lib/og-image.tsx), the Home's languages chip under it.

const home = { pt, en, es };

export function pageOgImage(page: PageKey) {
  async function load(params: Promise<{ lang: string }>) {
    const { lang } = await params;
    const locale = hasLocale(lang) ? lang : defaultLocale;
    return { copy: await loadPageDictionary(page, locale), chip: home[locale].seo.ogChip };
  }

  return {
    async generateImageMetadata({ params }: { params: Promise<{ lang: string }> }) {
      const { copy } = await load(params);
      return [{ id: "og", alt: copy.hero.title, size: ogSize, contentType: ogContentType }];
    },
    async Image({ params }: { params: Promise<{ lang: string }> }) {
      const { copy, chip } = await load(params);
      return renderOgImage({ title: copy.hero.title, chip });
    },
  };
}
