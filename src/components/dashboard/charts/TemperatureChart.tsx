'use client';

import React, { useEffect, useRef } from 'react';

interface TemperatureChartProps {
  data: number[];
  height?: number;
  isLoading?: boolean;
}

export default function TemperatureChart({ data, height = 200, isLoading }: TemperatureChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || isLoading || !data.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const chartHeight = rect.height;

    ctx.clearRect(0, 0, width, chartHeight);

    const maxTemp = Math.max(...data);
    const minTemp = Math.min(...data);
    const range = maxTemp - minTemp || 1;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight);
    gradient.addColorStop(0, '#ef4444');
    gradient.addColorStop(0.5, '#f59e0b');
    gradient.addColorStop(1, '#10b981');

    // Draw temperature line
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((temp, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = chartHeight - ((temp - minTemp) / range) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Add area fill
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = gradient;
    ctx.lineTo(width, chartHeight);
    ctx.lineTo(0, chartHeight);
    ctx.closePath();
    ctx.fill();

    // Add temperature zones
    ctx.globalAlpha = 1;
    ctx.font = '12px Arial';
    ctx.fillStyle = '#ef4444';
    ctx.fillText(`${Math.floor(maxTemp)}°C`, width - 40, 20);
    ctx.fillStyle = '#10b981';
    ctx.fillText(`${Math.floor(minTemp)}°C`, width - 40, chartHeight - 10);

  }, [data, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={{ height }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
