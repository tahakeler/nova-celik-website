'use client';

import React, { useEffect, useRef } from 'react';

interface EfficiencyChartProps {
  readonly efficiency: number[];
  readonly emissions: number[];
  readonly height?: number;
  readonly isLoading?: boolean;
}

export default function EfficiencyChart({ 
  efficiency, 
  emissions, 
  isLoading 
}: EfficiencyChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || isLoading || !efficiency.length) return;

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

    // Draw dual line chart
    const maxEfficiency = Math.max(...efficiency);
    const maxEmissions = Math.max(...emissions);
    const stepX = chartWidth / (efficiency.length - 1);

    // Draw efficiency line (green)
    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    efficiency.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = padding + chartAreaHeight - (value / maxEfficiency) * chartAreaHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw emissions line (red)
    ctx.beginPath();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    emissions.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = padding + chartAreaHeight - (value / maxEmissions) * chartAreaHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw legend
    ctx.fillStyle = '#10b981';
    ctx.fillRect(padding, padding - 20, 15, 3);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.fillText('Efficiency', padding + 20, padding - 15);

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(padding + 100, padding - 20, 15, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Emissions', padding + 120, padding - 15);

  }, [efficiency, emissions, isLoading]);

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
