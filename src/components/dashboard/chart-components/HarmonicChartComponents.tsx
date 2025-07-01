'use client';

import { motion } from 'framer-motion';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: any;
  isHovered?: boolean;
  isAnimated?: boolean;
  fill?: string;
  stroke?: string;
}

export const CustomDot = ({ cx, cy, payload, isHovered, isAnimated, fill, stroke }: CustomDotProps) => {
  if (!isAnimated || !cx || !cy) return null;

  return (
    <g>
      {/* Outer ring */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={isHovered ? 10 : 6}
        fill="none"
        stroke={stroke || '#3B82F6'}
        strokeWidth={1}
        opacity={0.3}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: 0.1
        }}
      />
      
      {/* Main dot */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={isHovered ? 6 : 4}
        fill={fill || '#ffffff'}
        stroke={stroke || '#3B82F6'}
        strokeWidth={isHovered ? 3 : 2}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      />
      
      {/* Inner highlight */}
      <motion.circle
        cx={cx - 1}
        cy={cy - 1}
        r={isHovered ? 2 : 1}
        fill="rgba(59, 130, 246, 0.3)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: 0.2
        }}
      />
    </g>
  );
};

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  timePeriod?: 'day' | 'week' | 'month';
}

export const CustomTooltip = ({ active, payload, label, timePeriod }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const formatValue = (value: number) => {
    return value.toFixed(2);
  };

  const formatLabel = (label: string) => {
    if (timePeriod === 'day') {
      return `${label}`;
    }
    return label;
  };

  const currentValue = Number(payload.find(p => p.dataKey === 'current')?.value) || 0;
  const previousValue = Number(payload.find(p => p.dataKey === 'previous')?.value) || 0;
  const difference = currentValue - previousValue;
  const percentageChange = previousValue !== 0 ? ((difference / previousValue) * 100) : 0;

  const getTrendIcon = () => {
    if (difference > 0) return <TrendingUp className="w-4 h-4 text-emerald-600" />;
    if (difference < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (difference > 0) return 'text-emerald-600';
    if (difference < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-xl p-4 rounded-xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-gray-900">
          {formatLabel(label)}
        </p>
        <div className="flex items-center gap-1">
          {getTrendIcon()}
        </div>
      </div>

      {/* Values */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm" />
            <span className="text-sm text-gray-700 font-medium">Current</span>
          </div>
          <span className="text-lg font-bold text-blue-600">
            {formatValue(currentValue)}
          </span>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400 shadow-sm" />
            <span className="text-sm text-gray-700 font-medium">Previous</span>
          </div>
          <span className="text-lg font-bold text-gray-600">
            {formatValue(previousValue)}
          </span>
        </div>

        {/* Trend Analysis */}
        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-gray-500 font-medium">Change</span>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${getTrendColor()}`}>
                {difference > 0 ? '+' : ''}{formatValue(difference)}
              </span>
              <span className={`text-xs ${getTrendColor()}`}>
                ({percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
