'use client';

import { DashboardData } from '@/modules/dashboard/parseDashboardData';
import { useState, useCallback } from 'react';
import { 
  RefreshCw, Search, Home, Battery,
  LineChart as LineChartIcon, BarChart2,
  Gauge, PieChart, Thermometer, Activity,
  Zap, TrendingUp, DollarSign, Wrench
} from 'lucide-react';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import DonutChart from './charts/DonutChart';
import GaugeChart from './charts/GaugeChart';
import PowerQualityChart from './charts/PowerQualityChart';
import LoadProfileChart from './charts/LoadProfileChart';
import EnergyEfficiencyChart from './charts/EnergyEfficiencyChart';
import ModernBatteryChart from './charts/ModernBatteryChart';
import ChartContainer from '@/components/ui/ChartContainer';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import MaintenanceCalendar from './maintenance/MaintenanceCalendar';
import MiniMaintenanceCalendar from './maintenance/MiniMaintenanceCalendar';
import MaintenanceCalendarModal from './maintenance/MaintenanceCalendarModal';

interface DashboardGridProps {
  data: DashboardData;
}

export default function DashboardGrid({ data }: Readonly<DashboardGridProps>) {
  const [timePeriod, setTimePeriod] = useState<'day' | 'week' | 'month'>('day');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState<string>('Dashboard Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

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
            <ModernBatteryChart 
              chargeLevel={data.batteryLevel || 0}
              voltage={data.batteryVoltage || 0}
              current={data.batteryCurrent || 0}
              temperature={data.batteryTemp || 0}
              height={600}
              isLoading={isRefreshing}
            />
          );
          break;
        case 'Temperature':
          chartComponent = (
            <LineChart 
              data={{
                current: data.current.map((val, i) => val + Math.sin(i) * 10 + 25), // Simulate temperature data
                previous: data.previous.map((val, i) => val + Math.sin(i) * 8 + 22),
                labels: generateLabels()
              }}
              height={600}
              isLoading={isRefreshing}
            />
          );
          break;
        case 'Vibration':
          chartComponent = (
            <LineChart 
              data={{
                current: data.current.map((val, i) => Math.abs(Math.sin(i * 0.5)) * 5), // Simulate vibration data
                previous: data.previous.map((val, i) => Math.abs(Math.sin(i * 0.3)) * 4),
                labels: generateLabels()
              }}
              height={600}
              isLoading={isRefreshing}
            />
          );
          break;
        case 'Reactive Power':
          chartComponent = (
            <BarChart 
              data={{
                labels: generateLabels().slice(0, 12),
                values: data.current.slice(0, 12).map(val => val * 0.8), // Simulate reactive power
                colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6366f1', '#14b8a6', '#f59e0b']
              }}
              height={600}
              isLoading={isRefreshing}
            />
          );
          break;
        case 'Energy Mix':
          chartComponent = (
            <DonutChart 
              data={[
                { label: 'Solar', value: 25, color: '#f59e0b' },
                { label: 'Grid', value: 45, color: '#3b82f6' },
                { label: 'Generator', value: 20, color: '#10b981' },
                { label: 'Battery', value: 10, color: '#8b5cf6' }
              ]}
              centerText={{
                main: '100%',
                sub: 'Energy Mix'
              }}
              size={400}
              isLoading={isRefreshing}
            />
          );
          break;
        case 'Cost Analysis':
          chartComponent = (
            <BarChart 
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                values: [1200, 1100, 1300, 1150, 1250, 1180],
                colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
              }}
              height={600}
              isLoading={isRefreshing}
            />
          );
          break;
        case 'Power Quality':
          chartComponent = (
            <PowerQualityChart 
              voltage={data.voltage || []}
              current={data.current}
              thd={data.thd || []}
              height={600}
              isLoading={isRefreshing}
            />
          );
          break;
        case 'Load Profile':
          chartComponent = (
            <LoadProfileChart 
              hourlyLoad={data.hourlyLoad || []}
              peakDemand={data.peakDemand || 0}
              averageLoad={data.averageLoad || 0}
              height={600}
              isLoading={isRefreshing}
            />
          );
          break;
        case 'Energy Efficiency':
          chartComponent = (
            <EnergyEfficiencyChart 
              efficiency={data.efficiency || []}
              targetEfficiency={data.targetEfficiency || 95}
              energySavings={data.energySavings || []}
              height={600}
              isLoading={isRefreshing}
            />
          );
          break;
        case 'Maintenance':
          chartComponent = (
            <MaintenanceCalendar 
              tasks={data.maintenance?.upcomingTasks || []}
              currentDate={new Date()}
              onTaskClick={(task) => console.log('Task clicked:', task)}
              onDateClick={(date) => console.log('Date clicked:', date)}
              className="w-full h-full"
            />
          );
          break;
        default:
          chartComponent = (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-gray-400 mb-4">Chart not available</div>
              <div className="text-sm text-gray-500">This chart component is under development</div>
            </div>
          );
      }

      return (
        <div className="h-full">
          <ChartContainer title={activeSidebar} subtitle={`Detailed view of ${activeSidebar.toLowerCase()}`}>
            <div className={activeSidebar === 'Maintenance' ? "h-[900px] w-full" : "h-[600px] flex items-center justify-center"}>
              {chartComponent}
            </div>
          </ChartContainer>
        </div>
      );
    }

    // Dashboard Overview - Figma-Inspired Layout
    return (
      <div className="space-y-6">
        {/* Enhanced Top Stats Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="glass-card-dark rounded-3xl p-6 hover-lift shadow-glow-blue">
            <div className="flex items-center justify-between mb-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full shadow-glow-blue animate-pulse"></div>
              <div className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Live</div>
            </div>
            <div className="text-3xl font-bold text-blue-400 font-montserrat mb-1">{Math.floor(data.voltageHarmonics)}</div>
            <div className="text-sm text-gray-400 font-poppins">Voltage Quality</div>
            <div className="mt-3 w-full bg-slate-700/50 rounded-full h-1.5">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500" style={{ width: `${Math.floor(data.voltageHarmonics)}%` }} />
            </div>
          </div>
          
          <div className="glass-card-dark rounded-3xl p-6 hover-lift shadow-glow-green">
            <div className="flex items-center justify-between mb-3">
              <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-glow-green animate-pulse"></div>
              <div className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Live</div>
            </div>
            <div className="text-3xl font-bold text-emerald-400 font-montserrat mb-1">{Math.floor(data.currentHarmonics)}</div>
            <div className="text-sm text-gray-400 font-poppins">Current Harmonics</div>
            <div className="mt-3 w-full bg-slate-700/50 rounded-full h-1.5">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500" style={{ width: `${Math.floor(data.currentHarmonics)}%` }} />
            </div>
          </div>
          
          <div className="glass-card-dark rounded-3xl p-6 hover-lift shadow-glow-amber">
            <div className="flex items-center justify-between mb-3">
              <div className="w-3 h-3 bg-amber-400 rounded-full shadow-glow-amber animate-pulse"></div>
              <div className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Live</div>
            </div>
            <div className="text-3xl font-bold text-amber-400 font-montserrat mb-1">{Math.floor(data.generatorDemand)}</div>
            <div className="text-sm text-gray-400 font-poppins">Generator Load</div>
            <div className="mt-3 w-full bg-slate-700/50 rounded-full h-1.5">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500" style={{ width: `${Math.floor(data.generatorDemand)}%` }} />
            </div>
          </div>
          
          <div className="glass-card-dark rounded-3xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-3">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Total</div>
            </div>
            <div className="text-3xl font-bold text-purple-400 font-montserrat mb-1">{Math.floor(data.healthy + data.risky + data.unhealthy)}</div>
            <div className="text-sm text-gray-400 font-poppins">Active Systems</div>
            <div className="mt-3 flex gap-1">
              <div className="flex-1 bg-emerald-500/20 rounded-full h-1.5" title={`Healthy: ${data.healthy}`}>
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(data.healthy / (data.healthy + data.risky + data.unhealthy)) * 100}%` }} />
              </div>
              <div className="flex-1 bg-amber-500/20 rounded-full h-1.5" title={`Warning: ${data.risky}`}>
                <div className="h-full rounded-full bg-amber-500" style={{ width: `${(data.risky / (data.healthy + data.risky + data.unhealthy)) * 100}%` }} />
              </div>
              <div className="flex-1 bg-red-500/20 rounded-full h-1.5" title={`Critical: ${data.unhealthy}`}>
                <div className="h-full rounded-full bg-red-500" style={{ width: `${(data.unhealthy / (data.healthy + data.risky + data.unhealthy)) * 100}%` }} />
              </div>
            </div>
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
                icon="trend"
                status="good"
                kpiValue={`${data.voltageHarmonics.toFixed(1)}%`}
                trend="up"
                trendValue="+2.3%"
                lastUpdated="2 minutes ago"
                onExport={() => handleChartExport('Harmonics Trend')}
                onFullscreen={() => handleChartFullscreen('Harmonics Trend')}
                onRefresh={handleRefresh}
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
                icon="bar"
                status={data.generatorDemand > 80 ? "warning" : "good"}
                kpiValue={`${data.generatorDemand.toFixed(0)}%`}
                trend={data.generatorDemand > 75 ? "up" : "stable"}
                trendValue={data.generatorDemand > 75 ? "+5.2%" : "0%"}
                lastUpdated="1 minute ago"
                onExport={() => handleChartExport('Generator Performance')}
                onFullscreen={() => handleChartFullscreen('Generator Load')}
                onRefresh={handleRefresh}
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
              icon="bar"
              status="good"
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
              icon="bar"
              status="good"
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
                  size={300}
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
              subtitle="Equipment maintenance calendar"
              onExport={() => handleChartExport('Maintenance Schedule')}
              onFullscreen={() => handleChartFullscreen('Maintenance')}
            >
              <div className="h-[280px] w-full overflow-hidden">
                <MiniMaintenanceCalendar 
                  tasks={data.maintenance?.upcomingTasks || []}
                  className="h-full"
                />
              </div>
            </ChartContainer>
          </div>

          {/* Row 5: Temperature and Vibration */}
          <div className="grid grid-cols-2 gap-4">
            <ChartContainer 
              title="Temperature Monitoring" 
              subtitle="Real-time temperature trends across systems"
              onExport={() => handleChartExport('Temperature')}
              onFullscreen={() => handleChartFullscreen('Temperature')}
              icon="trend"
              status="good"
            >
              <div className="h-[280px] w-full overflow-hidden">
                <LineChart 
                  data={{
                    current: data.current.map((val, i) => val + Math.sin(i) * 10 + 25),
                    previous: data.previous.map((val, i) => val + Math.sin(i) * 8 + 22),
                    labels: generateLabels()
                  }}
                  height={280}
                  isLoading={isRefreshing}
                />
              </div>
            </ChartContainer>

            <ChartContainer 
              title="Vibration Analysis" 
              subtitle="Equipment vibration monitoring"
              onExport={() => handleChartExport('Vibration')}
              onFullscreen={() => handleChartFullscreen('Vibration')}
              icon="trend"
              status="good"
            >
              <div className="h-[280px] w-full overflow-hidden">
                <LineChart 
                  data={{
                    current: data.current.map((val, i) => Math.abs(Math.sin(i * 0.5)) * 5),
                    previous: data.previous.map((val, i) => Math.abs(Math.sin(i * 0.3)) * 4),
                    labels: generateLabels()
                  }}
                  height={280}
                  isLoading={isRefreshing}
                />
              </div>
            </ChartContainer>
          </div>

          {/* Row 6: Reactive Power and Energy Mix */}
          <div className="grid grid-cols-2 gap-4">
            <ChartContainer 
              title="Reactive Power Analysis" 
              subtitle="Power factor and reactive power monitoring"
              onExport={() => handleChartExport('Reactive Power')}
              onFullscreen={() => handleChartFullscreen('Reactive Power')}
              icon="bar"
              status="good"
            >
              <div className="h-[280px] w-full overflow-hidden">
                <BarChart 
                  data={{
                    labels: generateLabels().slice(0, 12),
                    values: data.current.slice(0, 12).map(val => val * 0.8),
                    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
                  }}
                  height={280}
                  isLoading={isRefreshing}
                />
              </div>
            </ChartContainer>

            <ChartContainer 
              title="Energy Mix Distribution" 
              subtitle="Energy source allocation"
              onExport={() => handleChartExport('Energy Mix')}
              onFullscreen={() => handleChartFullscreen('Energy Mix')}
              icon="bar"
              status="good"
            >
              <div className="h-[280px] w-full overflow-hidden">
                <DonutChart 
                  data={[
                    { label: 'Solar', value: 25, color: '#f59e0b' },
                    { label: 'Grid', value: 45, color: '#3b82f6' },
                    { label: 'Generator', value: 20, color: '#10b981' },
                    { label: 'Battery', value: 10, color: '#8b5cf6' }
                  ]}
                  centerText={{
                    main: '100%',
                    sub: 'Energy Mix'
                  }}
                  size={240}
                  isLoading={isRefreshing}
                />
              </div>
            </ChartContainer>
          </div>

          {/* Row 7: Cost Analysis and Battery Status */}
          <div className="grid grid-cols-2 gap-4">
            <ChartContainer 
              title="Cost Analysis" 
              subtitle="Energy cost breakdown and trends"
              onExport={() => handleChartExport('Cost Analysis')}
              onFullscreen={() => handleChartFullscreen('Cost Analysis')}
              icon="bar"
              status="good"
            >
              <div className="h-[280px] w-full overflow-hidden">
                <BarChart 
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    values: [1200, 1100, 1300, 1150, 1250, 1180],
                    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
                  }}
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
              icon="trend"
              status="good"
            >
              <div className="h-[280px] w-full overflow-hidden">
                <ModernBatteryChart 
                  chargeLevel={85}
                  voltage={220}
                  current={15}
                  temperature={25}
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
        <div className="flex items-center justify-between mb-8 glass-card-dark rounded-3xl p-6 shadow-glow-blue hover-lift">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-glow-blue animate-float">
              <span className="text-white font-bold text-xl font-montserrat">N</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-montserrat tracking-tight">NovaCelik Dashboard</h1>
              <p className="text-sm text-gray-400/90 font-poppins">Real-time monitoring & analytics</p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder="Search dashboard components..."
                className="w-96 pl-12 pr-4 py-4 text-sm glass-card-dark rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-300 placeholder-gray-500 transition-all duration-300 hover:shadow-glow-blue font-poppins"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2 glass-card-dark rounded-2xl p-2">
              {['Day', 'Week', 'Month'].map((period) => (
                <button 
                  key={period}
                  className={`px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 font-poppins interactive-element ${
                    period.toLowerCase() === timePeriod 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-glow-blue' 
                      : 'text-gray-400 hover:bg-slate-700/50 hover:text-gray-300'
                  }`}
                  onClick={() => handleTimePeriodChange(period.toLowerCase() as 'day' | 'week' | 'month')}
                >
                  {period}
                </button>
              ))}
            </div>

            <button
              onClick={handleRefresh}
              className="flex items-center gap-3 px-6 py-3 text-sm font-medium rounded-2xl glass-card-dark text-gray-400 hover:text-gray-300 hover:shadow-glow-blue transition-all duration-300 interactive-element font-poppins"
            >
              <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
              <span>Refresh Data</span>
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
                  // Overview Section
                  { name: 'Dashboard Overview', icon: <Home className="w-4 h-4" />, status: 'good', category: 'overview' },
                  
                  // Performance Monitoring
                  { name: 'Generator Load', icon: <Gauge className="w-4 h-4" />, status: 'warning', category: 'performance' },
                  { name: 'Load Profile', icon: <LineChartIcon className="w-4 h-4" />, status: 'good', category: 'performance' },
                  { name: 'Temperature', icon: <Thermometer className="w-4 h-4" />, status: 'normal', category: 'performance' },
                  { name: 'Vibration', icon: <Activity className="w-4 h-4" />, status: 'good', category: 'performance' },
                  
                  // Power Quality
                  { name: 'Harmonics Trend', icon: <LineChartIcon className="w-4 h-4" />, status: 'normal', category: 'quality' },
                  { name: 'Power Quality', icon: <Zap className="w-4 h-4" />, status: 'good', category: 'quality' },
                  { name: 'Reactive Power', icon: <RefreshCw className="w-4 h-4" />, status: 'normal', category: 'quality' },
                  
                  // Energy Management
                  { name: 'Monthly Consumption', icon: <BarChart2 className="w-4 h-4" />, status: 'good', category: 'energy' },
                  { name: 'Energy Mix', icon: <PieChart className="w-4 h-4" />, status: 'normal', category: 'energy' },
                  { name: 'Energy Efficiency', icon: <TrendingUp className="w-4 h-4" />, status: 'good', category: 'energy' },
                  { name: 'Cost Analysis', icon: <DollarSign className="w-4 h-4" />, status: 'normal', category: 'energy' },
                  
                  // System Status
                  { name: 'Distribution', icon: <PieChart className="w-4 h-4" />, status: 'normal', category: 'system' },
                  { name: 'Battery Status', icon: <Battery className="w-4 h-4" />, status: 'good', category: 'system' },
                  { name: 'Maintenance', icon: <Wrench className="w-4 h-4" />, status: 'warning', category: 'system' }
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

      {/* Maintenance Calendar Modal */}
      <MaintenanceCalendarModal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
        tasks={data.maintenance?.upcomingTasks || []}
      />
    </div>
  );
}
