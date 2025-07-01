'use client';

import React, { useEffect, useRef } from 'react';

interface LineChartProps {
  data: {
    current: number[];
    previous: number[];
    labels: string[];
  };
  height?: number;
  isLoading?: boolean;
}

export default function LineChart({ data, height = 300, isLoading }: LineChartProps) {
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
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find min and max values
    const allValues = [...data.current, ...data.previous];
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const valueRange = maxValue - minValue || 1;

    // Helper functions
    const getY = (value: number) => {
      return padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
    };

    const getX = (index: number) => {
      return padding.left + (index / (data.current.length - 1)) * chartWidth;
    };

    // Draw grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (i / 4) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
      const x = padding.left + (i / 6) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, height - padding.bottom);
      ctx.stroke();
    }

    // Draw axes labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Inter, system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    // Y-axis labels
    for (let i = 0; i <= 4; i++) {
      const value = minValue + (i / 4) * valueRange;
      const y = padding.top + chartHeight - (i / 4) * chartHeight;
      ctx.fillText(`${value.toFixed(0)}`, padding.left - 8, y);
    }

    // X-axis labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const labelStep = Math.ceil(data.labels.length / 6);
    for (let i = 0; i < data.labels.length; i += labelStep) {
      const x = getX(i);
      ctx.fillText(data.labels[i], x, height - padding.bottom + 8);
    }

    // Draw current period line
    const drawLine = (points: number[], color: string, isDashed = false) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      if (isDashed) ctx.setLineDash([4, 4]);
      else ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(getX(0), getY(points[0]));

      // Create smooth curve
      for (let i = 1; i < points.length; i++) {
        const x = getX(i);
        const y = getY(points[i]);
        const prevX = getX(i - 1);
        const prevY = getY(points[i - 1]);
        
        const cp1x = prevX + (x - prevX) / 3;
        const cp1y = prevY;
        const cp2x = prevX + (x - prevX) * 2 / 3;
        const cp2y = y;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      }
      
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // Draw area under current line
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(getX(0), height - padding.bottom);
    ctx.lineTo(getX(0), getY(data.current[0]));

    for (let i = 1; i < data.current.length; i++) {
      const x = getX(i);
      const y = getY(data.current[i]);
      ctx.lineTo(x, y);
    }

    ctx.lineTo(getX(data.current.length - 1), height - padding.bottom);
    ctx.closePath();
    ctx.fill();

    // Draw lines
    drawLine(data.current, '#3b82f6');
    drawLine(data.previous, '#64748b', true);

    // Draw points for current line
    ctx.fillStyle = '#3b82f6';
    data.current.forEach((value, i) => {
      ctx.beginPath();
      ctx.arc(getX(i), getY(value), 3, 0, Math.PI * 2);
      ctx.fill();
    });

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
