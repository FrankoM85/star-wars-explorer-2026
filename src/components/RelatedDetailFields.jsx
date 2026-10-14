import HomeworldName from "./HomeworldName.jsx";
import { formatValue, formatCount, formatDate } from "./categoryFormatting.js";

export function getPersonFields(item) {
  return [
    ["Name", formatValue(item.name)],
    ["Birth Year", formatValue(item.birth_year)],
    ["Gender", formatValue(item.gender)],
    ["Height (cm)", formatValue(item.height, true)],
    ["Mass (kg)", formatValue(item.mass, true)],
    ["Hair Color", formatValue(item.hair_color)],
    ["Skin Color", formatValue(item.skin_color)],
    ["Eye Color", formatValue(item.eye_color)],
    [
      "Homeworld",
      <HomeworldName
        key={item.homeworld ?? "homeworld"}
        url={item.homeworld}
      />,
    ],
    ["Films", formatCount(item.films)],
    ["Species", formatCount(item.species)],
    ["Vehicles", formatCount(item.vehicles)],
    ["Starships", formatCount(item.starships)],
  ];
}

export function getFilmFields(item) {
  return [
    ["Title", formatValue(item.title)],
    ["Episode", formatValue(item.episode_id, true)],
    ["Director", formatValue(item.director)],
    ["Producer", formatValue(item.producer)],
    ["Release Date", formatDate(item.release_date)],
    ["Opening Crawl", formatValue(item.opening_crawl)],
    ["Characters", formatCount(item.characters)],
    ["Planets", formatCount(item.planets)],
    ["Starships", formatCount(item.starships)],
    ["Vehicles", formatCount(item.vehicles)],
    ["Species", formatCount(item.species)],
  ];
}

export function getSpeciesFields(item) {
  return [
    ["Name", formatValue(item.name)],
    ["Classification", formatValue(item.classification)],
    ["Designation", formatValue(item.designation)],
    ["Language", formatValue(item.language)],
    ["Average Height (cm)", formatValue(item.average_height, true)],
    ["Average Lifespan (years)", formatValue(item.average_lifespan, true)],
    ["Skin Colors", formatValue(item.skin_colors)],
    ["Hair Colors", formatValue(item.hair_colors)],
    ["Eye Colors", formatValue(item.eye_colors)],
    [
      "Homeworld",
      <HomeworldName
        key={item.homeworld ?? "homeworld"}
        url={item.homeworld}
      />,
    ],
    ["People", formatCount(item.people)],
    ["Films", formatCount(item.films)],
  ];
}

export function getStarshipFields(item) {
  return [
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
}

export function getVehicleFields(item) {
  return [
    ["Name", formatValue(item.name)],
    ["Model", formatValue(item.model)],
    ["Manufacturer", formatValue(item.manufacturer)],
    ["Class", formatValue(item.vehicle_class)],
    ["Cost (credits)", formatValue(item.cost_in_credits, true)],
    ["Length (m)", formatValue(item.length, true)],
    ["Max Atmospheric Speed", formatValue(item.max_atmosphering_speed, true)],
    ["Crew", formatValue(item.crew)],
    ["Passengers", formatValue(item.passengers, true)],
    ["Cargo Capacity (kg)", formatValue(item.cargo_capacity, true)],
    ["Consumables", formatValue(item.consumables)],
    ["Pilots", formatCount(item.pilots)],
    ["Films", formatCount(item.films)],
  ];
}

export function getPlanetFields(planet) {
  return [
    ["Name", formatValue(planet.name)],
    ["Climate", formatValue(planet.climate)],
    ["Terrain", formatValue(planet.terrain)],
    ["Population", formatValue(planet.population, true)],
    ["Diameter", formatValue(planet.diameter, true)],
    ["Rotation Period (hours)", formatValue(planet.rotation_period, true)],
    ["Orbital Period (days)", formatValue(planet.orbital_period, true)],
    ["Gravity", formatValue(planet.gravity)],
    ["Surface Water (%)", formatValue(planet.surface_water, true)],
    ["Residents", formatCount(planet.residents)],
    ["Films", formatCount(planet.films)],
  ];
}
