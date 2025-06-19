'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export default function GlassCard({ children, className = '', animate = true }: GlassCardProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/80 backdrop-blur-lg
        border border-white/20
        shadow-lg hover:shadow-xl
        transition-all duration-300
        ${className}
      `}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 opacity-0 transition-opacity duration-300 hover:opacity-10" />
    </motion.div>
  );
}
