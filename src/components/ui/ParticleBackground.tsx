      'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const colors = [
      'rgba(59, 130, 246, alpha)', // blue
      'rgba(124, 58, 237, alpha)', // purple
      'rgba(37, 99, 235, alpha)',  // darker blue
      'rgba(147, 51, 234, alpha)'  // violet
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 0.5,
          color: color,
          alpha: Math.random() * 0.4 + 0.1,
          pulse: 0,
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };

    const drawParticle = (particle: Particle) => {
      const { x, y, size, color, alpha, pulse } = particle;
      
      // Pulse effect
      const currentSize = size * (1 + Math.sin(pulse) * 0.3);
      const currentAlpha = alpha * (1 + Math.sin(pulse) * 0.2);

      ctx.beginPath();
      ctx.arc(x, y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = color.replace('alpha', currentAlpha.toString());
      ctx.fill();

      // Optional glow effect
      ctx.beginPath();
      ctx.arc(x, y, currentSize * 2, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, currentSize * 2);
      gradient.addColorStop(0, color.replace('alpha', (currentAlpha * 0.3).toString()));
      gradient.addColorStop(1, color.replace('alpha', '0'));
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const connectParticles = (p1: Particle, p2: Particle, distance: number, maxDistance: number) => {
      const alpha = (1 - distance / maxDistance) * Math.min(p1.alpha, p2.alpha) * 0.5;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      
      // Create gradient line
      const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      gradient.addColorStop(0, p1.color.replace('alpha', alpha.toString()));
      gradient.addColorStop(1, p2.color.replace('alpha', alpha.toString()));
      
      ctx.strokeStyle = gradient;
      ctx.stroke();
    };

    const updateParticleConnections = (particle: Particle, index: number) => {
      const maxDistance = 150;
      particles.slice(index + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          connectParticles(particle, otherParticle, distance, maxDistance);
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

        // Update pulse
        particle.pulse += particle.pulseSpeed;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          particle.dx -= Math.cos(angle) * 0.02;
          particle.dy -= Math.sin(angle) * 0.02;
        }

        drawParticle(particle);
        updateParticleConnections(particle, i);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleBackground;
