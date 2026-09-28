import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// One OG card for every page (architecture.md §5: one per page). Brandbook §2.3's preferred
// colourway: the logo on the primary blue, lime mark + black wordmark. Satori can't read
// CSS custom properties, so the brandbook §2.6 hexes are repeated here as literals — keep
// in sync with --color-* in app/globals.css.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const COBALT = "#3B6DD8"; // --color-cobalt
const LIME = "#CFEA27"; // --color-lime
const INK = "#000000"; // --color-ink
const PAPER = "#FFF9F4"; // --color-bg-alt
const PINK = "#FF97D2"; // --color-pink

/** `title` is the big line (the tagline on the Home, the page's h1 elsewhere); `chip` the pill under it. */
export async function renderOgImage({ title, chip }: { title: string; chip: string }) {
  const [font, logoSvg] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/SourceSans3-Black.ttf")),
    readFile(join(process.cwd(), "public/brand/logo-horizontal.svg"), "utf8"),
  ]);
  // On blue the mark turns lime (brandbook §2.3).
  const logo = `data:image/svg+xml;base64,${Buffer.from(logoSvg.replaceAll("#3B6DD8", LIME)).toString("base64")}`;
  // Longer page titles step down so three lines still fit above the chip.
  const fontSize = title.length > 48 ? 72 : 92;

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

        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders <img>, not next/image */}
        <img src={logo} width={360} height={69} alt="" />

        <div style={{ display: "flex" }}>
          <span style={{ fontSize, lineHeight: 1, color: INK, maxWidth: 940, letterSpacing: -1 }}>{title}</span>
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
            {chip}
          </span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Source Sans 3", data: font, style: "normal", weight: 900 }] }
  );
}
