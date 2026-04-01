import type { Metadata } from "next";
import { Varela_Round, Syne } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/providers";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Header } from "@/components/layout/header";

const varelaRound = Varela_Round({
  variable: "--font-varela-round",
  subsets: ["latin"],
  weight: ["400"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Agency | Bold & Animated",
  description: "A highly interactive animated experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${varelaRound.variable} ${syne.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <CustomCursor />
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
