import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VisibilityCard {
    visibility: number;
}

export const VisibilityCard = ({ visibility }: VisibilityCard) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Visibility</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{(visibility / 1000).toFixed(1)} km</div>
            </CardContent>
        </Card>
    );
};