import RelatedEntityModal from "../RelatedEntityModal.jsx";

function StarshipModal({ item, onClose }) {
  if (!item) return null;
  return (
    <RelatedEntityModal
      key={item.url ?? item.name ?? item.title}
      item={item}
      category="starships"
      onClose={onClose}
    />
  );
}

export default StarshipModal;
