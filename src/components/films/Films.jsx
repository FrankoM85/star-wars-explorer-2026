import CategoryTable from "../CategoryTable.jsx";
import FilmModal from "./FilmModal.jsx";
import { formatDate } from "../categoryFormatting.js";

const columns = [
  {
    label: "Title",
    key: "title",
    icon: "film",
  },
  {
    label: "Episode",
    key: "episode_id",
    icon: "hashtag",
    numeric: true,
  },
  {
    label: "Director",
    key: "director",
    icon: "video camera",
  },
  {
    label: "Producer",
    key: "producer",
    icon: "users",
  },
  {
    label: "Release Date",
    key: "release_date",
    icon: "calendar",
    format: formatDate,
  },
];

function Films({ active = true }) {
  return (
    <CategoryTable
      active={active}
      name="Films"
      endpoint="films"
      nameField="title"
      columns={columns}
      ModalComponent={FilmModal}
    />
  );
}

export default Films;
