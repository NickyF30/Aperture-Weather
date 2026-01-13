import { useTheme } from "@/context/theme-provider";
import { Moon, Sun, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { CitySearch } from "@/components/ui/city-search";
import { Button } from "@/components/ui/button";

const Header = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";
    return (
        <header className="sticky top-0 z-1 w-full border-b bg-background/95 backdrop-blur py-2 px-8 supports-[backdrop-filter]:bg-background/10">
            <div className="container mx-auto flex items-center justify-between h-16 gap-4">
                {/* Logo Section */}
                <Link to={"/"} className="flex-shrink-0">
                    <img
                        src="/assets/ApertureText.PNG"
                        alt="ApertureLogo"
                        className="h-14 object-contain"
                    />
                </Link>

                <div className="flex-1 flex items-center gap-4 justify-start">
                    <Link to="/">
                        <Button variant="ghost" className="text-sm font-medium transition-colors hover:text-primary">
                            <MapPin className="h-4 w-4" />
                            My Location
                        </Button>
                    </Link>
                    <div className="w-full max-w-md">
                        <CitySearch />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Link to="/favorites">
                        <Button variant="ghost" className="text-sm font-medium transition-colors hover:text-primary">
                            Favourites
                        </Button>
                    </Link>
                </div>

                {/* Theme Toggle */}
                <div
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className={`relative flex items-center justify-center cursor-pointer transition-transform duration-500 h-10 w-10 ${isDark ? "rotate-180" : "rotate-0"
                        }`}
                >
                    {/* Sun icon visible when dark, hidden and rotated when light */}
                    <Sun
                        className={`h-6 w-6 text-yellow-500 transition-all duration-500 ${isDark
                            ? "opacity-100 rotate-0 scale-100"
                            : "opacity-0 -rotate-90 scale-0 absolute"
                            }`}
                    />

                    {/* Moon icon visible when light, hidden and rotated when dark */}
                    <Moon
                        className={`h-6 w-6 text-blue-900 transition-all duration-500 ${isDark
                            ? "opacity-0 rotate-90 scale-0 absolute"
                            : "opacity-100 rotate-0 scale-100"
                            }`}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;