import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { GalleryLightbox } from "../components/gallery/GalleryLightbox";
import { gallery } from "../data/gallery";

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  return (
    <>
      <section className="gallery-section section-padding">
        <div className="section-intro">
          <Reveal>
            <SectionHeading eyebrow="KLEINE MOMENTE. GROSSER APPETIT.">
              EIN BLICK. EIN HUNGER.
            </SectionHeading>
          </Reveal>
          <p>
            So könnte Genuss aussehen.
            <br />
            <span className="muted">Bildinspirationen für KÖZ KEBAP.</span>
          </p>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <Reveal key={item.src} delay={index * 0.08}>
              <button
                className="gallery-image"
                onClick={() => setLightbox(index)}
                aria-label={`${item.alt} – Bild vergrößern`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  width="600"
                  height="700"
                />
                <span className="gallery-caption">
                  {item.label}
                  <Plus size={23} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <p className="demo-note">
          Symbolfotos von Pexels · Keine Aufnahmen eines tatsächlichen KÖZ
          Restaurants.
        </p>
      </section>
      {lightbox !== null && (
        <GalleryLightbox
          lightbox={lightbox}
          onChange={setLightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
