import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowDown, Flame } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";

export function HeroSection({ onRoute }: { onRoute: () => void }) {
  const reduced = useReducedMotion();
  return (
    <section id="startseite" className="hero">
      <div className="hero-copy">
        <Reveal>
          <p className="eyebrow">
            <span />
            GUTER GESCHMACK KENNT KEINE KOMPROMISSE.
          </p>
        </Reveal>
        <h1>
          {["FRISCH.", "HERZHAFT.", "ECHT."].map((word, index) => (
            <span className="headline-line" key={word}>
              <motion.span
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.12 + index * 0.13,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
        <Reveal delay={0.35}>
          <p className="hero-description">
            Dein neuer Lieblingskebap.
            <br />
            Frisch zubereitet, voller Geschmack.
          </p>
          <div className="hero-actions">
            <a className="button" href="#speisekarte">
              Speisekarte entdecken <ArrowUpRight size={19} />
            </a>
            <button className="text-button" onClick={onRoute}>
              Route planen <ArrowUpRight size={18} />
            </button>
          </div>
        </Reveal>
        <div className="hero-bottom">
          <span>
            <Flame size={17} /> MIT FEUER & GEFÜHL.
          </span>
          <a href="#spezialitaeten" aria-label="Unsere Spezialitäten entdecken">
            <ArrowDown size={18} />
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <motion.img
          src="/images/kebap.jpg"
          alt="Saftiger Kebap im gerösteten Brot mit Tomaten, Salat und Sauce"
          fetchPriority="high"
          width="1200"
          height="1600"
          initial={reduced ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />
        <div className="hero-image-shade" />
        <div className="photo-topline">
          <span>GROSSE LIEBE. GROSSER GESCHMACK.</span>
          <Flame size={22} />
        </div>
        <div className="round-stamp">
          <span>MIT LIEBE</span>
          <Flame size={34} />
          <span>ZUBEREITET</span>
        </div>
        <div className="photo-caption">
          <span>01 / DER KLASSIKER</span>
          <p>
            Liebe auf den
            <br />
            <em>ersten Biss.</em>
          </p>
        </div>
        <span className="photo-credit">Serviervorschlag · Symbolfoto</span>
      </div>
    </section>
  );
}
