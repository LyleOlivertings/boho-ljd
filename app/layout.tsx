// app/layout.tsx

import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google"; // Import custom fonts for the boho style
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import the new Navbar component

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LJD Boho Boutique",
  description: "Boho boutique based in Cape Town, South Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}