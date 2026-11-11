import { useEffect, type Dispatch, type SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "../ui/Modal";
import { gallery } from "../../data/gallery";

export function GalleryLightbox({
  lightbox,
  onChange,
  onClose,
}: {
  lightbox: number;
  onChange: Dispatch<SetStateAction<number | null>>;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight")
        onChange((value) => (value! + 1) % gallery.length);
      if (event.key === "ArrowLeft")
        onChange((value) => (value! + gallery.length - 1) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, onChange]);
  return (
    <Modal title="Bildergalerie" onClose={onClose}>
      <div className="lightbox">
        <img src={gallery[lightbox].src} alt={gallery[lightbox].alt} />
        <div className="lightbox-controls">
          <button
            className="icon-button"
            aria-label="Vorheriges Bild"
            onClick={() =>
              onChange((lightbox + gallery.length - 1) % gallery.length)
            }
          >
            <ChevronLeft />
          </button>
          <p>
            {gallery[lightbox].label}
            <small>
              {lightbox + 1} / {gallery.length} · Symbolfoto
            </small>
          </p>
          <button
            className="icon-button"
            aria-label="Nächstes Bild"
            onClick={() => onChange((lightbox + 1) % gallery.length)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </Modal>
  );
}
