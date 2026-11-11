import type { MenuItem, Specialty } from "../types/menu";
export const categories = [
  "Kebap",
  "Dürüm",
  "Tellergerichte",
  "Vegetarisch",
  "Beilagen",
  "Getränke",
] as const;
export const menu: MenuItem[] = [
  {
    name: "Klassischer Kebap",
    description:
      "Saftiges Kebapfleisch, knackiger Salat, Tomaten, Zwiebeln & Sauce im Fladenbrot.",
    price: 6.5,
    category: "Kebap",
    tag: "Unser Klassiker",
  },
  {
    name: "Käse Kebap",
    description:
      "Unser Klassiker mit würzigem Weichkäse und deiner Lieblingssauce.",
    price: 7.0,
    category: "Kebap",
  },
  {
    name: "KÖZ Spezial",
    description:
      "Extra Fleisch, gegrilltes Gemüse, Weichkäse & pikante Haussauce.",
    price: 8.5,
    category: "Kebap",
    tag: "Für den großen Hunger",
  },
  {
    name: "Kebap Box",
    description: "Kebapfleisch auf goldenen Pommes, dazu Salat und Sauce.",
    price: 7.5,
    category: "Kebap",
  },
  {
    name: "Dürüm Klassik",
    description:
      "Kebapfleisch, frischer Salat und Sauce, eingerollt in dünnes Fladenbrot.",
    price: 7.5,
    category: "Dürüm",
  },
  {
    name: "Dürüm Spezial",
    description: "Mit gegrilltem Gemüse, Weichkäse und extra Kebapfleisch.",
    price: 9.0,
    category: "Dürüm",
  },
  {
    name: "Kebap Teller",
    description: "Kebapfleisch, Pommes, gemischter Salat & zwei Saucen.",
    price: 12.5,
    category: "Tellergerichte",
  },
  {
    name: "KÖZ Grillteller",
    description:
      "Eine großzügige Portion Kebapfleisch mit Reis, Gemüse und Fladenbrot.",
    price: 14.5,
    category: "Tellergerichte",
  },
  {
    name: "Falafel im Brot",
    description:
      "Knusprige Kichererbsenbällchen, Salat und cremige Sesamsauce.",
    price: 6.5,
    category: "Vegetarisch",
    tag: "Vegetarisch",
  },
  {
    name: "Falafel Dürüm",
    description: "Falafel, frisches Gemüse und Hummus im dünnen Fladenbrot.",
    price: 7.0,
    category: "Vegetarisch",
  },
  {
    name: "Pommes frites",
    description:
      "Goldbraun, knusprig und mit einer Prise Salz. Mit Dip nach Wahl.",
    price: 3.5,
    category: "Beilagen",
  },
  {
    name: "Gemischter Salat",
    description: "Blattsalate, Tomaten, Gurken & Zwiebeln mit Kräuterdressing.",
    price: 4.5,
    category: "Beilagen",
  },
  {
    name: "Ayran · 0,25 l",
    description: "Der erfrischende Joghurt-Klassiker zum Kebap.",
    price: 2.0,
    category: "Getränke",
  },
  {
    name: "Limonade · 0,33 l",
    description: "Verschiedene Sorten. Gut gekühlt.",
    price: 2.8,
    category: "Getränke",
  },
  {
    name: "Mineralwasser · 0,5 l",
    description: "Still oder prickelnd.",
    price: 2.5,
    category: "Getränke",
  },
];
export const specialties = [
  {
    name: "Döner Kebap",
    description: "Der Klassiker. Einfach richtig gut.",
    image: "kebap",
    price: 6.5,
    category: "Kebap",
  },
  {
    name: "Dürüm",
    description: "Frisch gerollt. Voller Geschmack.",
    image: "durum",
    price: 7.5,
    category: "Dürüm",
  },
  {
    name: "Falafel",
    description: "Goldene Bällchen. Grünes Glück.",
    image: "falafel",
    price: 6.5,
    category: "Vegetarisch",
  },
  {
    name: "Kebap Teller",
    description: "Alles, was dein Hunger braucht.",
    image: "plate",
    price: 12.5,
    category: "Tellergerichte",
  },
  {
    name: "Pommes",
    description: "Goldbraun. Knusprig. Unwiderstehlich.",
    image: "fries",
    price: 3.5,
    category: "Beilagen",
  },
  {
    name: "Getränke",
    description: "Die perfekte Erfrischung dazu.",
    image: "drinks",
    price: 2.0,
    category: "Getränke",
  },
] satisfies Specialty[];
