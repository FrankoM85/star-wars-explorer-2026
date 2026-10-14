import RelatedEntityModal from "../RelatedEntityModal.jsx";

function PlanetModal({ planet, onClose }) {
  if (!planet) return null;
  return (
    <RelatedEntityModal
      key={planet.url ?? planet.name ?? planet.title}
      item={planet}
      category="planets"
      onClose={onClose}
    />
  );
}

export default PlanetModal;
