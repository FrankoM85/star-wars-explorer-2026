import RelatedEntityModal from "../RelatedEntityModal.jsx";

function FilmModal({ item, onClose }) {
  if (!item) return null;
  return (
    <RelatedEntityModal
      key={item.url ?? item.name ?? item.title}
      item={item}
      category="films"
      onClose={onClose}
    />
  );
}

export default FilmModal;
