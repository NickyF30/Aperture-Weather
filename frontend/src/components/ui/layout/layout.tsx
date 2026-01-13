import React from "react";
import type { PropsWithChildren } from "react";
import Header from "./header";

const Layout = ({ children }: PropsWithChildren) => {
    return (

        <div className="bg-gradient-to-br from-background to-muted">
            {/* shadUI defined background color to muted color, handles light and dark mode automatically */}

            <Header />

            {/* shadUI container class for responsive padding and centering */}
            <main className="min-h-screen w-full px-4 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;