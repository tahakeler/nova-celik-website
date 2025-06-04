import DashboardSection from '@/components/DashboardSection';
import PageHero from '@/components/PageHero';

export default function DashboardPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        image="/images/hero-image.jpg"
        title="Dashboard Overview"
        subtitle="Real-time insights into your facility performance"
      />
      <DashboardSection />
    </main>
  );
}
