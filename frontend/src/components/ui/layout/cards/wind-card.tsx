import {
    ArrowUp,
    ArrowUpRight,
    ArrowRight,
    ArrowDownRight,
    ArrowDown,
    ArrowDownLeft,
    ArrowLeft,
    ArrowUpLeft,
    Wind
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WindCard {
    speed: number;
    deg: number;
    gust: number;
}

const getWindIcon = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return ArrowDown;
    if (deg >= 22.5 && deg < 67.5) return ArrowDownLeft;
    if (deg >= 67.5 && deg < 112.5) return ArrowLeft;
    if (deg >= 112.5 && deg < 157.5) return ArrowUpLeft;
    if (deg >= 157.5 && deg < 202.5) return ArrowUp;
    if (deg >= 202.5 && deg < 247.5) return ArrowUpRight;
    if (deg >= 247.5 && deg < 292.5) return ArrowRight;
    return ArrowDownRight;
};

const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
};

export const WindCard = ({ speed, deg, gust }: WindCard) => {
    // Convert m/s to km/h
    const toKmH = (ms: number) => (ms * 3.6).toFixed(1);
    const speedKmh = parseFloat(toKmH(speed));
    
    const Icon = getWindIcon(deg);

    const getPhotoAdvice = (s: number, g: number) => {
        if (s > 30 || (g && g * 3.6 > 45)) return "Avoid long exposures. Secure light stands.";
        if (s > 15) return "Use a sturdy tripod for sharp landscapes.";
        if (s < 5) return "Calm: Perfect for water reflections.";
        return "Breezy conditions.";
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Wind & Gusts
                </CardTitle>
                <Wind className="h-4 w-4 text-white-100" />
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                        <div className="text-2xl font-bold">
                            {speedKmh} <span className="text-sm font-normal text-muted-foreground">km/h</span>
                        </div>
                        {gust && (
                            <p className="text-xs font-semibold text-orange-500">
                                Gusts up to {toKmH(gust)} km/h
                            </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            {getWindDirection(deg)} ({deg}°) • {getPhotoAdvice(speedKmh, gust)}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};