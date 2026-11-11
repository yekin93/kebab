import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";
import { navigation } from "../../data/navigation";
import { useScrollPosition } from "../../hooks/useScrollPosition";

export function Header({ onRoute }: { onRoute: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("startseite");
  const scrolled = useScrollPosition();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    navigation.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);
  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Logo />
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "active" : ""}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button className="button nav-route" onClick={onRoute}>
          <MapPin size={16} /> Anfahrt <ArrowUpRight size={16} />
        </button>
        <button
          className={`menu-toggle ${mobileOpen ? "open" : ""}`}
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <MobileNavigation
            onClose={() => setMobileOpen(false)}
            onRoute={onRoute}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
