import type { MenuItem } from "../../types/menu";
import { formatPrice } from "../../lib/formatPrice";

export function MenuProduct({ item }: { item: MenuItem }) {
  return (
    <article className="menu-item">
      <div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        {item.tag && <span className="menu-tag">{item.tag}</span>}
      </div>
      <strong>{formatPrice(item.price)}</strong>
    </article>
  );
}
