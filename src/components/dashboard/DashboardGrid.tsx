'use client';

import { DashboardData } from '@/modules/dashboard/parseDashboardData';
import { useState, useCallback } from 'react';
import { 
  RefreshCw, Search, Home, Battery,
  LineChart as LineChartIcon, BarChart2,
  Gauge, PieChart
} from 'lucide-react';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import DonutChart from './charts/DonutChart';
import GaugeChart from './charts/GaugeChart';
import BatteryChart from './charts/BatteryChart';
import PowerQualityChart from './charts/PowerQualityChart';
import LoadProfileChart from './charts/LoadProfileChart';
import EnergyEfficiencyChart from './charts/EnergyEfficiencyChart';
import MaintenanceScheduleChart from './charts/MaintenanceScheduleChart';
import EnergyCostChart from './charts/EnergyCostChart';
import ModernBatteryChart from './charts/ModernBatteryChart';
import ChartContainer from '@/components/ui/ChartContainer';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

interface DashboardGridProps {
  data: DashboardData;
}

export default function DashboardGrid({ data }: Readonly<DashboardGridProps>) {
  const [timePeriod, setTimePeriod] = useState<'day' | 'week' | 'month'>('day');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState<string>('Dashboard Overview');
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);

  const handleSidebarClick = (name: string) => {
    setActiveSidebar(name);
  };

  const handleTimePeriodChange = (period: 'day' | 'week' | 'month') => {
    setTimePeriod(period);
    console.log(`Switching to ${period} view`);
  };

  const handleChartExport = (chartTitle: string) => {
    console.log(`Exporting ${chartTitle} data`);
  };

  const handleChartFullscreen = (chartTitle: string) => {
    setActiveSidebar(chartTitle);
    console.log(`Opening ${chartTitle} in fullscreen`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-emerald-400';
      case 'warning':
        return 'bg-amber-400';
      case 'critical':
        return 'bg-red-400';
      default:
        return 'bg-blue-400';
    }
  };

  // Generate chart data
  const generateLabels = () => {
    switch (timePeriod) {
      case 'day':
        return Array.from({ length: 24 }, (_, i) => `${i}:00`);
      case 'week':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      case 'month':
        return Array.from({ length: 30 }, (_, i) => `${i + 1}`);
      default:
        return [];
    }
  };

  const renderMainContent = () => {
    if (activeSidebar !== 'Dashboard Overview') {
      // Show individual chart view
      let chartComponent;
      switch (activeSidebar) {
        case 'Harmonics Trend':
          chartComponent = (
            <LineChart 
              data={{
                current: data.current,
                previous: data.previous,
                labels: generateLabels()
              }}
              height={600}
              isLoading={isRefreshing}
            />
          );
          break;
        case 'Generator Load':
          chartComponent = (
            <GaugeChart 
              value={data.generatorDemand} 
              max={100} 
              label="Generator Load" 
              unit="%" 
              size={400}
              isLoading={isRefreshing}
            />
          );
          break;
        case 'Monthly Consumption':
          chartComponent = (
            <BarChart 
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                values: data.current.slice(0, 6),
                colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
              }}
              height={600}
              isLoading={isRefreshing}
            />
          );
          break;
        case 'Distribution':
          chartComponent = (
            <DonutChart 
              data={[
                { label: 'Active', value: data.healthy, color: '#10b981' },
                { label: 'Warning', value: data.risky, color: '#f59e0b' },
                { label: 'Critical', value: data.unhealthy, color: '#ef4444' }
              ]}
              centerText={{
                main: `${Math.floor(data.generatorDemand)}%`,
                sub: 'Total Load'
              }}
              size={400}
              isLoading={isRefreshing}
            />
          );
          break;
        case 'Battery Status':
          chartComponent = (
            <BatteryChart 
              value={data.voltageHarmonics}
              voltage={220}
              status="good"
              height={600}
              isLoading={isRefreshing}
            />
          );
          break;
        default:
          chartComponent = <div className="text-gray-400">Chart not available</div>;
      }

      return (
        <div className="h-full">
          <ChartContainer title={activeSidebar} subtitle={`Detailed view of ${activeSidebar.toLowerCase()}`}>
            <div className="h-[600px] flex items-center justify-center">
              {chartComponent}
            </div>
          </ChartContainer>
        </div>
      );
    }

    // Dashboard Overview - Figma-Inspired Layout
    return (
      <div className="space-y-6">
        {/* Top Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#1e293b] rounded-2xl p-4 shadow-lg border border-blue-900/30 backdrop-blur-xl">
            <div className="text-2xl font-bold text-blue-400">{Math.floor(data.voltageHarmonics)}%</div>
            <div className="text-sm text-gray-400">Voltage Quality</div>
          </div>
          <div className="bg-[#1e293b] rounded-2xl p-4 shadow-lg border border-blue-900/30 backdrop-blur-xl">
            <div className="text-2xl font-bold text-emerald-400">{Math.floor(data.currentHarmonics)}</div>
            <div className="text-sm text-gray-400">Current Harmonics</div>
          </div>
          <div className="bg-[#1e293b] rounded-2xl p-4 shadow-lg border border-blue-900/30 backdrop-blur-xl">
            <div className="text-2xl font-bold text-amber-400">{Math.floor(data.generatorDemand)}%</div>
            <div className="text-sm text-gray-400">Generator Load</div>
          </div>
          <div className="bg-[#1e293b] rounded-2xl p-4 shadow-lg border border-blue-900/30 backdrop-blur-xl">
            <div className="text-2xl font-bold text-purple-400">{Math.floor(data.healthy + data.risky + data.unhealthy)}</div>
            <div className="text-sm text-gray-400">Total Systems</div>
          </div>
        </div>

        {/* Figma-Inspired Analysis Application Layout */}
        <div className="space-y-4">
          {/* Row 1: Large chart + Medium chart */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              <ChartContainer 
                title="Harmonics Trend Analysis" 
                subtitle="Real-time electrical harmonics monitoring"
                onExport={() => handleChartExport('Harmonics Trend')}
                onFullscreen={() => handleChartFullscreen('Harmonics Trend')}
              >
                <div className="h-[320px] w-full overflow-hidden">
                  <LineChart 
                    data={{
                      current: data.current,
                      previous: data.previous,
                      labels: generateLabels()
                    }}
                    height={320}
                    isLoading={isRefreshing}
                  />
                </div>
              </ChartContainer>
            </div>
            
            <div className="col-span-4">
              <ChartContainer 
                title="Generator Performance" 
                subtitle="Real-time load monitoring"
                onExport={() => handleChartExport('Generator Performance')}
                onFullscreen={() => handleChartFullscreen('Generator Load')}
              >
                <div className="h-[320px] w-full overflow-hidden">
                  <GaugeChart 
                    value={data.generatorDemand} 
                    max={100} 
                    label="Generator Load" 
                    unit="%" 
                    size={280}
                    isLoading={isRefreshing}
                  />
                </div>
              </ChartContainer>
            </div>
          </div>

          {/* Row 2: Two medium charts */}
          <div className="grid grid-cols-2 gap-4">
            <ChartContainer 
              title="Monthly Energy Consumption" 
              subtitle="Comparative usage analysis"
              onExport={() => handleChartExport('Monthly Consumption')}
              onFullscreen={() => handleChartFullscreen('Monthly Consumption')}
            >
              <div className="h-[280px] w-full overflow-hidden">
                <BarChart 
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    values: data.current.slice(0, 6),
                    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
                  }}
                  height={280}
                  isLoading={isRefreshing}
                />
              </div>
            </ChartContainer>

            <ChartContainer 
              title="System Distribution" 
              subtitle="Resource allocation overview"
              onExport={() => handleChartExport('Distribution')}
              onFullscreen={() => handleChartFullscreen('Distribution')}
            >
              <div className="h-[280px] w-full overflow-hidden">
                <DonutChart 
                  data={[
                    { label: 'Healthy', value: data.healthy, color: '#10b981' },
                    { label: 'Warning', value: data.risky, color: '#f59e0b' },
                    { label: 'Critical', value: data.unhealthy, color: '#ef4444' }
                  ]}
                  centerText={{
                    main: `${data.generatorDemand}%`,
                    sub: 'Load'
                  }}
                  size={240}
                  isLoading={isRefreshing}
                />
              </div>
            </ChartContainer>
          </div>

          {/* Row 3: Power Quality and Load Profile */}
          <div className="grid grid-cols-2 gap-4">
            <ChartContainer 
              title="Power Quality Analysis" 
              subtitle="Voltage, Current, and THD Monitoring"
              onExport={() => handleChartExport('Power Quality')}
              onFullscreen={() => handleChartFullscreen('Power Quality')}
            >
              <div className="h-[280px] w-full overflow-hidden">
                <PowerQualityChart 
                  voltage={data.voltage || []}
                  current={data.current}
                  thd={data.thd || []}
                  height={280}
                  isLoading={isRefreshing}
                />
              </div>
            </ChartContainer>

            <ChartContainer 
              title="Load Profile" 
              subtitle="24-Hour Load Distribution"
              onExport={() => handleChartExport('Load Profile')}
              onFullscreen={() => handleChartFullscreen('Load Profile')}
            >
              <div className="h-[280px] w-full overflow-hidden">
                <LoadProfileChart 
                  hourlyLoad={data.hourlyLoad || []}
                  peakDemand={data.peakDemand || 0}
                  averageLoad={data.averageLoad || 0}
                  height={280}
                  isLoading={isRefreshing}
                />
              </div>
            </ChartContainer>
          </div>

          {/* Row 4: Energy Efficiency and Maintenance */}
          <div className="grid grid-cols-2 gap-4">
            <ChartContainer 
              title="Energy Efficiency Tracking" 
              subtitle="Efficiency Metrics and Energy Savings"
              onExport={() => handleChartExport('Energy Efficiency')}
              onFullscreen={() => handleChartFullscreen('Energy Efficiency')}
            >
              <div className="h-[280px] w-full overflow-hidden">
                <EnergyEfficiencyChart 
                  efficiency={data.efficiency || []}
                  targetEfficiency={data.targetEfficiency || 95}
                  energySavings={data.energySavings || []}
                  height={280}
                  isLoading={isRefreshing}
                />
              </div>
            </ChartContainer>

            <ChartContainer 
              title="Maintenance Schedule" 
              subtitle="Equipment Health and Maintenance Status"
              onExport={() => handleChartExport('Maintenance')}
              onFullscreen={() => handleChartFullscreen('Maintenance')}
            >
              <div className="h-[280px] w-full overflow-hidden">
                <MaintenanceScheduleChart 
                  upcomingMaintenance={[
                    { name: 'Generator Service', daysLeft: 5, priority: 'high' },
                    { name: 'Battery Check', daysLeft: 12, priority: 'medium' },
                    { name: 'Filter Change', daysLeft: 20, priority: 'low' },
                    { name: 'Oil Change', daysLeft: 8, priority: 'high' },
                    { name: 'Coolant Check', daysLeft: 15, priority: 'medium' }
                  ]}
                  completedMaintenance={data.completedMaintenance || 0}
                  totalMaintenance={data.totalMaintenance || 0}
                  height={280}
                  isLoading={isRefreshing}
                />
              </div>
            </ChartContainer>
          </div>

          {/* Row 5: Energy Cost and Battery Status */}
          <div className="grid grid-cols-2 gap-4">
            <ChartContainer 
              title="Energy Cost Analysis" 
              subtitle="Peak vs Off-Peak Consumption"
              onExport={() => handleChartExport('Energy Cost')}
              onFullscreen={() => handleChartFullscreen('Energy Cost')}
            >
              <div className="h-[280px] w-full overflow-hidden">
                <EnergyCostChart 
                  peakCost={data.peakCost || []}
                  offPeakCost={data.offPeakCost || []}
                  totalSavings={data.costSavings || 0}
                  projectedCost={data.projectedCost || 0}
                  height={280}
                  isLoading={isRefreshing}
                />
              </div>
            </ChartContainer>

            <ChartContainer 
              title="Battery Health Monitor" 
              subtitle="Real-time Battery Performance"
              onExport={() => handleChartExport('Battery Status')}
              onFullscreen={() => handleChartFullscreen('Battery Status')}
            >
              <div className="h-[280px] w-full overflow-hidden">
                <ModernBatteryChart 
                  chargeLevel={data.batteryLevel || 0}
                  voltage={data.batteryVoltage || 0}
                  current={data.batteryCurrent || 0}
                  temperature={data.batteryTemp || 0}
                  height={280}
                  isLoading={isRefreshing}
                />
              </div>
            </ChartContainer>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-6 bg-[#1e293b] rounded-2xl p-4 shadow-lg border border-blue-900/30 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">NovaCelik Dashboard</h1>
              <p className="text-sm text-gray-400">Real-time monitoring</p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search dashboard..."
                className="w-80 pl-11 pr-4 py-3 text-sm bg-[#0f172a]/70 border border-blue-900/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-300 placeholder-gray-500 transition-all duration-200 hover:bg-[#0f172a]/90"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-1 bg-[#0f172a]/50 rounded-xl p-1 border border-blue-900/30">
              {['Day', 'Week', 'Month'].map((period) => (
                <button 
                  key={period}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    period.toLowerCase() === timePeriod 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:bg-[#1e293b] hover:text-gray-300'
                  }`}
                  onClick={() => handleTimePeriodChange(period.toLowerCase() as 'day' | 'week' | 'month')}
                >
                  {period}
                </button>
              ))}
            </div>

            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[#0f172a]/50 text-gray-400 hover:bg-[#1e293b] hover:text-gray-300 border border-blue-900/30 transition-all duration-200"
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 space-y-4">
            {/* Navigation */}
            <div className="bg-[#1e293b] rounded-2xl p-4 shadow-lg border border-blue-900/30 backdrop-blur-xl">
              <nav className="space-y-1">
                {[
                  { name: 'Dashboard Overview', icon: <Home className="w-4 h-4" />, status: 'good' },
                  { name: 'Harmonics Trend', icon: <LineChartIcon className="w-4 h-4" />, status: 'normal' },
                  { name: 'Generator Load', icon: <Gauge className="w-4 h-4" />, status: 'warning' },
                  { name: 'Monthly Consumption', icon: <BarChart2 className="w-4 h-4" />, status: 'good' },
                  { name: 'Distribution', icon: <PieChart className="w-4 h-4" />, status: 'normal' },
                  { name: 'Battery Status', icon: <Battery className="w-4 h-4" />, status: 'good' },
                ].map((item) => (
                  <button
                    key={item.name}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      activeSidebar === item.name
                        ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-400 font-medium border border-blue-900/30'
                        : 'text-gray-400 hover:bg-[#0f172a]/50 hover:text-gray-300'
                    }`}
                    onClick={() => handleSidebarClick(item.name)}
                  >
                    <div className="flex items-center gap-2">
                      <span className={activeSidebar === item.name ? 'text-blue-400' : 'text-gray-500'}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(item.status)}`} />
                  </button>
                ))}
              </nav>
            </div>

            {/* Live Metrics */}
            <div className="bg-[#1e293b] rounded-2xl p-4 shadow-lg border border-blue-900/30 backdrop-blur-xl">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Live Metrics</h3>
              <div className="space-y-2">
                {[
                  { label: 'Voltage Quality', value: data.voltageHarmonics, suffix: '%' },
                  { label: 'Current Harmonics', value: data.currentHarmonics },
                  { label: 'Generator Load', value: data.generatorDemand, suffix: '%' },
                ].map((metric) => (
                  <div 
                    key={metric.label}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#0f172a]/50"
                  >
                    <span className="text-sm text-gray-400">{metric.label}</span>
                    <span className="text-sm font-medium text-gray-300">
                      <AnimatedCounter value={metric.value} suffix={metric.suffix || ''} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
