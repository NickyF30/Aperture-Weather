import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurrentWeather {
    cityName: string;
    temp: number;
    tempMin: number;
    tempMax: number;
    feelsLike: number;
    description: string;
    icon: string;
}

export const CurrentWeatherCard = ({
    cityName,
    temp,
    tempMin,
    tempMax,
    feelsLike,
    description,
    icon,
}: CurrentWeather) => {

    const currentDate = new Date().toLocaleDateString('en-CA', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });

    return (
        <Card className={cn("h-full", "flex-1")}>
            <CardContent className="p-8">
                <div className="flex flex-row justify-between items-start">
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-sky-400" />
                                <span className="text-2xl font-bold tracking-tight">{cityName}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{currentDate}</p>
                        </div>

                        <div className="space-y-2">
                            <span className="text-8xl font-black tracking-tighter">
                                {Math.round(temp)}°
                            </span>

                            <div className="flex items-center gap-4 pt-1">
                                <div className="flex items-center gap-1 text-sky-400">
                                    <ArrowDown className="h-5 w-5" />
                                    <span className="text-lg font-medium">{Math.round(tempMin)}°</span>
                                </div>
                                <div className="flex items-center gap-1 text-orange-400">
                                    <ArrowUp className="h-5 w-5" />
                                    <span className="text-lg font-medium">{Math.round(tempMax)}°</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xl font-medium capitalize leading-none">
                                    {description}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Feels like {Math.round(feelsLike)}°
                                </p>
                            </div>
                        </div>
                    </div>

                    {icon && (
                        <div className="flex justify-center items-center">
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                                alt={description}
                                className="w-64 h-64 object-contain"
                            />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};