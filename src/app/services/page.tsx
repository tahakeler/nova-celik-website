import ServicesSection from '@/components/ServicesSection';
import PageHero from '@/components/PageHero';

export default function ServicesPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        image="/images/hero-image.jpg"
        title="Our Services"
        subtitle="Tailored energy efficiency solutions for every industry"
      />
      <ServicesSection />
    </main>
  );
}