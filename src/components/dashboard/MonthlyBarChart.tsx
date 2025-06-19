'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface MonthlyBarChartProps {
  current: number[];
  previous: number[];
}

export default function MonthlyBarChart({ current, previous }: Readonly<MonthlyBarChartProps>) {
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
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const percentChange = ((payload[0].value - payload[1].value) / payload[1].value) * 100;

      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100"
        >
          <p className="text-sm font-semibold text-gray-600 mb-3">{label}</p>
          {payload.map((entry: any, index: number) => (
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
                <p className="text-sm text-gray-600">
                  {entry.name === 'current' ? 'Current' : 'Previous'}
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {entry.value.toLocaleString()}
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
              <span className="text-sm text-gray-600">Change</span>
              <motion.span 
                className={`text-sm font-semibold ${
                  percentChange > 0 ? 'text-green-600' : 'text-red-600'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}%
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      );
    }
    return null;
  };

  const getBarGradient = (index: number, type: 'current' | 'previous') => {
    const id = `gradient-${type}-${index}`;
    const colors = type === 'current' 
      ? { start: '#3B82F6', end: '#2563EB' }
      : { start: '#94A3B8', end: '#64748B' };
    
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
          margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
          onMouseMove={(state) => {
            if (state?.activeTooltipIndex !== undefined) {
              setHoveredBar(state.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setHoveredBar(null)}
        >
          <defs>
            <filter id="barGlow">
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

          <Bar 
            dataKey="previous" 
            radius={[6, 6, 0, 0]}
            maxBarSize={24}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={300}
            filter="url(#barShadow)"
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
            radius={[6, 6, 0, 0]}
            maxBarSize={24}
            filter={hoveredBar !== null ? "url(#barGlow)" : "url(#barShadow)"}
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
        className="flex items-center justify-center space-x-8 mt-6 px-4 py-3 bg-white/80 rounded-xl backdrop-blur-sm shadow-lg border border-gray-100/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="flex items-center space-x-3 group cursor-pointer transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-4 h-4 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-blue-500/25 group-hover:shadow-lg" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
            Current Period
          </span>
        </motion.div>
        <motion.div 
          className="flex items-center space-x-3 group cursor-pointer transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-4 h-4 rounded-lg bg-gradient-to-br from-gray-400 to-gray-500 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-gray-400/25 group-hover:shadow-lg" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
            Previous Period
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
