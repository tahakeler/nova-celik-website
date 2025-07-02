'use client';

import React, { useEffect, useRef } from 'react';

interface PowerQualityChartProps {
  readonly voltage: number[];
  readonly current: number[];
  readonly thd: number[];
  readonly height?: number;
  readonly isLoading?: boolean;
}

export default function PowerQualityChart({ 
  voltage, 
  current, 
  thd,
  height = 280, 
  isLoading 
}: PowerQualityChartProps) {
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

    // Draw enhanced grid with subtle styling
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;

    // Vertical grid lines with labels
    for (let i = 0; i <= 10; i++) {
      const x = padding + (chartWidth * i / 10);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, chartHeight - padding);
      ctx.stroke();

      // Time labels
      ctx.fillStyle = '#64748b';
      ctx.font = '12px Poppins, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${i * 2}h`, x, chartHeight - padding + 20);
    }

    // Horizontal grid lines with value labels
    const maxValue = Math.max(...voltage, ...current, ...thd);
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartAreaHeight * i / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Value labels
      const value = maxValue - (i / 5) * maxValue;
      ctx.fillStyle = '#64748b';
      ctx.font = '12px Poppins, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(value.toFixed(0), padding - 10, y);
    }

    // Enhanced line drawing function with gradient and glow
    const drawLine = (data: number[], color: string) => {
      const stepX = chartWidth / (data.length - 1);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(padding, 0, width - padding, 0);
      gradient.addColorStop(0, color + 'CC');
      gradient.addColorStop(0.5, color);
      gradient.addColorStop(1, color + 'CC');

      // Draw line with glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      data.forEach((value, index) => {
        const x = padding + index * stepX;
        const y = padding + chartAreaHeight - (value / maxValue) * chartAreaHeight;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          // Create smooth curve
          const prevX = padding + (index - 1) * stepX;
          const prevY = padding + chartAreaHeight - (data[index - 1] / maxValue) * chartAreaHeight;
          const cp1x = prevX + (x - prevX) * 0.5;
          const cp1y = prevY;
          const cp2x = prevX + (x - prevX) * 0.5;
          const cp2y = y;
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        }
      });
      ctx.stroke();

      // Reset shadow
      ctx.shadowBlur = 0;

      // Add subtle points at data points
      data.forEach((value, index) => {
        const x = padding + index * stepX;
        const y = padding + chartAreaHeight - (value / maxValue) * chartAreaHeight;
        
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Draw lines with enhanced styling
    drawLine(voltage, '#3b82f6'); // Voltage (blue)
    drawLine(current, '#10b981'); // Current (green)
    drawLine(thd, '#f59e0b');     // THD (yellow)

    // Enhanced legend with modern styling
    const legendItems = [
      { label: 'Voltage', color: '#3b82f6' },
      { label: 'Current', color: '#10b981' },
      { label: 'THD', color: '#f59e0b' }
    ];

    const legendPadding = 15;
    const legendY = legendPadding;
    const legendHeight = 30;
    const legendWidth = 280;
    const legendX = (width - legendWidth) / 2;

    // Draw legend background
    ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
    ctx.beginPath();
    ctx.roundRect(legendX, legendY, legendWidth, legendHeight, 8);
    ctx.fill();

    // Draw legend items with enhanced styling
    legendItems.forEach((item, index) => {
      const x = legendX + 20 + index * (legendWidth / 3);
      const y = legendY + legendHeight / 2;

      // Draw color indicator with glow
      ctx.shadowColor = item.color;
      ctx.shadowBlur = 6;
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw label with enhanced font
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '13px Poppins, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.label, x + 12, y);
    });

  }, [voltage, current, thd, isLoading]);

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
