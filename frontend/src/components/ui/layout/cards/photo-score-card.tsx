import { Camera, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculatePhotoScore } from "@/lib/utils";

interface PhotoScoreProps {
    data: {
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_gust?: number;
        weather_description: string;
        aqi: number;
        uv: number;
        humidity: number;
        temp: number;
        feels_like: number;
    };
    lat: number;
    lon: number;
}

export const PhotoScoreCard = ({ data, lat, lon }: PhotoScoreProps) => {
    const { score, verdict, reasons } = calculatePhotoScore(data, lat, lon);

    // Dynamic color based on score
    const scoreColor = score >= 8 ? "text-emerald-500" : score >= 6 ? "text-green-500" : score >= 4 ? "text-yellow-500" : "text-red-500";

    return (
        <Card className="col-span-full bg-gradient-to-br from-background to-muted/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Camera className="h-4 w-4 text-primary" />
                    Photography Conditions
                </CardTitle>
                <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row justify-between gap-6 items-center">

                    {/* Score */}
                    <div className="text-center md:text-left min-w-[120px]">
                        <div className="flex items-baseline gap-2 justify-center md:justify-start">
                            <span className={`text-5xl font-black tracking-tighter ${scoreColor}`}>
                                {score}
                            </span>
                            <span className="text-sm text-muted-foreground font-medium uppercase">/ 10</span>
                        </div>
                        <p className="text-lg font-medium mt-1">{verdict}</p>
                    </div>

                    {/* Reasons */}
                    <div className="flex-1 w-full">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                            {reasons.slice(0, 6).map((reason, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                                    <span>{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};