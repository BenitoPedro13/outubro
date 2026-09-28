import { ogContentType, ogSize } from "@/lib/og-image";
import { pageOgImage } from "@/lib/page-og";

const og = pageOgImage("depoimentos");

export const size = ogSize;
export const contentType = ogContentType;
export const generateImageMetadata = og.generateImageMetadata;
export default og.Image;
