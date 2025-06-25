'use client';

import BatteryChart from './BatteryChart';
import { Battery } from 'lucide-react';

interface VoltageQualityCardProps {
  title: string;
  fluctuation: number;
  harmonics: number;
}

export default function VoltageQualityCard({ title, fluctuation, harmonics }: Readonly<VoltageQualityCardProps>) {
  const getStatus = (value: number) => {
    if (value > 15) return 'critical';
    if (value > 10) return 'warning';
    return 'good';
  };

  return (
    <div className="bg-gradient-to-br from-gray-50/95 to-white/90 backdrop-blur rounded-2xl shadow-lg border border-gray-100/50">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Battery className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-semibold text-gray-700">{title}</h3>
        </div>
        
        <div className="grid gap-4">
          <BatteryChart
            title="Voltage Fluctuation"
            percentage={fluctuation}
            voltage={220}
            status={getStatus(fluctuation)}
            isCharging={fluctuation < 5}
          />
          
          <div className="mt-2 p-4 bg-white/50 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Harmonics Distortion</p>
            <p className="text-xl font-semibold text-gray-800" title="Percentage of voltage harmonics distortion">
              {harmonics.toFixed(1)}%
            </p>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{ width: `${Math.min(100, harmonics)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
