import { categories } from "../../data/menu";
import type { Category } from "../../types/menu";

export const categoryId = (category: Category) =>
  `karte-${categories.indexOf(category)}`;

export function MenuCategoryNavigation({ active }: { active: Category }) {
  return (
    <nav className="digital-categories" aria-label="Speisekarten-Kategorien">
      <div>
        {categories.map((category) => (
          <a
            key={category}
            href={`#${categoryId(category)}`}
            aria-current={active === category ? "location" : undefined}
          >
            {category}
          </a>
        ))}
      </div>
    </nav>
  );
}
