'use client';

import React, { useEffect, useRef } from 'react';

interface ReactiveRatiosChartProps {
  readonly inductiveValue: number;
  readonly capacitiveValue: number;
  readonly height?: number;
  readonly isLoading?: boolean;
}

export default function ReactiveRatiosChart({ 
  inductiveValue, 
  capacitiveValue, 
  height = 280, 
  isLoading 
}: ReactiveRatiosChartProps) {
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

    // Draw two gauge charts side by side
    const gaugeWidth = width / 2 - 20;
    const centerY = chartHeight / 2;
    const radius = Math.min(gaugeWidth, chartHeight) / 3;

    // Helper function to draw gauge
    const drawGauge = (x: number, value: number, color: string, label: string) => {
      const centerX = x;
      
      // Background arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 12;
      ctx.stroke();

      // Value arc
      const angle = Math.PI * (value / 100);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, Math.PI, Math.PI + angle, false);
      ctx.strokeStyle = color;
      ctx.lineWidth = 12;
      ctx.stroke();

      // Center text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`%${Math.floor(value)}`, centerX, centerY - 10);
      
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px Arial';
      ctx.fillText(label, centerX, centerY + 20);
    };

    // Draw Inductive gauge
    drawGauge(gaugeWidth / 2 + 10, inductiveValue, '#84cc16', 'Inductive');
    
    // Draw Capacitive gauge
    drawGauge(width - gaugeWidth / 2 - 10, capacitiveValue, '#f59e0b', 'Capacitive');

  }, [inductiveValue, capacitiveValue, isLoading]);

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
