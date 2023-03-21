export type City = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
};
export interface Weather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface Daily {
  time: string[];
  sunrise: string[];
  sunset: string[];
}

export interface DailyUnits {
  time: string;
  sunrise: string;
  sunset: string;
}

export interface Hourly {
  time: string[];
  temperature_2m: any[];
  apparent_temperature: any[];
  weathercode: any[];
  surface_pressure: any[];
  visibility: any[];
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  apparent_temperature: string;
  weathercode: string;
  surface_pressure: string;
  visibility: string;
}
