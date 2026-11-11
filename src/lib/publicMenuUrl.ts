export type PublicMenuTarget =
  { url: string; error: null } | { url: null; error: string };

export function resolvePublicMenuUrl(
  value: string | undefined,
): PublicMenuTarget {
  if (!value?.trim())
    return {
      url: null,
      error:
        "VITE_PUBLIC_SITE_URL fehlt. Hinterlege die öffentliche HTTPS-Adresse in .env.local oder in den Build-Umgebungsvariablen und erstelle den Build neu. Druck und Export bleiben bis dahin deaktiviert.",
    };
  try {
    const site = new URL(value.trim());
    const host = site.hostname.toLowerCase();
    const localHost =
      !host.includes(".") ||
      /^\d+\.\d+\.\d+\.\d+$/.test(host) ||
      host.includes(":") ||
      /(^|\.)(localhost|local|internal|test|invalid|example)$/.test(host);
    if (
      site.protocol !== "https:" ||
      localHost ||
      site.username ||
      site.password ||
      site.search ||
      site.hash ||
      site.port ||
      site.pathname !== "/"
    ) {
      return {
        url: null,
        error:
          "VITE_PUBLIC_SITE_URL muss eine öffentliche HTTPS-Domain ohne Zugangsdaten, Port, Unterpfad, Suchparameter oder Fragment sein. Lokale Adressen und Platzhalter sind nicht zulässig. Beispiel: https://deine-echte-domain.at",
      };
    }
    return { url: new URL("/speisekarte", site.origin).href, error: null };
  } catch {
    return {
      url: null,
      error:
        "VITE_PUBLIC_SITE_URL ist keine gültige URL. Bitte eine vollständige öffentliche HTTPS-Adresse hinterlegen.",
    };
  }
}
