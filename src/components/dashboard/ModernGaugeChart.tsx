'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Settings, AlertTriangle, CheckCircle, Zap, TrendingUp } from 'lucide-react';

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
  const [isHovered, setIsHovered] = useState(false);

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
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 75) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getGaugeColor = () => {
    if (percentage >= 90) return 'from-red-500 via-red-400 to-pink-500';
    if (percentage >= 75) return 'from-amber-500 via-orange-400 to-yellow-500';
    return 'from-emerald-500 via-teal-400 to-cyan-500';
  };

  const getStatusIcon = () => {
    if (percentage >= 90) return <AlertTriangle className="w-5 h-5 text-red-400 drop-shadow-lg" />;
    if (percentage >= 75) return <AlertTriangle className="w-5 h-5 text-amber-400 drop-shadow-lg" />;
    return <CheckCircle className="w-5 h-5 text-emerald-400 drop-shadow-lg" />;
  };

  const getGradientStartColor = () => {
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 75) return '#f59e0b';
    return '#10b981';
  };

  const getGradientEndColor = () => {
    if (percentage >= 90) return '#ec4899';
    if (percentage >= 75) return '#eab308';
    return '#06b6d4';
  };

  const getStatusText = () => {
    if (percentage >= 90) return 'Critical';
    if (percentage >= 75) return 'Warning';
    return 'Optimal';
  };

  const getGlowColor = () => {
    if (percentage >= 90) return 'shadow-red-500/30';
    if (percentage >= 75) return 'shadow-amber-500/30';
    return 'shadow-emerald-500/30';
  };

  return (
    <motion.div 
      className={`relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 transition-all duration-500 ${getGlowColor()} ${isHovered ? 'shadow-2xl scale-[1.02]' : 'shadow-xl'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Zap className="w-6 h-6 text-blue-400" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {title}
            </h3>
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2"
        >
          {getStatusIcon()}
          <TrendingUp className="w-4 h-4 text-slate-400" />
        </motion.div>
      </div>

      {/* Enhanced Gauge Container */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="relative w-64 h-32">
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 rounded-full opacity-30">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <path
                d="M 15 85 A 85 85 0 0 1 185 85"
                fill="none"
                stroke={getGradientStartColor()}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.3"
                className="blur-sm"
              />
            </svg>
          </div>

          {/* Background Arc with Gradient */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <defs>
                <linearGradient id={`bgGradient-${chartId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#334155" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#475569" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#334155" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M 20 80 A 80 80 0 0 1 180 80"
                fill="none"
                stroke={`url(#bgGradient-${chartId})`}
                strokeWidth="16"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Progress Arc with Enhanced Gradient and Glow */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <defs>
                <linearGradient id={`gaugeGradient-${chartId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={getGradientStartColor()} />
                  <stop offset="50%" stopColor={percentage >= 75 ? '#f97316' : '#3b82f6'} />
                  <stop offset="100%" stopColor={getGradientEndColor()} />
                </linearGradient>
                <filter id={`glow-${chartId}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <motion.path
                d="M 20 80 A 80 80 0 0 1 180 80"
                fill="none"
                stroke={`url(#gaugeGradient-${chartId})`}
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray="251.2"
                filter={`url(#glow-${chartId})`}
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * percentage) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
          </div>

          {/* Enhanced Needle with Glow */}
          <div className="absolute inset-0 flex items-end justify-center">
            <motion.div
              className="relative"
              initial={{ rotate: -90 }}
              animate={{ rotate: rotation }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{ transformOrigin: 'bottom center' }}
            >
              <div className="w-1 h-20 bg-gradient-to-t from-slate-200 to-white rounded-full shadow-lg" />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg" />
            </motion.div>
            <div className="absolute bottom-0 w-4 h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full border-2 border-slate-500 shadow-lg transform translate-y-1/2" />
          </div>

          {/* Center Value with Enhanced Styling */}
          <div className="absolute inset-0 flex items-end justify-center pb-4">
            <div className="text-center">
              <motion.div
                className="relative"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring", bounce: 0.4 }}
              >
                <div className={`text-4xl font-bold bg-gradient-to-r ${getGaugeColor()} bg-clip-text text-transparent drop-shadow-lg`}>
                  {Math.round(normalizedValue)}
                </div>
                <div className="text-lg text-slate-300 font-medium">{unit}</div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl -z-10" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scale Labels */}
      <div className="flex justify-between text-sm text-slate-400 mb-6 px-4">
        <span className="font-medium">0{unit}</span>
        <span className="font-medium">{maxValue / 2}{unit}</span>
        <span className="font-medium">{maxValue}{unit}</span>
      </div>

      {/* Enhanced Status Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getGaugeColor().replace('from-', 'bg-').split(' ')[0]} animate-pulse`} />
            <span className="text-slate-300 font-medium">System Status</span>
          </div>
          <motion.span 
            className={`text-lg font-bold ${getStatusColor()} drop-shadow-lg`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {getStatusText()}
          </motion.span>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="relative">
          <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${getGaugeColor()} relative overflow-hidden`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </motion.div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>Low</span>
            <span>Optimal</span>
            <span>Critical</span>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="absolute top-4 right-4 p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30 text-blue-400 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}
