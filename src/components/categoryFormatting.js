const numberFormatter = new Intl.NumberFormat("en-US");

export function formatValue(value, numeric = false) {
  if (value == null || ["", "unknown", "n/a", "none", "null"].includes(String(value).trim().toLowerCase())) return "N/A";
  if (!numeric) return value;
  const number = Number(String(value).replaceAll(",", ""));
  if (Number.isFinite(number)) return numberFormatter.format(number);
  return typeof value === "string" ? value : "N/A";
}

export function formatCount(value) {
  return Array.isArray(value) ? value.length : "N/A";
}

export function formatDate(value) {
  if (formatValue(value) === "N/A") return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : new Intl.DateTimeFormat("en-GB", {
    day: "2-digit", month: "short", year: "numeric", timeZone: "UTC",
  }).format(date);
}
