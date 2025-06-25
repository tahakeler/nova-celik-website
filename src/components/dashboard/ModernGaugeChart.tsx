'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Settings, AlertTriangle, CheckCircle } from 'lucide-react';

interface ModernGaugeChartProps {
  value: number;
  maxValue?: number;
  title?: string;
  subtitle?: string;
  unit?: string;
  chartId?: string;
}

export default function ModernGaugeChart({ 
  value, 
  maxValue = 100,
  title = 'Generator Load',
  subtitle = 'Current system load',
  unit = '%',
  chartId = 'gauge'
}: Readonly<ModernGaugeChartProps>) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  const normalizedValue = Math.min(Math.max(animatedValue, 0), maxValue);
  const percentage = (normalizedValue / maxValue) * 100;
  const rotation = (percentage / 100) * 180 - 90; // -90 to 90 degrees

  const getStatusColor = () => {
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getGaugeColor = () => {
    if (percentage >= 90) return 'from-red-500 to-red-600';
    if (percentage >= 75) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-emerald-600';
  };

  const getStatusIcon = () => {
    if (percentage >= 90) return <AlertTriangle className="w-5 h-5 text-red-500" />;
    if (percentage >= 75) return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <CheckCircle className="w-5 h-5 text-green-500" />;
  };

  const getGradientStartColor = () => {
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 75) return '#f59e0b';
    return '#10b981';
  };

  const getGradientEndColor = () => {
    if (percentage >= 90) return '#dc2626';
    if (percentage >= 75) return '#d97706';
    return '#059669';
  };

  const getStatusText = () => {
    if (percentage >= 90) return 'Critical';
    if (percentage >= 75) return 'Warning';
    return 'Normal';
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-semibold text-gray-700">{title}</h3>
        </div>
        {getStatusIcon()}
      </div>

      <div className="text-sm text-gray-500 mb-6">{subtitle}</div>

      {/* Gauge Container */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="relative w-48 h-24 overflow-hidden">
          {/* Background Arc */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <path
                d="M 20 80 A 80 80 0 0 1 180 80"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Progress Arc */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <motion.path
                d="M 20 80 A 80 80 0 0 1 180 80"
                fill="none"
                stroke={`url(#gaugeGradient-${chartId})`}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * percentage) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id={`gaugeGradient-${chartId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={getGradientStartColor()} />
                  <stop offset="100%" stopColor={getGradientEndColor()} />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Needle */}
          <div className="absolute inset-0 flex items-end justify-center">
            <motion.div
              className="w-1 h-16 bg-gray-800 rounded-full origin-bottom"
              style={{ transformOrigin: 'bottom center' }}
              initial={{ rotate: -90 }}
              animate={{ rotate: rotation }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <div className="absolute bottom-0 w-3 h-3 bg-gray-800 rounded-full transform translate-y-1/2" />
          </div>

          {/* Center Value */}
          <div className="absolute inset-0 flex items-end justify-center pb-2">
            <div className="text-center">
              <motion.div
                className={`text-2xl font-bold ${getStatusColor()}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                {Math.round(normalizedValue)}{unit}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between text-xs text-gray-400 mb-4 px-2">
        <span>0{unit}</span>
        <span>{maxValue / 2}{unit}</span>
        <span>{maxValue}{unit}</span>
      </div>

      {/* Status Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Status</span>
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${getGaugeColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
