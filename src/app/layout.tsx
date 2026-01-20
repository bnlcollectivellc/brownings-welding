import type { Metadata } from "next";
import { Inter, Hedvig_Letters_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });
const hedvigLettersSerif = Hedvig_Letters_Serif({
  subsets: ["latin"],
  variable: "--font-hedvig-serif",
});

export const metadata: Metadata = {
  title: "Browning's Welding & Fabrication | Custom Metal Fabrication",
  description: "Faith, Family, & Fabrication | Since 1972. Get instant quotes on custom laser cut parts with our interactive configurator. Made in the USA.",
  keywords: "welding, fabrication, laser cutting, CNC, metal fabrication, custom parts, sheet metal",
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/videos/hero.mp4" as="video" type="video/mp4" />
      </head>
      <body className={`${inter.className} ${hedvigLettersSerif.variable} bg-white text-browning-charcoal`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
