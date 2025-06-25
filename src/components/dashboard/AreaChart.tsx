'use client';

import { motion } from 'framer-motion';
import { Area, AreaChart as RechartsArea, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

interface DataPoint {
  time: string;
  value: number;
  predicted?: boolean;
}

interface AreaChartProps {
  data: DataPoint[];
  color?: string;
  showPrediction?: boolean;
  chartId?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-100"
      >
        <p className="text-sm font-semibold text-gray-600">{label}</p>
        <p className="text-sm text-gray-900">
          Value: {typeof payload[0].value === 'number' ? payload[0].value.toFixed(2) : payload[0].value}
        </p>
        {payload[0].payload.predicted && (
          <p className="text-xs text-blue-600 mt-1">Predicted</p>
        )}
      </motion.div>
    );
  }
  return null;
};

export default function AreaChart({ 
  data, 
  color = 'blue', 
  showPrediction = false,
  chartId = 'area'
}: Readonly<AreaChartProps>) {
  // Add prediction data points if enabled
  const chartData = showPrediction ? [
    ...data,
    ...data.slice(-3).map((point, index) => ({
      time: `${parseInt(point.time) + index + 1}:00`,
      value: point.value * (1 + (Math.random() * 0.1)),
      predicted: true
    }))
  ] : data;

  const getGradientColors = () => {
    switch (color) {
      case 'blue':
        return { start: '#3B82F6', end: '#1D4ED8' };
      case 'green':
        return { start: '#10B981', end: '#059669' };
      case 'purple':
        return { start: '#8B5CF6', end: '#6D28D9' };
      default:
        return { start: '#3B82F6', end: '#1D4ED8' };
    }
  };

  const colors = getGradientColors();

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsArea
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={`colorGradient-${chartId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.start} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={colors.end} stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 12 }}
            dy={10}
          />
          
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 12 }}
            width={45}
          />
          
          <Tooltip content={CustomTooltip} />
          
          <Area
            type="monotone"
            dataKey="value"
            stroke={colors.start}
            strokeWidth={2}
            fill={`url(#colorGradient-${chartId})`}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={300}
          />
        </RechartsArea>
      </ResponsiveContainer>
    </div>
  );
}
