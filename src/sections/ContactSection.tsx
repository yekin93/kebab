import { MapPin, Clock3, Phone, ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { restaurant } from "../data/restaurant";

export function ContactSection({
  onRoute,
  onCall,
}: {
  onRoute: () => void;
  onCall: () => void;
}) {
  return (
    <section id="kontakt" className="contact-section section-padding">
      <Reveal className="contact-main">
        <p className="eyebrow">
          <span />
          DER BESTE WEG? VORBEIKOMMEN.
        </p>
        <h2>
          DEIN HUNGER.
          <br />
          UNSER FEUER<span>.</span>
        </h2>
        <p>
          Wir freuen uns auf deinen Besuch.
          <br />
          Der echte Standort folgt – die Vorfreude ist schon da.
        </p>
        <button className="button cream-button" onClick={onRoute}>
          Route planen <ArrowUpRight size={20} />
        </button>
        <p className="contact-demo">
          Fiktives Restaurant · Kontaktdaten und Zeiten sind Beispiele.
        </p>
      </Reveal>
      <Reveal className="contact-details">
        <div className="contact-block">
          <MapPin size={23} />
          <div>
            <h3>Hier findest du uns</h3>
            <p>{restaurant.address}</p>
            <small>Demo-Adresse · Standort noch nicht festgelegt</small>
          </div>
        </div>
        <div className="contact-block">
          <Clock3 size={23} />
          <div>
            <h3>Zeit für guten Geschmack</h3>
            {restaurant.hours.map((item) => (
              <div className="hours-row" key={item.days}>
                <span>{item.days}</span>
                <span>{item.time}</span>
              </div>
            ))}
            <small>Beispiel-Öffnungszeiten</small>
          </div>
        </div>
        <div className="contact-block">
          <Phone size={23} />
          <div>
            <h3>Reden wir über Kebap</h3>
            <p>{restaurant.phone}</p>
            <small>Demo-Telefonnummer · noch nicht erreichbar</small>
            <button className="call-link" onClick={onCall}>
              Jetzt anrufen <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
