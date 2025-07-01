'use client';

import { DashboardData } from '@/modules/dashboard/parseDashboardData';
import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { 
  RefreshCw, Filter, TrendingUp, Search, LayoutDashboard
} from 'lucide-react';
import { staggerContainer } from '@/utils/animations';
import ModernGaugeChart from './ModernGaugeChart';
import HarmonicLineChart from './HarmonicLineChart';
import MonthlyBarChart from './MonthlyBarChart';
import ConsumptionBarChart from './ConsumptionBarChart';
import HealthStatusChart from './HealthStatusChart';
import VoltageQualityCard from './VoltageQualityCard';
import TrendCard from './TrendCard';
import AreaChart from './AreaChart';
import SpeedometerChart from './SpeedometerChart';
import DonutChart from './DonutChart';
import BatteryChart from './BatteryChart';
import LiquidContainer from './LiquidContainer';
import GlassCard from '@/components/ui/GlassCard';
import ChartContainer from '@/components/ui/ChartContainer';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

interface DashboardHomepageProps {
  data: DashboardData;
}

export default function DashboardHomepage({ data }: Readonly<DashboardHomepageProps>) {
  const [timePeriod, setTimePeriod] = useState<'day' | 'week' | 'month'>('day');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        {/* Enhanced Header Bar - Simplified for Homepage */}
        <div className="mb-6">
          <GlassCard className="p-4 bg-slate-800/90 backdrop-blur-xl border-slate-600/50">
            <div className="flex items-center justify-between">
              {/* Title */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Dashboard Overview</h1>
                  <p className="text-xs text-slate-300">All charts and metrics at a glance</p>
                </div>
              </div>

              {/* Time Period Controls */}
              <div className="flex items-center space-x-2 bg-slate-700/50 rounded-xl p-1 backdrop-blur-sm">
                {['day', 'week', 'month'].map((period) => (
                  <button 
                    key={period}
                    className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                      timePeriod === period 
                        ? 'bg-blue-600 text-white font-medium shadow-lg' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-600/50'
                    }`}
                    onClick={() => setTimePeriod(period as 'day' | 'week' | 'month')}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-xl bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white transition-all duration-200 hover:scale-105 backdrop-blur-sm ${
                  isRefreshing ? 'animate-pulse' : ''
                }`}
                disabled={isRefreshing}
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Voltage Quality', value: data.voltageHarmonics, suffix: '%', color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-600/20' },
            { label: 'Current Harmonics', value: data.currentHarmonics, suffix: '', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-emerald-600/20' },
            { label: 'Generator Load', value: data.generatorDemand, suffix: '%', color: 'text-amber-400', bg: 'from-amber-500/20 to-amber-600/20' },
            { label: 'System Health', value: data.healthy, suffix: '%', color: 'text-green-400', bg: 'from-green-500/20 to-green-600/20' },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className={`p-4 bg-gradient-to-br ${stat.bg} backdrop-blur-xl border-slate-600/50`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300 font-medium">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${stat.color.replace('text-', 'bg-')} shadow-lg`}></div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* All Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Voltage Quality */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ChartContainer 
              title="Voltage Quality"
              subtitle="Real-time voltage monitoring"
              loading={isRefreshing}
              className="bg-slate-800/80 backdrop-blur-xl border-slate-600/50"
            >
              <div className="h-[250px] p-2">
                <VoltageQualityCard
                  title="Voltage Quality"
                  fluctuation={data.voltageFluctuation}
                  harmonics={data.voltageHarmonics}
                />
              </div>
            </ChartContainer>
          </motion.div>

          {/* Current Harmonics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ChartContainer 
              title="Current Harmonics"
              subtitle="Harmonic distortion analysis"
              loading={isRefreshing}
              className="bg-slate-800/80 backdrop-blur-xl border-slate-600/50"
            >
              <div className="h-[250px] p-2">
                <TrendCard
                  title="Current Harmonics"
                  value={data.currentHarmonics}
                  trend="up"
                  change={2.5}
                />
              </div>
            </ChartContainer>
          </motion.div>

          {/* Generator Load */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ChartContainer 
              title="Generator Load"
              subtitle="Real-time load monitoring"
              loading={isRefreshing}
              className="bg-slate-800/80 backdrop-blur-xl border-slate-600/50"
            >
              <div className="h-[250px] p-2">
                <ModernGaugeChart value={data.generatorDemand} chartId="generator-gauge-home" />
              </div>
            </ChartContainer>
          </motion.div>

          {/* Harmonics Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ChartContainer 
              title="Harmonics Trend"
              subtitle="Historical trend analysis"
              loading={isRefreshing}
              className="bg-slate-800/80 backdrop-blur-xl border-slate-600/50"
            >
              <div className="h-[250px] p-2">
                <HarmonicLineChart 
                  current={data.current} 
                  previous={data.previous}
                  timePeriod={timePeriod}
                  isLoading={isRefreshing}
                  chartId="harmonic-home"
                />
              </div>
            </ChartContainer>
          </motion.div>

          {/* Monthly Consumption */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <ChartContainer 
              title="Monthly Consumption"
              subtitle="Monthly energy usage"
              loading={isRefreshing}
              className="bg-slate-800/80 backdrop-blur-xl border-slate-600/50"
            >
              <div className="h-[250px] p-2">
                <MonthlyBarChart current={data.current} previous={data.previous} chartId="monthly-home" />
              </div>
            </ChartContainer>
          </motion.div>

          {/* Energy Consumption */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <ChartContainer 
              title="Energy Consumption"
              subtitle="Daily consumption patterns"
              loading={isRefreshing}
              className="bg-slate-800/80 backdrop-blur-xl border-slate-600/50"
            >
              <div className="h-[250px] p-2">
                <ConsumptionBarChart current={data.current} previous={data.previous} chartId="consumption-home" />
              </div>
            </ChartContainer>
          </motion.div>

          {/* Health Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <ChartContainer 
              title="System Health"
              subtitle="Overall system status"
              loading={isRefreshing}
              className="bg-slate-800/80 backdrop-blur-xl border-slate-600/50"
            >
              <div className="h-[250px] p-2">
                <HealthStatusChart
                  healthy={data.healthy}
                  risky={data.risky}
                  unhealthy={data.unhealthy}
                />
              </div>
            </ChartContainer>
          </motion.div>

          {/* Speedometer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <ChartContainer 
              title="Speedometer"
              subtitle="Performance indicator"
              loading={isRefreshing}
              className="bg-slate-800/80 backdrop-blur-xl border-slate-600/50"
            >
              <div className="h-[250px] p-2">
                <SpeedometerChart value={data.generatorDemand} max={100} label="Generator Load" unit="%" />
              </div>
            </ChartContainer>
          </motion.div>

          {/* Donut Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <ChartContainer 
              title="Distribution Chart"
              subtitle="Resource distribution"
              loading={isRefreshing}
              className="bg-slate-800/80 backdrop-blur-xl border-slate-600/50"
            >
              <div className="h-[250px] p-2">
                <DonutChart value={data.generatorDemand} max={100} label="Generator Load" unit="%" />
              </div>
            </ChartContainer>
          </motion.div>

          {/* Battery Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <ChartContainer 
              title="Battery Status"
              subtitle="Power storage monitoring"
              loading={isRefreshing}
              className="bg-slate-800/80 backdrop-blur-xl border-slate-600/50"
            >
              <div className="h-[250px] p-2">
                <BatteryChart title="Battery Status" percentage={data.voltageHarmonics} voltage={220} status="good" />
              </div>
            </ChartContainer>
          </motion.div>

          {/* Liquid Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <ChartContainer 
              title="Liquid Level"
              subtitle="Fluid monitoring system"
              loading={isRefreshing}
              className="bg-slate-800/80 backdrop-blur-xl border-slate-600/50"
            >
              <div className="h-[250px] p-2">
                <LiquidContainer value={data.generatorDemand} color="#3b82f6" glowColor="#1d4ed8">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-white">
                      <div className="text-2xl font-bold">{data.generatorDemand}%</div>
                      <div className="text-xs opacity-80">Level</div>
                    </div>
                  </div>
                </LiquidContainer>
              </div>
            </ChartContainer>
          </motion.div>

          {/* Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <ChartContainer 
              title="Energy Patterns"
              subtitle="24-hour analysis"
              loading={isRefreshing}
              className="bg-slate-800/80 backdrop-blur-xl border-slate-600/50"
            >
              <div className="h-[250px] p-2">
                <AreaChart 
                  data={data.current.map((value: number, index: number) => ({
                    time: `${index}:00`,
                    value: value
                  }))}
                  color="blue"
                  showPrediction={true}
                  chartId="area-home"
                />
              </div>
            </ChartContainer>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
