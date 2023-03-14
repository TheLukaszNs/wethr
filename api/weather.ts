import { City } from "./types";

export const getCities = async (query: string) => {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.append("name", query);
  url.searchParams.append("count", "5");
  url.searchParams.append("language", "pl");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }

  const data = (await response.json()) as { results: City[] };

  return data;
};
