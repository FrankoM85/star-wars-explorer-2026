import CategoryTable from "../CategoryTable.jsx";
import SpeciesModal from "./SpeciesModal.jsx";

const columns = [
  {
    label: "Name",
    key: "name",
    icon: "tag",
  },
  {
    label: "Classification",
    key: "classification",
    icon: "sitemap",
  },
  {
    label: "Designation",
    key: "designation",
    icon: "users",
  },
  {
    label: "Language",
    key: "language",
    icon: "comment",
  },
  {
    label: "Avg. Lifespan",
    key: "average_lifespan",
    icon: "hourglass half",
    numeric: true,
  },
];

function Species({ active = true }) {
  return (
    <CategoryTable
      active={active}
      name="Species"
      endpoint="species"
      nameField="name"
      columns={columns}
      ModalComponent={SpeciesModal}
    />
  );
}

export default Species;
