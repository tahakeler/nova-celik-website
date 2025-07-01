'use client';

import React, { useEffect, useRef } from 'react';

interface ConsumptionChartProps {
  readonly data: number[];
  readonly labels: string[];
  readonly height?: number;
  readonly isLoading?: boolean;
}

export default function ConsumptionChart({ 
  data, 
  labels, 
  height = 280, 
  isLoading 
}: ConsumptionChartProps) {
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

    const maxValue = Math.max(...data);
    const barWidth = width / data.length * 0.8;
    const spacing = width / data.length * 0.2;
    const chartAreaHeight = chartHeight * 0.8;

    // Colors for bars (alternating yellow and gray)
    const colors = ['#f59e0b', '#6b7280'];

    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartAreaHeight;
      const x = index * (barWidth + spacing) + spacing / 2;
      const y = chartHeight - barHeight - 20;

      // Draw bar
      ctx.fillStyle = colors[index % 2];
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value on top
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5);

      // Draw label at bottom
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Arial';
      if (labels[index]) {
        ctx.fillText(labels[index], x + barWidth / 2, chartHeight - 5);
      }
    });

  }, [data, labels, isLoading]);

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
