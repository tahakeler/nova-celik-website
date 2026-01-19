'use client';

import React, { useEffect, useRef } from 'react';

interface VibrationChartProps {
  readonly vibration: number[];
  readonly pressure: number[];
  readonly height?: number;
  readonly isLoading?: boolean;
}

export default function VibrationChart({ 
  vibration, 
  pressure, 
  height = 280, 
  isLoading 
}: VibrationChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || isLoading || !vibration.length) return;

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

    const padding = 30;
    const barWidth = (width - padding * 2) / vibration.length * 0.8;
    const spacing = (width - padding * 2) / vibration.length * 0.2;
    const chartAreaHeight = chartHeight - padding * 2;

    const maxVibration = Math.max(...vibration);
    const maxPressure = Math.max(...pressure);

    // Draw vibration bars (blue)
    vibration.forEach((value, index) => {
      const barHeight = (value / maxVibration) * chartAreaHeight * 0.8;
      const x = padding + index * (barWidth + spacing);
      const y = chartHeight - padding - barHeight;

      // Gradient for vibration bars
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#1e40af');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth / 2, barHeight);

      // Value label
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toFixed(1), x + barWidth / 4, y - 5);
    });

    // Draw pressure bars (orange) - offset to the right
    pressure.forEach((value, index) => {
      const barHeight = (value / maxPressure) * chartAreaHeight * 0.8;
      const x = padding + index * (barWidth + spacing) + barWidth / 2;
      const y = chartHeight - padding - barHeight;

      // Gradient for pressure bars
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, '#f59e0b');
      gradient.addColorStop(1, '#d97706');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth / 2, barHeight);

      // Value label
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toFixed(1), x + barWidth / 4, y - 5);
    });

    // Draw legend
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(padding, 10, 15, 10);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Vibration', padding + 20, 20);

    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(padding + 100, 10, 15, 10);
    ctx.fillText('Pressure', padding + 120, 20);

  }, [vibration, pressure, isLoading]);

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
