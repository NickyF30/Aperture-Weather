import { useGeolocation } from "@/hooks/geolocation";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw, MapPin, Wind, Droplets, Cloud, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrentWeatherCard } from "@/components/ui/layout/current-weather-card";
import { LoadingSkeleton } from "@/components/ui/layout/loading-skeleton";

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

    const isLoading = isGeoLoading || isWeatherLoading;

    if (geoError) return <div className="p-8 text-destructive">Error: {geoError}</div>;

    return (
        <div className="p-8 space-y-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Weather Dashboard</h1>

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
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    {/* Current Weather Card */}
                    <CurrentWeatherCard 
                        cityName={data.cityName}
                        temp={data.temp}
                        feelsLike={data.feels_like}
                        description={data.weather_description}
                    />

                    {/* Humidity */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Humidity</CardTitle>
                            <Droplets className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.humidity}%</div>
                        </CardContent>
                    </Card>

                    {/* Wind Speed Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
                            <Wind className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{(data.wind_speed * 3.6).toFixed(1)} km/h</div>
                        </CardContent>
                    </Card>

                    {/* Clouds Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Clouds</CardTitle>
                            <Cloud className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.clouds}%</div>
                        </CardContent>
                    </Card>

                    {/* Visibility Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Visibility</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{(data.visibility / 1000).toFixed(1)} km</div>
                        </CardContent>
                    </Card>
                </div>
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