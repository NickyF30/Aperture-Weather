import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Umbrella } from "lucide-react";

interface ForecastItem {
    date: number;
    temp: number;
    description: string;
    icon: string;
    pop: number;
}

export const DailyForecastCard = ({ forecast }: { forecast: ForecastItem[] }) => {
    return (
        <Card className="col-span-full lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">5-Day Forecast</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {forecast.map((day) => (
                        <div key={day.date} className="flex items-center justify-between">
                            <span className="text-sm font-medium w-12">
                                {new Date(day.date * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                            </span>
                            {day.pop > 0 && (
                                <div className="flex items-center gap-1 text-xs text-blue-400">
                                    <Umbrella className="h-3 w-3" />
                                    {Math.round(day.pop * 100)}%
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <img
                                    src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                                    alt={day.description}
                                    className="w-8 h-8"
                                />
                                <span className="text-sm font-bold w-6 text-right">{Math.round(day.temp)}°</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};