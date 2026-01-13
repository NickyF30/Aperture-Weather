import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun } from "lucide-react";

interface UVCardProps {
    uv: number;
}

export const UVCard = ({ uv }: UVCardProps) => {
    const getUVLabel = (value: number) => {
        if (value <= 2) return { text: "Low", color: "text-green-500", desc: "No protection needed.", photo: "Soft light, low contrast." };
        if (value <= 5) return { text: "Moderate", color: "text-yellow-500", desc: "Seek shade midday.", photo: "Good saturation." };
        if (value <= 7) return { text: "High", color: "text-orange-500", desc: "Protection essential.", photo: "Harsh shadows. Use fill flash." };
        if (value <= 10) return { text: "Very High", color: "text-red-500", desc: "Extra precautions.", photo: "Very harsh. Use ND filters." };
        return { text: "Extreme", color: "text-purple-500", desc: "Avoid exposure.", photo: "Avoid shooting unprotected." };
    };

    const info = getUVLabel(uv);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">UV Index</CardTitle>
                <Sun className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${info.color}`}>{Math.round(uv)} - {info.text}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    {info.desc}
                </p>
                <p className="text-xs font-semibold text-primary/80 mt-1">
                    {info.photo}
                </p>
            </CardContent>
        </Card>
    );
};