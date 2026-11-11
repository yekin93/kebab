import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MenuCard } from "../components/menu/MenuCard";
import { specialties } from "../data/menu";
import type { Category } from "../types/menu";

export function SpecialtiesSection({
  onSelect,
}: {
  onSelect: (category: Category) => void;
}) {
  return (
    <section id="spezialitaeten" className="specialties section-padding">
      <div className="section-intro">
        <Reveal>
          <SectionHeading eyebrow="DEIN HUNGER. DEINE WAHL.">
            UNSERE
            <br />
            SPEZIALITÄTEN<span className="red">.</span>
          </SectionHeading>
        </Reveal>
        <Reveal>
          <p>
            Von „wie immer“ bis „mal was Neues“.
            <br />
            Entdecke deinen nächsten Lieblingsbissen.
          </p>
          <a className="underlined-link" href="#speisekarte">
            Zur ganzen Speisekarte <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </div>
      <div className="specialty-grid">
        {specialties.map((item, index) => (
          <Reveal key={item.name} delay={(index % 3) * 0.07}>
            <MenuCard item={item} featured={index === 0} onSelect={onSelect} />
          </Reveal>
        ))}
      </div>
      <p className="demo-note">
        Alle Preise sind unverbindliche Demo-Platzhalter. Bilder zeigen
        Serviervorschläge.
      </p>
    </section>
  );
}
