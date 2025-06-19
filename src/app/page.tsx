'use client';

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import { BlogSection } from '@/modules/blog/components';
import EfficiencyAcademySection from '@/components/sections/EfficiencyAcademySection';
import ContactSection from '@/components/sections/ContactSection';
import BackToTopButton from '@/components/ui/BackToTopButton';
import '@/styles/globals.css';

// Sample data for homepage dashboard preview
const sampleDashboardData = {
  voltageFluctuation: 319.12,
  voltageHarmonics: 16713,
  currentHarmonics: 72.15,
  generatorDemand: 85,
  healthy: 48.4,
  risky: 41.1,
  unhealthy: 10.4,
  current: [12000, 15000, 18000, 14000, 16000, 19000, 17000, 13000, 15500, 18500, 16500, 14500],
  previous: [11000, 14000, 17000, 13000, 15000, 18000, 16000, 12000, 14500, 17500, 15500, 13500],
};

export default function HomePage() {
  return (
    <main className="flex flex-col scroll-smooth">
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <ServicesSection />
      <section className="bg-blue-50 py-20 border-y border-blue-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Analytics Dashboard</h2>
          <p className="text-lg text-blue-700 mb-12">Real-time insights into your facility's performance and energy efficiency.</p>
          <DashboardGrid data={sampleDashboardData} />
        </div>
      </section>
      <BlogSection />
      <EfficiencyAcademySection />
      <ContactSection />
      <BackToTopButton />
    </main>
  );
}


