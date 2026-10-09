import CategoryModal from "../CategoryModal.jsx";
import { formatValue, formatCount, formatDate } from "../categoryFormatting.js";

function FilmModal({ item, onClose }) {
  if (!item) return null;
  const fields = [
    ["Title", formatValue(item.title)],
    ["Episode", formatValue(item.episode_id, true)],
    ["Director", formatValue(item.director)],
    ["Producer", formatValue(item.producer)],
    ["Release Date", formatDate(item.release_date)],
    ["Opening Crawl", formatValue(item.opening_crawl)],
    ["Characters", formatCount(item.characters)],
    ["Planets", formatCount(item.planets)],
    ["Starships", formatCount(item.starships)],
    ["Vehicles", formatCount(item.vehicles)],
    ["Species", formatCount(item.species)],
  ];
  return <CategoryModal item={item} onClose={onClose} icon="film" nameField="title" fields={fields} />;
}

export default FilmModal;
