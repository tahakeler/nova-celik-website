'use client';

import React, { useEffect, useRef } from 'react';

interface BarChartProps {
  data: {
    labels: string[];
    values: number[];
    colors?: string[];
  };
  height?: number;
  isLoading?: boolean;
}

export default function BarChart({ data, height = 200, isLoading }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || isLoading) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const padding = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const maxValue = Math.max(...data.values);
    const barWidth = chartWidth / data.values.length * 0.6;
    const barSpacing = chartWidth / data.values.length * 0.4;

    // Default colors
    const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

    // Draw bars
    data.values.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding.left + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = padding.top + chartHeight - barHeight;

      // Bar gradient
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      const color = data.colors?.[index] || defaultColors[index % defaultColors.length];
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color + '80');

      // Draw bar
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value on top of bar
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5);

      // Draw label
      ctx.fillStyle = '#64748b';
      ctx.textBaseline = 'top';
      ctx.fillText(data.labels[index], x + barWidth / 2, height - padding.bottom + 8);
    });

    // Draw Y-axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Inter, system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i <= 4; i++) {
      const value = (maxValue / 4) * i;
      const y = padding.top + chartHeight - (i / 4) * chartHeight;
      ctx.fillText(value.toFixed(0), padding.left - 8, y);
    }

  }, [data, height, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ height }}
      />
    </div>
  );
}
