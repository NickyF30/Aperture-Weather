import { useGeolocation } from "@/hooks/geolocation";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/ui/layout/cards/loading-skeleton";
import { WeatherGrid } from "@/components/ui/layout/cards/weather-grid";


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
}

interface ForecastData {
    date: number;
    temp: number;
    description: string;
    icon: string;
}

interface ForecastResponse {
    daily: ForecastData[];
    hourly: ForecastData[];
}

const WeatherDashboard = () => {
    const { coordinates, error: geoError, getLocation, isLoading: isGeoLoading } = useGeolocation();

    const { data, isLoading: isWeatherLoading, isFetching } = useQuery<WeatherData>({
        queryKey: ['weather', coordinates],
        queryFn: async () => {
            if (!coordinates) return null;
            const response = await fetch(
                `http://localhost:3001/api/weather?lat=${coordinates.lat}&lon=${coordinates.lon}`
            );
            if (!response.ok) throw new Error('Failed to fetch weather');
            return response.json();
        },
        enabled: !!coordinates,
    });

    const { data: forecastData, isLoading: isForecastLoading } = useQuery<ForecastResponse>({

        queryKey: ['forecast', coordinates],
        queryFn: async () => {
            if (!coordinates) return null;
            const response = await fetch(
                `http://localhost:3001/api/weather/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}`
            );
            return response.json();
        },
        enabled: !!coordinates,
    });

    const isLoading = isGeoLoading || isWeatherLoading || isForecastLoading;

    if (geoError) return <div className="p-8 text-destructive">Error: {geoError}</div>;

    return (
        <div className="p-8 space-y-4 mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Your Location</h1>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => getLocation()}
                    disabled={isLoading}
                >
                    <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
                </Button>
            </div>

            {isLoading ? (
                <LoadingSkeleton />
            ) : data ? (
                <WeatherGrid data={data} forecastData={forecastData} />
            ) : (
                <Card>
                    <CardContent className="pt-6 text-center text-muted-foreground">
                        No weather data available. Please enable location access.
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default WeatherDashboard;