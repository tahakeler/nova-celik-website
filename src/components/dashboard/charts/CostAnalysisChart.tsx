'use client';

import React, { useEffect, useRef } from 'react';

interface CostAnalysisChartProps {
  data: {
    operational: number[];
    maintenance: number[];
    fuel: number[];
  };
  height?: number;
  isLoading?: boolean;
}

export default function CostAnalysisChart({ data, isLoading }: CostAnalysisChartProps) {
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
      operational: '#3b82f6',
      maintenance: '#f59e0b',
      fuel: '#ef4444'
    };

    // Calculate max value for scaling
    const allValues = [...data.operational, ...data.maintenance, ...data.fuel];
    const maxValue = Math.max(...allValues);

    // Draw bars
    const barWidth = width / data.operational.length * 0.8;
    const spacing = width / data.operational.length * 0.2;
    const barGroupWidth = barWidth / 3;

    data.operational.forEach((_, index) => {
      const x = index * (barWidth + spacing);
      
      // Operational costs
      const opHeight = (data.operational[index] / maxValue) * chartHeight * 0.8;
      ctx.fillStyle = colors.operational;
      ctx.fillRect(x, chartHeight - opHeight, barGroupWidth, opHeight);
      
      // Maintenance costs
      const maintHeight = (data.maintenance[index] / maxValue) * chartHeight * 0.8;
      ctx.fillStyle = colors.maintenance;
      ctx.fillRect(x + barGroupWidth, chartHeight - maintHeight, barGroupWidth, maintHeight);
      
      // Fuel costs
      const fuelHeight = (data.fuel[index] / maxValue) * chartHeight * 0.8;
      ctx.fillStyle = colors.fuel;
      ctx.fillRect(x + barGroupWidth * 2, chartHeight - fuelHeight, barGroupWidth, fuelHeight);
    });

    // Add legend
    ctx.font = '10px Arial';
    const legendItems = [
      { label: 'Operational', color: colors.operational },
      { label: 'Maintenance', color: colors.maintenance },
      { label: 'Fuel', color: colors.fuel }
    ];

    legendItems.forEach((item, index) => {
      const x = 10 + (index * 80);
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
