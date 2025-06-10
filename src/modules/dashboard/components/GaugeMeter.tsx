'use client';

interface GaugeMeterProps {
  value: number;
  max: number;
  color: string;
  size?: number;
}

export default function GaugeMeter({ value, max, color, size = 80 }: Readonly<GaugeMeterProps>) {
  const angle = (Math.min(value, max) / max) * 180;
  const r = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;
  const a = (Math.PI * angle) / 180;
  const x = cx + r * Math.cos(Math.PI - a);
  const y = cy + r * Math.sin(Math.PI - a);

  return (
    <div>
      <svg width={size} height={size / 1.5} viewBox={`0 0 ${size} ${size / 1.5}`}>
        <path
          d={`M${cx - r},${cy} A${r},${r} 0 0,1 ${cx + r},${cy}`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        <path
          d={`M${cx - r},${cy} A${r},${r} 0 0,1 ${x},${y}`}
          fill="none"
          stroke={color}
          strokeWidth="10"
        />
        <circle cx={cx} cy={cy} r="8" fill={color} />
      </svg>
      <div className="mt-2 text-center">
        <span className="text-lg font-bold" style={{ color }}>{Math.round(value)}</span>
        <div className="text-sm text-gray-600">of {max}</div>
      </div>
    </div>
  );
}