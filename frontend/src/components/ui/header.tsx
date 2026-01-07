import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";



const Header = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 px-8 supports-[backdrop-filter]:bg-background/10">
            <div className="container mx-auto flex items-center justify-between h-16">
                {/* Logo Section */}
                <Link to={"/"}>
                    <img
                        src="/ApertureText.PNG"
                        alt="ApertureLogo"
                        className="h-14 object-contain"
                    />
                </Link>

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