import { Instagram, ArrowUpRight, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { restaurant } from "../../data/restaurant";
import { navigation } from "../../data/navigation";
import type { InfoKind } from "../../types/restaurant";

export function Footer({ onInfo }: { onInfo: (kind: InfoKind) => void }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Logo footer />
        <p>
          Guter Kebap. Gute Zeit.
          <br />
          Bis zum nächsten Bissen.
        </p>
        <button
          className="social-button"
          onClick={() => onInfo("social")}
          aria-label="Informationen zu Instagram"
        >
          <Instagram size={22} />
          <ArrowUpRight size={16} />
        </button>
      </div>
      <div className="footer-middle">
        <nav aria-label="Fußnavigation">
          {navigation.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <span>{restaurant.address} · Demo-Adresse</span>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {restaurant.name} · Fiktive
          Restaurant-Demo
        </span>
        <div>
          <button onClick={() => onInfo("imprint")}>Impressum</button>
          <button onClick={() => onInfo("privacy")}>Datenschutz</button>
          <a href="#startseite" aria-label="Zurück nach oben">
            Nach oben <ArrowRight size={15} className="up-arrow" />
          </a>
        </div>
      </div>
    </footer>
  );
}
