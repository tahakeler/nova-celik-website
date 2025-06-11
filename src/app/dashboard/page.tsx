'use client';

import { useEffect, useState } from 'react';
import DashboardGrid from '@/modules/dashboard/components/DashboardGrid';
import ConsumptionChart from '@/modules/dashboard/components/ConsumptionChart';
import PageHero from '@/components/ui/PageHero';
import { parseDashboardData, type DashboardData } from '@/modules/dashboard/parseDashboardData';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/excel/sample.xlsx');
        if (!response.ok) throw new Error(`Failed to load Excel file (HTTP ${response.status})`);
        const arrayBuffer = await response.arrayBuffer();
        const file = new File([arrayBuffer], 'sample.xlsx');
        const parsed = await parseDashboardData(file);
        setData(parsed);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data.');
      }
    };

    loadData();
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <PageHero
        image="/svgs/hero-image.svg"
        title="NovaCelik Analytics Dashboard"
        subtitle="Real-time insights, facility comparisons, and energy quality reports at your fingertips."
      />
      <section className="max-w-screen-2xl mx-auto py-8 px-4 w-full">
        {error && (
          <p className="text-red-600 font-semibold mb-6">{error}</p>
        )}
        <DashboardGrid />
        <div className="mt-10">
          {data ? (
            <ConsumptionChart current={data.current} previous={data.previous} />
          ) : (
            <p className="text-gray-600 animate-pulse">Loading chart...</p>
          )}
        </div>
      </section>
    </main>
  );
}
