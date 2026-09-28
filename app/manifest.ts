import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Web app manifest — mostly so Android's "add to home screen" gets the brand name, colours and
// icon. Hexes repeated from app/globals.css (--color-cobalt, --color-bg): a manifest can't read
// CSS custom properties.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Outubro",
    start_url: "/",
    display: "browser",
    theme_color: "#3B6DD8",
    background_color: "#FEF2E9",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
