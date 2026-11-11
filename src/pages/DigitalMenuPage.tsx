import { useEffect, useState } from "react";
import { ArrowLeft, Flame, MapPin, Phone } from "lucide-react";
import { Logo } from "../components/layout/Logo";
import { MenuProduct } from "../components/menu/MenuProduct";
import {
  MenuCategoryNavigation,
  categoryId,
} from "../components/menu/MenuCategoryNavigation";
import { categories, menu } from "../data/menu";
import { restaurant } from "../data/restaurant";
import type { Category } from "../types/menu";
import "./digital-menu.css";

export default function DigitalMenuPage() {
  const [active, setActive] = useState<Category>(categories[0]);
  useEffect(() => {
    document.title = `Unsere Speisekarte | ${restaurant.name}`;
    const update = () => {
      const offset =
        (document.querySelector(".digital-categories")?.getBoundingClientRect()
          .height ?? 70) + 20;
      let current: Category = categories[0];
      for (const category of categories) {
        if (
          (document
            .getElementById(categoryId(category))
            ?.getBoundingClientRect().top ?? Infinity) <= offset
        )
          current = category;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div className="digital-menu-page">
      <a className="skip-link" href="#digital-menu-main">
        Zur Speisekarte springen
      </a>
      <header className="digital-header">
        <Logo href="/" />
        <a className="digital-home-link" href="/">
          <ArrowLeft size={16} /> Zur Startseite
        </a>
      </header>
      <main id="digital-menu-main">
        <div className="digital-intro">
          <p className="eyebrow">
            <span />
            FRISCH. HERZHAFT. ECHT.
          </p>
          <h1>
            Unsere
            <br />
            Speisekarte<span>.</span>
          </h1>
          <p>
            Dein Hunger. Deine Wahl. Entdecke unsere Klassiker und deinen
            nächsten Lieblingsbissen.
          </p>
          <p className="digital-demo">
            Fiktive Restaurant-Demo · Alle Preise sind Demo-Platzhalter.
          </p>
        </div>
        <MenuCategoryNavigation active={active} />
        <div className="digital-products">
          {categories.map((category, index) => (
            <section
              className="digital-category"
              key={category}
              id={categoryId(category)}
              aria-labelledby={`heading-${index}`}
            >
              <div className="digital-category-heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2 id={`heading-${index}`}>{category}</h2>
                <Flame size={22} strokeWidth={1.5} />
              </div>
              <div className="digital-product-grid">
                {menu
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <MenuProduct key={item.name} item={item} />
                  ))}
              </div>
            </section>
          ))}
          <p className="digital-ingredient-note">
            Fragen zu Zutaten oder Allergenen? Bitte vor dem Bestellen beim
            Restaurant nachfragen. Diese Demo enthält keine vollständige
            Allergeninformation.
          </p>
        </div>
      </main>
      <footer className="digital-contact">
        <div>
          <p className="eyebrow">GUTER KEBAP. GUTE ZEIT.</p>
          <h2>{restaurant.name}</h2>
          <p>
            <MapPin size={16} />
            {restaurant.address}
          </p>
          {restaurant.routeUrl && (
            <a
              href={restaurant.routeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Route planen
            </a>
          )}
          <p>
            <Phone size={16} />
            {restaurant.phoneHref ? (
              <a href={restaurant.phoneHref}>{restaurant.phone}</a>
            ) : (
              restaurant.phone
            )}
          </p>
          <small>
            Demo-Adresse und Demo-Telefonnummer · noch nicht bestätigt
          </small>
        </div>
        <div>
          <h3>Zeit für guten Geschmack</h3>
          {restaurant.hours.map((item) => (
            <p className="digital-hours" key={item.days}>
              <span>{item.days}</span>
              <span>{item.time}</span>
            </p>
          ))}
          <small>Beispiel-Öffnungszeiten</small>
          <a className="digital-footer-link" href="/">
            <ArrowLeft size={16} />
            Zur Startseite
          </a>
        </div>
      </footer>
    </div>
  );
}
