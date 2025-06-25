'use client';

import { DashboardData } from '@/modules/dashboard/parseDashboardData';
import DonutChart from './DonutChart';
import ConsumptionBarChart from './ConsumptionBarChart';
import SpeedometerChart from './SpeedometerChart';
import HealthStatusChart from './HealthStatusChart';
import GlassCard from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

interface HomeDashboardSectionProps {
  data?: DashboardData;
}

export default function HomeDashboardSection({ data }: Readonly<HomeDashboardSectionProps>) {
  if (!data) return null;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-lg shadow-md max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-4 flex flex-col items-center">
          <h3 className="text-lg font-medium mb-2">Voltage Harmonics</h3>
          <DonutChart value={data.voltageHarmonics} unit="%" />
        </GlassCard>

        <GlassCard className="p-4 flex flex-col items-center">
          <h3 className="text-lg font-medium mb-2">Generator Demand</h3>
          <SpeedometerChart value={data.generatorDemand} unit="%" />
        </GlassCard>

        <GlassCard className="p-4 flex flex-col items-center">
          <h3 className="text-lg font-medium mb-2">Energy Consumption</h3>
          <div className="w-full h-40">
            <ConsumptionBarChart current={data.current} previous={data.previous} />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex flex-col items-center">
          <h3 className="text-lg font-medium mb-2">System Health Status</h3>
          <HealthStatusChart healthy={data.healthy} risky={data.risky} unhealthy={data.unhealthy} />
        </GlassCard>
      </div>

      <div className="mt-6 text-center">
        <motion.a
          href="/dashboard"
          className="inline-block px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Full Dashboard
        </motion.a>
      </div>
    </section>
  );
}
