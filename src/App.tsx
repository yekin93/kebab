import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const DigitalMenuPage = lazy(() => import("./pages/DigitalMenuPage"));
const QRPreviewPage = lazy(() => import("./pages/QRPreviewPage"));

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return (
    <Suspense
      fallback={
        <p role="status" style={{ padding: "32px" }}>
          Wird geladen …
        </p>
      }
    >
      {path === "/" ? (
        <HomePage />
      ) : path === "/speisekarte" ? (
        <DigitalMenuPage />
      ) : path === "/entwickler/qr" ? (
        <QRPreviewPage />
      ) : (
        <main style={{ padding: "48px" }}>
          <h1>Seite nicht gefunden</h1>
          <p>
            <a href="/">Zur Startseite</a>
          </p>
        </main>
      )}
    </Suspense>
  );
}
