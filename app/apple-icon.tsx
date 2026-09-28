import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Home-screen icon (iOS needs an opaque PNG; it applies its own rounded mask). Brandbook §2.3's
// preferred colourway: the lime symbol on the primary blue. Hexes repeated from app/globals.css
// (--color-cobalt, --color-lime): Satori can't read CSS custom properties.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const svg = await readFile(join(process.cwd(), "public/brand/symbol.svg"), "utf8");
  const symbol = `data:image/svg+xml;base64,${Buffer.from(svg.replaceAll("#3B6DD8", "#CFEA27")).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#3B6DD8" }}>
        <img src={symbol} width={124} height={124} alt="" />
      </div>
    ),
    size
  );
}
