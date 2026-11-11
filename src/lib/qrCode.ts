import QRCode from "qrcode";
import { resolvePublicMenuUrl } from "./publicMenuUrl";

export interface QRCodeAssets {
  url: string;
  pngDataUrl: string;
  svg: string;
  svgDataUrl: string;
}
export const qrOptions = {
  errorCorrectionLevel: "H" as const,
  margin: 4,
  width: 2048,
  color: { dark: "#17110EFF", light: "#FFFFFFFF" },
};

export async function generateMenuQRCode(
  publicSiteUrl: string | undefined,
): Promise<QRCodeAssets> {
  const target = resolvePublicMenuUrl(publicSiteUrl);
  if (target.error !== null) throw new Error(target.error);
  const [pngDataUrl, svg] = await Promise.all([
    QRCode.toDataURL(target.url, { ...qrOptions, type: "image/png" }),
    QRCode.toString(target.url, { ...qrOptions, type: "svg" }),
  ]);
  return {
    url: target.url,
    pngDataUrl,
    svg,
    svgDataUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
  };
}

export function downloadQRCode(assets: QRCodeAssets, format: "png" | "svg") {
  const blob =
    format === "svg"
      ? new Blob([assets.svg], { type: "image/svg+xml;charset=utf-8" })
      : new Blob(
          [
            Uint8Array.from(
              atob(assets.pngDataUrl.split(",")[1]),
              (character) => character.charCodeAt(0),
            ),
          ],
          { type: "image/png" },
        );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `koz-speisekarte.${format}`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
