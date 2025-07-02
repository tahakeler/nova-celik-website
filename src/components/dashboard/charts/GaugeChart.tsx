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

    // Draw outer glow
    const glowGradient = ctx.createRadialGradient(centerX, centerY, radius - 20, centerX, centerY, radius + 20);
    glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
    glowGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
    glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 20, 0, Math.PI * 2);
    ctx.fill();

    // Draw background track with gradient
    const trackGradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
    trackGradient.addColorStop(0, 'rgba(30, 41, 59, 0.8)');
    trackGradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.6)');
    trackGradient.addColorStop(1, 'rgba(30, 41, 59, 0.8)');

    ctx.strokeStyle = trackGradient;
    ctx.lineWidth = 24;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();

    // Draw value arc with enhanced gradient
    const valueGradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
    valueGradient.addColorStop(0, color + 'CC');
    valueGradient.addColorStop(0.5, color);
    valueGradient.addColorStop(1, color + 'CC');

    ctx.strokeStyle = valueGradient;
    ctx.lineWidth = 24;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, valueAngle);
    ctx.stroke();

    // Draw subtle tick marks
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 20; i++) {
      const angle = startAngle + (i / 20) * (endAngle - startAngle);
      const isMainTick = i % 4 === 0;
      const tickRadius = radius - 16;
      const tickEndRadius = radius + (isMainTick ? 16 : 12);
      
      const x1 = centerX + Math.cos(angle) * tickRadius;
      const y1 = centerY + Math.sin(angle) * tickRadius;
      const x2 = centerX + Math.cos(angle) * tickEndRadius;
      const y2 = centerY + Math.sin(angle) * tickEndRadius;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Draw tick values for main ticks
      if (isMainTick) {
        const tickValue = Math.round((i / 20) * max);
        const textRadius = tickEndRadius + 15;
        const textX = centerX + Math.cos(angle) * textRadius;
        const textY = centerY + Math.sin(angle) * textRadius;
        
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Poppins, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tickValue.toString(), textX, textY);
      }
    }

    // Draw center display with enhanced styling
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50);
    centerGradient.addColorStop(0, 'rgba(30, 41, 59, 0.95)');
    centerGradient.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
    
    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
    ctx.fill();

    // Add subtle border to center display
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw value with enhanced styling
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Poppins, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${value}${unit}`, centerX, centerY - 8);

    // Draw label with enhanced styling
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Poppins, system-ui, sans-serif';
    ctx.fillText(label, centerX, centerY + 16);

    // Draw animated needle with glow
    const needleAngle = valueAngle;
    const needleLength = radius - 60;
    const needleWidth = 4;
    
    // Add glow effect to needle
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.strokeStyle = color;
    ctx.lineWidth = needleWidth;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(needleAngle) * needleLength,
      centerY + Math.sin(needleAngle) * needleLength
    );
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;

    // Draw needle base with gradient
    const baseGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 8);
    baseGradient.addColorStop(0, color);
    baseGradient.addColorStop(1, color + '80');
    
    ctx.fillStyle = baseGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
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
