import { Link } from "react-router-dom";



const Header = () => {
    return ( 
    <header className = "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 px-8 supports-[backdrop-filter]:bg-background/60">
        <div>
            <Link to={"/"}>
                <img src="/ApertureText.PNG" alt="ApertureLogo" className = "h-14" />
            </Link>
        </div>
    </header>
    );
};

export default Header;