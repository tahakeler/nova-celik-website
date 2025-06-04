'use client';

import React, { type ReactElement } from 'react';
import styles from '@/styles/GaugeChart.module.css';
import type { GaugeChartProps } from '@/types/dashboard.types';

export default function GaugeChart({
  label,
  value,
  max,
}: Readonly<GaugeChartProps>): ReactElement {
  const percent = Math.min(value / max, 1);

  const getStatus = (value: number) => {
    if (value > 0.85) return styles.red;
    if (value > 0.6) return styles.yellow;
    return styles.green;
  };

  const status = getStatus(percent);

  const angle = percent * 180 - 90;

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">{label}</h3>
      <div className={styles.gaugeWrapper}>
        <div
          className={`${styles.needle} ${status}`}
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <div className={styles.arc}></div>
      </div>
      <p className="text-xs text-gray-600 mt-2">{value}% Avg</p>
    </div>
  );
}
