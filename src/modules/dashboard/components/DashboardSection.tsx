'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Gauge, BatteryCharging, BarChart2 } from 'lucide-react';
import { MAX_VOLTAGE_HARMONICS, DEFAULT_LABELS } from '@/modules/dashboard/dashboard.constants';
import { parseDashboardData, type DashboardData } from '@/modules/dashboard/parseDashboardData';

const BarChart = dynamic(() => import('@/modules/dashboard/components/BarChart'), { ssr: false });
const GaugeChart = dynamic(() => import('@/modules/dashboard/components/GaugeChart'), { ssr: false });
const BatteryChart = dynamic(() => import('@/modules/dashboard/components/BatteryChart'), { ssr: false });

/**
 * A visually polished and highly usable dashboard for NovaCelik analytics.
 * Features strong typography, clean layout, pro iconography, and smooth chart animations.
 */
export default function DashboardSection() {
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
        console.error('Dashboard data loading error:', err);
        setError('Unable to load dashboard data. Please check sample.xlsx or try again.');
      }
    };
    loadData();
  }, []);

  // Loading and error states
  if (error) {
    return (
      <section className="py-24 px-6 text-center text-red-700 bg-[#f9fafb]">
        <p className="text-lg font-semibold">{error}</p>
      </section>
    );
  }
  if (!data) {
    return (
      <section className="py-24 px-6 text-center bg-[#f9fafb]">
        <p className="text-lg text-gray-600 animate-pulse">Loading dashboard data...</p>
      </section>
    );
  }

  // Format values for display
  const totalSteps = data.healthy + data.risky + data.unhealthy;
  const formatNumber = (n: number) => Intl.NumberFormat().format(Math.round(n));
  const formatPercent = (n: number) => `${Math.round(n)}%`;

  return (
    <section
      id="dashboard"
      className="bg-[#f9fafb] py-20 px-2 sm:px-6 flex justify-center items-center"
      aria-labelledby="dashboard-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="w-full max-w-7xl bg-white rounded-3xl border border-blue-100 shadow-2xl px-6 sm:px-12 py-10 sm:py-16 space-y-12"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 id="dashboard-title" className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-blue-700">Nova</span>
            <span className="text-gray-900">Celik</span>
            <span className="text-blue-700"> Dashboard</span>
          </h2>
          <p className="text-lg mt-4 text-gray-600 font-medium">
            Real-time analytics for your facility’s efficiency and sustainability.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gauge Block */}
          <DashboardMetricCard
            icon={<Gauge size={36} className="text-blue-700" />}
            label="Voltage Harmonics"
            value={formatPercent((data.voltageHarmonics / MAX_VOLTAGE_HARMONICS) * 100)}
            className="bg-blue-50"
          >
            <GaugeChart
              label=""
              value={data.voltageHarmonics}
              max={MAX_VOLTAGE_HARMONICS}
              color="#3B82F6"
            />
          </DashboardMetricCard>

          {/* Battery Block */}
          <DashboardMetricCard
            icon={<BatteryCharging size={36} className="text-green-600" />}
            label="Step Conditions"
            value={`${formatNumber(data.healthy)} / ${formatNumber(data.risky)} / ${formatNumber(data.unhealthy)}`}
            className="bg-green-50"
          >
            <BatteryChart
              healthy={data.healthy}
              risky={data.risky}
              unhealthy={data.unhealthy}
            />
            <p className="text-xs text-gray-500 mt-1">{formatNumber(totalSteps)} Total Steps</p>
          </DashboardMetricCard>

          {/* BarChart Block */}
          <DashboardMetricCard
            icon={<BarChart2 size={36} className="text-yellow-600" />}
            label="Monthly Consumption"
            value=""
            className="bg-yellow-50"
          >
            <BarChart
              currentYear={data.current}
              previousYear={data.previous}
              labels={[...DEFAULT_LABELS]}
            />
          </DashboardMetricCard>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * DashboardMetricCard
 * Professional metric block with icon, label, value, and animated children.
 */
const DashboardMetricCard = React.memo(function DashboardMetricCard({
  icon,
  label,
  value,
  className,
  children,
}: Readonly<{
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.07)' }}
      transition={{ type: 'spring', stiffness: 150 }}
      className={`rounded-2xl border border-gray-200 shadow bg-white px-4 py-7 sm:px-6 sm:py-9 flex flex-col items-center ${className ?? ''}`}
    >
      <div className="flex items-center justify-center mb-3">{icon}</div>
      <div className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{label}</div>
      {value && <div className="text-2xl font-bold text-blue-800 mb-2">{value}</div>}
      <div className="w-full flex-grow flex flex-col items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
});