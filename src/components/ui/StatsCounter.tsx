'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface StatsCounterProps {
  end: number;
  duration?: number;
  label: string;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const StatsCounter: React.FC<StatsCounterProps> = ({
  end,
  duration = 2,
  label,
  suffix = '',
  prefix = '',
  className
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const steps = 60;
    const increment = end / steps;
    const intervalTime = (duration * 1000) / steps;

    const counter = setInterval(() => {
      if (countRef.current < end) {
        countRef.current = Math.min(countRef.current + increment, end);
        setCount(Math.floor(countRef.current));
      } else {
        clearInterval(counter);
      }
    }, intervalTime);

    return () => clearInterval(counter);
  }, [end, duration, isInView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onViewportEnter={() => setIsInView(true)}
      className={`flex flex-col items-center p-4 ${className ?? ''}`}
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {prefix}{count.toLocaleString()}{suffix}
        </div>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-sm md:text-base text-gray-600 text-center font-medium"
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

export default StatsCounter;
