import { Eye, CloudFog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VisibilityCardProps {
    visibility: number;
}

export const VisibilityCard = ({ visibility }: VisibilityCardProps) => {
    const isFoggy = visibility <= 1000;
    const isHazy = visibility > 1000 && visibility <= 5000;

    return (
        <Card className={isFoggy ? "border-orange-400 bg-orange-50/10" : ""}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Visibility</CardTitle>
                {isFoggy ? (
                    <CloudFog className="h-4 w-4 text-orange-500 animate-pulse" />
                ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                )}
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-1">
                    <div className="text-2xl font-bold">
                        {(visibility / 1000).toFixed(1)} km
                    </div>
                    {isFoggy && (
                        <p className="text-xs font-bold text-orange-500">
                            FOG DETECTED: Great for mood!
                        </p>
                    )}
                    {isHazy && (
                         <p className="text-xs text-muted-foreground">
                            Hazy conditions.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};