'use client';

import React, { useEffect, useRef } from 'react';

interface GaugeChartProps {
  value: number;
  max: number;
  label: string;
  unit?: string;
  color?: string;
  size?: number;
  isLoading?: boolean;
}

export default function GaugeChart({ 
  value, 
  max, 
  label, 
  unit = '%', 
  color = '#3b82f6',
  size = 200,
  isLoading 
}: GaugeChartProps) {
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
    const centerY = height / 2 + 20;
    const radius = Math.min(width, height) / 2 - 30;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const startAngle = Math.PI;
    const endAngle = 2 * Math.PI;
    const valueAngle = startAngle + (value / max) * (endAngle - startAngle);

    // Draw background arc
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();

    // Draw value arc with gradient
    const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, color + '80');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, valueAngle);
    ctx.stroke();

    // Draw center value
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 32px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${value}${unit}`, centerX, centerY - 10);

    // Draw label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Inter, system-ui, sans-serif';
    ctx.fillText(label, centerX, centerY + 20);

    // Draw tick marks
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 10; i++) {
      const angle = startAngle + (i / 10) * (endAngle - startAngle);
      const tickRadius = radius + 8;
      const tickEndRadius = radius + 15;
      
      const x1 = centerX + Math.cos(angle) * tickRadius;
      const y1 = centerY + Math.sin(angle) * tickRadius;
      const x2 = centerX + Math.cos(angle) * tickEndRadius;
      const y2 = centerY + Math.sin(angle) * tickEndRadius;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Draw needle
    const needleAngle = valueAngle;
    const needleLength = radius - 10;
    
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(needleAngle) * needleLength,
      centerY + Math.sin(needleAngle) * needleLength
    );
    ctx.stroke();

    // Draw center dot
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
    ctx.fill();

  }, [value, max, label, unit, color, size, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[250px] max-h-[200px]"
      />
    </div>
  );
}
