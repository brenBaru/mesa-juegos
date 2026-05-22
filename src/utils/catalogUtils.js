export function readValue(item, keys, fallback = "") {
  for (const key of keys) {
    if (item[key] !== undefined && item[key] !== null && item[key] !== "") {
      return item[key];
    }
  }

  return fallback;
}

export function toNumber(value, fallback) {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }

  const match = String(value || "").match(/\d+/);

  return match ? Number(match[0]) : fallback;
}

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function normalizeCatalogGame(item, index) {
  if (typeof item === "string") {
    return {
      id: `catalog-${slugify(item) || index}`,
      name: item,
      min: 2,
      max: 6,
      type: "Party",
      mode: "Competitivo",
      timeMin: 20,
      timeMax: 40,
      age: "N/D",
      level: "Medio",
      vibe: "Juego importado desde catálogo."
    };
  }

  const name = readValue(item, [
    "name",
    "Name",
    "nombre",
    "Nombre",
    "title",
    "Title"
  ], "Sin nombre");

  const min = toNumber(
    readValue(item, ["min", "minPlayers", "minplayers", "min_players", "Min Players"]),
    2
  );

  const max = toNumber(
    readValue(item, ["max", "maxPlayers", "maxplayers", "max_players", "Max Players"]),
    6
  );

  const playingTime = toNumber(
    readValue(item, ["playingTime", "playingtime", "time", "Tiempo", "duration"]),
    40
  );

  const timeMin = toNumber(
    readValue(item, ["timeMin", "minPlayTime", "minplaytime", "Min Play Time"]),
    playingTime
  );

  const timeMax = toNumber(
    readValue(item, ["timeMax", "maxPlayTime", "maxplaytime", "Max Play Time"]),
    playingTime
  );

  return {
    id:
      readValue(item, ["id", "ID", "bggId", "objectid"], "") ||
      `catalog-${slugify(name) || index}`,

    name,
    min,
    max,

    type: readValue(item, ["type", "Tipo", "category", "Categoría"], "BGG"),
    mode: readValue(item, ["mode", "Modo"], "Competitivo"),

    timeMin,
    timeMax,

    age: readValue(item, ["age", "Edad", "minAge", "minage"], "N/D"),
    level: readValue(item, ["level", "Dificultad"], "Medio"),

    vibe: readValue(
      item,
      ["vibe", "description", "Descripción", "descripcion", "summary"],
      "Juego importado desde catálogo."
    )
  };
}

