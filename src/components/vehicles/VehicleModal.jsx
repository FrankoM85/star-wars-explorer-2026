import RelatedEntityModal from "../RelatedEntityModal.jsx";

function VehicleModal({ item, onClose }) {
  if (!item) return null;
  return (
    <RelatedEntityModal
      key={item.url ?? item.name ?? item.title}
      item={item}
      category="vehicles"
      onClose={onClose}
    />
  );
}

export default VehicleModal;
