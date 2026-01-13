import { Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HumidityCard {
    humidity: number;
}

export const HumidityCard = ({ humidity }: HumidityCard) => {
    const getPhotoAdvice = (h: number) => {
        if (h >= 80) return "Risk of lens fog. High atmospheric haze.";
        if (h <= 30) return "Dry air: Great for crisp long-distance shots.";
        return "Standard shooting conditions.";
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Humidity</CardTitle>
                <Droplets className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{humidity}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                    {getPhotoAdvice(humidity)}
                </p>
            </CardContent>
        </Card>
    );
};