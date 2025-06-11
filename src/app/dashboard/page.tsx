'use client';

import { useEffect, useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import DashboardSection from '@/components/dashboard/DashboardSection';

function DashboardContent({ error, data }: Readonly<{ error: string | null; data: DashboardData | null }>) {
  if (error) {
    return <section className="px-4 py-20 text-center text-red-600 font-semibold">{error}</section>;
  }
  if (!data) {
    return <section className="px-4 py-20 text-center text-gray-500 animate-pulse">Loading dashboard data...</section>;
  }
  return <DashboardSection data={data} />;
}
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
    <main>
      <PageHero
        image="/images/dashboard-hero.jpg"
        title="NovaCelik Analytics Dashboard"
        subtitle="Real-time insights, facility comparisons, and energy quality reports at your fingertips."
      />
      <DashboardContent error={error} data={data} />
    </main>
  );
}
