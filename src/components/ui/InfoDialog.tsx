import { Flame, ArrowRight } from "lucide-react";
import { Modal } from "./Modal";
import { infoMessages } from "../../data/infoMessages";
import type { InfoKind } from "../../types/restaurant";

export function InfoDialog({
  info,
  onClose,
}: {
  info: InfoKind;
  onClose: () => void;
}) {
  return (
    <Modal title="Demo-Information" onClose={onClose}>
      <div className="info-content">
        <Flame size={35} />
        <p className="eyebrow">KÖZ KEBAP · DEMO</p>
        <h2>{infoMessages[info].title}</h2>
        <p>{infoMessages[info].description}</p>
        <button className="button" onClick={onClose}>
          Alles klar <ArrowRight size={18} />
        </button>
      </div>
    </Modal>
  );
}
