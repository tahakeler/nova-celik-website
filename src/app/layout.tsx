import type { Metadata } from 'next';
import '../styles/globals.css'; // ✅ Tailwind + global styles

export const metadata: Metadata = {
  title: 'Nova Çelik',
  description: 'Industrial steel solutions & energy dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
