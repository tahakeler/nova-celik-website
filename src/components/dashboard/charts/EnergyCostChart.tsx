'use client';

import React, { useEffect, useRef } from 'react';

interface EnergyCostChartProps {
  readonly peakCost: number[];
  readonly offPeakCost: number[];
  readonly totalSavings: number;
  readonly projectedCost: number;
  readonly height?: number;
  readonly isLoading?: boolean;
}

export default function EnergyCostChart({ 
  peakCost, 
  offPeakCost,
  totalSavings,
  projectedCost,
  isLoading 
}: EnergyCostChartProps) {
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

    // Draw stacked bar chart
    const barWidth = chartWidth / peakCost.length * 0.7;
    const spacing = chartWidth / peakCost.length * 0.3;
    const maxValue = Math.max(...peakCost.map((v, i) => v + offPeakCost[i]));

    peakCost.forEach((peak, index) => {
      const x = padding + index * (barWidth + spacing);
      const offPeak = offPeakCost[index];
      const total = peak + offPeak;

      // Off-peak bar (bottom)
      const offPeakHeight = (offPeak / maxValue) * chartAreaHeight;
      const offPeakY = chartHeight - padding - offPeakHeight;
      
      const offPeakGradient = ctx.createLinearGradient(0, offPeakY, 0, chartHeight - padding);
      offPeakGradient.addColorStop(0, '#3b82f6');
      offPeakGradient.addColorStop(1, '#3b82f680');
      
      ctx.fillStyle = offPeakGradient;
      ctx.fillRect(x, offPeakY, barWidth, offPeakHeight);

      // Peak bar (top)
      const peakHeight = (peak / maxValue) * chartAreaHeight;
      const peakY = offPeakY - peakHeight;
      
      const peakGradient = ctx.createLinearGradient(0, peakY, 0, offPeakY);
      peakGradient.addColorStop(0, '#ef4444');
      peakGradient.addColorStop(1, '#ef444480');
      
      ctx.fillStyle = peakGradient;
      ctx.fillRect(x, peakY, barWidth, peakHeight);

      // Total cost label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`$${total.toFixed(0)}`, x + barWidth / 2, peakY - 5);

      // Time label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Arial';
      ctx.fillText(`${index * 2}:00`, x + barWidth / 2, chartHeight - padding + 15);
    });

    // Draw savings box
    const boxWidth = 150;
    const boxHeight = 60;
    const boxX = width - boxWidth - 20;
    const boxY = 20;

    ctx.fillStyle = '#1e293b80';
    ctx.strokeStyle = '#3b82f640';
    ctx.lineWidth = 1;
    ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`$${totalSavings.toFixed(0)}`, boxX + boxWidth / 2, boxY + 25);
    
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Arial';
    ctx.fillText('Total Savings', boxX + boxWidth / 2, boxY + 45);

    // Draw legend
    const legendY = chartHeight - 30;
    
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(padding, legendY, 15, 3);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Peak Cost', padding + 20, legendY + 5);

    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(padding + 100, legendY, 15, 3);
    ctx.fillText('Off-Peak Cost', padding + 120, legendY + 5);

    // Draw projected cost line
    const projectedY = chartHeight - padding - (projectedCost / maxValue) * chartAreaHeight;
    ctx.beginPath();
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.moveTo(padding, projectedY);
    ctx.lineTo(width - padding, projectedY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Projected cost label
    ctx.fillStyle = '#8b5cf6';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Projected: $${projectedCost}`, padding + 10, projectedY - 5);

  }, [peakCost, offPeakCost, totalSavings, projectedCost, isLoading]);

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
