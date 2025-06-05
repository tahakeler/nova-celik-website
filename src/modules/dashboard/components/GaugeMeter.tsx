'use client';

import { motion } from 'framer-motion';

interface GaugeMeterProps {
  value: number; // Percentage value (0-100)
  label: string;
  type: 'healthy' | 'risky' | 'unhealthy';
  subLabel?: string;
}

const COLORS = {
  healthy: '#a5d80c',
  risky: '#ffc107',
  unhealthy: '#ef4444',
};

export default function GaugeMeter({ value, label, type, subLabel }: Readonly<GaugeMeterProps>) {

  const startAngle = 135;
  const endAngle = 405;
  const angle = (v: number) => startAngle + (endAngle - startAngle) * (v / 100);
  const getArc = (v: number) => {
    const r = 55;
    const a = angle(v) * (Math.PI / 180);
    const x = 70 + r * Math.cos(a);
    const y = 70 + r * Math.sin(a);
    const sx = 70 + r * Math.cos(startAngle * (Math.PI / 180));
    const sy = 70 + r * Math.sin(startAngle * (Math.PI / 180));
    return `M${sx},${sy} A${r},${r} 0 1,1 ${x},${y}`;
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center w-64 mx-auto relative">
      <div className="flex justify-between w-full mb-1 text-xs font-medium">
        <span className="text-lime-700">Healthy</span>
        <span className="text-amber-500">Risky</span>
        <span className="text-red-500">Unhealthy</span>
      </div>
      <svg width={140} height={110}>
        <path d={getArc(100)} stroke="#f3f4f6" strokeWidth="15" fill="none" strokeLinecap="round" />
        <motion.path
          d={getArc(value)}
          stroke={COLORS[type]}
          strokeWidth="15"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: value / 100 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
        <motion.line
          x1={70}
          y1={70}
          x2={70 + 55 * Math.cos(angle(value) * Math.PI / 180)}
          y2={70 + 55 * Math.sin(angle(value) * Math.PI / 180)}
          stroke={COLORS[type]}
          strokeWidth={4}
          strokeLinecap="round"
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
      </svg>
      <div className="absolute top-[72px] left-0 w-full flex flex-col items-center">
        <span className="inline-block text-base font-bold text-gray-900 bg-white rounded-full border-2 border-gray-200 px-4 py-1 shadow">
          %{value}
        </span>
      </div>
      <div className="mt-3 text-[15px] font-bold text-gray-700">{label}</div>
      {subLabel && <div className="text-xs text-gray-400">{subLabel}</div>}
    </div>
  );
}
