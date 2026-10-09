import CategoryTable from "../CategoryTable.jsx";
import VehicleModal from "./VehicleModal.jsx";

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
    "key": "vehicle_class",
    "icon": "car"
  },
  {
    "label": "Crew",
    "key": "crew",
    "icon": "users"
  }
];

function Vehicles({ active = true }) {
  return <CategoryTable active={active} name="Vehicles" endpoint="vehicles" nameField="name" columns={columns} ModalComponent={VehicleModal} />;
}

export default Vehicles;
