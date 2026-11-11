import { ArrowUpRight } from "lucide-react";
import { categories } from "../../data/menu";
import type { Category } from "../../types/menu";

export function MenuCategoryFilter({
  category,
  onChange,
}: {
  category: Category;
  onChange: (category: Category) => void;
}) {
  return (
    <div
      className="category-tabs"
      role="tablist"
      aria-label="Speisekarten-Kategorien"
    >
      {categories.map((item, index) => (
        <button
          key={item}
          id={`tab-${index}`}
          role="tab"
          aria-selected={category === item}
          aria-controls="menu-panel"
          tabIndex={category === item ? 0 : -1}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              const next =
                (index +
                  (event.key === "ArrowRight" ? 1 : -1) +
                  categories.length) %
                categories.length;
              onChange(categories[next]);
              document.getElementById(`tab-${next}`)?.focus();
            }
          }}
          className={category === item ? "selected" : ""}
          onClick={() => onChange(item)}
        >
          {item}
          {category === item && <ArrowUpRight size={18} />}
        </button>
      ))}
    </div>
  );
}
