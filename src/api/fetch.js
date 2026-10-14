const entityRequests = new Map();
const pendingEntityRequests = new Set();
const API_REQUEST_TIMEOUT_MS = 15000;

async function fetchJsonWithTimeout(endpoint, options, timeoutMessage) {
  const controller = new AbortController();
  const callerSignal = options.signal;
  let timeoutId;
  let rejectCancelled;
  const cancelled = new Promise((_, reject) => {
    rejectCancelled = reject;
  });
  const cancel = (reason) => {
    rejectCancelled(reason);
    controller.abort(reason);
  };
  const onCallerAbort = () => cancel(callerSignal.reason);

  try {
    if (callerSignal?.aborted) throw callerSignal.reason;
    callerSignal?.addEventListener("abort", onCallerAbort, { once: true });
    timeoutId = setTimeout(() => {
      cancel(new Error(timeoutMessage));
    }, API_REQUEST_TIMEOUT_MS);
    const loading = fetch(endpoint, {
      ...options,
      signal: controller.signal,
    }).then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    });
    // Bound the whole response, including its body, even if abort is ignored.
    return await Promise.race([loading, cancelled]);
  } finally {
    clearTimeout(timeoutId);
    callerSignal?.removeEventListener("abort", onCallerAbort);
  }
}

// Only full records can serve the existing detail views from the shared cache.
const entityFields = {
  people:
    "name height mass hair_color skin_color eye_color birth_year gender homeworld films species vehicles starships",
  planets:
    "name rotation_period orbital_period diameter climate gravity terrain surface_water population residents films",
  films:
    "title episode_id opening_crawl director producer release_date characters planets starships vehicles species",
  species:
    "name classification designation average_height skin_colors hair_colors eye_colors average_lifespan homeworld language people films",
  starships:
    "name model manufacturer cost_in_credits length max_atmosphering_speed crew passengers cargo_capacity consumables hyperdrive_rating MGLT starship_class pilots films",
  vehicles:
    "name model manufacturer cost_in_credits length max_atmosphering_speed crew passengers cargo_capacity consumables vehicle_class pilots films",
};
const relationshipArrays = new Set([
  "films",
  "species",
  "vehicles",
  "starships",
  "residents",
  "characters",
  "planets",
  "people",
  "pilots",
]);

function cacheCategoryRecords(category, records) {
  const fields = entityFields[category]?.split(" ");
  if (!fields) return;
  const nameField = category === "films" ? "title" : "name";
  for (const item of records) {
    if (
      typeof item[nameField] !== "string" ||
      !fields.every((field) => {
        if (!Object.hasOwn(item, field)) return false;
        const value = item[field];
        if (relationshipArrays.has(field)) {
          return (
            Array.isArray(value) &&
            value.every((url) => typeof url === "string")
          );
        }
        return (
          value === null ||
          typeof value === "string" ||
          (typeof value === "number" && Number.isFinite(value))
        );
      })
    )
      continue;
    let endpoint;
    try {
      if (typeof item.url !== "string") continue;
      endpoint = getRelatedEndpoint(item.url, category);
    } catch {
      continue;
    }
    const existing = entityRequests.get(endpoint);
    if (!existing || pendingEntityRequests.has(existing)) {
      entityRequests.set(endpoint, Promise.resolve(item));
    }
  }
}

export function getRelatedEndpoint(url, category) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("Invalid relationship URL");
  }
  const match = parsed.pathname.match(
    /^\/api\/(people|films|planets|species|vehicles|starships)\/(\d+)\/?$/,
  );
  if (
    !match ||
    match[1] !== category ||
    !["swapi.info", "swapi.dev"].includes(parsed.hostname) ||
    !["https:", "http:"].includes(parsed.protocol)
  ) {
    throw new Error("Unsupported relationship URL");
  }
  return `https://swapi.info/api/${match[1]}/${match[2]}`;
}

export function fetchRelatedEntity(url, category) {
  let endpoint;
  try {
    endpoint = getRelatedEndpoint(url, category);
  } catch (error) {
    return Promise.reject(error);
  }
  if (!entityRequests.has(endpoint)) {
    // The timeout belongs to the shared request, not to an individual view.
    const request = fetchJsonWithTimeout(
      endpoint,
      {},
      "Related entity request timed out",
    )
      .then((item) => {
        const nameField = category === "films" ? "title" : "name";
        if (
          !item ||
          typeof item !== "object" ||
          Array.isArray(item) ||
          typeof item[nameField] !== "string"
        ) {
          throw new Error("Invalid entity response");
        }
        return item;
      })
      .catch((error) => {
        if (entityRequests.get(endpoint) === request)
          entityRequests.delete(endpoint);
        throw error;
      })
      .finally(() => {
        pendingEntityRequests.delete(request);
      });
    pendingEntityRequests.add(request);
    entityRequests.set(endpoint, request);
  }
  return entityRequests.get(endpoint);
}

export async function fetchStarWarsData(category, options = {}) {
  const data = await fetchJsonWithTimeout(
    `https://swapi.info/api/${encodeURIComponent(category)}`,
    options,
    "Category request timed out",
  );
  if (
    !Array.isArray(data) ||
    data.some(
      (item) => !item || typeof item !== "object" || Array.isArray(item),
    )
  ) {
    throw new Error("Invalid category response");
  }
  if (!options.signal?.aborted) cacheCategoryRecords(category, data);
  return data;
}
