export interface Restaurant {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  hours: { days: string; time: string }[];
  routeUrl: string | null;
  phoneHref: string | null;
}
export interface NavigationItem {
  id: string;
  label: string;
}
export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}
export type InfoKind = "route" | "phone" | "imprint" | "privacy" | "social";
