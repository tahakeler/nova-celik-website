import { DashboardGrid, ConsumptionChart } from '@/modules/dashboard/components';

export default function DashboardPage() {
  return (
    <main id="dashboard" className="bg-[#fffbea] min-h-screen">
      <div className="max-w-screen-2xl mx-auto py-8">
        <DashboardGrid />
        <div className="mt-8">
          <ConsumptionChart />
        </div>
      </div>
    </main>
  );
}
