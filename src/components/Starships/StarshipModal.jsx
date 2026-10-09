import CategoryModal from "../CategoryModal.jsx";
import { formatValue, formatCount } from "../categoryFormatting.js";

function StarshipModal({ item, onClose }) {
  if (!item) return null;
  const fields = [
    ["Name", formatValue(item.name)],
    ["Model", formatValue(item.model)],
    ["Manufacturer", formatValue(item.manufacturer)],
    ["Class", formatValue(item.starship_class)],
    ["Cost (credits)", formatValue(item.cost_in_credits, true)],
    ["Length (m)", formatValue(item.length, true)],
    ["Max Atmospheric Speed", formatValue(item.max_atmosphering_speed, true)],
    ["Crew", formatValue(item.crew)],
    ["Passengers", formatValue(item.passengers, true)],
    ["Cargo Capacity (kg)", formatValue(item.cargo_capacity, true)],
    ["Consumables", formatValue(item.consumables)],
    ["Hyperdrive Rating", formatValue(item.hyperdrive_rating, true)],
    ["MGLT", formatValue(item.MGLT, true)],
    ["Pilots", formatCount(item.pilots)],
    ["Films", formatCount(item.films)],
  ];
  return <CategoryModal item={item} onClose={onClose} icon="rocket" nameField="name" fields={fields} />;
}

export default StarshipModal;
