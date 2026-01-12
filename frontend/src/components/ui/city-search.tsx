import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CitySearch = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/city/${encodeURIComponent(query)}`);
            setQuery("");
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative flex items-center w-full max-w-sm">
            <input
                type="text"
                placeholder="Search city..."
                className="w-full h-10 px-4 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-10 w-10 text-muted-foreground hover:text-primary"
            >
                <Search className="h-4 w-4" />
            </Button>
        </form>
    );
};