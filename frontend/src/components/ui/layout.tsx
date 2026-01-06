import React from "react";
import type { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        
        <div className="bg-gradient-to-br from-background to-muted">
            {/* shadUI defined background color to muted color, handles light and dark mode automatically */}

            header

            {/* shadUI container class for responsive padding and centering */}
            <main className="min-h-screen container mx-auto px-4 py-8">    
            {children}
            </main>
            <footer className ="border-t backdrop-blur py-12">
                <div className ="container mx-auto px-4 text-center text-gray-600">
                    <p> Hello testing </p>
                </div>
            </footer>

        </div>
    );
};

export default Layout;