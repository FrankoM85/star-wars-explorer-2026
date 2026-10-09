import { Header, Icon } from "semantic-ui-react";

const categoryIcons = {
  Planets: "globe",
  People: "user",
  Starships: "rocket",
  Vehicles: "car",
  Species: "users",
  Films: "film",
};

function CategoryHeading({ name }) {
  return (
    <Header as="h2" color="yellow" className="category-heading">
      <Icon name={categoryIcons[name]} aria-hidden="true" />
      <span>{name.toUpperCase()}</span>
      <Icon name={categoryIcons[name]} aria-hidden="true" />
    </Header>
  );
}

export default CategoryHeading;
