import { Flame } from "lucide-react";
import { restaurant } from "../../data/restaurant";
import type { QRCodeAssets } from "../../lib/qrCode";

export function QRMenuPrintCard({
  assets,
  onImageReady,
}: {
  assets: QRCodeAssets | null;
  onImageReady: () => void;
}) {
  return (
    <article
      className="qr-print-card"
      aria-label="Druckvorschau der QR-Speisekartenkarte"
    >
      <div className="qr-card-brand">
        <Flame size={32} strokeWidth={1.6} />
        <strong>{restaurant.name}</strong>
        <span>{restaurant.tagline}</span>
      </div>
      <div className="qr-card-rule" />
      <p className="qr-card-eyebrow">FRISCH. HERZHAFT. ECHT.</p>
      <h2>
        UNSERE
        <br />
        SPEISEKARTE
      </h2>
      <div className="qr-card-code">
        {assets ? (
          <img
            src={assets.svgDataUrl}
            alt={`QR-Code zur Speisekarte von ${restaurant.name}`}
            width="2048"
            height="2048"
            onLoad={onImageReady}
          />
        ) : (
          <p>
            QR-Code noch nicht verfügbar.
            <br />
            Öffentliche URL konfigurieren.
          </p>
        )}
      </div>
      <h3>QR-Code scannen &amp; Menü entdecken</h3>
      <p>
        Kamera öffnen. Code scannen.
        <br />
        Lieblingsgericht finden.
      </p>
      <small>Ohne App. Ohne Anmeldung.</small>
    </article>
  );
}
