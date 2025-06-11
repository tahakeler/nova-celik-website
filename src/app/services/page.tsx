import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PageHero from '@/components/ui/PageHero';
import BackToTopButton from '@/components/ui/BackToTopButton';

export const metadata = {
  title: 'Services | NovaCelik',
  description:
    'Explore our energy efficiency solutions and digital services for industrial performance.',
};

export default function ServicesPage() {
  return (
    <main className="flex flex-col bg-white text-gray-900">
      <PageHero
        image="/images/hero-image.jpg"
        title="Our Services"
        subtitle="Innovative solutions that drive sustainable performance"
      />
      <ServicesSection />
      <TestimonialsSection />
      <BackToTopButton />
    </main>
  );
}
