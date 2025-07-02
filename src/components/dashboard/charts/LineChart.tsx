'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHART_CONFIG, setupCanvas, getResponsivePadding, createGradient } from '@/utils/chartConfig';

interface LineChartProps {
  readonly data: {
    current: number[];
    previous: number[];
    labels: string[];
  };
  readonly height?: number;
  readonly isLoading?: boolean;
}

interface TooltipData {
  show: boolean;
  x: number;
  y: number;
  content: {
    label: string;
    current: number;
    previous: number;
    index: number;
  };
}

export default function LineChart({ data, height = 300, isLoading }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData>({
    show: false,
    x: 0,
    y: 0,
    content: { label: '', current: 0, previous: 0, index: 0 }
  });
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Enhanced animation effect using standardized config
  useEffect(() => {
    if (isLoading) return;
    
    const startTime = Date.now();
    const duration = CHART_CONFIG.animations.duration.chart;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use standardized easing function
      const easedProgress = CHART_CONFIG.animations.easing.easeOutCubic(progress);
      setAnimationProgress(easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isLoading, data]);

  useEffect(() => {
    if (!canvasRef.current || isLoading) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use standardized canvas setup
    const { width } = setupCanvas(canvas, ctx);
    const padding = getResponsivePadding(width);
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find min and max values with padding
    const allValues = [...data.current, ...data.previous];
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const valueRange = maxValue - minValue || 1;
    const paddedMin = minValue - valueRange * 0.1;
    const paddedMax = maxValue + valueRange * 0.1;
    const paddedRange = paddedMax - paddedMin;

    // Helper functions
    const getY = (value: number) => {
      return padding.top + chartHeight - ((value - paddedMin) / paddedRange) * chartHeight;
    };

    const getX = (index: number) => {
      return padding.left + (index / (data.current.length - 1)) * chartWidth;
    };

    // Use standardized grid styling
    ctx.strokeStyle = CHART_CONFIG.colors.grid;
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i / 5) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }

    // Vertical grid lines
    const verticalLines = Math.min(data.labels.length, 8);
    for (let i = 0; i <= verticalLines; i++) {
      const x = padding.left + (i / verticalLines) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, height - padding.bottom);
      ctx.stroke();
    }

    // Use standardized typography
    ctx.fillStyle = CHART_CONFIG.colors.textSecondary;
    ctx.font = `${CHART_CONFIG.fonts.weights.semibold} ${CHART_CONFIG.fonts.sizes.sm} ${CHART_CONFIG.fonts.secondary}`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    // Y-axis labels with better formatting
    for (let i = 0; i <= 5; i++) {
      const value = paddedMin + (i / 5) * paddedRange;
      const y = padding.top + chartHeight - (i / 5) * chartHeight;
      const formattedValue = value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(0);
      ctx.fillText(formattedValue, padding.left - 15, y);
    }

    // X-axis labels with standardized styling
    ctx.fillStyle = CHART_CONFIG.colors.textMuted;
    ctx.font = `${CHART_CONFIG.fonts.sizes.xs} ${CHART_CONFIG.fonts.secondary}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const labelStep = Math.max(1, Math.ceil(data.labels.length / 8));
    for (let i = 0; i < data.labels.length; i += labelStep) {
      const x = getX(i);
      ctx.fillText(data.labels[i], x, height - padding.bottom + 15);
    }

    // Enhanced line drawing with glow effect
    const drawLine = (points: number[], color: string, isDashed = false, glowColor?: string) => {
      // Draw glow effect
      if (glowColor) {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 8;
        ctx.lineWidth = 5;
        ctx.globalAlpha = 0.3;
      } else {
        ctx.shadowBlur = 0;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 1;
      }

      ctx.strokeStyle = color;
      if (isDashed) ctx.setLineDash([8, 4]);
      else ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(getX(0), getY(points[0]));

      // Create smooth bezier curves
      for (let i = 1; i < points.length; i++) {
        const x = getX(i);
        const y = getY(points[i]);
        const prevX = getX(i - 1);
        const prevY = getY(points[i - 1]);
        
        const cp1x = prevX + (x - prevX) * 0.4;
        const cp1y = prevY;
        const cp2x = prevX + (x - prevX) * 0.6;
        const cp2y = y;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      }
      
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    // Use standardized gradient creation
    const gradient = createGradient(ctx, 0, padding.top, 0, height - padding.bottom, [
      { offset: 0, color: CHART_CONFIG.colors.primary + '26' }, // 15% opacity
      { offset: 0.5, color: CHART_CONFIG.colors.primary + '14' }, // 8% opacity
      { offset: 1, color: CHART_CONFIG.colors.primary + '00' } // 0% opacity
    ]);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(getX(0), height - padding.bottom);
    ctx.lineTo(getX(0), getY(data.current[0]));

    for (let i = 1; i < data.current.length; i++) {
      const x = getX(i);
      const y = getY(data.current[i]);
      const prevX = getX(i - 1);
      const prevY = getY(data.current[i - 1]);
      
      const cp1x = prevX + (x - prevX) * 0.4;
      const cp1y = prevY;
      const cp2x = prevX + (x - prevX) * 0.6;
      const cp2y = y;
      
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }

    ctx.lineTo(getX(data.current.length - 1), height - padding.bottom);
    ctx.closePath();
    ctx.fill();

    // Enhanced line drawing with animated progress
    const currentProgress = animationProgress;
    
    // Use standardized colors
    drawLine(
      data.previous.slice(0, Math.floor(data.previous.length * currentProgress)),
      CHART_CONFIG.colors.gray[500],
      true
    );
    
    // Draw current period line with glow effect
    drawLine(
      data.current.slice(0, Math.floor(data.current.length * currentProgress)),
      CHART_CONFIG.colors.primary,
      false,
      CHART_CONFIG.colors.primary
    );

    // Enhanced data points with animation
    data.current.slice(0, Math.floor(data.current.length * currentProgress)).forEach((value, i) => {
      const x = getX(i);
      const y = getY(value);
      const isHovered = hoveredPoint === i;

      // Outer glow
      if (isHovered) {
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Use standardized point styling
      const pointScale = isHovered ? CHART_CONFIG.interactions.hover.scaleLarge : 1;
      const baseSize = isHovered ? CHART_CONFIG.charts.line.pointRadiusHover : CHART_CONFIG.charts.line.pointRadius;
      
      // Outer glow for current point
      if (i === data.current.length - 1) {
        ctx.shadowColor = CHART_CONFIG.colors.primary;
        ctx.shadowBlur = 15;
        ctx.fillStyle = CHART_CONFIG.colors.primary;
        ctx.beginPath();
        ctx.arc(x, y, baseSize * 1.5 * pointScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Main point with enhanced styling
      ctx.fillStyle = CHART_CONFIG.colors.text;
      ctx.beginPath();
      ctx.arc(x, y, baseSize * pointScale, 0, Math.PI * 2);
      ctx.fill();

      // Inner point with pulse animation
      const pulseScale = isHovered ? 1 + Math.sin(Date.now() / 200) * 0.1 : 1;
      ctx.fillStyle = CHART_CONFIG.colors.primary;
      ctx.beginPath();
      ctx.arc(x, y, (isHovered ? 3 : 2) * pulseScale, 0, Math.PI * 2);
      ctx.fill();
    });

    // Previous period points with standardized styling
    data.previous.slice(0, Math.floor(data.previous.length * currentProgress)).forEach((value, i) => {
      const x = getX(i);
      const y = getY(value);

      const isNearHovered = hoveredPoint !== null && Math.abs(hoveredPoint - i) <= 1;
      
      ctx.fillStyle = isNearHovered ? CHART_CONFIG.colors.gray[400] : CHART_CONFIG.colors.gray[500];
      ctx.beginPath();
      ctx.arc(x, y, isNearHovered ? 3 : 2, 0, Math.PI * 2);
      ctx.fill();
    });

  }, [data, height, isLoading, hoveredPoint, animationProgress]);

  // Mouse interaction handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padding = { top: 30, right: 30, bottom: 50, left: 60 };
    const chartWidth = rect.width - padding.left - padding.right;

    // Find closest data point
    const dataIndex = Math.round(((x - padding.left) / chartWidth) * (data.current.length - 1));
    
    if (dataIndex >= 0 && dataIndex < data.current.length) {
      const pointX = padding.left + (dataIndex / (data.current.length - 1)) * chartWidth;
      const distance = Math.abs(x - pointX);

      if (distance < 20) {
        setHoveredPoint(dataIndex);
        setTooltip({
          show: true,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          content: {
            label: data.labels[dataIndex],
            current: data.current[dataIndex],
            previous: data.previous[dataIndex],
            index: dataIndex
          }
        });
      } else {
        setHoveredPoint(null);
        setTooltip(prev => ({ ...prev, show: false }));
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
    setTooltip(prev => ({ ...prev, show: false }));
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex items-center gap-3">
          {CHART_CONFIG.loading.dots.animationDelay.map((delay, index) => (
            <div 
              key={index}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" 
              style={{ animationDelay: `${delay}ms` }} 
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        style={{ height }}
        role="img"
        aria-label={`Line chart showing current and previous period data`}
      />
      
      {/* Enhanced Legend */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-6 bg-slate-800/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-400 rounded-full"></div>
          <span className="text-xs text-gray-300 font-medium">Current Period</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-gray-500 rounded-full" style={{ backgroundImage: 'repeating-linear-gradient(to right, #64748b 0, #64748b 4px, transparent 4px, transparent 8px)' }}></div>
          <span className="text-xs text-gray-300 font-medium">Previous Period</span>
        </div>
      </div>

      {/* Enhanced Tooltip */}
      <AnimatePresence>
        {tooltip.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute pointer-events-none z-50"
            style={{
              left: tooltip.x + 10,
              top: tooltip.y - 10,
              transform: tooltip.x > 200 ? 'translateX(-100%)' : 'translateX(0)'
            }}
          >
            <div className="bg-slate-800/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-slate-700/50 min-w-[180px]">
              <div className="text-sm font-medium text-white mb-2">{tooltip.content.label}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">Current</span>
                  </div>
                  <span className="text-sm font-bold text-blue-400">
                    {tooltip.content.current.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">Previous</span>
                  </div>
                  <span className="text-sm font-bold text-gray-400">
                    {tooltip.content.previous.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Change</span>
                    <span className={`text-xs font-medium ${
                      tooltip.content.current > tooltip.content.previous 
                        ? 'text-emerald-400' 
                        : tooltip.content.current < tooltip.content.previous 
                        ? 'text-red-400' 
                        : 'text-gray-400'
                    }`}>
                      {tooltip.content.current > tooltip.content.previous ? '+' : ''}
                      {((tooltip.content.current - tooltip.content.previous) / tooltip.content.previous * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
