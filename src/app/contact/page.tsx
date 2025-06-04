import ContactSection from '@/components/ContactSection';
import PageHero from '@/components/PageHero';

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        image="/images/hero-image.jpg"
        title="Contact NovaCelik"
        subtitle="Reach out to discuss your next project"
      />
      <ContactSection />
    </main>
  );
}
