import CategoryTable from "../CategoryTable.jsx";
import PlanetModal from "./PlanetModal.jsx";

const columns = [
  { label: "Name", key: "name", icon: "tag" },
  { label: "Climate", key: "climate", icon: "cloud" },
  { label: "Terrain", key: "terrain", icon: "image" },
  {
    label: "Population",
    key: "population",
    icon: "users",
    numeric: true,
  },
  {
    label: "Diameter",
    key: "diameter",
    icon: "resize horizontal",
    numeric: true,
  },
];

function Planets({ active = true }) {
  return (
    <CategoryTable
      active={active}
      name="Planets"
      endpoint="planets"
      columns={columns}
      ModalComponent={PlanetModal}
      modalItemProp="planet"
    />
  );
}

export default Planets;
