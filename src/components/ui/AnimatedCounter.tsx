//src\components\ui\AnimatedCounter.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useMotionValue } from 'framer-motion';

interface AnimatedCounterProps {
  readonly value: number;
  readonly duration?: number;
  readonly suffix?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1.2,
  suffix = '',
}: Readonly<AnimatedCounterProps>) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplay(Math.round(latest));
    });
    return () => unsubscribe();
  }, [motionValue]);

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration });
    }
  }, [isInView, motionValue, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
