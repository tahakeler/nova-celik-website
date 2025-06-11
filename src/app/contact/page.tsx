import ContactSection from '@/components/sections/ContactSection';
import PageHero from '@/components/ui/PageHero';

export const metadata = {
  title: 'Contact | NovaCelik',
  description:
    'Contact NovaCelik for more information on our solutions, support, or to request a demo.',
};

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        image="/images/hero-image.jpg"
        title="Get in Touch"
        subtitle="Reach out to our team for more information about our solutions"
      />
      <ContactSection />
    </main>
  );
}
