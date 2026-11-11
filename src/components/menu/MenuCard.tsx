import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "../../lib/formatPrice";
import type { Category, Specialty } from "../../types/menu";

export function MenuCard({
  item,
  featured,
  onSelect,
}: {
  item: Specialty;
  featured: boolean;
  onSelect: (category: Category) => void;
}) {
  return (
    <button
      className="food-card"
      onClick={() => onSelect(item.category)}
      aria-label={`${item.name} in der Speisekarte ansehen`}
    >
      <div className="food-image">
        <img
          src={`/images/${item.image}.jpg`}
          alt={item.name}
          loading="lazy"
          width="600"
          height="450"
        />
        {featured && <span className="food-label">DER KLASSIKER</span>}
        <span className="food-arrow">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="food-title">
        <h3>{item.name}</h3>
        <span>ab {formatPrice(item.price)}</span>
      </div>
      <p>{item.description}</p>
    </button>
  );
}
