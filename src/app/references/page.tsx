import ReferencesSection from '@/components/sections/ReferencesSection';
import PageHero from '@/components/ui/PageHero';

export default function ReferencesPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        image="/images/hero-image.jpg"
        title="References"
        subtitle="Client successes across diverse sectors"
      />
      <ReferencesSection />
    </main>
  );
}
