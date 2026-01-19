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
}: LoadProfileChartProps): React.JSX.Element {
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

    // Draw enhanced grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartAreaHeight * i / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
      const x = padding + (chartWidth * i / 6);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, chartHeight - padding);
      ctx.stroke();
    }

    // Enhanced area chart for load profile
    const maxValue = Math.max(...hourlyLoad, peakDemand) * 1.1;
    const stepX = chartWidth / (hourlyLoad.length - 1);

    // Create enhanced gradient with multiple stops
    const areaGradient = ctx.createLinearGradient(0, padding, 0, chartHeight - padding);
    areaGradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)');
    areaGradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.4)');
    areaGradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.2)');
    areaGradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');

    // Draw smooth area with bezier curves
    ctx.beginPath();
    ctx.moveTo(padding, chartHeight - padding);
    
    hourlyLoad.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = padding + chartAreaHeight - (value / maxValue) * chartAreaHeight;
      
      if (index === 0) {
        ctx.lineTo(x, y);
      } else {
        // Create smooth curve
        const prevX = padding + (index - 1) * stepX;
        const prevY = padding + chartAreaHeight - (hourlyLoad[index - 1] / maxValue) * chartAreaHeight;
        const cp1x = prevX + (x - prevX) * 0.5;
        const cp1y = prevY;
        const cp2x = prevX + (x - prevX) * 0.5;
        const cp2y = y;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      }
    });
    
    ctx.lineTo(width - padding, chartHeight - padding);
    ctx.closePath();
    ctx.fillStyle = areaGradient;
    ctx.fill();

    // Draw enhanced line with glow effect
    const lineGradient = ctx.createLinearGradient(padding, 0, width - padding, 0);
    lineGradient.addColorStop(0, '#3b82f6CC');
    lineGradient.addColorStop(0.5, '#3b82f6');
    lineGradient.addColorStop(1, '#3b82f6CC');

    ctx.shadowColor = '#3b82f6';
    ctx.shadowBlur = 8;
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    hourlyLoad.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = padding + chartAreaHeight - (value / maxValue) * chartAreaHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        // Create smooth curve
        const prevX = padding + (index - 1) * stepX;
        const prevY = padding + chartAreaHeight - (hourlyLoad[index - 1] / maxValue) * chartAreaHeight;
        const cp1x = prevX + (x - prevX) * 0.5;
        const cp1y = prevY;
        const cp2x = prevX + (x - prevX) * 0.5;
        const cp2y = y;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      }
    });
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Add data points
    hourlyLoad.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = padding + chartAreaHeight - (value / maxValue) * chartAreaHeight;
      
      // Outer circle
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Inner circle
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw enhanced peak demand line
    const peakY = padding + chartAreaHeight - (peakDemand / maxValue) * chartAreaHeight;
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 6;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    ctx.moveTo(padding, peakY);
    ctx.lineTo(width - padding, peakY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.shadowBlur = 0;

    // Draw enhanced average load line
    const avgY = padding + chartAreaHeight - (averageLoad / maxValue) * chartAreaHeight;
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 6;
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    ctx.moveTo(padding, avgY);
    ctx.lineTo(width - padding, avgY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.shadowBlur = 0;

    // Draw enhanced time labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Poppins, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i < 24; i += 4) {
      const x = padding + (i / (hourlyLoad.length - 1)) * chartWidth;
      ctx.fillText(`${i}:00`, x, chartHeight - padding + 15);
    }

    // Draw Y-axis labels
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartAreaHeight * i / 5);
      const value = maxValue - (i / 5) * maxValue;
      ctx.fillText(value.toFixed(0), padding - 10, y);
    }

    // Enhanced legend with modern styling
    const legendItems = [
      { label: 'Load Profile', color: '#3b82f6', style: 'solid' },
      { label: 'Peak Demand', color: '#ef4444', style: 'dashed' },
      { label: 'Average Load', color: '#10b981', style: 'dashed' }
    ];

    const legendPadding = 15;
    const legendY = legendPadding;
    const legendHeight = 35;
    const legendWidth = 320;
    const legendX = (width - legendWidth) / 2;

    // Draw legend background
    ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
    ctx.beginPath();
    ctx.roundRect(legendX, legendY, legendWidth, legendHeight, 8);
    ctx.fill();

    // Draw legend items
    legendItems.forEach((item, index) => {
      const x = legendX + 20 + index * (legendWidth / 3);
      const y = legendY + legendHeight / 2;

      // Draw line indicator
      ctx.strokeStyle = item.color;
      ctx.lineWidth = 3;
      if (item.style === 'dashed') {
        ctx.setLineDash([6, 3]);
      } else {
        ctx.setLineDash([]);
      }
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 20, y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw label
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '13px Poppins, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.label, x + 28, y);
    });

  }, [hourlyLoad, peakDemand, averageLoad, isLoading]);

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
