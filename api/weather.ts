import { City, Weather } from "./types";

export const getCities = async (query: string) => {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.append("name", query);
  url.searchParams.append("count", "10");
  url.searchParams.append("language", "pl");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }

  const data = (await response.json()) as { results: City[] };

  return data;
};

export const getWeather = async (
  city: Pick<City, "longitude" | "latitude">,
) => {
  const { longitude, latitude } = city;

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.append("latitude", latitude.toString());
  url.searchParams.append("longitude", longitude.toString());
  url.searchParams.append(
    "hourly",
    "temperature_2m,apparent_temperature,weathercode,surface_pressure,visibility",
  );
  url.searchParams.append("daily", "sunrise,sunset");
  url.searchParams.append("timezone", "auto");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  const data = (await response.json()) as Weather;

  console.log(url.toString());

  return data;
};
