'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Brush,
} from 'recharts';
import { Download, TrendingUp, Clock } from 'lucide-react';
import { CustomDot, CustomTooltip } from './chart-components/HarmonicChartComponents';

interface HarmonicLineChartProps {
  current: number[];
  previous: number[];
  timePeriod?: 'day' | 'week' | 'month';
  isLoading?: boolean;
  chartId?: string;
}

interface ChartDataPoint {
  id: string;
  label: string;
  current: number;
  previous: number;
}

const HarmonicLineChart = ({
  current,
  previous,
  timePeriod = 'day',
  isLoading = false,
  chartId = 'harmonic'
}: HarmonicLineChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getPeriodIcon = useCallback(() => {
    switch (timePeriod) {
      case 'day':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'week':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'month':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  }, [timePeriod]);

  const data = useMemo<ChartDataPoint[]>(() => {
    let dataPoints = 24;
    if (timePeriod === 'week') dataPoints = 7;
    if (timePeriod === 'month') dataPoints = 30;

    return current.slice(0, dataPoints).map((val: number, i: number) => {
      let label = '';
      if (timePeriod === 'day') {
        label = `${i}:00`;
      } else if (timePeriod === 'week') {
        label = new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString('default', { weekday: 'short' });
      } else {
        label = new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString('default', { day: 'numeric', month: 'short' });
      }

      return {
        id: `${timePeriod}-${i}`,
        label,
        current: isAnimated ? val : 0,
        previous: isAnimated ? (previous[i] ?? 0) : 0,
      };
    });
  }, [current, previous, timePeriod, isAnimated]);

  const handleExportCSV = useCallback(() => {
    const header = ['Label', 'Current', 'Previous'];
    const rows = data.map((d: ChartDataPoint) => [d.label, d.current, d.previous]);
    const csvContent = [header, ...rows].map((e: (string | number)[]) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `harmonic-line-chart-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-md mx-auto">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative group" id="harmonic-line-chart-container">
      <div className="absolute top-0 right-0 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">Current</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Previous</span>
          </div>
        </div>
      </div>
      <div className="absolute top-2 left-2 z-10 flex space-x-2">
        <button
          onClick={handleExportCSV}
          className="bg-green-600 text-white px-3 py-1 rounded-md text-xs hover:bg-green-700 transition flex items-center space-x-1"
          aria-label="Export chart data as CSV"
        >
          <Download className="w-3 h-3" />
          <span>CSV</span>
        </button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
          onMouseMove={(e) => {
            if (e.activeTooltipIndex !== undefined) {
              setHoveredIndex(e.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setHoveredIndex(null)}
          syncId="harmonicLineChart"
        >
          <defs>
            <linearGradient id={`currentGradient-${chartId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id={`previousGradient-${chartId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#94A3B8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Tooltip content={(props) => <CustomTooltip {...props} timePeriod={timePeriod} />} />

          <Area
            type="monotone"
            dataKey="previous"
            stroke="#94A3B8"
            strokeWidth={2}
            fill={`url(#previousGradient-${chartId})`}
            dot={(props) => <CustomDot {...props} isHovered={hoveredIndex === data.findIndex((d) => d.label === props.payload?.label)} isAnimated={isAnimated} />}
            activeDot={false}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={300}
          />

          <Area
            type="monotone"
            dataKey="current"
            stroke="#3B82F6"
            strokeWidth={3}
            fill={`url(#currentGradient-${chartId})`}
            dot={(props) => <CustomDot {...props} isHovered={hoveredIndex === data.findIndex((d) => d.label === props.payload?.label)} isAnimated={isAnimated} />}
            activeDot={false}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={0}
          />

          <Brush
            dataKey="label"
            height={30}
            stroke="#3B82F6"
            travellerWidth={10}
            startIndex={0}
            endIndex={Math.min(10, data.length - 1)}
          />
        </AreaChart>
      </ResponsiveContainer>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 px-3 sm:px-4 py-2 sm:py-3 bg-white/80 rounded-xl backdrop-blur-sm shadow-lg border border-gray-100/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
          <TrendingUp className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Current Period</span>
        </motion.div>
        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
          <TrendingUp className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Previous Period</span>
        </motion.div>
        {getPeriodIcon() && (
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            {getPeriodIcon()}
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
              {timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HarmonicLineChart;
