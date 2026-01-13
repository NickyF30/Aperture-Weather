import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, ArrowUp, ArrowDown } from "lucide-react";
import SunCalc from "suncalc";

interface MoonCardProps {
    lat: number;
    lon: number;
}

export const MoonCard = ({ lat, lon }: MoonCardProps) => {
    const date = new Date();
    const times = SunCalc.getMoonTimes(date, lat, lon);
    const illumination = SunCalc.getMoonIllumination(date);

    // Helper to format time safely
    const formatTime = (date?: Date) => {
        if (!date) return "N/A";
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Moon className="h-4 w-4 text-slate-400" />
                    Moon Phase & Times
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Illumination */}
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-muted-foreground font-medium">Illumination</span>
                    <span className="text-sm font-bold">
                        {Math.round(illumination.fraction * 100)}%
                    </span>
                </div>

                {/* Moonrise */}
                <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center gap-2 text-indigo-400">
                        <ArrowUp className="h-4 w-4" />
                        <span className="font-medium">Moonrise</span>
                    </div>
                    <div className="text-sm">
                        {formatTime(times.rise)}
                    </div>
                </div>

                {/* Moonset */}
                <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-2 text-slate-500">
                        <ArrowDown className="h-4 w-4" />
                        <span className="font-medium">Moonset</span>
                    </div>
                    <div className="text-sm">
                        {formatTime(times.set)}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};