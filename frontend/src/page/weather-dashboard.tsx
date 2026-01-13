import { useGeolocation } from "@/hooks/geolocation";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrentWeatherCard } from "@/components/ui/layout/cards/current-weather-card";
import { LoadingSkeleton } from "@/components/ui/layout/cards/loading-skeleton";
import { WindCard } from "@/components/ui/layout/cards/wind-card";
import { HumidityCard } from "@/components/ui/layout/cards/humidity-card";
import { CloudCard } from "@/components/ui/layout/cards/cloud-card";
import { VisibilityCard } from "@/components/ui/layout/cards/visibility-card";
import { DailyForecastCard } from "@/components/ui/layout/cards/daily-forecast";
import { HourlyForecastCard } from "@/components/ui/layout/cards/hourly-forecast-card";
import { WeatherSummaryCard } from "@/components/ui/layout/cards/weather-summary-card";
import { SunPhaseCard } from "@/components/ui/layout/cards/sun-phase-card";
import { PhotoScoreCard } from "@/components/ui/layout/cards/photo-score-card";


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
                <div className="space-y-4">

                    {/* Photography Score Card */}
                {coordinates && (
                    <PhotoScoreCard 
                        data={data} 
                        lat={coordinates.lat} 
                        lon={coordinates.lon} 
                    />
                )}

                    {/* Top Section */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        
                        {/* Left Column: Summary + Current Weather */}
                        <div className="lg:col-span-3 flex flex-col gap-4 h-full">
                            <WeatherSummaryCard
                                cityName={data.cityName}
                                temp={data.temp}
                                feelsLike={data.feels_like}
                                description={data.weather_description}
                                humidity={data.humidity}
                                windSpeed={data.wind_speed}
                            />
                            <CurrentWeatherCard
                                cityName={data.cityName}
                                temp={data.temp}
                                tempMin={data.temp_min}
                                tempMax={data.temp_max}
                                feelsLike={data.feels_like}
                                description={data.weather_description}
                            />
                        </div>

                        {/* Right Column: Hourly + Daily */}
                        <div className="lg:col-span-1 flex flex-col gap-4">
                            <HourlyForecastCard hourly={forecastData?.hourly || []} />
                            <DailyForecastCard forecast={forecastData?.daily || []} />
                        </div>
                    </div>

                    {/* Bottom Section: Metrics */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <HumidityCard humidity={data.humidity} />
                        <WindCard speed={data.wind_speed} deg={data.wind_deg} />
                        <CloudCard clouds={data.clouds} />
                        <VisibilityCard visibility={data.visibility} />
                        <SunPhaseCard 
                            lat={coordinates?.lat || 0} 
                            lon={coordinates?.lon || 0} 
                        />
                    </div>
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