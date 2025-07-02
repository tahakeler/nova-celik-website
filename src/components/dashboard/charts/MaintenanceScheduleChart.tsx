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
}: MaintenanceScheduleChartProps): React.JSX.Element {
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

    // Enhanced completion progress circle with glow
    const centerX = width * 0.25;
    const centerY = chartHeight * 0.4;
    const radius = 60;
    const completionPercentage = (completedMaintenance / totalMaintenance) * 100;

    // Outer glow effect
    const glowGradient = ctx.createRadialGradient(centerX, centerY, radius - 10, centerX, centerY, radius + 15);
    glowGradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
    glowGradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 15, 0, 2 * Math.PI);
    ctx.fill();

    // Background circle with gradient
    const bgGradient = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
    bgGradient.addColorStop(0, 'rgba(30, 41, 59, 0.8)');
    bgGradient.addColorStop(1, 'rgba(15, 23, 42, 0.9)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = bgGradient;
    ctx.lineWidth = 12;
    ctx.stroke();

    // Enhanced progress arc with gradient
    const progressGradient = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
    progressGradient.addColorStop(0, '#10b981');
    progressGradient.addColorStop(0.5, '#059669');
    progressGradient.addColorStop(1, '#047857');

    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * completionPercentage / 100);
    
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = progressGradient;
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Enhanced center display
    const centerBgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius - 20);
    centerBgGradient.addColorStop(0, 'rgba(30, 41, 59, 0.95)');
    centerBgGradient.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
    
    ctx.fillStyle = centerBgGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 20, 0, 2 * Math.PI);
    ctx.fill();

    // Center text with enhanced styling
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Poppins, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${completionPercentage.toFixed(0)}%`, centerX, centerY - 8);
    
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Poppins, system-ui, sans-serif';
    ctx.fillText('Completed', centerX, centerY + 16);

    // Enhanced upcoming maintenance timeline
    const timelineX = width * 0.55;
    const timelineWidth = width * 0.4;
    const itemHeight = 40;

    // Timeline header with background
    const headerBg = ctx.createLinearGradient(timelineX, 15, timelineX + timelineWidth, 15);
    headerBg.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
    headerBg.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
    
    ctx.fillStyle = headerBg;
    ctx.beginPath();
    ctx.roundRect(timelineX, 15, timelineWidth, 30, 8);
    ctx.fill();

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 16px Poppins, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Upcoming Maintenance', timelineX + 15, 30);

    // Enhanced maintenance items
    upcomingMaintenance.slice(0, 5).forEach((item, index) => {
      const y = 60 + index * itemHeight;
      
      // Item background with hover effect
      const itemBg = ctx.createLinearGradient(timelineX, y, timelineX + timelineWidth, y);
      itemBg.addColorStop(0, 'rgba(30, 41, 59, 0.6)');
      itemBg.addColorStop(1, 'rgba(15, 23, 42, 0.4)');
      
      ctx.fillStyle = itemBg;
      ctx.beginPath();
      ctx.roundRect(timelineX, y, timelineWidth, itemHeight - 5, 6);
      ctx.fill();

      // Enhanced priority indicator with glow
      const priorityColor = item.priority === 'high' ? '#ef4444' : 
                           item.priority === 'medium' ? '#f59e0b' : '#10b981';
      
      ctx.shadowColor = priorityColor;
      ctx.shadowBlur = 8;
      ctx.fillStyle = priorityColor;
      ctx.beginPath();
      ctx.roundRect(timelineX + 8, y + 8, 6, itemHeight - 21, 3);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Item name with enhanced styling
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Poppins, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(item.name, timelineX + 25, y + 8);

      // Days left with enhanced styling
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px Poppins, system-ui, sans-serif';
      ctx.fillText(`${item.daysLeft} days remaining`, timelineX + 25, y + 25);

      // Enhanced urgency progress bar
      const urgencyPercentage = Math.max(0, (30 - item.daysLeft) / 30 * 100);
      const barWidth = 100;
      const barX = timelineX + timelineWidth - barWidth - 15;
      const barY = y + 12;
      
      // Background bar
      ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
      ctx.beginPath();
      ctx.roundRect(barX, barY, barWidth, 12, 6);
      ctx.fill();
      
      // Progress bar with gradient
      const urgencyGradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY);
      if (item.daysLeft <= 7) {
        urgencyGradient.addColorStop(0, '#ef4444');
        urgencyGradient.addColorStop(1, '#dc2626');
      } else if (item.daysLeft <= 14) {
        urgencyGradient.addColorStop(0, '#f59e0b');
        urgencyGradient.addColorStop(1, '#d97706');
      } else {
        urgencyGradient.addColorStop(0, '#10b981');
        urgencyGradient.addColorStop(1, '#059669');
      }
      
      ctx.fillStyle = urgencyGradient;
      ctx.beginPath();
      ctx.roundRect(barX, barY, (barWidth * urgencyPercentage / 100), 12, 6);
      ctx.fill();

      // Urgency percentage text
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px Poppins, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${urgencyPercentage.toFixed(0)}%`, barX + barWidth / 2, barY + 6);
    });

    // Enhanced legend with modern styling
    const legendY = chartHeight - 40;
    const legendItems = [
      { label: 'High Priority', color: '#ef4444' },
      { label: 'Medium Priority', color: '#f59e0b' },
      { label: 'Low Priority', color: '#10b981' }
    ];

    // Legend background
    const legendBg = ctx.createLinearGradient(padding, legendY - 10, width - padding, legendY - 10);
    legendBg.addColorStop(0, 'rgba(30, 41, 59, 0.7)');
    legendBg.addColorStop(1, 'rgba(15, 23, 42, 0.5)');
    
    ctx.fillStyle = legendBg;
    ctx.beginPath();
    ctx.roundRect(padding, legendY - 10, width - padding * 2, 25, 8);
    ctx.fill();

    legendItems.forEach((item, index) => {
      const x = padding + 20 + index * 140;
      
      // Enhanced color indicator with glow
      ctx.shadowColor = item.color;
      ctx.shadowBlur = 6;
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.arc(x, legendY, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Enhanced label text
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '13px Poppins, system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.label, x + 15, legendY);
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
