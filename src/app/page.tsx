import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ReferencesSection from "@/components/ReferencesSection";
import DashboardSection from "@/components/DashboardSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ReferencesSection />
      <DashboardSection />
      <ContactSection />
    </main>
  );
}
