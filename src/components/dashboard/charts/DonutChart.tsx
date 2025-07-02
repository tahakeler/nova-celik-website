'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DonutChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  centerText?: {
    main: string;
    sub: string;
  };
  size?: number;
  isLoading?: boolean;
}

interface TooltipData {
  show: boolean;
  x: number;
  y: number;
  content: {
    label: string;
    value: number;
    percentage: number;
    color: string;
  };
}

export default function DonutChart({ data, centerText, size = 200, isLoading }: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData>({
    show: false,
    x: 0,
    y: 0,
    content: { label: '', value: 0, percentage: 0, color: '' }
  });
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [staggeredProgress, setStaggeredProgress] = useState<number[]>([]);
  const [rotationOffset, setRotationOffset] = useState(0);

  // Enhanced animation effect with staggered segments
  useEffect(() => {
    if (isLoading) return;
    
    const startTime = Date.now();
    const duration = 1500;
    const staggerDelay = 150;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Enhanced easing with elastic effect
      const easeOutElastic = (x: number): number => {
        const c4 = (2 * Math.PI) / 3;
        return x === 0 ? 0 : x === 1 ? 1
          : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
      };
      
      const mainProgress = easeOutElastic(progress);
      setAnimationProgress(mainProgress);
      
      // Calculate staggered progress for each segment
      const newStaggeredProgress = data.map((_, index) => {
        const segmentStartTime = index * staggerDelay;
        const segmentElapsed = Math.max(0, elapsed - segmentStartTime);
        const segmentProgress = Math.min(segmentElapsed / (duration - segmentStartTime), 1);
        return easeOutElastic(segmentProgress);
      });
      setStaggeredProgress(newStaggeredProgress);
      
      // Add subtle rotation animation
      setRotationOffset(Math.sin(elapsed / 1000) * 0.02);
      
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

    // Set canvas size with device pixel ratio
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 30;
    const innerRadius = radius * 0.55;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -Math.PI / 2; // Start from top

    // Draw donut segments with enhanced animation
    data.forEach((item, index) => {
      // Enhanced segment rendering with dynamic effects
      const segmentProgress = staggeredProgress[index] || 0;
      const isHovered = hoveredSegment === index;
      const segmentRadius = isHovered ? radius + 8 : radius;
      const segmentInnerRadius = isHovered ? innerRadius - 4 : innerRadius;
      
      // Calculate dynamic segment position with subtle animation
      const segmentAngle = (item.value / total) * 2 * Math.PI * segmentProgress;
      const adjustedAngle = currentAngle + (isHovered ? rotationOffset : 0);
      
      // Enhanced glow effect with pulsing animation
      if (isHovered) {
        const pulseIntensity = 1 + Math.sin(Date.now() / 300) * 0.2;
        ctx.shadowColor = item.color;
        ctx.shadowBlur = 20 * pulseIntensity;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      // Enhanced gradient with dynamic color stops
      const segmentGradient = ctx.createRadialGradient(
        centerX, centerY, segmentInnerRadius,
        centerX, centerY, segmentRadius
      );
      
      if (isHovered) {
        segmentGradient.addColorStop(0, item.color + '40');
        segmentGradient.addColorStop(0.3, item.color + '80');
        segmentGradient.addColorStop(0.7, item.color + 'CC');
        segmentGradient.addColorStop(1, item.color);
      } else {
        segmentGradient.addColorStop(0, item.color + '20');
        segmentGradient.addColorStop(0.5, item.color + '80');
        segmentGradient.addColorStop(1, item.color + 'CC');
      }
      
      // Draw segment with enhanced styling
      ctx.fillStyle = segmentGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, segmentRadius, adjustedAngle, adjustedAngle + segmentAngle);
      ctx.arc(centerX, centerY, segmentInnerRadius, adjustedAngle + segmentAngle, adjustedAngle, true);
      ctx.closePath();
      ctx.fill();
      
      // Reset shadow and add enhanced border
      ctx.shadowBlur = 0;
      ctx.strokeStyle = isHovered ? '#ffffff60' : '#ffffff20';
      ctx.lineWidth = isHovered ? 2 : 1;
      ctx.stroke();

      // Enhanced segment highlight for visual appeal
      if (isHovered && segmentProgress > 0.8) {
        const highlightRadius = segmentRadius + 2;
        const highlightGradient = ctx.createRadialGradient(
          centerX, centerY, segmentInnerRadius,
          centerX, centerY, highlightRadius
        );
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
        highlightGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0.15)');
        
        ctx.fillStyle = highlightGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, highlightRadius, adjustedAngle, adjustedAngle + segmentAngle);
        ctx.arc(centerX, centerY, segmentInnerRadius, adjustedAngle + segmentAngle, adjustedAngle, true);
        ctx.closePath();
        ctx.fill();
      }

      currentAngle += segmentAngle;
    });

    // Enhanced center content
    if (centerText && animationProgress > 0.5) {
      // Center circle background
      const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, innerRadius);
      centerGradient.addColorStop(0, 'rgba(30, 41, 59, 0.9)');
      centerGradient.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
      
      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
      ctx.fill();

      // Center border
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Main text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px Montserrat, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(centerText.main, centerX, centerY - 8);

      // Sub text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px Poppins, system-ui, sans-serif';
      ctx.fillText(centerText.sub, centerX, centerY + 16);
    }

  }, [data, centerText, size, isLoading, hoveredSegment, animationProgress]);

  // Mouse interaction handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) / 2 - 30;
    const innerRadius = radius * 0.55;

    // Calculate distance from center
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Check if mouse is within donut area
    if (distance >= innerRadius && distance <= radius) {
      // Calculate angle
      let angle = Math.atan2(dy, dx) + Math.PI / 2;
      if (angle < 0) angle += 2 * Math.PI;

      // Find which segment the mouse is over
      const total = data.reduce((sum, item) => sum + item.value, 0);
      let currentAngle = 0;
      
      for (let i = 0; i < data.length; i++) {
        const sliceAngle = (data[i].value / total) * 2 * Math.PI;
        
        if (angle >= currentAngle && angle <= currentAngle + sliceAngle) {
          setHoveredSegment(i);
          setTooltip({
            show: true,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            content: {
              label: data[i].label,
              value: data[i].value,
              percentage: (data[i].value / total) * 100,
              color: data[i].color
            }
          });
          return;
        }
        
        currentAngle += sliceAngle;
      }
    }

    // Mouse not over any segment
    setHoveredSegment(null);
    setTooltip(prev => ({ ...prev, show: false }));
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
    setTooltip(prev => ({ ...prev, show: false }));
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[320px] max-h-[320px] cursor-pointer"
      />
      
      {/* Enhanced Legend */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-6 grid grid-cols-2 gap-3 w-full max-w-[280px]"
      >
        {data.map((item, index) => {
          const total = data.reduce((sum, dataItem) => sum + dataItem.value, 0);
          const percentage = (item.value / total) * 100;
          const isHovered = hoveredSegment === index;
          
          return (
            <motion.div 
              key={index} 
              className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                isHovered ? 'bg-slate-700/50 scale-105' : 'hover:bg-slate-800/30'
              }`}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div 
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  isHovered ? 'scale-125 shadow-lg' : ''
                }`}
                style={{ 
                  backgroundColor: item.color,
                  boxShadow: isHovered ? `0 0 12px ${item.color}` : 'none'
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-200 font-semibold truncate">{item.label}</div>
                <div className="text-sm text-gray-300 font-medium">{percentage.toFixed(1)}%</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

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
              transform: tooltip.x > 150 ? 'translateX(-100%)' : 'translateX(0)'
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
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Value</span>
                  <span className="text-sm font-bold text-white">
                    {tooltip.content.value.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Percentage</span>
                  <span className="text-sm font-bold" style={{ color: tooltip.content.color }}>
                    {tooltip.content.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
