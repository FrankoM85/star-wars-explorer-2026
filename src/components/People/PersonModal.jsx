import CategoryModal from "../CategoryModal.jsx";
import HomeworldName from "../HomeworldName.jsx";
import { formatValue, formatCount } from "../categoryFormatting.js";

function PersonModal({ item, onClose }) {
  if (!item) return null;
  const fields = [
    ["Name", formatValue(item.name)],
    ["Birth Year", formatValue(item.birth_year)],
    ["Gender", formatValue(item.gender)],
    ["Height (cm)", formatValue(item.height, true)],
    ["Mass (kg)", formatValue(item.mass, true)],
    ["Hair Color", formatValue(item.hair_color)],
    ["Skin Color", formatValue(item.skin_color)],
    ["Eye Color", formatValue(item.eye_color)],
    ["Homeworld", <HomeworldName key={item.homeworld ?? "homeworld"} url={item.homeworld} />],
    ["Films", formatCount(item.films)],
    ["Species", formatCount(item.species)],
    ["Vehicles", formatCount(item.vehicles)],
    ["Starships", formatCount(item.starships)],
  ];
  return <CategoryModal item={item} onClose={onClose} icon="user" nameField="name" fields={fields} />;
}

export default PersonModal;
