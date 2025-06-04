// src/app/layout.tsx
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NovaCelik',
  description: 'Industrial Efficiency Solutions',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} scroll-smooth bg-white text-gray-900`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute top-2 left-2 bg-blue-700 text-white px-3 py-2 rounded-md z-50"
        >
          Skip to Content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
