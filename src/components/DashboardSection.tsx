'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import BatteryChart from '@/components/BatteryChart';
import BarChart from '@/components/BarChart';
import GaugeChart from '@/components/GaugeChart';
import { mockBarData, mockGaugeData, mockBatteryData } from '@/data/mockDashboardData';
import { MAX_VOLTAGE_HARMONICS, DEFAULT_LABELS } from '@/constants/dashboard.constants';

export default function DashboardSection() {
  return (
    <section
      id="dashboard"
      className="bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-16 py-28 w-full flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="w-full max-w-[1400px] bg-white rounded-3xl border border-blue-200 shadow-xl px-8 py-12 space-y-12"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="text-blue-700">NovaCelik</span> Dashboard
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Real-time insights preview: a glance into our facility monitoring system.
          </p>
        </div>

        {/* Chart Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-center">
            <GaugeChart label="Voltage Harmonics" value={mockGaugeData.voltageHarmonics} max={MAX_VOLTAGE_HARMONICS} />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-center">
            <BatteryChart {...mockBatteryData} />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-center">
            <BarChart
              currentYear={mockBarData.current}
              previousYear={mockBarData.previous}
              labels={DEFAULT_LABELS}
            />
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 text-white bg-blue-700 rounded-lg font-medium shadow hover:bg-blue-800 transition"
          >
            Go to Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
