import { Inter, Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { PlanProvider } from "@/context/PlanContext";

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
        <PlanProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { background: "#15171d", color: "#ffffff", border: "1px solid #222630", fontSize: "14px" },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}