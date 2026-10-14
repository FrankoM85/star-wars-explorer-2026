import RelatedEntityModal from "../RelatedEntityModal.jsx";

function SpeciesModal({ item, onClose }) {
  if (!item) return null;
  return (
    <RelatedEntityModal
      key={item.url ?? item.name ?? item.title}
      item={item}
      category="species"
      onClose={onClose}
    />
  );
}

export default SpeciesModal;
