import CategoryTable from "../CategoryTable.jsx";
import StarshipModal from "./StarshipModal.jsx";

const columns = [
  {
    "label": "Name",
    "key": "name",
    "icon": "tag"
  },
  {
    "label": "Model",
    "key": "model",
    "icon": "cogs"
  },
  {
    "label": "Manufacturer",
    "key": "manufacturer",
    "icon": "industry"
  },
  {
    "label": "Class",
    "key": "starship_class",
    "icon": "rocket"
  },
  {
    "label": "Crew",
    "key": "crew",
    "icon": "users"
  }
];

function Starships({ active = true }) {
  return <CategoryTable active={active} name="Starships" endpoint="starships" nameField="name" columns={columns} ModalComponent={StarshipModal} />;
}

export default Starships;
