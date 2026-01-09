import { Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HumidityCard {
    humidity: number;
}

export const HumidityCard = ({ humidity }: HumidityCard) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Humidity</CardTitle>
                <Droplets className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{humidity}%</div>
            </CardContent>
        </Card>
    );
};