import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import { DashboardSection } from '@/components/dashboard';
import { BlogSection } from '@/modules/blog/components';
import EfficiencyAcademySection from '@/components/sections/EfficiencyAcademySection';
import ContactSection from '@/components/sections/ContactSection';
import BackToTopButton from '@/components/ui/BackToTopButton';
import '@/styles/globals.css';

export default function HomePage() {
  return (
    <main className="flex flex-col scroll-smooth">
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <ServicesSection />
      <DashboardSection />
      <BlogSection />
      <EfficiencyAcademySection />
      <ContactSection />
      <BackToTopButton />
    </main>
  );
}


