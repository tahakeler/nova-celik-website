'use client';

import React, { useEffect, useState } from 'react';
import GaugeChart from './GaugeChart';
import FacilityManagementCard from './FacilityManagementCard';
import ComparisonCard from './ComparisonCard';
import { parseDashboardData, type DashboardData } from '../parseDashboardData';

export default function DashboardSection() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/excel/sample.xlsx');
        if (!res.ok) throw new Error('Could not load dashboard data.');
        const ab = await res.arrayBuffer();
        const file = new File([ab], 'sample.xlsx');
        const result = await parseDashboardData(file);
        if (mounted) setData(result);
      } catch (err) {
        console.error('Dashboard data loading error:', err);
        setError(`Failed to load dashboard data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-red-600 text-xl font-semibold">{error}</div>
    );
  }
  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-gray-500 text-lg">Loading dashboard...</div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-8 w-full">
      {/* Left: Metrics */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Energy Quality Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <GaugeChart
            label="Voltage Fluctuation"
            value={Number(data.voltageFluctuation.toFixed(1))}
            color="#facc15"
            max={100}
            info="Last 7 Days Avg"
          />
          <GaugeChart
            label="Voltage Harmonics"
            value={Number(data.voltageHarmonics.toFixed(1))}
            color="#ef4444"
            max={100}
            info="Last 7 Days Avg"
          />
          <GaugeChart
            label="Current Harmonics"
            value={Number(data.currentHarmonics.toFixed(1))}
            color="#ef4444"
            max={100}
            info="Last 7 Days Avg"
          />
          <GaugeChart
            label="Generator Demand"
            value={Number(data.generatorDemand.toFixed(1))}
            color="#facc15"
            max={100}
            info="Last 7 Days Avg"
          />
        </div>
      </div>
      {/* Right: Cards */}
      <div className="flex flex-col gap-8 min-w-[340px] w-full max-w-sm">
        <FacilityManagementCard />
        <ComparisonCard />
      </div>
    </div>
  );
}
