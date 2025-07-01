'use client';

import React, { useEffect, useRef } from 'react';

interface PowerFactorChartProps {
  powerFactor: number;
  frequency: number;
  height?: number;
  isLoading?: boolean;
}

export default function PowerFactorChart({ 
  powerFactor, 
  frequency, 
  height = 280, 
  isLoading 
}: PowerFactorChartProps) {
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

    // Draw two modern circular progress indicators
    const centerY = chartHeight / 2;
    const radius = Math.min(width / 4, chartHeight / 3);

    // Power Factor (left)
    const leftX = width / 4;
    const pfPercentage = powerFactor * 100;
    
    // Background circle
    ctx.beginPath();
    ctx.arc(leftX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 12;
    ctx.stroke();

    // Progress arc
    ctx.beginPath();
    ctx.arc(leftX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + (2 * Math.PI * pfPercentage / 100));
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Center text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(powerFactor.toFixed(2), leftX, centerY - 5);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Arial';
    ctx.fillText('Power Factor', leftX, centerY + 20);

    // Frequency (right)
    const rightX = (width * 3) / 4;
    const freqPercentage = ((frequency - 49) / 2) * 100; // Assuming 49-51 Hz range
    
    // Background circle
    ctx.beginPath();
    ctx.arc(rightX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 12;
    ctx.stroke();

    // Progress arc
    ctx.beginPath();
    ctx.arc(rightX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + (2 * Math.PI * freqPercentage / 100));
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Center text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${frequency.toFixed(1)}`, rightX, centerY - 5);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Arial';
    ctx.fillText('Frequency (Hz)', rightX, centerY + 20);

  }, [powerFactor, frequency, isLoading]);

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
