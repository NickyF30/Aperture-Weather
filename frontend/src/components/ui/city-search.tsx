import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LocationResult {
    name: string;
    state?: string;
    country: string;
    lat: number;
    lon: number;
}

export const CitySearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<LocationResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setIsLoading(true);
                try {
                    const response = await fetch(`http://localhost:3001/api/weather/search?q=${encodeURIComponent(query)}`);
                    if (response.ok) {
                        const data = await response.json();
                        setResults(data);
                        setIsOpen(true);
                    }
                } catch (error) {
                    console.error("Failed to fetch locations", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 500); // 500ms delay for debouncing

        return () => clearTimeout(timer);
    }, [query]);

    const handleSelectLocation = (location: LocationResult) => {
        const specificQuery = [location.name, location.state, location.country]
            .filter(Boolean)
            .join(", ");

        navigate(`/city/${encodeURIComponent(specificQuery)}`);
        setQuery("");
        setIsOpen(false);
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/city/${encodeURIComponent(query)}`);
            setQuery("");
            setIsOpen(false);
        }
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-sm z-50">
            <form onSubmit={handleManualSubmit} className="relative flex items-center w-full">
                <input
                    type="text"
                    placeholder="Search city..."
                    className="w-full h-10 px-4 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (results.length > 0) setIsOpen(true);
                    }}
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-10 w-10 text-muted-foreground hover:text-primary"
                >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
            </form>

            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover text-popover-foreground border rounded-md shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <ul className="max-h-[300px] overflow-auto py-1">
                        {results.map((location, index) => (
                            <li key={`${location.lat}-${location.lon}-${index}`}>
                                <button
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground flex items-center gap-2 transition-colors"
                                    onClick={() => handleSelectLocation(location)}
                                >
                                    <MapPin className="h-3.5 w-3.5 opacity-70" />
                                    <span>
                                        <span className="font-medium">{location.name}</span>
                                        <span className="text-muted-foreground ml-1">
                                            {location.state ? `, ${location.state}` : ''}, {location.country}
                                        </span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};