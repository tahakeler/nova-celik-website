'use client';

import { useEffect, useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
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
    <main className="min-h-screen bg-gray-50">
      <PageHero
        image="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80"
        title="NovaCelik Analytics Dashboard"
        subtitle="Real-time insights, facility comparisons, and energy quality reports at your fingertips."
      />
      {error ? (
        <section className="px-4 py-20 text-center text-red-600 font-semibold">{error}</section>
      ) : !data ? (
        <section className="px-4 py-20">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 h-64 shadow" />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <DashboardGrid data={data} />
      )}
    </main>
  );
}
