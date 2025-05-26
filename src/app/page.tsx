import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import AchievementsSection from '@/components/AchievementsSection';
import ServicesSection from '@/components/ServicesSection';
import DashboardSection from '@/components/DashboardSection';
import BlogSection from '@/components/BlogSection';
import EfficiencyAcademySection from '@/components/EfficiencyAcademySection';
import ContactSection from '@/components/ContactSection';
import BackToTopButton from '@/components/BackToTopButton';

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


