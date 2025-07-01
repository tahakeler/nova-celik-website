'use client';

import React, { useEffect, useRef } from 'react';

interface MaintenanceScheduleChartProps {
  readonly upcomingMaintenance: { readonly name: string; readonly daysLeft: number; readonly priority: 'high' | 'medium' | 'low' }[];
  readonly completedMaintenance: number;
  readonly totalMaintenance: number;
  readonly height?: number;
  readonly isLoading?: boolean;
}

export default function MaintenanceScheduleChart({ 
  upcomingMaintenance, 
  completedMaintenance,
  totalMaintenance,
  height = 280, 
  isLoading 
}: MaintenanceScheduleChartProps) {
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

    // Draw completion progress circle
    const centerX = width * 0.25;
    const centerY = chartHeight * 0.4;
    const radius = 50;
    const completionPercentage = (completedMaintenance / totalMaintenance) * 100;

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Progress arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * completionPercentage / 100);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Center text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${completionPercentage.toFixed(0)}%`, centerX, centerY - 5);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Arial';
    ctx.fillText('Completed', centerX, centerY + 15);

    // Draw upcoming maintenance timeline
    const timelineX = width * 0.55;
    const timelineWidth = width * 0.4;
    const itemHeight = 30;

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Upcoming Maintenance', timelineX, 30);

    upcomingMaintenance.slice(0, 6).forEach((item, index) => {
      const y = 50 + index * itemHeight;
      
      // Priority indicator
      const priorityColor = item.priority === 'high' ? '#ef4444' : 
                           item.priority === 'medium' ? '#f59e0b' : '#10b981';
      
      ctx.fillStyle = priorityColor;
      ctx.fillRect(timelineX, y, 4, 20);

      // Item name
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.fillText(item.name, timelineX + 10, y + 12);

      // Days left
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Arial';
      ctx.fillText(`${item.daysLeft} days`, timelineX + 10, y + 25);

      // Progress bar for urgency
      const urgencyWidth = (30 - item.daysLeft) / 30 * 100;
      const barWidth = 80;
      
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(timelineX + timelineWidth - barWidth, y + 5, barWidth, 8);
      
      ctx.fillStyle = item.daysLeft <= 7 ? '#ef4444' : item.daysLeft <= 14 ? '#f59e0b' : '#10b981';
      ctx.fillRect(timelineX + timelineWidth - barWidth, y + 5, (barWidth * urgencyWidth / 100), 8);
    });

    // Legend
    const legendY = chartHeight - 30;
    const legendItems = [
      { label: 'High Priority', color: '#ef4444' },
      { label: 'Medium Priority', color: '#f59e0b' },
      { label: 'Low Priority', color: '#10b981' }
    ];

    legendItems.forEach((item, index) => {
      const x = padding + index * 120;
      ctx.fillStyle = item.color;
      ctx.fillRect(x, legendY, 15, 3);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Arial';
      ctx.fillText(item.label, x + 20, legendY + 8);
    });

  }, [upcomingMaintenance, completedMaintenance, totalMaintenance, isLoading]);

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
