import type { categories } from "../data/menu";
export type Category = (typeof categories)[number];
export interface MenuItem {
  name: string;
  description: string;
  price: number;
  category: Category;
  tag?: string;
}

export interface Specialty {
  name: string;
  description: string;
  image: string;
  price: number;
  category: Category;
}
