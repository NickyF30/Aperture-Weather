import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, CloudSun } from "lucide-react";

interface CurrentWeatherProps {
    cityName: string;
    temp: number;
    feelsLike: number;
    description: string;
}

export const CurrentWeatherCard = ({ cityName, temp, feelsLike, description }: CurrentWeatherProps) => (
    <Card className="col-span-full overflow-hidden border-none backdrop-blur-md">
        <CardContent className="p-8">
            <div className="flex flex-row justify-between items-start">
                <div className="space-y-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-sky-400" />
                            <span className="text-2xl font-bold tracking-tight">{cityName}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Today, Jan 8th</p>
                    </div>

                    <div className="space-y-0">
                        <span className="text-8xl font-black tracking-tighter">
                            {Math.round(temp)}°
                        </span>
                        <div className="pt-2">
                            <p className="text-xl font-medium capitalize leading-none">
                                {description}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Feels like {Math.round(feelsLike)}°
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <div className="opacity-100 transition-opacity" />
                    <CloudSun className="h-32 w-32 text-white " strokeWidth={1.5} />
                </div>
            </div>
        </CardContent>
    </Card>
);