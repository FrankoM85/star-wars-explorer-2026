export async function fetchStarWarsData(category, options = {}) {
  const response = await fetch(
    `https://swapi.info/api/${encodeURIComponent(category)}`,
    options,
  );
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}
