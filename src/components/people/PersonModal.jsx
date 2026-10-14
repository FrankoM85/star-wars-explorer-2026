import RelatedEntityModal from "../RelatedEntityModal.jsx";

function PersonModal({ item, onClose }) {
  if (!item) return null;
  return (
    <RelatedEntityModal
      key={item.url ?? item.name ?? item.title}
      item={item}
      category="people"
      onClose={onClose}
    />
  );
}

export default PersonModal;
