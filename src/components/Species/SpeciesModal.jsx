import CategoryModal from "../CategoryModal.jsx";
import HomeworldName from "../HomeworldName.jsx";
import { formatValue, formatCount } from "../categoryFormatting.js";

function SpeciesModal({ item, onClose }) {
  if (!item) return null;
  const fields = [
    ["Name", formatValue(item.name)],
    ["Classification", formatValue(item.classification)],
    ["Designation", formatValue(item.designation)],
    ["Language", formatValue(item.language)],
    ["Average Height (cm)", formatValue(item.average_height, true)],
    ["Average Lifespan (years)", formatValue(item.average_lifespan, true)],
    ["Skin Colors", formatValue(item.skin_colors)],
    ["Hair Colors", formatValue(item.hair_colors)],
    ["Eye Colors", formatValue(item.eye_colors)],
    ["Homeworld", <HomeworldName key={item.homeworld ?? "homeworld"} url={item.homeworld} />],
    ["People", formatCount(item.people)],
    ["Films", formatCount(item.films)],
  ];
  return <CategoryModal item={item} onClose={onClose} icon="users" nameField="name" fields={fields} />;
}

export default SpeciesModal;
