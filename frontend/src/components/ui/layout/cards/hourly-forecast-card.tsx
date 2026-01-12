// frontend/src/components/ui/layout/cards/hourly-forecast.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface HourlyItem {
    date: number;
    temp: number;
    icon: string;
}

export const HourlyForecastCard = ({ hourly }: { hourly: HourlyItem[] }) => {
    const displayItems = hourly.slice(0, 6);
    return (
        <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Hourly Forecast</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex w-full justify-between items-center pb-2">
                    {displayItems.map((item) => (
                        <div 
                            key={item.date} 
                            className="flex flex-col items-center flex-1 space-y-2"
                        >
                            <span className="text-xs font-medium text-muted-foreground">
                                {new Date(item.date * 1000).toLocaleTimeString('en-US', { 
                                    hour: 'numeric', 
                                    hour12: true 
                                })}
                            </span>
                            <img
                                src={`http://openweathermap.org/img/wn/${item.icon}.png`}
                                alt="weather icon"
                                className="w-10 h-10"
                            />
                            <span className="text-sm font-bold">{Math.round(item.temp)}°</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};