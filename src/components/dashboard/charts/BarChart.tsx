'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHART_CONFIG, setupCanvas, getResponsivePadding, getChartColors } from '@/utils/chartConfig';

interface BarChartProps {
  readonly data: {
    labels: string[];
    values: number[];
    colors?: string[];
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
    value: number;
    color: string;
  };
}

export default function BarChart({ data, height = 200, isLoading }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData>({
    show: false,
    x: 0,
    y: 0,
    content: { label: '', value: 0, color: '' }
  });
  const [animationProgress, setAnimationProgress] = useState(0);
  const [staggeredProgress, setStaggeredProgress] = useState<number[]>([]);

  // Use standardized color palette at component level
  const defaultColors = getChartColors(data.values.length);

  // Enhanced animation effect with staggered bars using standardized config
  useEffect(() => {
    if (isLoading) return;
    
    const startTime = Date.now();
    const duration = CHART_CONFIG.animations.duration.chart;
    const staggerDelay = CHART_CONFIG.animations.stagger.delay;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use standardized easing function
      const easedProgress = CHART_CONFIG.animations.easing.easeOutCubic(progress);
      setAnimationProgress(easedProgress);
      
      // Calculate staggered progress for each bar
      const newStaggeredProgress = data.values.map((_, index) => {
        const barStartTime = index * staggerDelay;
        const barElapsed = Math.max(0, elapsed - barStartTime);
        const barProgress = Math.min(barElapsed / (duration - barStartTime), 1);
        return CHART_CONFIG.animations.easing.easeOutCubic(barProgress);
      });
      setStaggeredProgress(newStaggeredProgress);
      
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

    const maxValue = Math.max(...data.values) * 1.1; // Add 10% padding at top
    const barWidth = chartWidth / data.values.length * CHART_CONFIG.charts.bar.widthRatio;
    const barSpacing = chartWidth / data.values.length * CHART_CONFIG.charts.bar.spacingRatio;

    // Use standardized grid styling
    ctx.strokeStyle = CHART_CONFIG.colors.grid;
    ctx.lineWidth = 1;

    // Horizontal grid lines with labels
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i / 5) * chartHeight;
      const value = maxValue - (i / 5) * maxValue;

      // Grid line
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Use standardized typography
      ctx.fillStyle = CHART_CONFIG.colors.textSecondary;
      ctx.font = `${CHART_CONFIG.fonts.weights.semibold} ${CHART_CONFIG.fonts.sizes.sm} ${CHART_CONFIG.fonts.secondary}`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      const formattedValue = value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(0);
      ctx.fillText(formattedValue, padding.left - 15, y);
    }

    // Colors are now defined at component level

    // Enhanced bars with staggered animation and micro-interactions
    data.values.forEach((value, index) => {
      const barProgress = staggeredProgress[index] || 0;
      const animatedHeight = (value / maxValue) * chartHeight * barProgress;
      const x = padding.left + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = padding.top + chartHeight - animatedHeight;
      const isHovered = hoveredBar === index;

      // Use standardized color mapping with nullish coalescing
      const color = data.colors?.[index] ?? defaultColors[index % defaultColors.length];
      const gradient = ctx.createLinearGradient(0, y, 0, y + animatedHeight);
      
      // Dynamic gradient based on value and hover state
      if (isHovered) {
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.3, color + 'E6');
        gradient.addColorStop(0.7, color + 'B3');
        gradient.addColorStop(1, color + '80');
      } else {
        gradient.addColorStop(0, color + 'E6');
        gradient.addColorStop(0.5, color + 'CC');
        gradient.addColorStop(1, color + '66');
      }

      // Enhanced glow effect with pulsing animation
      if (isHovered) {
        const pulseIntensity = 1 + Math.sin(Date.now() / 300) * 0.2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 20 * pulseIntensity;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      // Use standardized bar styling
      ctx.fillStyle = gradient;
      const radius = isHovered ? CHART_CONFIG.charts.bar.borderRadiusHover : CHART_CONFIG.charts.bar.borderRadius;
      const barScale = isHovered ? CHART_CONFIG.interactions.hover.scaleSmall : 1;
      const scaledWidth = barWidth * barScale;
      const scaledX = x - (scaledWidth - barWidth) / 2;
      
      // Draw enhanced rounded rectangle
      ctx.beginPath();
      ctx.moveTo(scaledX + radius, y);
      ctx.lineTo(scaledX + scaledWidth - radius, y);
      ctx.quadraticCurveTo(scaledX + scaledWidth, y, scaledX + scaledWidth, y + radius);
      ctx.lineTo(scaledX + scaledWidth, y + animatedHeight - radius);
      ctx.quadraticCurveTo(scaledX + scaledWidth, y + animatedHeight, scaledX + scaledWidth - radius, y + animatedHeight);
      ctx.lineTo(scaledX + radius, y + animatedHeight);
      ctx.quadraticCurveTo(scaledX, y + animatedHeight, scaledX, y + animatedHeight - radius);
      ctx.lineTo(scaledX, y + radius);
      ctx.quadraticCurveTo(scaledX, y, scaledX + radius, y);
      ctx.closePath();
      ctx.fill();

      // Add subtle border for definition
      ctx.strokeStyle = isHovered ? '#ffffff40' : '#ffffff20';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Enhanced bar top highlight for visual appeal
      if (barProgress > 0.8 && animatedHeight > 10) {
        const highlightGradient = ctx.createLinearGradient(scaledX, y, scaledX + scaledWidth, y);
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        
        ctx.fillStyle = highlightGradient;
        ctx.beginPath();
        ctx.moveTo(scaledX + radius, y);
        ctx.lineTo(scaledX + scaledWidth - radius, y);
        ctx.quadraticCurveTo(scaledX + scaledWidth, y, scaledX + scaledWidth, y + radius);
        ctx.lineTo(scaledX + scaledWidth, y + 8);
        ctx.lineTo(scaledX, y + 8);
        ctx.lineTo(scaledX, y + radius);
        ctx.quadraticCurveTo(scaledX, y, scaledX + radius, y);
        ctx.closePath();
        ctx.fill();
      }

      // Use standardized label styling
      ctx.fillStyle = isHovered ? CHART_CONFIG.colors.text : CHART_CONFIG.colors.textMuted;
      ctx.font = `${isHovered ? CHART_CONFIG.fonts.weights.semibold : CHART_CONFIG.fonts.weights.normal} ${CHART_CONFIG.fonts.sizes.sm} ${CHART_CONFIG.fonts.secondary}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      // Add label background for better readability
      const labelText = data.labels[index];
      const labelMetrics = ctx.measureText(labelText);
      const labelWidth = labelMetrics.width + 12;
      const labelHeight = 20;
      const labelX = x + barWidth / 2;
      const labelY = height - padding.bottom + 12;
      
      if (isHovered) {
        ctx.fillStyle = CHART_CONFIG.colors.primary + '33'; // 20% opacity
        ctx.beginPath();
        ctx.roundRect(labelX - labelWidth / 2, labelY, labelWidth, labelHeight, 6);
        ctx.fill();
      }
      
      ctx.fillStyle = isHovered ? CHART_CONFIG.colors.text : CHART_CONFIG.colors.textMuted;
      ctx.fillText(labelText, labelX, labelY + 6);
    });

  }, [data, height, isLoading, hoveredBar, animationProgress, defaultColors]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padding = { top: 30, right: 30, bottom: 50, left: 60 };
    const chartWidth = rect.width - padding.left - padding.right;
    const barWidth = chartWidth / data.values.length * 0.6;
    const barSpacing = chartWidth / data.values.length * 0.4;

    // Find which bar is being hovered
    const barIndex = Math.floor((x - padding.left - barSpacing / 2) / (barWidth + barSpacing));
    
    if (
      barIndex >= 0 && 
      barIndex < data.values.length && 
      x >= padding.left && 
      x <= rect.width - padding.right &&
      y >= padding.top && 
      y <= rect.height - padding.bottom
    ) {
      setHoveredBar(barIndex);
        setTooltip({
          show: true,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          content: {
            label: data.labels[barIndex],
            value: data.values[barIndex],
            color: data.colors?.[barIndex] ?? defaultColors[barIndex % defaultColors.length]
          }
        });
    } else {
      setHoveredBar(null);
      setTooltip(prev => ({ ...prev, show: false }));
    }
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
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
        className="w-full h-full cursor-pointer"
        style={{ height }}
        role="img"
        aria-label={`Bar chart showing ${data.labels.length} data points`}
      />

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
            <div className="bg-slate-800/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-slate-700/50 min-w-[160px]">
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: tooltip.content.color }}
                />
                <div className="text-sm font-medium text-white">{tooltip.content.label}</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Value</span>
                <span className="text-sm font-bold text-white">
                  {tooltip.content.value.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
