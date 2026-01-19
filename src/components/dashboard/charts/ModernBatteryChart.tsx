'use client';

import React, { useEffect, useRef } from 'react';

interface ModernBatteryChartProps {
  readonly chargeLevel: number;
  readonly voltage: number;
  readonly current: number;
  readonly temperature: number;
  readonly height?: number;
  readonly isLoading?: boolean;
}

export default function ModernBatteryChart({ 
  chargeLevel, 
  voltage,
  current,
  temperature,
  height = 280, 
  isLoading 
}: ModernBatteryChartProps) {
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

    // Battery dimensions
    const batteryWidth = 120;
    const batteryHeight = 200;
    const terminalWidth = 40;
    const terminalHeight = 20;
    const padding = 2;

    const centerX = width / 2;
    const centerY = chartHeight / 2;
    const batteryX = centerX - batteryWidth / 2;
    const batteryY = centerY - batteryHeight / 2;

    // Draw battery outline with rounded corners
    ctx.beginPath();
    ctx.roundRect(batteryX, batteryY, batteryWidth, batteryHeight, 10);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw terminal
    ctx.beginPath();
    ctx.roundRect(
      centerX - terminalWidth / 2,
      batteryY - terminalHeight,
      terminalWidth,
      terminalHeight,
      5
    );
    ctx.fillStyle = '#475569';
    ctx.fill();

    // Draw charge level
    const fillHeight = (batteryHeight - padding * 2) * (chargeLevel / 100);
    const fillY = batteryY + batteryHeight - padding - fillHeight;

    // Create gradient based on charge level
    const gradient = ctx.createLinearGradient(
      batteryX,
      fillY,
      batteryX,
      batteryY + batteryHeight - padding
    );

    if (chargeLevel > 60) {
      gradient.addColorStop(0, '#10b981');
      gradient.addColorStop(1, '#059669');
    } else if (chargeLevel > 20) {
      gradient.addColorStop(0, '#f59e0b');
      gradient.addColorStop(1, '#d97706');
    } else {
      gradient.addColorStop(0, '#ef4444');
      gradient.addColorStop(1, '#dc2626');
    }

    // Draw charge fill with rounded corners
    ctx.beginPath();
    ctx.roundRect(
      batteryX + padding,
      fillY,
      batteryWidth - padding * 2,
      fillHeight,
      8
    );
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    const gridGap = (batteryHeight - padding * 2) / 10;

    for (let i = 1; i < 10; i++) {
      const y = batteryY + padding + gridGap * i;
      ctx.beginPath();
      ctx.moveTo(batteryX + padding, y);
      ctx.lineTo(batteryX + batteryWidth - padding, y);
      ctx.stroke();
    }

    // Draw charge percentage
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.floor(chargeLevel)}%`, centerX, centerY);

    // Draw stats
    const drawStat = (label: string, value: string, x: number, y: number) => {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(label, x, y);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(value, x, y + 20);
    };

    // Draw battery stats with icons
    const statsStartX = batteryX + batteryWidth + 20;
    const statsStartY = centerY - 60;

    drawStat('Voltage', `${voltage}V`, statsStartX, statsStartY);
    drawStat('Current', `${current}A`, statsStartX, statsStartY + 50);
    drawStat('Temp', `${temperature}°C`, statsStartX, statsStartY + 100);

    // Draw glow effect
    const glowColor = chargeLevel > 60 ? '#10b98180' : 
                     chargeLevel > 20 ? '#f59e0b80' : '#ef444480';
    
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.roundRect(
      batteryX + padding,
      fillY,
      batteryWidth - padding * 2,
      fillHeight,
      8
    );
    ctx.fill();
    ctx.shadowBlur = 0;

  }, [chargeLevel, voltage, current, temperature, isLoading]);

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
