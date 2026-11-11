import { useState } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { InfoDialog } from "../components/ui/InfoDialog";
import { HeroSection } from "../sections/HeroSection";
import { FeaturesSection } from "../sections/FeaturesSection";
import { SpecialtiesSection } from "../sections/SpecialtiesSection";
import { MenuSection } from "../sections/MenuSection";
import { AboutSection } from "../sections/AboutSection";
import { GallerySection } from "../sections/GallerySection";
import { ContactSection } from "../sections/ContactSection";
import { restaurant } from "../data/restaurant";
import type { Category } from "../types/menu";
import type { InfoKind } from "../types/restaurant";
export default function HomePage() {
  const [category, setCategory] = useState<Category>("Kebap");
  const [info, setInfo] = useState<InfoKind | null>(null);
  const reduced = useReducedMotion();
  const route = () =>
    restaurant.routeUrl
      ? window.open(restaurant.routeUrl, "_blank", "noopener,noreferrer")
      : setInfo("route");
  const call = () =>
    restaurant.phoneHref
      ? window.location.assign(restaurant.phoneHref)
      : setInfo("phone");
  const selectSpecialty = (value: Category) => {
    setCategory(value);
    document
      .getElementById("speisekarte")
      ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  };
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Zum Inhalt springen
      </a>
      <Header onRoute={route} />
      <main id="main">
        <HeroSection onRoute={route} />
        <FeaturesSection />
        <SpecialtiesSection onSelect={selectSpecialty} />
        <MenuSection category={category} onCategoryChange={setCategory} />
        <AboutSection />
        <GallerySection />
        <ContactSection onRoute={route} onCall={call} />
      </main>
      <Footer onInfo={setInfo} />
      {info && <InfoDialog info={info} onClose={() => setInfo(null)} />}
    </MotionConfig>
  );
}
