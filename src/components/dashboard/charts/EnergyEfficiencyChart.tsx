'use client';

import React, { useEffect, useRef } from 'react';

interface EnergyEfficiencyChartProps {
  readonly efficiency: number[];
  readonly targetEfficiency: number;
  readonly energySavings: number[];
  readonly height?: number;
  readonly isLoading?: boolean;
}

export default function EnergyEfficiencyChart({ 
  efficiency, 
  targetEfficiency,
  energySavings,
  height = 280, 
  isLoading 
}: EnergyEfficiencyChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || isLoading) return;

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

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartAreaHeight = chartHeight - padding * 2;

    // Draw efficiency bars
    const barWidth = chartWidth / efficiency.length * 0.6;
    const spacing = chartWidth / efficiency.length * 0.4;

    efficiency.forEach((value, index) => {
      const x = padding + index * (barWidth + spacing);
      const barHeight = (value / 100) * chartAreaHeight;
      const y = chartHeight - padding - barHeight;

      // Color based on efficiency vs target
      const color = value >= targetEfficiency ? '#10b981' : value >= targetEfficiency * 0.9 ? '#f59e0b' : '#ef4444';
      
      // Draw bar with gradient
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color + '80');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw efficiency percentage on top
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${value?.toFixed(1) ?? '0'}%`, x + barWidth / 2, y - 5);

      // Draw savings below
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Arial';
      ctx.fillText(`${energySavings[index]?.toFixed(1) ?? '0'}kW`, x + barWidth / 2, chartHeight - padding + 15);
    });

    // Draw target efficiency line
    const targetY = chartHeight - padding - (targetEfficiency / 100) * chartAreaHeight;
    ctx.beginPath();
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.moveTo(padding, targetY);
    ctx.lineTo(width - padding, targetY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Target label
    ctx.fillStyle = '#8b5cf6';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Target: ${targetEfficiency}%`, padding + 10, targetY - 5);

    // Draw legend
    ctx.fillStyle = '#10b981';
    ctx.fillRect(padding, 15, 15, 10);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Arial';
    ctx.fillText('Excellent', padding + 20, 25);

    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(padding + 100, 15, 15, 10);
    ctx.fillText('Good', padding + 120, 25);

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(padding + 170, 15, 15, 10);
    ctx.fillText('Needs Improvement', padding + 190, 25);

  }, [efficiency, targetEfficiency, energySavings, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
