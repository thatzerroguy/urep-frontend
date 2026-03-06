import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Unified Registration Portal",
  description: "Unified Registration Portal for FMYD Programs",
  icons: {
    icon: '/images/fmyd_logo.png', // Using the existing FMYD logo from your images folder
    shortcut: '/images/fmyd_logo.png',
    apple: '/images/fmyd_logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
