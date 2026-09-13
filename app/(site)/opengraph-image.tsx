import { ImageResponse } from "next/og";

// Home's own OG image (architecture.md §5: one per page, never one shared site-wide).
// Satori can't read CSS custom properties, so the brand tokens from app/globals.css are
// repeated here as literals — keep in sync with --color-* there.

export const alt = "Outubro Idiomas: bora destravar sua língua e seu futuro?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#14120F"; // --color-ink
const BG_ALT = "#FFFDF7"; // --color-bg-alt
const LIME = "#CFEA27"; // --color-lime
const PINK = "#F0389C"; // --color-pink
const CORAL = "#FF5D3E"; // --color-coral
const COBALT = "#3B6DD8"; // --color-cobalt

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
          background: LIME,
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: COBALT }} />
        <div style={{ position: "absolute", bottom: -40, right: 200, width: 110, height: 110, borderRadius: 24, background: PINK, transform: "rotate(18deg)" }} />
        <div style={{ position: "absolute", bottom: 60, right: 80, width: 64, height: 64, borderRadius: 16, background: CORAL, transform: "rotate(-12deg)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: COBALT, border: `3px solid ${INK}` }} />
          <span style={{ fontSize: 34, fontWeight: 800, color: INK }}>outubro idiomas</span>
        </div>

        <div style={{ display: "flex" }}>
          <span style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, color: INK, maxWidth: 900 }}>
            Bora destravar sua língua e seu futuro?
          </span>
        </div>

        <div style={{ display: "flex" }}>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: INK,
              background: BG_ALT,
              border: `3px solid ${INK}`,
              borderRadius: 999,
              padding: "10px 26px",
            }}
          >
            Inglês · Francês · Espanhol · Alemão — aulas online
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
