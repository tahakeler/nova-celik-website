'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Label,
  TooltipProps,
} from 'recharts';

interface ConsumptionBarChartProps {
  current: number[];
  previous: number[];
}

export default function ConsumptionBarChart({ current, previous }: Readonly<ConsumptionBarChartProps>) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const data = current.map((val, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    current: isAnimated ? val : 0,
    previous: isAnimated ? (previous[i] ?? 0) : 0,
    total: isAnimated ? (val + (previous[i] ?? 0)) : 0,
  }));

  const maxValue = Math.max(...data.map(item => item.total));
  const threshold = maxValue * 0.75; // 75% threshold line

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, entry) => sum + (entry.value ?? 0), 0);
      const isOverThreshold = total > threshold;

      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg border border-gray-100 max-w-[90vw] sm:max-w-none"
        >
          <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 sm:mb-3">{label}</p>
          {payload.map((entry, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between space-x-8 mb-2"
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
              <p className="text-xs sm:text-sm text-gray-600">
                  {entry.name === 'current' ? 'Current Usage' : 'Previous Usage'}
                </p>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">
                {(entry.value ?? 0).toLocaleString()} kWh
              </p>
            </motion.div>
          ))}
          <motion.div 
            className="mt-3 pt-3 border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Usage</span>
              <motion.span 
                className={`text-sm font-semibold ${
                  isOverThreshold ? 'text-red-600' : 'text-green-600'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {total.toLocaleString()} kWh
              </motion.span>
            </div>
            {isOverThreshold && (
              <motion.p 
                className="text-xs text-red-500 mt-1 flex items-center space-x-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span>⚠️</span>
                <span>Exceeds recommended threshold</span>
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      );
    }
    return null;
  };

  const getBarGradient = (index: number, type: 'current' | 'previous') => {
    const id = `gradient-${type}-${index}`;
    const colors = type === 'current' 
      ? { start: '#059669', end: '#10B981' }
      : { start: '#6EE7B7', end: '#A7F3D0' };
    
    return (
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={colors.start} stopOpacity={0.8}/>
        <stop offset="100%" stopColor={colors.end} stopOpacity={0.6}/>
      </linearGradient>
    );
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          onMouseMove={(state) => {
            if (state?.activeTooltipIndex !== undefined) {
              setHoveredBar(state.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setHoveredBar(null)}
        >
          <defs>
            <filter id="consumptionGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 15 -7"
                result="glowAlpha"
              />
              <feBlend in="SourceGraphic" in2="glowAlpha" mode="screen"/>
            </filter>
            <filter id="barShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
            </filter>
            {data.map((_, index) => (
              <React.Fragment key={`gradients-${index}`}>
                {getBarGradient(index, 'current')}
                {getBarGradient(index, 'previous')}
              </React.Fragment>
            ))}
          </defs>

          <XAxis 
            dataKey="month" 
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
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          
          <Tooltip 
            content={CustomTooltip}
            cursor={{ 
              fill: 'rgba(243, 244, 246, 0.6)',
              stroke: '#E2E8F0',
              strokeWidth: 1,
              radius: 4
            }}
          />

          {/* Threshold Reference Line */}
          <ReferenceLine 
            y={threshold} 
            stroke="#EF4444" 
            strokeDasharray="3 3"
            strokeWidth={2}
            isFront={true}
          >
            <Label 
              value="Threshold" 
              position="right"
              fill="#EF4444"
              fontSize={12}
              offset={4}
              className="hidden sm:block"
            />
          </ReferenceLine>

          <Bar 
            dataKey="previous" 
            stackId="consumption"
            radius={[0, 0, 0, 0]}
            maxBarSize={32}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={300}
          >
            {data.map((_, index) => (
              <Cell 
                key={`previous-${index}`}
                fill={`url(#gradient-previous-${index})`}
              />
            ))}
          </Bar>

          <Bar 
            dataKey="current" 
            stackId="consumption"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
            filter={hoveredBar !== null ? "url(#consumptionGlow)" : undefined}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={0}
          >
            {data.map((_, index) => (
              <Cell 
                key={`current-${index}`}
                fill={`url(#gradient-current-${index})`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <motion.div 
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 px-3 sm:px-4 py-2 sm:py-3 bg-white/80 rounded-xl backdrop-blur-sm shadow-lg border border-gray-100/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="flex items-center space-x-2 group cursor-pointer min-w-[110px] sm:min-w-[120px]"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-4 h-4 rounded bg-gradient-to-br from-emerald-600 to-emerald-500 shadow-sm transition-transform duration-300 group-hover:scale-110" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
            Current Usage
          </span>
        </motion.div>
        <motion.div 
          className="flex items-center space-x-2 group cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-4 h-4 rounded bg-gradient-to-br from-emerald-300 to-emerald-200 shadow-sm transition-transform duration-300 group-hover:scale-110" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
            Previous Usage
          </span>
        </motion.div>
        <motion.div 
          className="flex items-center space-x-2 group cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-4 h-0.5 bg-red-500 shadow-sm" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
            Threshold
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
