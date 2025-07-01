'use client';

import { motion } from 'framer-motion';
import { Area, AreaChart as RechartsArea, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { TrendingUp, Activity, Zap } from 'lucide-react';

interface DataPoint {
  time: string;
  value: number;
  predicted?: boolean;
}

interface AreaChartProps {
  data: DataPoint[];
  title?: string;
  color?: string;
  showPrediction?: boolean;
  chartId?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const value = typeof payload[0].value === 'number' ? payload[0].value : 0;
    const isPredicted = payload[0].payload.predicted;
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-xl p-4 rounded-xl shadow-lg border border-gray-200"
        style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-gray-900">
            {label}
          </p>
          {isPredicted && (
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">Forecast</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm" />
            <span className="text-sm text-gray-700 font-medium">Energy</span>
          </div>
          <span className="text-lg font-bold text-blue-600">
            {value.toFixed(2)} kWh
          </span>
        </div>
        
        {isPredicted && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <span className="text-xs text-gray-500">Predicted based on current trends</span>
          </div>
        )}
      </motion.div>
    );
  }
  return null;
};

export default function AreaChart({ 
  data, 
  title = 'Energy Consumption',
  color = 'blue', 
  showPrediction = false,
  chartId = 'area'
}: Readonly<AreaChartProps>) {
  // Add prediction data points if enabled
  const chartData = showPrediction ? [
    ...data,
    ...data.slice(-3).map((point, index) => ({
      time: `${parseInt(point.time) + index + 1}:00`,
      value: point.value * (1 + (Math.random() * 0.1 - 0.05)),
      predicted: true
    }))
  ] : data;

  const getGradientColors = () => {
    switch (color) {
      case 'blue':
        return { 
          start: '#3B82F6', 
          middle: '#06B6D4', 
          end: '#1D4ED8',
          glow: 'rgba(59, 130, 246, 0.4)'
        };
      case 'green':
        return { 
          start: '#10B981', 
          middle: '#14B8A6', 
          end: '#059669',
          glow: 'rgba(16, 185, 129, 0.4)'
        };
      case 'purple':
        return { 
          start: '#8B5CF6', 
          middle: '#A855F7', 
          end: '#6D28D9',
          glow: 'rgba(139, 92, 246, 0.4)'
        };
      default:
        return { 
          start: '#3B82F6', 
          middle: '#06B6D4', 
          end: '#1D4ED8',
          glow: 'rgba(59, 130, 246, 0.4)'
        };
    }
  };

  const colors = getGradientColors();

  return (
    <motion.div 
      className="w-full h-full bg-white rounded-2xl p-6 border border-gray-200 shadow-lg relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-2 bg-blue-50 rounded-xl border border-blue-200"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Activity className="w-6 h-6 text-blue-600" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {title}
            </h3>
            <p className="text-sm text-gray-600">24-hour consumption pattern</p>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2"
        >
          <Zap className="w-4 h-4 text-blue-600" />
          {showPrediction && (
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          )}
        </motion.div>
      </div>

      {/* Enhanced Chart Container */}
      <div className="relative h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsArea
            data={chartData}
            margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
          >
            <defs>
              {/* Enhanced Gradient with Multiple Stops */}
              <linearGradient id={`colorGradient-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.start} stopOpacity={0.6}/>
                <stop offset="50%" stopColor={colors.middle} stopOpacity={0.3}/>
                <stop offset="100%" stopColor={colors.end} stopOpacity={0.1}/>
              </linearGradient>
              
              {/* Prediction Gradient */}
              <linearGradient id={`predictionGradient-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.start} stopOpacity={0.3}/>
                <stop offset="50%" stopColor={colors.middle} stopOpacity={0.15}/>
                <stop offset="100%" stopColor={colors.end} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
              width={60}
              tickFormatter={(value) => `${value}k`}
            />
            
            <Tooltip content={CustomTooltip} />
            
            {/* Main Area */}
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors.start}
              strokeWidth={3}
              fill={`url(#colorGradient-${chartId})`}
              isAnimationActive={true}
              animationDuration={2000}
              animationBegin={300}
              connectNulls={false}
            />
          </RechartsArea>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics */}
      <div className="absolute bottom-4 right-4 space-y-2">
        <motion.div 
          className="px-3 py-1 bg-white/90 rounded-lg border border-gray-200 text-xs text-gray-700 shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          Peak: {Math.max(...data.map(d => d.value)).toFixed(1)} kWh
        </motion.div>
        <motion.div 
          className="px-3 py-1 bg-white/90 rounded-lg border border-gray-200 text-xs text-gray-700 shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          Avg: {(data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(1)} kWh
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="absolute top-4 right-4 p-2 bg-blue-50 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-100 transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
      >
        <Activity className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}
