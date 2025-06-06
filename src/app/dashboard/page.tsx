// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import DashboardGrid from '@/modules/dashboard/components/DashboardGrid';
import ConsumptionChart from '@/modules/dashboard/components/ConsumptionChart';
import PageHero from '@/components/PageHero';
import { parseDashboardData } from '@/modules/dashboard/parseDashboardData';
import type { DashboardData } from '@/modules/dashboard/dashboard.types';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch('/excel/sample.xlsx');
        if (!res.ok) {
          console.error(`Failed to fetch Excel file: ${res.status} ${res.statusText}`);
          throw new Error(`Failed to fetch Excel file: ${res.status} ${res.statusText}`);
        }
        const buf = await res.arrayBuffer();
        const file = new File([buf], 'sample.xlsx');
        const parsed = await parseDashboardData(file);
        setData(parsed);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching or parsing data:', err);
          setError(`Failed to load dashboard data: ${err.message}`);
        } else {
          setError('Failed to load dashboard data: Unknown error');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <PageHero
        image="/svgs/realTimeAnalytics.svg"
        title="Analytics Dashboard"
        subtitle="Monitor, compare, and optimize energy performance in real time."
      />
      <section className="max-w-screen-2xl mx-auto py-8 px-4 w-full">
        {error && (
          <div className="text-center text-red-600 py-12">{error}</div>
        )}
        {loading && !error && (
          <div className="text-center py-12 text-blue-700 animate-pulse">
            Loading dashboard data...
          </div>
        )}
        {data && (
          <>
            <DashboardGrid metrics={data} />
            <div className="mt-10">
              <ConsumptionChart current={data.current} previous={data.previous} />
            </div>
          </>
        )}
      </section>
    </main>
  );
}
