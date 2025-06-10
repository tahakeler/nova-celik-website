// src/app/dashboard/page.tsx
import Image from 'next/image';
import { Metadata } from 'next';
import DashboardSection from '@/modules/dashboard/components/DashboardSection';
import dashboardHero from '@/public/images/dashboard-hero.png';

export const metadata: Metadata = {
  title: 'Dashboard | NovaCelik',
  description: 'Real-time analytics on your facility performance metrics — voltage, harmonics, energy demand, and more.',
};

export default function DashboardPage() {
  return (
    <main className="scroll-smooth">
      <section className="relative min-h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={dashboardHero}
            alt="Dashboard Overview Hero"
            placeholder="blur"
            quality={80}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>

        <div className="relative z-20 flex h-[80vh] items-center justify-center text-white px-6 text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-xl">
              Dashboard Overview
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Real-time insights into your facility’s energy and sustainability performance
            </p>
          </div>
        </div>
      </section>

      <DashboardSection />
    </main>
  );
}
