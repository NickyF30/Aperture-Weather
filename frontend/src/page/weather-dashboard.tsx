import { useQuery } from "@tanstack/react-query";

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
  const { data, isLoading, error } = useQuery<WeatherData>({
    queryKey: ['weather', 'Newark'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/weather/city?q=Newark');
      if (!response.ok) throw new Error('Failed to fetch weather');
      return response.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Weather Data</h1>
      <pre className="bg-muted p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default WeatherDashboard;