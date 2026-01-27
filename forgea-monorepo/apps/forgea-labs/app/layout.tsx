import "./globals.css";

import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-screen">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} h-screen min-h-screen overflow-hidden bg-slate-950 font-sans text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
