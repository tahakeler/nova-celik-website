'use client';

import { DashboardData } from '@/modules/dashboard/parseDashboardData';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { 
  RefreshCw, Download, Filter, TrendingUp, Zap, Bell, Search,
  Battery, Bolt, Settings, LineChart, BarChart2, Lightbulb,
  Heart, TrendingDown, Gauge, PieChart
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { staggerContainer } from '@/utils/animations';
import ModernGaugeChart from './ModernGaugeChart';
import HarmonicLineChart from './HarmonicLineChart';
import MonthlyBarChart from './MonthlyBarChart';
import ConsumptionBarChart from './ConsumptionBarChart';
import HealthStatusChart from './HealthStatusChart';
import VoltageQualityCard from './VoltageQualityCard';
import TrendCard from './TrendCard';
import MiniBarKPIs from './MiniBarKPIs';
import ExcelDataViewer from './ExcelDataViewer';
import AreaChart from './AreaChart';
import GlassCard from '@/components/ui/GlassCard';
import ChartContainer from '@/components/ui/ChartContainer';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

interface DashboardGridProps {
  data: DashboardData;
}

export default function DashboardGrid({ data }: Readonly<DashboardGridProps>) {
  const [timePeriod, setTimePeriod] = useState<'day' | 'week' | 'month'>('day');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState<string>('Voltage Quality');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);

  const handleExportData = () => {
    console.log('Exporting dashboard data...');
  };

  const handleSidebarClick = (name: string) => {
    setActiveSidebar(name);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-400';
      case 'warning':
        return 'bg-yellow-400';
      case 'critical':
        return 'bg-red-400';
      default:
        return 'bg-blue-400';
    }
  };

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
        className="max-w-[1920px] mx-auto bg-gradient-to-b from-gray-50 to-white p-6 rounded-lg shadow-md"
      >
        {/* Enhanced Header Bar */}
        <div className="mb-6">
          <GlassCard className="p-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search dashboard..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Time Period Controls */}
              <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                {['day', 'week', 'month'].map((period) => (
                  <button 
                    key={period}
                    className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                      timePeriod === period 
                        ? 'bg-white text-blue-600 font-medium shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setTimePeriod(period as 'day' | 'week' | 'month')}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleExportData}
                  className="flex items-center space-x-2 px-4 py-2 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 hover:scale-105"
                >
                  <Download size={16} />
                  <span>Export</span>
                </button>

                <button 
                  className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                  aria-label="Filter dashboard data"
                  title="Filter dashboard data"
                >
                  <Filter size={16} />
                </button>

                <div className="relative">
                  <button 
                    className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:scale-105 relative"
                    onClick={() => setShowNotifications(!showNotifications)}
                    aria-label="View notifications"
                    title="View notifications"
                    aria-expanded="false"
                    data-expanded={showNotifications}
                  >
                    <Bell size={16} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
                  
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                      >
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                          <h3 className="text-sm font-semibold text-gray-900">System Notifications</h3>
                        </div>
                        <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200"
                          >
                            <div className="w-2 h-2 mt-2 rounded-full bg-yellow-400"></div>
                            <div>
                              <p className="text-sm text-gray-700 font-medium">Generator load reached 85%</p>
                              <span className="text-xs text-gray-500">5 minutes ago</span>
                            </div>
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 border border-green-200"
                          >
                            <div className="w-2 h-2 mt-2 rounded-full bg-green-400"></div>
                            <div>
                              <p className="text-sm text-gray-700 font-medium">System optimization complete</p>
                              <span className="text-xs text-gray-500">1 hour ago</span>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleRefresh}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:scale-105 ${
                    isRefreshing ? 'animate-pulse' : ''
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Enhanced Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Logo & Navigation */}
            <GlassCard className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">NovaCelik</h1>
                  <p className="text-xs text-gray-500">Energy Dashboard</p>
                </div>
              </div>
              
              <nav className="space-y-2" role="navigation">
                {[
                  { name: 'Voltage Quality', icon: <Battery className="w-5 h-5" />, status: 'normal' },
                  { name: 'Current Harmonics', icon: <Bolt className="w-5 h-5" />, status: 'good' },
                  { name: 'Generator Load', icon: <Settings className="w-5 h-5" />, status: 'warning' },
                  { name: 'Harmonics Trend', icon: <LineChart className="w-5 h-5" />, status: 'normal' },
                  { name: 'Monthly Consumption', icon: <BarChart2 className="w-5 h-5" />, status: 'good' },
                  { name: 'Energy Consumption', icon: <Lightbulb className="w-5 h-5" />, status: 'normal' },
                  { name: 'Health Status', icon: <Heart className="w-5 h-5" />, status: 'good' },
                  { name: 'Mini KPIs', icon: <TrendingDown className="w-5 h-5" />, status: 'normal' },
                  { name: 'Speedometer', icon: <Gauge className="w-5 h-5" />, status: 'normal' },
                  { name: 'Donut Chart', icon: <PieChart className="w-5 h-5" />, status: 'normal' },
                ].map((item) => (
                  <motion.button
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeSidebar === item.name
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold shadow-sm border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => handleSidebarClick(item.name)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-600 hover:text-blue-600 transition-colors">{item.icon}</span>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`}></div>
                  </motion.button>
                ))}
              </nav>
            </GlassCard>

            {/* Enhanced Quick Stats */}
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Live Metrics
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Voltage Quality', value: data.voltageHarmonics, suffix: '%', color: 'text-blue-600' },
                  { label: 'Current Harmonics', value: data.currentHarmonics, suffix: '', color: 'text-green-600' },
                  { label: 'Generator Load', value: data.generatorDemand, suffix: '%', color: 'text-orange-600' },
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-100"
                  >
                    <span className="text-sm text-gray-600 font-medium">{stat.label}</span>
                    <span className={`text-lg font-bold ${stat.color}`}>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Enhanced Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Stats Cards with improved design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <VoltageQualityCard
                  title="Voltage Quality"
                  fluctuation={data.voltageFluctuation}
                  harmonics={data.voltageHarmonics}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <TrendCard
                  title="Current Harmonics"
                  value={data.currentHarmonics}
                  trend="up"
                  change={2.5}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="sm:col-span-2 lg:col-span-1"
              >
                <HealthStatusChart
                  healthy={data.healthy}
                  risky={data.risky}
                  unhealthy={data.unhealthy}
                />
              </motion.div>
            </div>

            {/* Mini Bar KPIs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard>
                <MiniBarKPIs
                  healthy={data.healthy}
                  risky={data.risky}
                  unhealthy={data.unhealthy}
                />
              </GlassCard>
            </motion.div>

            {/* Main Chart with enhanced container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ChartContainer 
                title="Harmonics Trend Analysis" 
                icon="trend"
                subtitle="Real-time monitoring of electrical harmonics with predictive insights"
                loading={isRefreshing}
              >
                <div className="h-[350px]">
                  <HarmonicLineChart 
                    current={data.current} 
                    previous={data.previous}
                    timePeriod={timePeriod}
                    isLoading={isRefreshing}
                    chartId="main-harmonic"
                  />
                </div>
              </ChartContainer>
            </motion.div>

            {/* Bottom Grid with staggered animations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  title: "Generator Performance",
                  subtitle: "Real-time load monitoring",
                  component: <ModernGaugeChart value={data.generatorDemand} chartId="generator-gauge" />,
                  delay: 0.6
                },
                {
                  title: "Monthly Energy Trends",
                  subtitle: "Comparative consumption analysis",
                  component: <MonthlyBarChart current={data.current} previous={data.previous} chartId="monthly-bar" />,
                  delay: 0.7
                },
                {
                  title: "Daily Energy Patterns",
                  subtitle: "Hourly consumption breakdown",
                  component: <ConsumptionBarChart current={data.current} previous={data.previous} chartId="consumption-bar" />,
                  delay: 0.8
                },
                {
                  title: "Energy Consumption Patterns",
                  subtitle: "24-hour consumption analysis",
                  component: <AreaChart 
                    data={data.current.map((value, index) => ({
                      time: `${index}:00`,
                      value: value
                    }))}
                    title="Energy Usage"
                    color="blue"
                    showPrediction={true}
                    chartId="energy-area"
                  />,
                  delay: 0.9
                }
              ].map((chart, index) => (
                <motion.div
                  key={chart.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: chart.delay }}
                >
                  <ChartContainer 
                    title={chart.title}
                    subtitle={chart.subtitle}
                    loading={isRefreshing}
                  >
                    <div className="h-[250px]">
                      {chart.component}
                    </div>
                  </ChartContainer>
                </motion.div>
              ))}
            </div>

            {/* Excel Data Viewer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="mt-6"
            >
              <GlassCard>
                <ExcelDataViewer />
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Floating Action Button */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300 z-50"
        >
          <Zap className="w-6 h-6" />
        </motion.button>
        
        <ThemeToggle />
      </motion.div>
    </motion.div>
  );
}
