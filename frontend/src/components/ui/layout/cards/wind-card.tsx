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
}

const getWindIcon = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return ArrowDown;       // North wind blows s
    if (deg >= 22.5 && deg < 67.5) return ArrowDownLeft;   // NE wind blows SW
    if (deg >= 67.5 && deg < 112.5) return ArrowLeft;      // East wind blows w
    if (deg >= 112.5 && deg < 157.5) return ArrowUpLeft;   // SE wind blows NW
    if (deg >= 157.5 && deg < 202.5) return ArrowUp;       // South wind blows N
    if (deg >= 202.5 && deg < 247.5) return ArrowUpRight;  // SW wind blows NE
    if (deg >= 247.5 && deg < 292.5) return ArrowRight;     // West wind blows East
    return ArrowDownRight;                                 // NW wind blows SE
};

const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
};

export const WindCard = ({ speed, deg }: WindCard) => {
    // Convert m/s to km/h because openweather gave m/s
    const toKmH = (ms: number) => (ms * 3.6).toFixed(1);
    const Icon = getWindIcon(deg); // direction icon

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Wind Direction
                </CardTitle>
                <Wind className="h-4 w-4 text-white-100" />
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">

                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <Icon className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{toKmH(speed)} <span className="text-sm font-normal text-muted-foreground">km/h</span></div>
                        <p className="text-xs text-muted-foreground">
                            From the <span className="font-semibold text-foreground">{getWindDirection(deg)}</span> ({deg}°)
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};