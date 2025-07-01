'use client';

import { useEffect, useRef } from 'react';

interface HarmonicLineChartProps {
  current: number[];
  previous: number[];
  timePeriod: 'day' | 'week' | 'month';
  isLoading?: boolean;
  chartId: string;
}

export default function HarmonicLineChart({ 
  current, 
  previous, 
  timePeriod,
  isLoading,
  chartId 
}: HarmonicLineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || isLoading) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 40, right: 40, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, width, height);

    // Find min and max values for scaling
    const allValues = [...current, ...previous];
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const valueRange = maxValue - minValue || 1;

    // Helper function to get Y position
    const getY = (value: number) => {
      return padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
    };

    // Helper function to get X position
    const getX = (index: number) => {
      return padding.left + (index / (current.length - 1)) * chartWidth;
    };

    // Draw grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i / 5) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
      const x = padding.left + (i / 6) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + chartHeight);
      ctx.stroke();
    }

    ctx.setLineDash([]);

    // Draw axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.stroke();

    // Draw Y-axis labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i <= 5; i++) {
      const value = minValue + (i / 5) * valueRange;
      const y = padding.top + chartHeight - (i / 5) * chartHeight;
      ctx.fillText(`${value.toFixed(1)}%`, padding.left - 10, y);
    }

    // Draw X-axis labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const labelCount = Math.min(7, current.length);
    for (let i = 0; i < labelCount; i++) {
      const index = Math.floor((i / (labelCount - 1)) * (current.length - 1));
      const x = getX(index);
      let label = '';
      
      switch (timePeriod) {
        case 'day':
          label = `${String(index).padStart(2, '0')}:00`;
          break;
        case 'week':
          label = `Day ${index + 1}`;
          break;
        case 'month':
          label = `Week ${index + 1}`;
          break;
        default:
          label = index.toString();
      }
      
      ctx.fillText(label, x, padding.top + chartHeight + 10);
    }

    // Draw current period line with area
    if (current.length > 0) {
      // Area fill
      const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(getX(0), padding.top + chartHeight);
      
      for (let i = 0; i < current.length; i++) {
        ctx.lineTo(getX(i), getY(current[i]));
      }
      
      ctx.lineTo(getX(current.length - 1), padding.top + chartHeight);
      ctx.closePath();
      ctx.fill();

      // Line
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(getX(0), getY(current[0]));
      
      for (let i = 1; i < current.length; i++) {
        ctx.lineTo(getX(i), getY(current[i]));
      }
      
      ctx.stroke();

      // Data points
      ctx.fillStyle = '#3b82f6';
      for (let i = 0; i < current.length; i++) {
        ctx.beginPath();
        ctx.arc(getX(i), getY(current[i]), 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Draw previous period line (dashed)
    if (previous.length > 0) {
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 4]);
      ctx.beginPath();
      ctx.moveTo(getX(0), getY(previous[0]));
      
      for (let i = 1; i < previous.length; i++) {
        ctx.lineTo(getX(i), getY(previous[i]));
      }
      
      ctx.stroke();
      ctx.setLineDash([]);

      // Data points
      ctx.fillStyle = '#475569';
      for (let i = 0; i < previous.length; i++) {
        ctx.beginPath();
        ctx.arc(getX(i), getY(previous[i]), 3, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Draw legend
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    // Current period legend
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(padding.left, 15, 16, 3);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Current Period', padding.left + 25, 16);

    // Previous period legend
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 2]);
    ctx.beginPath();
    ctx.moveTo(padding.left + 150, 16);
    ctx.lineTo(padding.left + 166, 16);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Previous Period', padding.left + 175, 16);

  }, [current, previous, timePeriod, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        id={chartId}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}
