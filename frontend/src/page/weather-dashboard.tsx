import { useGeolocation } from "@/hooks/geolocation";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

interface WeatherData {
  cityName: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  weather_description: string;
  visibility: number;
  clouds: number;
}

const WeatherDashboard = () => {
  const { coordinates, error: geoError, getLocation, isLoading: isGeoLoading } = useGeolocation();

  const { data, isLoading: isWeatherLoading, error: weatherError } = useQuery<WeatherData>({
    queryKey: ['weather', coordinates],
    queryFn: async () => {
      if (!coordinates) return null;
      const response = await fetch(
        `http://localhost:3001/api/weather?lat=${coordinates.lat}&lon=${coordinates.lon}`
      );
      if (!response.ok) throw new Error('Failed to fetch weather');
      return response.json();
    },
    enabled: !!coordinates, // only run if coordinates are available
  });

  if (isGeoLoading) return <div>Locating you...</div>;
  if (geoError) return <div>Error: {geoError}</div>;

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Weather Data</h1>
        <button 
          onClick={() => getLocation()} 
          className="p-2 hover:bg-muted rounded-full"
          disabled={isWeatherLoading}
        >
          <RefreshCw className={isWeatherLoading ? "animate-spin" : ""} />
        </button>
      </div>

      {isWeatherLoading ? (
        <p>Fetching weather for your location...</p>
      ) : (
        <pre className="bg-muted p-4 rounded">
          {data ? JSON.stringify(data, null, 2) : "No data available"}
        </pre>
      )}
    </div>
  );
};

export default WeatherDashboard;