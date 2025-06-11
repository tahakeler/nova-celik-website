import DashboardGrid from '@/modules/dashboard/components/DashboardGrid';
import ConsumptionChart from '@/modules/dashboard/components/ConsumptionChart';
import PageHero from '@/components/ui/PageHero';

export default function DashboardPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <PageHero
        image="/svgs/hero-image.svg"
        title="NovaCelik Analytics Dashboard"
        subtitle="Real-time insights, facility comparisons, and energy quality reports at your fingertips."
      />
      <section className="max-w-screen-2xl mx-auto py-8 px-4 w-full">
        <DashboardGrid />
        <div className="mt-10">
          <ConsumptionChart />
        </div>
      </section>
    </main>
  );
}