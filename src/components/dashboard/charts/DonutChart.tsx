'use client';

import React, { useEffect, useRef } from 'react';

interface DonutChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  centerText?: {
    main: string;
    sub: string;
  };
  size?: number;
  isLoading?: boolean;
}

export default function DonutChart({ data, centerText, size = 200, isLoading }: DonutChartProps) {
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
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    const innerRadius = radius * 0.6;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -Math.PI / 2; // Start from top

    // Draw donut segments
    data.forEach((item) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;

      // Create gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, radius);
      gradient.addColorStop(0, item.color + '40');
      gradient.addColorStop(1, item.color);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fill();

      // Add subtle border
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.stroke();

      currentAngle += sliceAngle;
    });

    // Draw center text
    if (centerText) {
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 24px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(centerText.main, centerX, centerY - 8);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px Inter, system-ui, sans-serif';
      ctx.fillText(centerText.sub, centerX, centerY + 12);
    }

  }, [data, centerText, size, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[200px] max-h-[200px]"
      />
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
