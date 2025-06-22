'use client';

import { useEffect, useState } from 'react';

interface CounterProps {
  readonly label: string;
  readonly value: number;
  readonly duration?: number; // in milliseconds
}

export default function AnimatedCounter({ label, value, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);
    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-extrabold text-blue-700">{count}</span>
      <span className="text-lg text-gray-600">{label}</span>
    </div>
  );
}
