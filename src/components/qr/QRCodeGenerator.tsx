import { useEffect, useState } from "react";
import { Download, Printer, ArrowUpRight, AlertCircle } from "lucide-react";
import { resolvePublicMenuUrl } from "../../lib/publicMenuUrl";
import {
  generateMenuQRCode,
  downloadQRCode,
  type QRCodeAssets,
} from "../../lib/qrCode";
import { QRMenuPrintCard } from "./QRMenuPrintCard";

export function QRCodeGenerator({
  publicSiteUrl,
}: {
  publicSiteUrl: string | undefined;
}) {
  const target = resolvePublicMenuUrl(publicSiteUrl);
  const [assets, setAssets] = useState<QRCodeAssets | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [status, setStatus] = useState("");
  useEffect(() => {
    let cancelled = false;
    setAssets(null);
    setError(null);
    setImageReady(false);
    if (resolvePublicMenuUrl(publicSiteUrl).url) {
      generateMenuQRCode(publicSiteUrl)
        .then((result) => {
          if (!cancelled) setAssets(result);
        })
        .catch(() => {
          if (!cancelled)
            setError(
              "Der QR-Code konnte nicht erstellt werden. Bitte lade die Seite erneut und prüfe die Konfiguration.",
            );
        });
    }
    return () => {
      cancelled = true;
    };
  }, [publicSiteUrl]);
  const ready = Boolean(assets && imageReady && !target.error && !error);
  const exportCode = (format: "png" | "svg") => {
    if (!ready || !assets) return;
    try {
      downloadQRCode(assets, format);
      setStatus(`${format.toUpperCase()}-Download gestartet.`);
    } catch {
      setStatus(
        "Der Download konnte nicht gestartet werden. Bitte versuche es erneut.",
      );
    }
  };
  const print = async () => {
    if (!ready) return;
    try {
      await document.fonts.ready;
      window.print();
    } catch {
      setStatus(
        "Druckdialog konnte nicht geöffnet werden. Bitte erneut versuchen.",
      );
    }
  };
  return (
    <div className={`qr-generator ${ready ? "qr-ready" : ""}`}>
      <div className="qr-preview-area">
        <QRMenuPrintCard
          assets={assets}
          onImageReady={() => setImageReady(true)}
        />
      </div>
      <div className="qr-controls">
        <p className="eyebrow">DRUCK & EXPORT</p>
        <h2>
          Ein Scan.
          <br />
          Die ganze Karte.
        </h2>
        <p>
          Einmal drucken, jederzeit die Speisekarte aktualisieren. Produkte und
          Preise kommen direkt aus der gemeinsamen Menüdatei.
        </p>
        {(target.error || error) && (
          <div className="qr-warning" role="alert">
            <AlertCircle size={21} />
            <p>{target.error || error}</p>
          </div>
        )}
        {target.url && (
          <div className="qr-target">
            <span>Ziel des QR-Codes</span>
            <a href={target.url} target="_blank" rel="noopener noreferrer">
              {target.url}
              <ArrowUpRight size={16} />
            </a>
            <small>
              Vor dem Druck sicherstellen, dass diese Domain dir gehört, der
              neue Build dort bereitgestellt ist und die Speisekarte erreichbar
              ist.
            </small>
          </div>
        )}
        {target.url && !assets && !error && (
          <p role="status">QR-Code wird erstellt …</p>
        )}
        <div className="qr-export-actions">
          <button
            className="button"
            disabled={!ready}
            onClick={() => exportCode("png")}
          >
            <Download size={17} />
            PNG herunterladen
          </button>
          <button
            className="button"
            disabled={!ready}
            onClick={() => exportCode("svg")}
          >
            <Download size={17} />
            SVG herunterladen
          </button>
          <button
            className="button qr-print-button"
            disabled={!ready}
            onClick={print}
          >
            <Printer size={17} />
            Menükarte drucken
          </button>
        </div>
        <p className="qr-status" role="status" aria-live="polite">
          {status}
        </p>
        <ul>
          <li>PNG: 2048 × 2048 Pixel. SVG: verlustfrei skalierbar.</li>
          <li>Dunkler Code auf Weiß, vier Module freie Randzone.</li>
          <li>Druckkarte: DIN A6 (105 × 148 mm), QR-Code: 60 × 60 mm.</li>
          <li>
            Im Druckdialog 100 % Größe wählen und Kopf-/Fußzeilen ausschalten.
          </li>
          <li>
            Vor einer Druckauflage einen Testdruck mit einem Smartphone scannen.
          </li>
        </ul>
      </div>
    </div>
  );
}
