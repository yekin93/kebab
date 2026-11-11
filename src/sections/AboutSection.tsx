import { Flame } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

export function AboutSection() {
  return (
    <section id="ueber-uns" className="about-section">
      <Reveal className="about-image">
        <img
          src="/images/grill.jpg"
          alt="Koch schneidet frisch gegrilltes Fleisch vom Kebap-Drehspieß"
          loading="lazy"
          width="900"
          height="1200"
        />
        <div className="image-overlay" />
        <span className="image-side-label">
          DAS FEUER MACHT DEN UNTERSCHIED.
        </span>
        <div className="about-image-caption">
          ECHTES HANDWERK.
          <br />
          ECHTER GESCHMACK.
        </div>
      </Reveal>
      <Reveal className="about-copy">
        <SectionHeading eyebrow="MEHR ALS NUR EIN KEBAP.">
          MIT LIEBE
          <br />
          FRISCH
          <br />
          ZUBEREITET<span className="red">.</span>
        </SectionHeading>
        <p className="about-lead">
          Gutes Essen braucht nicht viel.
          <br />
          Nur die richtigen Zutaten. Und Herz.
        </p>
        <p>
          Knuspriges Brot, aromatisch gewürztes Fleisch, knackiges Gemüse und
          eine Sauce, die alles verbindet. So stellen wir uns deinen
          Lieblingskebap vor.
        </p>
        <p>
          KÖZ bedeutet Glut. Sie steht für die Wärme, das Handwerk und die
          Freude am gemeinsamen Essen, die diese Restaurantidee ausmachen.
        </p>
        <div className="about-signature">
          <Flame size={34} />
          <span>
            MIT FEUER GEMACHT.
            <br />
            MIT LIEBE SERVIERT.
          </span>
        </div>
        <small className="demo-note">
          Unsere Vision als Demo-Text. Die Geschichte und das Angebot werden vor
          der Eröffnung angepasst.
        </small>
      </Reveal>
    </section>
  );
}
