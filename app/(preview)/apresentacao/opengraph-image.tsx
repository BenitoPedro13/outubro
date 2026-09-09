import { ImageResponse } from "next/og";

// Next.js file convention (node_modules/next/dist/docs/.../opengraph-image.md) —
// generates the og:image meta tags for this route automatically. Rendered by
// Satori, not a real browser: no CSS custom properties, no arbitrary <svg>, so the
// brand hex values from docs/visual-identity-spec.md §4 are hardcoded here rather
// than reused from app/globals.css's `var(--color-*)` tokens.

export const alt = "Outubro Idiomas | pesquisa, decisões e plano";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#14120F";
const BG = "#FAF9F5";
const LIME = "#C8E639";
const PINK = "#F0389C";
const CORAL = "#FF5D3E";
const COBALT = "#2E5FE0";

export default function Image() {
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
          background: BG,
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        {/* corner accents — plain shapes, no custom SVG (Satori-safe) */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: LIME }} />
        <div style={{ position: "absolute", bottom: -50, left: 120, width: 120, height: 120, borderRadius: 24, background: PINK, transform: "rotate(18deg)" }} />
        <div style={{ position: "absolute", bottom: 40, right: 100, width: 70, height: 70, borderRadius: 16, background: CORAL, transform: "rotate(-12deg)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: COBALT }} />
          <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: 2, color: INK, textTransform: "uppercase" }}>
            Outubro Idiomas · site novo
          </span>
        </div>

        {/* One solid color, not mixed inline spans — Satori's text layout
            miscalculates run widths when a colored span sits mid-sentence
            (confirmed live: words overlapped). */}
        <div style={{ display: "flex" }}>
          <span style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, color: INK, maxWidth: 980 }}>
            Bora destravar sua língua e seu futuro?
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 28, color: INK, fontWeight: 600 }}>Pesquisa, decisões e plano</span>
          <div style={{ display: "flex", gap: 10 }}>
            {[LIME, PINK, COBALT, CORAL].map((c) => (
              <div key={c} style={{ width: 28, height: 28, borderRadius: 8, background: c }} />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
