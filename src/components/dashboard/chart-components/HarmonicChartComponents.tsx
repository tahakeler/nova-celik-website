'use client';

import { motion } from 'framer-motion';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

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
    <motion.circle
      cx={cx}
      cy={cy}
      r={isHovered ? 6 : 4}
      fill={fill || '#fff'}
      stroke={stroke || '#3B82F6'}
      strokeWidth={2}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    />
  );
};

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  timePeriod?: 'day' | 'week' | 'month';
}

export const CustomTooltip = ({ active, payload, label, timePeriod }: CustomTooltipProps) => {
  if (!active || !payload) return null;

  const formatValue = (value: number) => {
    return value.toFixed(2);
  };

  const formatLabel = (label: string) => {
    if (timePeriod === 'day') {
      return `${label}:00`;
    }
    return label;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-100">
      <p className="text-sm font-medium text-gray-600 mb-2">{formatLabel(label)}</p>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <p className="text-sm">
            <span className="text-gray-500">Current:</span>{' '}
            <span className="font-medium">{formatValue(Number(payload[1]?.value) || 0)}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-400" />
          <p className="text-sm">
            <span className="text-gray-500">Previous:</span>{' '}
            <span className="font-medium">{formatValue(Number(payload[0]?.value) || 0)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
