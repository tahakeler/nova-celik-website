'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface GlassCardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly animate?: boolean;
  readonly variant?: 'light' | 'dark' | 'gradient';
  readonly priority?: 'high' | 'medium' | 'low';
  readonly interactive?: boolean;
  readonly glow?: boolean;
}

export default function GlassCard({ 
  children, 
  className = '', 
  animate = true,
  variant = 'light',
  priority = 'medium',
  interactive = true,
  glow = false
}: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return 'glass-card-dark';
      case 'gradient':
        return 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-blue-500/20';
      default:
        return 'glass-card';
    }
  };

  const getPriorityStyles = () => {
    switch (priority) {
      case 'high':
        return 'border-red-500/30 shadow-red-500/10';
      case 'medium':
        return 'border-amber-500/30 shadow-amber-500/10';
      case 'low':
        return 'border-blue-500/30 shadow-blue-500/10';
      default:
        return 'border-blue-500/30 shadow-blue-500/10';
    }
  };

  const getGlowStyles = () => {
    if (!glow) return '';
    
    switch (priority) {
      case 'high':
        return 'shadow-glow-red';
      case 'medium':
        return 'shadow-glow-amber';
      case 'low':
        return 'shadow-glow-blue';
      default:
        return 'shadow-glow-blue';
    }
  };

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20, scale: 0.95 } : false}
      animate={animate ? { opacity: 1, y: 0, scale: 1 } : false}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        delay: animate ? Math.random() * 0.2 : 0,
      }}
      whileHover={interactive ? {
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-3xl
        ${getVariantStyles()}
        ${variant === 'gradient' ? getPriorityStyles() : ''}
        ${glow ? getGlowStyles() : ''}
        ${interactive ? 'hover-lift cursor-pointer' : ''}
        transition-all duration-300 ease-out
        font-poppins
        ${className}
      `}
      style={{
        boxShadow: isHovered && interactive
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)'
          : undefined
      }}
    >
      {/* Enhanced gradient overlay */}
      <div className={`
        absolute inset-0 pointer-events-none transition-opacity duration-300
        ${variant === 'dark' 
          ? 'bg-gradient-to-br from-blue-600/10 to-purple-600/10' 
          : 'bg-gradient-to-br from-blue-600/5 to-purple-600/5'
        }
        ${isHovered ? 'opacity-100' : 'opacity-50'}
      `} />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Shimmer effect on hover */}
      {isHovered && interactive && (
        <div className="absolute inset-0 animate-shimmer pointer-events-none" />
      )}
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
      
      {/* Enhanced hover effect */}
      <div className={`
        absolute inset-0 transition-all duration-300 pointer-events-none
        ${variant === 'dark' 
          ? 'bg-gradient-to-br from-blue-600/0 to-purple-600/0' 
          : 'bg-gradient-to-br from-blue-600/0 to-purple-600/0'
        }
        ${isHovered && interactive ? 'opacity-20' : 'opacity-0'}
      `} />

      {/* Border glow effect */}
      {isHovered && interactive && (
        <div className="absolute inset-0 rounded-3xl border border-blue-400/30 pointer-events-none animate-glow-pulse" />
      )}
    </motion.div>
  );
}
