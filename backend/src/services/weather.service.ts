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
  temp_min: number;
  temp_max: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  weather_description: string;
  visibility: number;
  clouds: number;
  aqi: number;
  uv: number;
  wind_gust: number;
  icon: string; 
  coord: {
    lat: number;
    lon: number;
  };
  pollutants: {   
    pm2_5: number;
    pm10: number;
    no2: number;
    o3: number;
  };
}

export class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';
  private geoUrl = 'http://api.openweathermap.org/geo/1.0';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchLocations(query: string) {
    // limit set to 5 to show multiple options
    const url = `${this.geoUrl}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${this.apiKey}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Geocoding service failed');

    const data = await response.json();

    // Map the results to a clean format
    return data.map((item: any) => ({
      name: item.name,
      lat: item.lat,
      lon: item.lon,
      country: item.country,
      state: item.state
    }));
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
    const weatherUrl = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    const aqiUrl = `${this.baseUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    const uvUrl = `${this.baseUrl}/uvi?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

    const [weatherRes, aqiRes, uvRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(aqiUrl),
      fetch(uvUrl)
    ]);

    if (!weatherRes.ok) {
      throw new Error(`Weather API error: ${weatherRes.statusText}`);
    }

    const weatherData = await weatherRes.json();
    const aqiData = aqiRes.ok ? await aqiRes.json() : null;
    const uvData = uvRes.ok ? await uvRes.json() : null;

    return {
      cityName: weatherData.name,
      temp: weatherData.main.temp,
      temp_min: weatherData.main.temp_min,
      temp_max: weatherData.main.temp_max,
      feels_like: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      wind_speed: weatherData.wind.speed,
      wind_deg: weatherData.wind.deg,
      wind_gust: weatherData.wind.gust,
      icon: weatherData.weather[0].icon,
      weather_description: weatherData.weather[0].description,
      visibility: weatherData.visibility,
      clouds: weatherData.clouds.all,
      aqi: aqiData?.list?.[0]?.main?.aqi || 0,
      pollutants: aqiData?.list?.[0]?.components,
      uv: uvData?.value || 0,
      coord: {
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon,
      },
    };
  }

  async getForecast(lat: number, lon: number) {
    const url = `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Forecast API failed');

    const data = await response.json();

    // Group 3-hour chunks into daily summaries
    const dailyForecast = data.list.filter((item: any) => item.dt_txt.includes("12:00:00"));

    const hourlyForecast = data.list.slice(0, 8).map((item: any) => ({
      date: item.dt,
      temp: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      pop: item.pop
    }));

    return {
      daily: dailyForecast.map((day: any) => ({
        date: day.dt,
        temp: day.main.temp,
        description: day.weather[0].description,
        icon: day.weather[0].icon,
        pop: day.pop
      })),
      hourly: hourlyForecast
    };
  }

  validateQuery(query: unknown) {
    return WeatherQuerySchema.parse(query);
  }

  validateCityQuery(query: unknown) {
    return CityQuerySchema.parse(query);
  }

}