import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nova Celik | Industrial Steel Experts",
  description: "Reliable and innovative steel structure engineering since 2013.",
  keywords: ["Nova Celik", "steel construction", "project design", "manufacturing", "assembly"],
  openGraph: {
    title: "Nova Celik | Industrial Steel Experts",
    description: "Reliable and innovative steel structure engineering since 2013.",
    url: "https://novacelikco.com",
    siteName: "Nova Celik",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className} scroll-smooth bg-white text-gray-800`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTopButton />
      </body>
    </html>
  );
}
