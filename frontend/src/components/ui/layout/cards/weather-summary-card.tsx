import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface WeatherSummary {
    cityName: string;
    temp: number;
    feelsLike: number;
    description: string;
    humidity: number;
    windSpeed: number;
}

export const WeatherSummaryCard = ({ 
    cityName, 
    temp, 
    feelsLike, 
    description,
    humidity,
    windSpeed
}: WeatherSummary) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Weather Summary</CardTitle>
                <Sparkles className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
                <p className="text-lg font-medium leading-relaxed">
                    It is currently <span className="text-sky-400 font-bold">{description}</span> in {cityName}. 
                    The temperature is {Math.round(temp)}°C, but it feels like {Math.round(feelsLike)}°C.
                    Humidity is at {humidity}% with wind speeds of {Math.round(windSpeed)} m/s.
                </p>
            </CardContent>
        </Card>
    );
};