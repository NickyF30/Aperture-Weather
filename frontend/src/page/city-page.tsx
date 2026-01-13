import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LoadingSkeleton } from "@/components/ui/layout/cards/loading-skeleton";
import { WeatherGrid } from "@/components/ui/layout/cards/weather-grid";
import { AlertCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavourites";

const CityPage = () => {
    const { cityName } = useParams<{ cityName: string }>();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    // 1. Fetch Current Weather (Search by City Name)
    const { data: weatherData, isLoading: isWeatherLoading, error } = useQuery({
        queryKey: ['weather', cityName],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3001/api/weather/city?q=${cityName}`);
            if (!response.ok) throw new Error('City not found');
            return response.json();
        },
        enabled: !!cityName,
        retry: false
    });

    // 2. Fetch Forecast 
    const { data: forecastData, isLoading: isForecastLoading } = useQuery({
        queryKey: ['forecast', weatherData?.coord],
        queryFn: async () => {
            const { lat, lon } = weatherData.coord;
            const response = await fetch(
                `http://localhost:3001/api/weather/forecast?lat=${lat}&lon=${lon}`
            );
            return response.json();
        },
        enabled: !!weatherData?.coord,
    });

    const handleToggleFavorite = () => {
        if (!weatherData) return;

        const cityId = `${weatherData.coord.lat}-${weatherData.coord.lon}`;

        if (isFavorite(cityId)) {
            removeFavorite(cityId);
        } else {
            addFavorite({
                id: cityId,
                name: weatherData.cityName,
                query: cityName!,
                lat: weatherData.coord.lat,
                lon: weatherData.coord.lon
            });
        }
    };

    const isLoading = isWeatherLoading || isForecastLoading;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-destructive">
                <AlertCircle className="h-12 w-12" />
                <h2 className="text-xl font-bold">City Not Found</h2>
                <p className="text-muted-foreground">Could not find weather data for "{cityName}"</p>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-4 mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight capitalize">{weatherData?.cityName || cityName} Weather</h1>
                {weatherData && (
                    <Button
                        variant={isFavorite(`${weatherData.coord.lat}-${weatherData.coord.lon}`) ? "default" : "outline"}
                        size="icon"
                        onClick={handleToggleFavorite}
                    >
                        <Star
                            className={`h-4 w-4 ${isFavorite(`${weatherData.coord.lat}-${weatherData.coord.lon}`) ? "fill-current" : ""}`}
                        />
                    </Button>
                )}
            </div>

            {isLoading || !weatherData ? (
                <LoadingSkeleton />
            ) : (
                <WeatherGrid data={weatherData} forecastData={forecastData} />
            )}
        </div>
    );
}
export default CityPage;