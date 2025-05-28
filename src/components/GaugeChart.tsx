'use client';

import React from 'react';
import styles from '@/styles/GaugeChart.module.css';
import type { GaugeChartProps } from '@/types/dashboard.types';
import { JSX } from 'react/jsx-dev-runtime';

export default function GaugeChart({
  label,
  value,
  max,
}: Readonly<GaugeChartProps>): JSX.Element {
  const percent = Math.min(value / max, 1);

  const getStatus = (value: number) => {
    if (value > 0.85) return styles.red;
    if (value > 0.6) return styles.yellow;
    return styles.green;
  };

  const status = getStatus(percent);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">{label}</h3>
      <div className={styles.gaugeWrapper}>
        <div className={`${styles.needle} ${status} ${styles['needle' + Math.round(percent * 100 / 10) * 10]}`} />
        <div className={styles.arc}></div>
      </div>
      <p className="text-xs text-gray-600 mt-2">{value}% Avg</p>
    </div>
  );
}
