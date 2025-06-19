'use client';

import { DashboardData } from '@/modules/dashboard/parseDashboardData';
import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { Download, RefreshCw, Calendar } from 'lucide-react';
import { staggerContainer } from '@/utils/animations';
import DonutChart from './DonutChart';
import SpeedometerChart from './SpeedometerChart';
import HarmonicLineChart from './HarmonicLineChart';
import MonthlyBarChart from './MonthlyBarChart';
import ConsumptionBarChart from './ConsumptionBarChart';
import HealthStatusChart from './HealthStatusChart';
import VoltageQualityCard from './VoltageQualityCard';
import TrendCard from './TrendCard';
import GlassCard from '@/components/ui/GlassCard';
import ChartContainer from '@/components/ui/ChartContainer';

interface DashboardGridProps {
  data: DashboardData;
}

export default function DashboardGrid({ data }: Readonly<DashboardGridProps>) {
  const [timePeriod, setTimePeriod] = useState<'day' | 'week' | 'month'>('day');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date()
  });

  const handleExport = useCallback(() => {
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        timePeriod,
        dateRange
      },
      data
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data, timePeriod, dateRange]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50/95 to-blue-50/95 p-3 sm:p-4 lg:p-6 relative"
    >
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-[1920px] mx-auto"
      >
        {/* Main Grid Container */}
        {/* Controls Bar */}
        <div className="mb-6">
          <GlassCard className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Time Period Controls */}
              <div className="flex items-center space-x-2">
                <button 
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 ${
                    timePeriod === 'day' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setTimePeriod('day')}
                >
                  Day
                </button>
                <button 
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 ${
                    timePeriod === 'week' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setTimePeriod('week')}
                >
                  Week
                </button>
                <button 
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 ${
                    timePeriod === 'month' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setTimePeriod('month')}
                >
                  Month
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                >
                  <Download size={16} />
                  <span>Export</span>
                </button>
                <button
                  onClick={handleRefresh}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors duration-200 ${
                    isRefreshing ? 'animate-spin' : ''
                  }`}
                  disabled={isRefreshing}
                >
                  <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                  <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Company Logo & Navigation */}
            <GlassCard className="p-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-800">NovaCelik</h1>
              </div>
              <nav className="space-y-2">
                {[
                  { name: 'Dashboard', icon: '📊', active: true },
                  { name: 'Analytics', icon: '📈', active: false },
                  { name: 'Reports', icon: '📑', active: false },
                  { name: 'Settings', icon: '⚙️', active: false }
                ].map((item) => (
                  <button
                    key={item.name}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors ${
                      item.active 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </nav>
            </GlassCard>

            {/* Quick Stats - Hidden on Mobile */}
            <GlassCard className="hidden sm:block p-4">
              <h2 className="text-sm font-semibold text-gray-600 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Voltage Quality</span>
                  <span className="text-sm font-medium text-gray-900">{data.voltageHarmonics.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Harmonics</span>
                  <span className="text-sm font-medium text-gray-900">{data.currentHarmonics.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Generator Load</span>
                  <span className="text-sm font-medium text-gray-900">{data.generatorDemand.toFixed(1)}%</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <VoltageQualityCard
                title="Voltage Quality"
                fluctuation={data.voltageFluctuation}
                harmonics={data.voltageHarmonics}
              />
              <TrendCard
                title="Current Harmonics"
                value={data.currentHarmonics}
                trend="up"
                change={2.5}
              />
              <div className="sm:col-span-2 lg:col-span-1">
                <HealthStatusChart
                  healthy={data.healthy}
                  risky={data.risky}
                  unhealthy={data.unhealthy}
                />
              </div>
            </div>

            {/* Main Chart */}
            <ChartContainer 
              title="Harmonics Trend" 
              icon="trend"
              subtitle="Real-time monitoring of electrical harmonics"
              loading={isRefreshing}
            >
              <div className="h-[300px]">
                <HarmonicLineChart 
                  current={data.current} 
                  previous={data.previous}
                  timePeriod={timePeriod}
                  isLoading={isRefreshing}
                />
              </div>
            </ChartContainer>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {/* Generator Demand */}
              <ChartContainer 
                title="Generator Demand" 
                subtitle="Current load percentage"
                loading={isRefreshing}
              >
                <div className="h-[200px]">
                  <SpeedometerChart value={data.generatorDemand} />
                </div>
              </ChartContainer>

              {/* Monthly Consumption */}
              <ChartContainer 
                title="Monthly Consumption" 
                icon="bar"
                subtitle="Energy usage comparison"
                loading={isRefreshing}
              >
                <div className="h-[200px]">
                  <MonthlyBarChart current={data.current} previous={data.previous} />
                </div>
              </ChartContainer>

              {/* Energy Consumption */}
              <ChartContainer 
                title="Energy Consumption" 
                icon="bar"
                subtitle="Daily energy patterns"
                loading={isRefreshing}
              >
                <div className="h-[200px]">
                  <ConsumptionBarChart current={data.current} previous={data.previous} />
                </div>
              </ChartContainer>

              {/* Voltage Harmonics */}
              <ChartContainer 
                title="Voltage Harmonics" 
                subtitle="Quality distribution"
                loading={isRefreshing}
              >
                <div className="h-[200px]">
                  <DonutChart value={data.voltageHarmonics} />
                </div>
              </ChartContainer>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-105">
          <span className="text-xl">⚡</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
