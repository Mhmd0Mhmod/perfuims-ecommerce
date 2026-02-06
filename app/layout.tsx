import { Toaster } from "@/components/ui/sonner";
import QueryContext from "@/context/QueryContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Cairo, Playfair_Display } from "next/font/google";
import "./globals.css";
import { DirectionProvider } from "@/components/ui/direction";
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
  title: "مؤسسه الطاحون - المسك للعطور | Al-Tahoun Perfumes",
  description:
    "اكتشف عطور عربية فاخرة من مؤسسه الطاحون - المسك للعطور. عود، عطور شرقية فاخرة مستوحاة من التراث العربي الأصيل | Discover exquisite Arabic perfumes, oud, and luxury fragrances from Al-Tahoun Establishment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${playfairDisplay.variable} ${cairo.variable} ${cairo.className} ${playfairDisplay.className} antialiased`}
      >
        <DirectionProvider dir="rtl">
          <QueryContext>
            <SessionProvider>
              {children}
              <Toaster position="bottom-right" />
              <ReactQueryDevtools initialIsOpen={false} />
            </SessionProvider>
          </QueryContext>
        </DirectionProvider>
      </body>
    </html>
  );
}
