import {
  getPersonFields,
  getFilmFields,
  getPlanetFields,
  getSpeciesFields,
  getStarshipFields,
  getVehicleFields,
} from "./RelatedDetailFields.jsx";
import { getRelatedEndpoint } from "../api/fetch.js";

export const relatedEntities = {
  people: {
    icon: "user",
    nameField: "name",
    fields: getPersonFields,
    relationships: [
      ["Homeworld", "homeworld", "planets", "Homeworld name"],
      ["Films", "films", "films", "Film title"],
      ["Species", "species", "species", "Species name"],
      ["Vehicles", "vehicles", "vehicles", "Vehicle name"],
      ["Starships", "starships", "starships", "Starship name"],
    ],
  },
  planets: {
    icon: "globe",
    nameField: "name",
    fields: getPlanetFields,
    relationships: [
      ["Residents", "residents", "people", "Resident name"],
      ["Films", "films", "films", "Film title"],
    ],
  },
  films: {
    icon: "film",
    nameField: "title",
    fields: getFilmFields,
    relationships: [
      ["Characters", "characters", "people", "Character name"],
      ["Planets", "planets", "planets", "Planet name"],
      ["Starships", "starships", "starships", "Starship name"],
      ["Vehicles", "vehicles", "vehicles", "Vehicle name"],
      ["Species", "species", "species", "Species name"],
    ],
  },
  species: {
    icon: "users",
    nameField: "name",
    fields: getSpeciesFields,
    relationships: [
      ["Homeworld", "homeworld", "planets", "Homeworld name"],
      ["People", "people", "people", "Person name"],
      ["Films", "films", "films", "Film title"],
    ],
  },
  starships: {
    icon: "rocket",
    nameField: "name",
    fields: getStarshipFields,
    relationships: [
      ["Pilots", "pilots", "people", "Pilot name"],
      ["Films", "films", "films", "Film title"],
    ],
  },
  vehicles: {
    icon: "car",
    nameField: "name",
    fields: getVehicleFields,
    relationships: [
      ["Pilots", "pilots", "people", "Pilot name"],
      ["Films", "films", "films", "Film title"],
    ],
  },
};

export function relationshipUrls(value, category) {
  const urls = Array.isArray(value) ? value : [value];
  return [
    ...new Set(
      urls
        .map((url) => {
          try {
            return getRelatedEndpoint(url, category);
          } catch {
            return null;
          }
        })
        .filter(Boolean),
    ),
  ];
}
