'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge, TrendingUp, Zap } from 'lucide-react';

interface StatusType {
  color: string;
  glowColor: string;
  label: string;
  gradient: string;
}

interface SpeedometerChartProps {
  value?: number;
  max?: number;
  label?: string;
  unit?: string;
  chartId?: string;
}

export default function SpeedometerChart({ 
  value = 0, 
  max = 100, 
  label = 'Generator Load',
  unit = '%'
}: Readonly<SpeedometerChartProps>) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const liquidCanvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const liquidRequestRef = useRef<number | undefined>(undefined);

  // Validate and sanitize input
  const sanitizedValue = isNaN(value || 0) ? 0 : Math.min(Math.max(value || 0, 0), max);
  const percentage = (sanitizedValue / max) * 100;
  
  // Enhanced status with modern colors and gradients
  const getStatus = (percent: number): StatusType => {
    if (percent >= 85) return { 
      color: '#ef4444', 
      glowColor: 'rgba(239, 68, 68, 0.4)',
      label: 'Critical',
      gradient: 'from-red-500 via-red-400 to-pink-500'
    };
    if (percent >= 60) return { 
      color: '#f59e0b', 
      glowColor: 'rgba(245, 158, 11, 0.4)',
      label: 'Warning',
      gradient: 'from-amber-500 via-orange-400 to-yellow-500'
    };
    return { 
      color: '#10b981', 
      glowColor: 'rgba(16, 185, 129, 0.4)',
      label: 'Optimal',
      gradient: 'from-emerald-500 via-teal-400 to-cyan-500'
    };
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
    <motion.div 
      className={`relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 transition-all duration-500 ${isHovered ? 'shadow-2xl scale-[1.02]' : 'shadow-xl'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      style={{ boxShadow: `0 20px 40px ${status.glowColor}` }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Gauge className="w-6 h-6 text-blue-400" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {label}
            </h3>
            <p className="text-sm text-slate-400">Real-time monitoring</p>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4 text-slate-400" />
          <Zap className="w-4 h-4 text-blue-400" />
        </motion.div>
      </div>

      {/* Enhanced Speedometer Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Liquid canvas with dark theme */}
        <canvas 
          ref={liquidCanvasRef}
          className="absolute inset-0 w-full h-full opacity-20"
        />
        
        {/* Gauge canvas */}
        <canvas 
          ref={canvasRef} 
          className="relative w-full h-full z-10"
          aria-label={`${label} speedometer showing ${value}${unit}`}
        />
        
        {/* Enhanced Value display */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className={`text-5xl font-bold bg-gradient-to-r ${status.gradient} bg-clip-text text-transparent drop-shadow-lg`}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {animatedValue.toFixed(1)}
          </motion.div>
          <div className="text-lg text-slate-300 font-medium">{unit}</div>
          <div className="text-sm text-slate-400 mt-1">{label}</div>
        </motion.div>

        {/* Enhanced Status indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl text-sm font-medium border backdrop-blur-sm"
          style={{
            backgroundColor: `${status.color}20`,
            borderColor: `${status.color}40`,
            color: status.color,
            boxShadow: `0 0 20px ${status.glowColor}`
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: status.color }}
            />
            {status.label}
          </div>
        </motion.div>

        {/* Enhanced Min/Max labels */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-8">
          <span className="text-sm text-slate-400 font-medium">0{unit}</span>
          <span className="text-sm text-slate-400 font-medium">{max}{unit}</span>
        </div>

        {/* Performance Metrics */}
        <div className="absolute top-4 right-4 space-y-2">
          <motion.div 
            className="px-3 py-1 bg-slate-800/50 rounded-lg border border-slate-700/50 text-xs text-slate-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Efficiency: {Math.round(100 - percentage)}%
          </motion.div>
          <motion.div 
            className="px-3 py-1 bg-slate-800/50 rounded-lg border border-slate-700/50 text-xs text-slate-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Load: {percentage.toFixed(1)}%
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="absolute top-4 left-4 p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30 text-blue-400 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
      >
        <Zap className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}
