import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind } from "lucide-react";

interface AQICardProps {
    aqi: number;
    pollutants: {
        pm2_5: number;
        pm10: number;
        no2: number;
        o3: number;
    };
}

export const AQICard = ({ aqi, pollutants }: AQICardProps) => {
    const getAQILabel = (value: number) => {
        switch (value) {
            case 1: return { text: "Good", color: "text-green-500", desc: "Air quality is satisfactory." };
            case 2: return { text: "Fair", color: "text-yellow-500", desc: "Air quality is acceptable." };
            case 3: return { text: "Moderate", color: "text-orange-500", desc: "Members of sensitive groups may experience health effects." };
            case 4: return { text: "Poor", color: "text-red-500", desc: "Everyone may begin to experience health effects." };
            case 5: return { text: "Very Poor", color: "text-purple-500", desc: "Health warnings of emergency conditions." };
            default: return { text: "Unknown", color: "text-muted-foreground", desc: "No data available." };
        }
    };

    const info = getAQILabel(aqi);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Air Quality</CardTitle>
                <Wind className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${info.color}`}>{aqi} - {info.text}</div>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                    {info.desc}
                </p>

                {pollutants && (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t text-xs">
                        <div className="flex flex-col">
                            <span className="text-muted-foreground">PM2.5</span>
                            <span className="font-medium">{pollutants.pm2_5} μg/m³</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-muted-foreground">PM10</span>
                            <span className="font-medium">{pollutants.pm10} μg/m³</span>
                        </div>
                        {/* PM2.5 is crucial for haze/photography clarity */}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};