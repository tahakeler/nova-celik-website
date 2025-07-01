'use client';

import React, { useEffect, useRef } from 'react';

interface EnergyMixChartProps {
  data: {
    solar: number[];
    wind: number[];
    grid: number[];
    battery: number[];
  };
  height?: number;
  isLoading?: boolean;
}

export default function EnergyMixChart({ data, height = 200, isLoading }: EnergyMixChartProps) {
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

    const colors = {
      solar: '#f59e0b',
      wind: '#06b6d4',
      grid: '#8b5cf6',
      battery: '#10b981'
    };

    // Calculate stacked areas
    const stackedData = data.solar.map((_, index) => ({
      solar: data.solar[index],
      wind: data.solar[index] + data.wind[index],
      grid: data.solar[index] + data.wind[index] + data.grid[index],
      battery: data.solar[index] + data.wind[index] + data.grid[index] + data.battery[index]
    }));

    const maxValue = Math.max(...stackedData.map(d => d.battery));

    // Draw stacked areas
    const drawArea = (values: number[], color: string, alpha: number = 0.7) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      
      values.forEach((value, index) => {
        const x = (index / (values.length - 1)) * width;
        const y = chartHeight - (value / maxValue) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.lineTo(width, chartHeight);
      ctx.lineTo(0, chartHeight);
      ctx.closePath();
      ctx.fill();
    };

    // Draw from bottom to top
    drawArea(stackedData.map(d => d.battery), colors.battery);
    drawArea(stackedData.map(d => d.grid), colors.grid);
    drawArea(stackedData.map(d => d.wind), colors.wind);
    drawArea(stackedData.map(d => d.solar), colors.solar);

    // Add legend
    ctx.globalAlpha = 1;
    ctx.font = '10px Arial';
    const legendItems = [
      { label: 'Solar', color: colors.solar },
      { label: 'Wind', color: colors.wind },
      { label: 'Grid', color: colors.grid },
      { label: 'Battery', color: colors.battery }
    ];

    legendItems.forEach((item, index) => {
      const x = 10 + (index * 60);
      const y = 20;
      
      ctx.fillStyle = item.color;
      ctx.fillRect(x, y - 8, 8, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(item.label, x + 12, y);
    });

  }, [data, isLoading]);

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
