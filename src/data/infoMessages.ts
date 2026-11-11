import type { InfoKind } from "../types/restaurant";
export const infoMessages: Record<
  InfoKind,
  { title: string; description: string }
> = {
  route: {
    title: "BALD AUF DEINEM WEG.",
    description:
      "KÖZ KEBAP ist ein fiktives Restaurantkonzept. Es gibt noch keinen bestätigten Standort. Sobald eine echte Adresse hinterlegt ist, führt dich dieser Button direkt zur Routenplanung.",
  },
  phone: {
    title: "WIR SIND BALD ERREICHBAR.",
    description:
      "Die angezeigte Telefonnummer ist ein Platzhalter. Sobald eine gültige Telefonnummer hinterlegt ist, kannst du hier direkt anrufen.",
  },
  imprint: {
    title: "IMPRESSUM",
    description:
      "Platzhalter: Diese Website ist eine fiktive Gestaltungsdemo. Ein rechtsgültiges Impressum mit Anbieterkennzeichnung muss vor einer tatsächlichen geschäftlichen Nutzung ergänzt werden.",
  },
  privacy: {
    title: "DATENSCHUTZ",
    description:
      "Platzhalter: Eine vollständige Datenschutzerklärung muss für den tatsächlichen Betrieb ergänzt werden. Diese Demo verwendet keine Analyse- oder Marketing-Cookies. Für Schriftarten werden Google Fonts geladen; dabei wird eine Verbindung zu Google hergestellt.",
  },
  social: {
    title: "BLEIB HUNGRIG.",
    description:
      "Unser Instagram-Profil folgt. Für diese Restaurant-Demo ist noch kein Social-Media-Konto verknüpft.",
  },
};
