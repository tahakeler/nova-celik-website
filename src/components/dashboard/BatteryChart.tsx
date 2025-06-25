'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, AlertTriangle, CheckCircle } from 'lucide-react';

interface BatteryChartProps {
  title: string;
  percentage: number;
  voltage?: number;
  status?: 'good' | 'warning' | 'critical';
  isCharging?: boolean;
}

export default function BatteryChart({ 
  title, 
  percentage, 
  voltage = 220, 
  status = 'good',
  isCharging = false 
}: Readonly<BatteryChartProps>) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'warning': return 'from-yellow-500 to-orange-500';
      default: return 'from-green-500 to-emerald-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getBatteryHeight = () => Math.max(10, (animatedPercentage / 100) * 120);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">{title}</h3>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className="text-xs text-gray-500 capitalize">{status}</span>
          </div>
        </div>
        {isCharging && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-blue-500"
          >
            <Zap className="w-5 h-5" />
          </motion.div>
        )}
      </div>

      <div className="flex items-end justify-center space-x-8">
        {/* Battery Visual */}
        <div className="relative">
          {/* Battery Body */}
          <div className="relative w-16 h-32 border-3 border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
            {/* Battery Fill */}
            <motion.div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${getStatusColor()} rounded-b-md`}
              initial={{ height: 0 }}
              animate={{ height: getBatteryHeight() }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            {/* Battery Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
            
            {/* Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-xs font-bold text-gray-700 drop-shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {Math.round(animatedPercentage)}%
              </motion.span>
            </div>
          </div>
          
          {/* Battery Terminal */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gray-400 rounded-t-sm" />
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="text-center">
            <motion.div
              className="text-2xl font-bold text-gray-800"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              {Math.round(animatedPercentage)}%
            </motion.div>
            <div className="text-xs text-gray-500">Capacity</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700">{voltage}V</div>
            <div className="text-xs text-gray-500">Voltage</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>0%</span>
          <span>100%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getStatusColor()} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${animatedPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
