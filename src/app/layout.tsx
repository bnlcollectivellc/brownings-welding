import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Browning's Welding & Fabrication | Custom Metal Fabrication",
  description: "Faith, Family, & Fabrication — Since 1972. Get instant quotes on custom laser cut parts with our interactive configurator. Made in the USA.",
  keywords: "welding, fabrication, laser cutting, CNC, metal fabrication, custom parts, sheet metal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-browning-charcoal`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
