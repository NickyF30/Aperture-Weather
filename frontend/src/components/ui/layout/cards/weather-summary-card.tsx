import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Camera } from "lucide-react";
import { calculatePhotoScore } from "@/lib/utils";

interface WeatherSummaryProps {
    data: any; 
    lat: number;
    lon: number;
}

export const WeatherSummaryCard = ({ data, lat, lon }: WeatherSummaryProps) => {
    const { verdict, reasons } = calculatePhotoScore(data, lat, lon);
    
    // Get the most significant reason (usually the first one)
    const primaryReason = reasons.length > 0 ? reasons[0] : "Conditions are stable.";
   
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Photographer's Summary</CardTitle>
                <Camera className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
                <p className="text-lg font-small leading-relaxed">
                    Conditions are currently <span className="font-bold text-sky-400">{verdict}</span> for photography in {data.cityName}. 
                    {" "}{primaryReason}
                    {" "}The temperature is {Math.round(data.temp)}°C with {data.clouds}% cloud cover.
                </p>
            </CardContent>
        </Card>
    );
};