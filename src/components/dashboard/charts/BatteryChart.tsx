'use client';

import React from 'react';

interface BatteryChartProps {
  value: number;
  voltage?: number;
  status?: 'good' | 'warning' | 'critical';
  height?: number;
  isLoading?: boolean;
}

export default function BatteryChart({ 
  value, 
  voltage = 220, 
  status = 'good',
  height = 200,
  isLoading 
}: BatteryChartProps) {
  const roundedValue = Math.floor(value);
  
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'critical':
        return '#ef4444';
      default:
        return '#3b82f6';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="relative w-32 h-48">
        {/* Battery Container */}
        <div className="absolute inset-0 rounded-lg bg-[#1e293b] border-2 border-gray-600 overflow-hidden">
          {/* Battery Grid Lines */}
          <div className="absolute inset-0 grid grid-rows-5 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="border-b border-gray-600 last:border-b-0"
                style={{ opacity: 0.3 }}
              />
            ))}
          </div>

          {/* Battery Level */}
          <div 
            className="absolute bottom-0 left-0 right-0 transition-all duration-500"
            style={{ 
              height: `${roundedValue}%`,
              background: `linear-gradient(180deg, ${getStatusColor()} 0%, ${getStatusColor()}80 100%)`
            }}
          >
            {/* Animated Glow Effect */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(180deg, ${getStatusColor()} 0%, transparent 100%)`,
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
          </div>

          {/* Battery Level Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{roundedValue}%</div>
              <div className="text-sm text-gray-400">{voltage}V</div>
            </div>
          </div>
        </div>

        {/* Battery Terminal */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-3 bg-gray-600 rounded-t-md" />
        
        {/* Battery Highlights */}
        <div className="absolute inset-[2px] rounded-lg pointer-events-none">
          {/* Top highlight */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-white opacity-10 rounded-full"
          />
          {/* Left highlight */}
          <div 
            className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-3/4 bg-white opacity-10 rounded-full"
          />
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center">
        <div className="text-sm text-gray-400">Battery Status</div>
        <div className="text-lg font-medium text-gray-300">{status}</div>
      </div>
    </div>
  );
}
