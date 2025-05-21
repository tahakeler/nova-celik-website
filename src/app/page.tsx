import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesGrid from '../components/ServicesGrid';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <HeroSection />
      <AboutSection />
      <ServicesGrid />
      <ContactSection />
    </main>
  );
}
