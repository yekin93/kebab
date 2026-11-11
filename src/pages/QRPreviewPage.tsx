import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Logo } from "../components/layout/Logo";
import { QRCodeGenerator } from "../components/qr/QRCodeGenerator";
import { restaurant } from "../data/restaurant";
import "./qr-preview.css";

export default function QRPreviewPage() {
  useEffect(() => {
    document.title = `QR-Menükarte · Entwicklung | ${restaurant.name}`;
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.append(robots);
    return () => robots.remove();
  }, []);
  return (
    <div className="qr-page">
      <header className="qr-page-header">
        <Logo href="/" />
        <a href="/">
          <ArrowLeft size={16} />
          Zur Startseite
        </a>
      </header>
      <main>
        <div className="qr-page-intro">
          <p className="eyebrow">FÜR DAS RESTAURANT · ENTWICKLUNGSVORSCHAU</p>
          <h1>
            Deine Karte.
            <br />
            Einfach gescannt<span>.</span>
          </h1>
          <p>
            QR-Code und Tischkarte für die digitale Speisekarte. Diese
            unbeworbene Vorschau ist öffentlich erreichbar und enthält keine
            geschützten Daten.
          </p>
          <a href="/speisekarte">Digitale Speisekarte ansehen →</a>
        </div>
        <QRCodeGenerator publicSiteUrl={import.meta.env.VITE_PUBLIC_SITE_URL} />
      </main>
    </div>
  );
}
