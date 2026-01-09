import { z } from 'zod';

// for lat/lon coordinate lookups
const WeatherQuerySchema = z.object({
  lat: z.string().transform(Number),
  lon: z.string().transform(Number),
});

// for city name lookups
export const CityQuerySchema = z.object({
  q: z.string().min(1),
});

interface WeatherData {
  cityName: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  weather_description: string;
  visibility: number;
  clouds: number;
}

export class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';
  private geoUrl = 'http://api.openweathermap.org/geo/1.0';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCoordinatesByCity(cityName: string) {
    const url = `${this.geoUrl}/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${this.apiKey}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Geocoding service failed');

    const data = await response.json();
    if (!data.length) throw new Error('City not found');

    return { lat: data[0].lat, lon: data[0].lon };
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      cityName: data.name,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      weather_description: data.weather[0].description,
      visibility: data.visibility,
      clouds: data.clouds.all,
    };
  }

  validateQuery(query: unknown) {
    return WeatherQuerySchema.parse(query);
  }

  validateCityQuery(query: unknown) {
    return CityQuerySchema.parse(query);
  }

}