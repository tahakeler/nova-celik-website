'use client';

import React from 'react';

interface GaugeChartProps {
  label: string;
  value: number;
  color: string; // Any CSS color value
  max: number;
  info?: string;
}

export default function GaugeChart({ label, value, color, max, info }: Readonly<GaugeChartProps>) {
  const percent = Math.min(value / max, 1);
  const angle = percent * 180 - 90;

  // Calculate arc
  const r = 54, cx = 72, cy = 72;
  const start = polarToCartesian(cx, cy, r, 135);
  const end = polarToCartesian(cx, cy, r, 405 * percent + 135 * (1 - percent));
  const arcFlag = percent > 0.5 ? 1 : 0;
  const d = `M${start.x},${start.y} A${r},${r} 0 ${arcFlag},1 ${end.x},${end.y}`;

  function polarToCartesian(cx: number, cy: number, r: number, a: number) {
    const rad = ((a - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  return (
    <div className="w-full bg-gray-50 rounded-xl shadow flex flex-col items-center py-6 px-3 min-w-[240px]">
      <svg width={144} height={100} viewBox="0 0 144 100" aria-label={label}>
        {/* Background arc */}
        <path
          d="M24,72 A54,54 0 1,1 120,72"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="13"
        />
        {/* Value arc */}
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="13"
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.6s cubic-bezier(0.4,0,0.2,1)' }}
        />
        {/* Value needle */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + r * Math.cos(((angle) * Math.PI) / 180)}
          y2={cy + r * Math.sin(((angle) * Math.PI) / 180)}
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
        />
        {/* Text */}
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontSize="1.25rem"
          fontWeight={700}
          fill="#222"
        >
          %{value.toFixed(1)}
        </text>
      </svg>
      <div className="font-semibold text-gray-700 text-base mt-2">{label}</div>
      <div className="text-xs text-gray-400">{info}</div>
      {/* Legend */}
      <div className="flex justify-between w-full mt-3 px-2 text-xs">
        <span className="text-green-600">Healthy</span>
        <span className="text-yellow-600">Risky</span>
        <span className="text-red-600">Unhealthy</span>
      </div>
    </div>
  );
}
