import CategoryTable from "../CategoryTable.jsx";
import PlanetModal from "./PlanetModal.jsx";

const numberFormatter = new Intl.NumberFormat("en-US");

function displayValue(value) {
  if (value == null || String(value).trim() === "" || String(value).trim().toLowerCase() === "unknown") {
    return "N/A";
  }
  return value;
}

function displayNumber(value) {
  const displayedValue = displayValue(value);
  if (displayedValue === "N/A") return displayedValue;
  const number = Number(displayedValue);
  return Number.isFinite(number) ? numberFormatter.format(number) : "N/A";
}

const columns = [
  { label: "Name", key: "name", icon: "tag", format: displayValue },
  { label: "Climate", key: "climate", icon: "cloud", format: displayValue },
  { label: "Terrain", key: "terrain", icon: "image", format: displayValue },
  { label: "Population", key: "population", icon: "users", format: displayNumber },
  { label: "Diameter", key: "diameter", icon: "resize horizontal", format: displayNumber },
];

function Planets({ active = true }) {
  return <CategoryTable active={active} name="Planets" endpoint="planets" columns={columns} ModalComponent={PlanetModal} modalItemProp="planet" />;
}

export default Planets;
