import type { Restaurant } from "../types/restaurant";
export const restaurant: Restaurant = {
  name: "KÖZ KEBAP",
  tagline: "FEUER. GESCHMACK. LEIDENSCHAFT.",
  address: "Musterstraße XX, 0000 Musterstadt, Österreich",
  phone: "+43 (0) XXX XXXXXXX",
  hours: [
    { days: "Montag – Donnerstag", time: "11:00 – 22:00" },
    { days: "Freitag – Samstag", time: "11:00 – 23:00" },
    { days: "Sonntag & Feiertage", time: "12:00 – 21:00" },
  ],
  routeUrl: null,
  phoneHref: null,
};
