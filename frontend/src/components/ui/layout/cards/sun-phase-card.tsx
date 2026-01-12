import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Moon, Sunset, Sunrise } from "lucide-react";
import SunCalc from "suncalc";

interface SunPhaseProps {
    lat: number;
    lon: number;
}

export const SunPhaseCard = ({ lat, lon }: SunPhaseProps) => {
    const times = SunCalc.getTimes(new Date(), lat, lon);
    const moon = SunCalc.getMoonIllumination(new Date());

    // Helper to format time
    const formatTime = (date: Date) => 
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">Light & Magic Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Golden Hour */}
                <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center gap-2 text-orange-500">
                        <Sunset className="h-4 w-4" />
                        <span className="font-medium">Golden Hour</span>
                    </div>
                    <div className="text-sm">
                        {formatTime(times.goldenHour)} - {formatTime(times.sunset)}
                    </div>
                </div>

                {/* Blue Hour */}
                <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center gap-2 text-blue-500">
                        <Sunrise className="h-4 w-4" />
                        <span className="font-medium">Blue Hour</span>
                    </div>
                    <div className="text-sm">
                        {formatTime(times.sunset)} - {formatTime(times.dusk)}
                    </div>
                </div>

                {/* Moon Phases */}
                <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Moon className="h-4 w-4" />
                        <span className="font-medium">Moon Phase</span>
                    </div>
                    <div className="text-sm">
                        {Math.round(moon.fraction * 100)}% Illuminated
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};