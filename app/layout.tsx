import { Toaster } from "@/components/ui/sonner";
import QueryContext from "@/context/QueryContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Cairo, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Attar - Luxury Arabic Perfumes",
  description:
    "Discover exquisite Arabic perfumes, oud, and luxury fragrances inspired by Middle Eastern heritage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${playfairDisplay.variable} ${cairo.variable} antialiased`}>
        <QueryContext>
          <SessionProvider>
            {children}
            <Toaster position="bottom-right" />
            <ReactQueryDevtools initialIsOpen={false} />
          </SessionProvider>
        </QueryContext>
      </body>
    </html>
  );
}
