import { motion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { navigation } from "../../data/navigation";

export function MobileNavigation({
  onClose,
  onRoute,
}: {
  onClose: () => void;
  onRoute: () => void;
}) {
  return (
    <motion.nav
      id="mobile-navigation"
      className="mobile-nav"
      aria-label="Mobile Navigation"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      {navigation.map((item) => (
        <a key={item.id} href={`#${item.id}`} onClick={() => onClose()}>
          {item.label}
          <ArrowUpRight size={22} />
        </a>
      ))}
      <button
        onClick={() => {
          onClose();
          onRoute();
        }}
      >
        Anfahrt planen <MapPin size={20} />
      </button>
    </motion.nav>
  );
}
