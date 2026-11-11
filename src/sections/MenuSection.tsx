import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MenuCategoryFilter } from "../components/menu/MenuCategoryFilter";
import { categories, menu } from "../data/menu";
import { MenuProduct } from "../components/menu/MenuProduct";
import type { Category } from "../types/menu";

export function MenuSection({
  category,
  onCategoryChange,
}: {
  category: Category;
  onCategoryChange: (category: Category) => void;
}) {
  const reduced = useReducedMotion();
  return (
    <section id="speisekarte" className="menu-section section-padding">
      <div className="menu-top">
        <Reveal>
          <SectionHeading eyebrow="EHRLICH GUT. BIS ZUM LETZTEN BISS." light>
            DIE SPEISEKARTE<span>.</span>
          </SectionHeading>
        </Reveal>
        <p>
          Für jeden Hunger.
          <br />
          Für jeden Geschmack.
        </p>
      </div>
      <MenuCategoryFilter category={category} onChange={onCategoryChange} />
      <motion.div
        id="menu-panel"
        role="tabpanel"
        aria-labelledby={`tab-${categories.indexOf(category)}`}
        key={category}
        className="menu-grid"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {menu
          .filter((item) => item.category === category)
          .map((item) => (
            <MenuProduct key={item.name} item={item} />
          ))}
      </motion.div>
      <div className="menu-foot">
        <p>Alle Preise sind Demo-Platzhalter, keine verbindlichen Angebote.</p>
        <span>Fragen zu Zutaten? Sprich uns gerne an.</span>
      </div>
    </section>
  );
}
