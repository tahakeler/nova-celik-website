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

    // Draw grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (chartWidth * i / 10);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, chartHeight - padding);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartAreaHeight * i / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw data lines
    const drawLine = (data: number[], color: string) => {
      const maxValue = Math.max(...data);
      const stepX = chartWidth / (data.length - 1);

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      data.forEach((value, index) => {
        const x = padding + index * stepX;
        const y = padding + chartAreaHeight - (value / maxValue) * chartAreaHeight;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    };

    // Draw voltage line (blue)
    drawLine(voltage, '#3b82f6');
    
    // Draw current line (green)
    drawLine(current, '#10b981');
    
    // Draw THD line (yellow)
    drawLine(thd, '#f59e0b');

    // Draw legend
    const legendItems = [
      { label: 'Voltage', color: '#3b82f6' },
      { label: 'Current', color: '#10b981' },
      { label: 'THD', color: '#f59e0b' }
    ];

    legendItems.forEach((item, index) => {
      const x = padding + index * 100;
      ctx.fillStyle = item.color;
      ctx.fillRect(x, 15, 20, 2);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px Arial';
      ctx.fillText(item.label, x + 25, 20);
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
