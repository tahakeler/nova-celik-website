'use client';

import React, { useEffect, useRef } from 'react';

interface MiniChartProps {
  value: number;
  label: string;
  color: string;
  type: 'line' | 'bar' | 'circle';
  data?: number[];
  isLoading?: boolean;
}

export default function MiniChart({ 
  value, 
  label, 
  color, 
  type, 
  data = [],
  isLoading 
}: MiniChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const roundedValue = Math.floor(value);

  useEffect(() => {
    if (!canvasRef.current || isLoading || type === 'circle') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (type === 'line' && data.length > 0) {
      // Draw mini line chart
      const maxValue = Math.max(...data);
      const minValue = Math.min(...data);
      const range = maxValue - minValue || 1;

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((point - minValue) / range) * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Add area fill
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = color;
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
    } else if (type === 'bar' && data.length > 0) {
      // Draw mini bar chart
      const maxValue = Math.max(...data);
      const barWidth = width / data.length * 0.8;
      const spacing = width / data.length * 0.2;

      ctx.fillStyle = color;
      data.forEach((point, index) => {
        const barHeight = (point / maxValue) * height;
        const x = index * (barWidth + spacing);
        const y = height - barHeight;
        
        ctx.fillRect(x, y, barWidth, barHeight);
      });
    }
  }, [data, color, type, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400 text-xs">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      {type === 'circle' ? (
        <div className="relative w-16 h-16">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#1e293b"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeDasharray={`${roundedValue}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-300">{roundedValue}%</span>
          </div>
        </div>
      ) : (
        <div className="w-full h-8">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      )}
      
      <div className="text-center">
        <div className="text-lg font-bold" style={{ color }}>{roundedValue}%</div>
        <div className="text-xs text-gray-400">{label}</div>
      </div>
    </div>
  );
}
