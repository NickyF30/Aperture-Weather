import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface CurrentWeatherProps {
    cityName: string;
    temp: number;
    feelsLike: number;
    description: string;
}

export const CurrentWeatherCard = ({ cityName, temp, feelsLike, description }: CurrentWeatherProps) => (
    <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
                <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {cityName}
                </div>
            </CardTitle>
            <span className="text-3xl font-bold">{Math.round(temp)}°C</span>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground capitalize">
                {description} — Feels like {Math.round(feelsLike)}°C
            </p>
        </CardContent>
    </Card>
);