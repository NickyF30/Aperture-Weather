import { Cloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CloudCardProps {
    clouds: number;
}

export const CloudCard = ({ clouds }: CloudCardProps) => {
    const getCloudDescription = (percent: number) => {
        if (percent <= 10) return { text: "Clear (Bald Sky)", detail: "High contrast, hard shadows." };
        if (percent <= 30) return { text: "Mostly Clear", detail: "Good for blue hour gradients." };
        if (percent <= 70) return { text: "Dramatic", detail: "Best for sunset colors & texture." };
        if (percent <= 90) return { text: "Mostly Cloudy", detail: "Filtered light." };
        return { text: "Overcast (Soft Box)", detail: "Diffused light, great for portraits." };
    };

    const info = getCloudDescription(clouds);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Cloud Cover</CardTitle>
                <Cloud className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-1">
                    <div className="text-2xl font-bold">{clouds}%</div>
                    <p className="text-sm font-medium text-sky-500">{info.text}</p>
                    <p className="text-xs text-muted-foreground">{info.detail}</p>
                </div>
            </CardContent>
        </Card>
    );
};