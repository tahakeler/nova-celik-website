'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface StatusType {
  color: string;
  label: string;
}

interface SpeedometerChartProps {
  value?: number;
  max?: number;
  label?: string;
  unit?: string;
}

export default function SpeedometerChart({ 
  value = 0, 
  max = 100, 
  label = 'Value',
  unit = '%'
}: Readonly<SpeedometerChartProps>) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const liquidCanvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const liquidRequestRef = useRef<number | undefined>(undefined);

  // Validate and sanitize input
  const sanitizedValue = isNaN(value || 0) ? 0 : Math.min(Math.max(value || 0, 0), max);
  const percentage = (sanitizedValue / max) * 100;
  
  // Determine status based on value
  const getStatus = (percent: number): StatusType => {
    if (percent >= 85) return { color: '#EF4444', label: 'Critical' };
    if (percent >= 60) return { color: '#F59E0B', label: 'Warning' };
    return { color: '#10B981', label: 'Normal' };
  };

  const status = getStatus(percentage);

  // Liquid animation
  useEffect(() => {
    if (!liquidCanvasRef.current) return;

    const canvas = liquidCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / (2 * dpr);
      const centerY = (canvas.height / (2 * dpr)) + 20;
      const radius = Math.min(centerX, centerY) - 40;

      // Create clip path for liquid
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 10, Math.PI, 0, false);
      ctx.clip();

      // Draw liquid
      const fillLevel = centerY + radius - (2 * radius * (animatedValue / max));
      const amplitude = 5;
      const frequency = 0.05;

      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      // Draw wavy liquid surface
      for (let x = 0; x < canvas.width; x++) {
        const y = fillLevel + 
                 Math.sin(x * frequency + time) * amplitude + 
                 Math.sin(x * frequency * 0.5 + time * 0.8) * amplitude * 0.5;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      // Create gradient for liquid
      const gradient = ctx.createLinearGradient(0, fillLevel - 50, 0, fillLevel + 50);
      gradient.addColorStop(0, `${status.color}99`);
      gradient.addColorStop(1, `${status.color}66`);

      ctx.fillStyle = gradient;
      ctx.fill();

      // Add shine effect
      ctx.beginPath();
      ctx.moveTo(0, fillLevel);
      for (let x = 0; x < canvas.width; x++) {
        const y = fillLevel - 20 + 
                 Math.sin(x * frequency + time * 1.2) * amplitude * 0.5;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `${status.color}33`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      time += 0.05;
      liquidRequestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (liquidRequestRef.current) {
        cancelAnimationFrame(liquidRequestRef.current);
      }
    };
  }, [animatedValue, max, status.color]);

  // Gauge animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const animate = () => {
      const diff = sanitizedValue - animatedValue;
      const step = diff * 0.1;

      if (Math.abs(diff) < 0.1) {
        setAnimatedValue(sanitizedValue);
        return;
      }

      setAnimatedValue(prev => prev + step);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [sanitizedValue, animatedValue]);

  // Draw gauge
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / (2 * window.devicePixelRatio);
    const centerY = (canvas.height / (2 * window.devicePixelRatio)) + 20;
    const radius = Math.min(centerX, centerY) - 40;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ticks with dynamic coloring
    for (let i = 0; i <= 20; i++) {
      const angle = Math.PI + (Math.PI * (i / 20));
      const isLarge = i % 5 === 0;
      const length = isLarge ? 15 : 8;
      const width = isLarge ? 3 : 1;
      
      // Calculate if this tick is within the current value range
      const tickValue = (i / 20) * max;
      const isActive = tickValue <= animatedValue;
      const tickColor = isActive ? status.color : '#94A3B8';
      const opacity = isActive ? '1' : '0.5';
      
      ctx.beginPath();
      ctx.moveTo(
        centerX + (radius - length) * Math.cos(angle),
        centerY + (radius - length) * Math.sin(angle)
      );
      ctx.lineTo(
        centerX + radius * Math.cos(angle),
        centerY + radius * Math.sin(angle)
      );
      ctx.strokeStyle = tickColor;
      ctx.globalAlpha = parseFloat(opacity);
      ctx.lineWidth = width;
      ctx.stroke();
    }

    // Reset global alpha
    ctx.globalAlpha = 1;

    // Draw background arc with subtle gradient
    const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    bgGradient.addColorStop(0, '#E5E7EB');
    bgGradient.addColorStop(0.5, '#F3F4F6');
    bgGradient.addColorStop(1, '#E5E7EB');

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = 20;
    ctx.strokeStyle = bgGradient;
    ctx.stroke();

    // Add subtle shadow to background arc
    ctx.save();
    ctx.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = 20;
    ctx.strokeStyle = 'rgba(0,0,0,0.05)';
    ctx.stroke();
    ctx.restore();

    // Draw value arc with enhanced gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#3B82F6');
    gradient.addColorStop(0.5, '#2563EB');
    gradient.addColorStop(1, status.color);

    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      radius,
      Math.PI,
      Math.PI + (Math.PI * (animatedValue / max)),
      false
    );
    ctx.lineWidth = 20;
    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Enhanced glow effect with multiple layers
    ctx.save();
    ctx.filter = 'blur(12px)';
    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      radius,
      Math.PI,
      Math.PI + (Math.PI * (animatedValue / max)),
      false
    );
    ctx.lineWidth = 10;
    ctx.strokeStyle = status.color;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();

    // Draw needle with shadow and gradient
    const needleAngle = Math.PI + (Math.PI * (animatedValue / max));
    const needleLength = radius - 30;
    
    // Needle shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 2;
    
    // Needle gradient
    const needleGradient = ctx.createLinearGradient(
      centerX,
      centerY,
      centerX + needleLength * Math.cos(needleAngle),
      centerY + needleLength * Math.sin(needleAngle)
    );
    needleGradient.addColorStop(0, '#475569');
    needleGradient.addColorStop(1, status.color);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + needleLength * Math.cos(needleAngle),
      centerY + needleLength * Math.sin(needleAngle)
    );
    ctx.strokeStyle = needleGradient;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();

    // Draw center circle with metallic effect
    const centerGradient = ctx.createRadialGradient(
      centerX - 3,
      centerY - 3,
      0,
      centerX,
      centerY,
      10
    );
    centerGradient.addColorStop(0, '#FFFFFF');
    centerGradient.addColorStop(0.5, status.color);
    centerGradient.addColorStop(1, '#475569');

    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
    ctx.fillStyle = centerGradient;
    ctx.fill();

    // Add highlight to center circle
    ctx.beginPath();
    ctx.arc(centerX - 2, centerY - 2, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fill();

  }, [animatedValue, max, status.color]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      {/* Liquid canvas */}
      <canvas 
        ref={liquidCanvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Gauge canvas */}
      <canvas 
        ref={canvasRef} 
        className="relative w-full h-full z-10"
        role="img"
        aria-label={`${label} speedometer showing ${value}${unit}`}
      />
      
      {/* Value display */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-3xl font-bold text-gray-900">
          {animatedValue.toFixed(1)}{unit}
        </div>
        <div className="text-sm font-medium text-gray-500">{label}</div>
      </motion.div>

      {/* Status indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm font-medium"
        style={{
          backgroundColor: `${status.color}15`,
          color: status.color
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {status.label}
      </motion.div>

      {/* Min/Max labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8">
        <span className="text-sm text-gray-500">0{unit}</span>
        <span className="text-sm text-gray-500">{max}{unit}</span>
      </div>
    </div>
  );
}
