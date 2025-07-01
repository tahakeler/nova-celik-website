'use client';

import React, { useEffect, useRef } from 'react';

interface StepMaintenanceChartProps {
  readonly healthySteps: number;
  readonly riskySteps: number;
  readonly unhealthySteps: number;
  readonly height?: number;
  readonly isLoading?: boolean;
}

export default function StepMaintenanceChart({ 
  healthySteps, 
  riskySteps, 
  unhealthySteps, 
  height = 280, 
  isLoading 
}: StepMaintenanceChartProps) {
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

    // Draw three battery-like containers
    const containerWidth = width / 3 - 20;
    const containerHeight = chartHeight * 0.6;
    const startY = chartHeight * 0.1;

    const steps = [
      { value: healthySteps, color: '#84cc16', label: 'Healthy Steps', number: '1' },
      { value: riskySteps, color: '#f59e0b', label: 'Risky Steps', number: '2' },
      { value: unhealthySteps, color: '#ef4444', label: 'Unhealthy Steps', number: '3' }
    ];

    steps.forEach((step, index) => {
      const x = index * (containerWidth + 20) + 10;
      
      // Draw container outline
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, startY, containerWidth, containerHeight);
      
      // Draw fill based on value
      const fillHeight = (step.value / 100) * containerHeight;
      ctx.fillStyle = step.color;
      ctx.fillRect(x + 2, startY + containerHeight - fillHeight, containerWidth - 4, fillHeight - 2);
      
      // Draw terminal on top
      const terminalWidth = containerWidth * 0.3;
      const terminalHeight = 8;
      ctx.fillStyle = '#64748b';
      ctx.fillRect(x + (containerWidth - terminalWidth) / 2, startY - terminalHeight, terminalWidth, terminalHeight);
      
      // Draw step number
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(step.number, x + containerWidth / 2, startY + containerHeight / 2);
      
      // Draw label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px Arial';
      ctx.fillText(step.label, x + containerWidth / 2, startY + containerHeight + 20);
    });

  }, [healthySteps, riskySteps, unhealthySteps, isLoading]);

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
