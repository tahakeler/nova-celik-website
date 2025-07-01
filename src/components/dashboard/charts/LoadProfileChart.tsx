'use client';

import React, { useEffect, useRef } from 'react';

interface LoadProfileChartProps {
  readonly hourlyLoad: number[];
  readonly peakDemand: number;
  readonly averageLoad: number;
  readonly height?: number;
  readonly isLoading?: boolean;
}

export default function LoadProfileChart({ 
  hourlyLoad, 
  peakDemand,
  averageLoad,
  height = 280, 
  isLoading 
}: LoadProfileChartProps) {
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

    // Draw area chart for load profile
    const maxValue = Math.max(...hourlyLoad);
    const stepX = chartWidth / (hourlyLoad.length - 1);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, chartHeight - padding);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');

    // Draw area
    ctx.beginPath();
    ctx.moveTo(padding, chartHeight - padding);
    
    hourlyLoad.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = padding + chartAreaHeight - (value / maxValue) * chartAreaHeight;
      ctx.lineTo(x, y);
    });
    
    ctx.lineTo(width - padding, chartHeight - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    
    hourlyLoad.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = padding + chartAreaHeight - (value / maxValue) * chartAreaHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw peak demand line
    const peakY = padding + chartAreaHeight - (peakDemand / maxValue) * chartAreaHeight;
    ctx.beginPath();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.moveTo(padding, peakY);
    ctx.lineTo(width - padding, peakY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw average load line
    const avgY = padding + chartAreaHeight - (averageLoad / maxValue) * chartAreaHeight;
    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.moveTo(padding, avgY);
    ctx.lineTo(width - padding, avgY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw time labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    for (let i = 0; i < 24; i += 4) {
      const x = padding + (i / (hourlyLoad.length - 1)) * chartWidth;
      ctx.fillText(`${i}:00`, x, chartHeight - 10);
    }

    // Draw legend
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(padding, 15, 15, 2);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Load Profile', padding + 20, 20);

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(padding + 120, 15, 15, 2);
    ctx.fillText('Peak Demand', padding + 140, 20);

    ctx.fillStyle = '#10b981';
    ctx.fillRect(padding + 240, 15, 15, 2);
    ctx.fillText('Average Load', padding + 260, 20);

  }, [hourlyLoad, peakDemand, averageLoad, isLoading]);

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
