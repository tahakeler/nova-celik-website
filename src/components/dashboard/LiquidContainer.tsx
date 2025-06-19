'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
}

interface LiquidContainerProps {
  children: React.ReactNode;
  value: number;
  color?: string;
  glowColor?: string;
  className?: string;
}

export default function LiquidContainer({
  children,
  value,
  color = '#1d4ed8',
  glowColor = '#3b82f6',
  className = '',
}: LiquidContainerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const percentage = Math.min(Math.max(value, 0), 100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Initialize particles
    const initParticles = () => {
      const particleCount = 20;
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: canvas.height * (1 - percentage / 100) + Math.random() * (canvas.height * percentage / 100),
        speed: 0.2 + Math.random() * 0.8,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.5
      }));
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.y -= particle.speed;
        particle.opacity -= 0.002;

        if (particle.y < canvas.height * (1 - percentage / 100) || particle.opacity <= 0) {
          particle.y = canvas.height * (1 - percentage / 100) + Math.random() * (canvas.height * percentage / 100);
          particle.x = Math.random() * canvas.width;
          particle.opacity = 0.3 + Math.random() * 0.5;
        }
      });
    };

    const drawLiquid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate wave parameters based on percentage
      const amplitude = canvas.height * 0.05;
      const frequency = Math.PI * 2;
      const fillHeight = canvas.height * (1 - percentage / 100);

      // Draw main wave
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x++) {
        const y = fillHeight + 
                 Math.sin(x * 0.05 + time) * amplitude + 
                 Math.sin(x * 0.02 + time * 0.8) * amplitude * 0.5;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();

      // Create gradient for main liquid
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, `${color}99`);
      gradient.addColorStop(1, `${color}66`);

      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw particles
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });

      // Draw highlight wave
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x++) {
        const y = fillHeight + 
                 Math.sin(x * 0.05 + time * 1.2) * amplitude * 0.7 + 
                 Math.sin(x * 0.02 + time) * amplitude * 0.3;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = `${color}33`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Update animation
      updateParticles();
      time += 0.05;
      animationFrameId = requestAnimationFrame(drawLiquid);
    };

    resize();
    window.addEventListener('resize', resize);
    drawLiquid();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [percentage, color]);

  return (
    <div className={`relative ${className}`}>
      {/* Enhanced Glow Effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-40 blur-xl transition-all duration-500"
        style={{ 
          background: `
            radial-gradient(circle at 50% ${100 - percentage}%, ${glowColor}40 0%, transparent 70%),
            radial-gradient(circle at 50% ${120 - percentage}%, ${color}30 0%, transparent 60%)
          ` 
        }}
      />
      
      {/* Liquid Animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-2xl"
      />

      {/* Content with Enhanced Animation */}
      <motion.div 
        className="relative z-10 w-full h-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
