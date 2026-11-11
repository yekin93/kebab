import { Leaf, ChefHat, Flame, Heart } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";

export function FeaturesSection() {
  return (
    <section className="features" aria-label="Unsere Philosophie">
      {[
        { icon: Leaf, text: "Frische Zutaten" },
        { icon: ChefHat, text: "Hausgemachte Saucen" },
        { icon: Flame, text: "Traditioneller Geschmack" },
        { icon: Heart, text: "Mit Leidenschaft zubereitet" },
      ].map(({ icon: Icon, text }, index) => (
        <Reveal key={text} delay={index * 0.06}>
          <Icon size={25} strokeWidth={1.5} />
          <span>{text}</span>
        </Reveal>
      ))}
    </section>
  );
}
