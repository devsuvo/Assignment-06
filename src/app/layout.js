import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], weight: ["700"], variable: "--font-oswald" });

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.variable} ${oswald.variable} min-h-screen bg-ink font-sans text-white antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}