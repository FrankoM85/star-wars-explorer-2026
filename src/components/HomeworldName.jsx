import { useEffect, useState } from "react";
import { formatValue } from "./categoryFormatting.js";
import { fetchRelatedEntity } from "../api/fetch.js";

// Share both completed names and in-flight requests between all modals.
const planetNames = new Map();

function loadPlanetName(url) {
  if (!planetNames.has(url)) {
    const request = fetchRelatedEntity(url, "planets")
      .then((planet) =>
        typeof planet?.name === "string" ? formatValue(planet.name) : "N/A",
      )
      .catch(() => {
        // Allow a later modal opening to retry a failed request.
        planetNames.delete(url);
        return "N/A";
      });
    planetNames.set(url, request);
  }
  return planetNames.get(url);
}

function HomeworldName({ url }) {
  const planetUrl =
    typeof url === "string" && formatValue(url) !== "N/A" ? url.trim() : null;
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!planetUrl) return;
    let active = true;
    loadPlanetName(planetUrl).then((name) => {
      if (active) setResult({ url: planetUrl, name });
    });
    return () => {
      active = false;
    };
  }, [planetUrl]);

  if (!planetUrl) return "N/A";
  return result?.url === planetUrl ? result.name : "Loading...";
}

export default HomeworldName;
