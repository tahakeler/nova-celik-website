'use client';

import { useState, useEffect, useMemo, ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  TooltipProps,
} from 'recharts';

interface HarmonicLineChartProps {
  current: number[];
  previous: number[];
  timePeriod?: 'day' | 'week' | 'month';
  isLoading?: boolean;
}

interface CustomDotProps {
  cx: number;
  cy: number;
  payload: {
    label: string;
    id: string;
    current: number;
    previous: number;
  };
  dataKey: string;
  value: number;
}

const HarmonicLineChart = ({
  current,
  previous,
  timePeriod = 'day',
  isLoading = false,
}: HarmonicLineChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after mount or time period change
    setIsAnimated(false);
    const timer = setTimeout(() => setIsAnimated(true), 300);
    return () => clearTimeout(timer);
  }, [timePeriod]);

  const data = useMemo(() => {
    let dataPoints = 24; // Default for day view (hourly)
    if (timePeriod === 'week') dataPoints = 7;
    if (timePeriod === 'month') dataPoints = 30;

    return current.slice(0, dataPoints).map((val, i) => {
      let label = '';

      if (timePeriod === 'day') {
        label = `${i}:00`;
      } else if (timePeriod === 'week') {
        label = new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString('default', { weekday: 'short' });
      } else {
        label = new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString('default', { day: 'numeric', month: 'short' });
      }

      return {
        id: `data-${i}`,
        label,
        current: isAnimated ? val : 0,
        previous: isAnimated ? (previous[i] ?? 0) : 0,
      };
    });
  }, [current, previous, timePeriod, isAnimated]);


  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg border border-gray-100 max-w-[90vw] sm:max-w-none"
        >
          <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">
            {timePeriod === 'day' ? 'Hour' : timePeriod === 'week' ? 'Day' : 'Date'}: {label}
          </p>
          {payload.map((entry, index) => (
            <motion.div
              key={`tooltip-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2 mb-1"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-xs sm:text-sm text-gray-600">
                {entry.name === 'current' ? 'Current Period' : 'Previous Period'}:
                <span className="ml-2 font-semibold text-gray-900">
                  {(entry.value ?? 0).toLocaleString()}
                </span>
              </p>
            </motion.div>
          ))}
        </motion.div>
      );
    }
    return null;
  };

const CustomDot = ({
  cx,
  cy,
  payload,
  dataKey,
  value,
  hoveredIndex,
  isAnimated,
}: CustomDotProps & { hoveredIndex: number | null; isAnimated: boolean }): ReactElement | null => {
  const isHovered = hoveredIndex === data.findIndex((d: { label: string }) => d.label === payload.label);
  const isVisible = value > 0; // Only show dots for non-zero values
  const fill = dataKey === 'current' ? '#3B82F6' : '#94A3B8';
  const dotId = `dot-${dataKey}-${payload.id}`;

  if (!isVisible) return null;

  return (
    <motion.g
      key={dotId}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
      transition={{ duration: 0.3, delay: isAnimated ? 0 : 0.5 }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.circle
            initial={{ r: 0 }}
            animate={{ r: 6 }}
            exit={{ r: 0 }}
            cx={cx}
            cy={cy}
            fill="white"
            stroke={fill}
            strokeWidth={2}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <motion.circle
        cx={cx}
        cy={cy}
        r={isHovered ? 4 : 0}
        fill={fill}
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      {isHovered && (
        <motion.text
          x={cx}
          y={cy - 15}
          textAnchor="middle"
          fill={fill}
          fontSize="12"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
        >
          {value.toLocaleString()}
        </motion.text>
      )}
    </motion.g>
  );
};

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full">
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
    <div className="w-full h-full relative group">
      {/* Chart Legend */}
      <div className="absolute top-0 right-0 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Current</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-sm text-gray-600">Previous</span>
          </div>
        </div>
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
        >
          <defs>
            <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="previousGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#94A3B8" stopOpacity={0} />
            </linearGradient>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 15 -7"
                result="glowAlpha"
              />
              <feBlend in="SourceGraphic" in2="glowAlpha" mode="screen" />
            </filter>
            <filter id="dotGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 10 -5"
                result="glowAlpha"
              />
              <feBlend in="SourceGraphic" in2="glowAlpha" mode="screen" />
            </filter>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" vertical={false} />

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 10 }}
            dy={10}
            interval="preserveStartEnd"
            minTickGap={5}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 10 }}
            width={35}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            tickCount={5}
          />

          <Tooltip content={CustomTooltip} />

          {/* Previous Period Area */}
          <Area
            type="monotone"
            dataKey="previous"
            stroke="#94A3B8"
            strokeWidth={2}
            fill="url(#previousGradient)"
            dot={(props) => {
              const { key, ...restProps } = props;
              return <CustomDot key={`previous-dot-${props.payload.id}`} {...restProps} value={props.payload.previous} />;
            }}
            activeDot={false}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={300}
          />

          {/* Current Period Area */}
          <Area
            type="monotone"
            dataKey="current"
            stroke="#3B82F6"
            strokeWidth={3}
            fill="url(#currentGradient)"
            filter={hoveredIndex !== null ? 'url(#dotGlow)' : 'url(#lineGlow)'}
            dot={(props) => {
              const { key, ...restProps } = props;
              return <CustomDot key={`current-dot-${props.payload.id}`} {...restProps} value={props.payload.current} />;
            }}
            activeDot={false}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={0}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 px-3 sm:px-4 py-2 sm:py-3 bg-white/80 rounded-xl backdrop-blur-sm shadow-lg border border-gray-100/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-blue-500/25" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Current Period</span>
        </motion.div>
        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-gray-400/25" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Previous Period</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HarmonicLineChart;
