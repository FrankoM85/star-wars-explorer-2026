import CategoryTable from "../CategoryTable.jsx";
import PersonModal from "./PersonModal.jsx";

const columns = [
  {
    "label": "Name",
    "key": "name",
    "icon": "tag"
  },
  {
    "label": "Birth Year",
    "key": "birth_year",
    "icon": "birthday cake"
  },
  {
    "label": "Gender",
    "key": "gender",
    "icon": "intergender"
  },
  {
    "label": "Height (cm)",
    "key": "height",
    "icon": "resize vertical",
    "numeric": true
  },
  {
    "label": "Mass (kg)",
    "key": "mass",
    "icon": "balance scale",
    "numeric": true
  }
];

function People({ active = true }) {
  return <CategoryTable active={active} name="People" endpoint="people" nameField="name" columns={columns} ModalComponent={PersonModal} />;
}

export default People;
