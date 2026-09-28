import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hasLocale } from "@/content/i18n";
import { pt } from "@/content/home/pt";
import { en } from "@/content/home/en";
import { es } from "@/content/home/es";

// Per-locale OG image (architecture.md §5: one per page). Brandbook §2.3's preferred
// colourway: the logo on the primary blue, lime mark + black wordmark. Satori can't read
// CSS custom properties, so the brandbook §2.6 hexes are repeated here as literals — keep
// in sync with --color-* in app/globals.css.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COBALT = "#3B6DD8"; // --color-cobalt
const LIME = "#CFEA27"; // --color-lime
const INK = "#000000"; // --color-ink
const PAPER = "#FFF9F4"; // --color-bg-alt
const PINK = "#FF97D2"; // --color-pink

const dictionaries = { pt, en, es };

export async function generateImageMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = hasLocale(lang) ? dictionaries[lang] : pt;
  return [{ id: "og", alt: t.seo.ogAlt, size, contentType }];
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = hasLocale(lang) ? dictionaries[lang] : pt;

  const [font, logoSvg] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/SourceSans3-Black.ttf")),
    readFile(join(process.cwd(), "public/brand/logo-horizontal.svg"), "utf8"),
  ]);
  // On blue the mark turns lime (brandbook §2.3).
  const logo = `data:image/svg+xml;base64,${Buffer.from(logoSvg.replaceAll("#3B6DD8", LIME)).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: COBALT,
          padding: 64,
          fontFamily: "Source Sans 3",
        }}
      >
        <div style={{ position: "absolute", bottom: -50, right: 120, width: 150, height: 150, borderRadius: 32, background: PINK, transform: "rotate(16deg)" }} />
        <div style={{ position: "absolute", top: 70, right: -40, width: 170, height: 170, borderRadius: 999, background: LIME }} />

        <img src={logo} width={360} height={69} alt="" />

        <div style={{ display: "flex" }}>
          <span style={{ fontSize: 92, lineHeight: 1, color: INK, maxWidth: 940, letterSpacing: -1 }}>{t.tagline}</span>
        </div>

        <div style={{ display: "flex" }}>
          <span
            style={{
              fontSize: 30,
              color: INK,
              background: PAPER,
              border: `3px solid ${INK}`,
              borderRadius: 999,
              padding: "10px 28px",
            }}
          >
            {t.seo.ogChip}
          </span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Source Sans 3", data: font, style: "normal", weight: 900 }] }
  );
}
