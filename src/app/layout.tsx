import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google"; // Brand fonts
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { StoreProvider } from "@/context/StoreContext";

// Configure fonts
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

export const metadata: Metadata = {
  title: "Oryizon | Best Organic Moringa Powder for Weight Loss & Vitality",
  description: "Discover Oryizon's premium organic moringa powder. Packed with nature's goodness, our best moringa powder supports weight loss, boosts energy, and promotes overall wellness. Learn how to use moringa powder today.",
  keywords: ["moringa powder benefits", "organic moringa powder", "moringa powder for weight loss", "best moringa powder", "how to use moringa powder"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
        <SmoothScroll>
          <StoreProvider>
            <AuthProvider>
              <CartProvider>
                <Header />
                {children}
                <Footer />
              </CartProvider>
            </AuthProvider>
          </StoreProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
