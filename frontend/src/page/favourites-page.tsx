import { useFavorites } from "@/hooks/useFavourites";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
    const { favorites, removeFavorite } = useFavorites();
    const navigate = useNavigate();

    if (favorites.length === 0) {
    return (
        <div className="p-8 text-center text-muted-foreground relative">
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-8"
                onClick={() => navigate("/")}
            >
                <X className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold mb-4">Favourites</h1>
            <p>You haven't added any favourite cities yet.</p>
        </div>
    );
}

    return (
        <div className="p-8 space-y-4 container mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Favourite Cities</h1>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/")}>
                    <X className="h-6 w-6" />
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {favorites.map((city) => (
                    <Card
                        key={city.id}
                        className="cursor-pointer hover:bg-muted/50 transition-colors relative group"
                        onClick={() => navigate(`/city/${city.query}`)}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">
                                {city.name}
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFavorite(city.id);
                                }}>
                                <X className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                Lat: {city.lat.toFixed(2)}, Lon: {city.lon.toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;