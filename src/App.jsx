import { useState } from "react";
import { Container, Divider, Menu, Segment } from "semantic-ui-react";
import starWarsLogo from "./assets/star-wars-logo-original.svg";
import Planets from "./components/planets/Planets.jsx";
import People from "./components/people/People.jsx";
import Starships from "./components/starships/Starships.jsx";
import Vehicles from "./components/vehicles/Vehicles.jsx";
import Species from "./components/species/Species.jsx";
import Films from "./components/films/Films.jsx";
import "./app.css";

const categoryComponents = {
  Planets,
  People,
  Starships,
  Vehicles,
  Species,
  Films,
};
const categories = Object.keys(categoryComponents);

function App() {
  const [activeCategory, setActiveCategory] = useState("Planets");

  return (
    <div className="app">
      <header className="app-header">
        <img src={starWarsLogo} alt="Star Wars" className="star-wars-logo" />
        <h1 className="app-title">GALAXY EXPLORER</h1>
      </header>

      <Container as="main">
        <Segment className="app-content">
          <Menu
            secondary
            color="yellow"
            className="category-menu"
            aria-label="Categories"
          >
            {categories.map((category) => (
              <Menu.Item
                key={category}
                as="button"
                type="button"
                link
                name={category}
                active={activeCategory === category}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Menu.Item>
            ))}
          </Menu>
          <Divider className="category-divider" />
          {categories.map((category) => {
            const CategoryComponent = categoryComponents[category];
            return (
              <CategoryComponent
                key={category}
                active={activeCategory === category}
              />
            );
          })}
        </Segment>
      </Container>
      <footer className="app-footer">
        <span>© 2026 Frank</span>
        <span>
          Data provided by{" "}
          <a
            href="https://swapi.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            SWAPI
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
