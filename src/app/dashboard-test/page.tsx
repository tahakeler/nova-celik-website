'use client';

import { motion } from 'framer-motion';
import ModernGaugeChart from '@/components/dashboard/ModernGaugeChart';
import VoltageQualityCard from '@/components/dashboard/VoltageQualityCard';
import AreaChart from '@/components/dashboard/AreaChart';
import GlassCard from '@/components/ui/GlassCard';

// Mock data for testing
const mockData = {
  voltageFluctuation: 2.5,
  voltageHarmonics: 85,
  currentHarmonics: 3.2,
  generatorDemand: 75,
  healthy: 85,
  risky: 10,
  unhealthy: 5,
  current: [45, 52, 48, 61, 55, 67, 59, 72, 68, 75, 71, 78],
  previous: [42, 48, 45, 58, 52, 63, 56, 68, 64, 71, 67, 74],
};

export default function DashboardTestPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50/95 to-blue-50/95 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Component Test</h1>
          <p className="text-gray-600">Testing individual modernized components</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Test VoltageQualityCard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <VoltageQualityCard
              title="Voltage Quality Test"
              fluctuation={mockData.voltageFluctuation}
              harmonics={mockData.voltageHarmonics}
            />
          </motion.div>

          {/* Test ModernGaugeChart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ModernGaugeChart
              value={mockData.generatorDemand}
              title="Generator Load Test"
              subtitle="Testing gauge component"
            />
          </motion.div>

          {/* Test AreaChart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 xl:col-span-1"
          >
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Area Chart Test</h3>
              <div className="h-64">
                <AreaChart
                  data={mockData.current.map((value, index) => ({
                    time: `${index}:00`,
                    value: value
                  }))}
                  title="Energy Usage Test"
                  color="blue"
                  showPrediction={true}
                />
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Additional test components */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Glass Card Test</h3>
            <p className="text-gray-600">This is a test of the GlassCard component with backdrop blur effects.</p>
            <div className="mt-4 space-y-2">
              <div className="h-2 bg-blue-200 rounded-full">
                <motion.div
                  className="h-full bg-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Progress</span>
                <span>75%</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Animation Test</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Test Item {item}</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
