import { z } from 'zod';

const WeatherQuerySchema = z.object({
  lat: z.string().transform(Number),
  lon: z.string().transform(Number),
});

interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  weather_description: string;
  visibility: number;
  clouds: number;
}

export class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      weather_description: data.weather[0].description,
      visibility: data.visibility,
      clouds: data.clouds.all,
    };
  }

  validateQuery(query: unknown) {
    return WeatherQuerySchema.parse(query);
  }
}