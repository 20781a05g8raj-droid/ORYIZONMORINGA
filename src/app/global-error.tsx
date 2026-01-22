"use client";

import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Re-define fonts for the global error layout since it replaces the root layout
const serif = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-serif",
    display: "swap",
});

const sans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className={`${serif.variable} ${sans.variable} bg-background text-foreground`}>
                <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
                    <h2 className="font-serif text-5xl mb-6">Critical Error</h2>
                    <p className="text-muted-foreground max-w-md mb-8">
                        A critical error occurred and the application could not be loaded.
                    </p>
                    <button
                        onClick={() => reset()}
                        className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Refresh Application
                    </button>
                </div>
            </body>
        </html>
    );
}
