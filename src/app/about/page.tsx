import AboutSection from '@/components/AboutSection';
import PageHero from '@/components/PageHero';

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        image="/images/hero-image.jpg"
        title="About NovaCelik"
        subtitle="Thailand's first process-oriented energy efficiency company"
      />
      <AboutSection />
    </main>
  );
}
