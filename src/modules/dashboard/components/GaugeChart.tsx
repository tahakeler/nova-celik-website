'use client';

import React from 'react';
import styles from '@/styles/GaugeChart.module.css';
import type { GaugeChartProps } from '@/modules/dashboard/dashboard.types';

/**
 * GaugeChart: Polished, animated semi-circular gauge.
 */
export default function GaugeChart({
  label,
  value,
  max,
}: Readonly<GaugeChartProps>): React.ReactElement {
  const percent = Math.min(value / max, 1);
  const angle = percent * 180 - 90;
  const rounded = Math.round(percent * 100);

  const getStatus = (v: number) => {
    let statusClass;
    if (v > 0.85) {
      statusClass = styles.red;
    } else if (v > 0.6) {
      statusClass = styles.yellow;
    } else {
      statusClass = styles.green;
    }
    return statusClass;
  };

  return (
    <div className="flex flex-col items-center w-full">
      {label && <h3 className="text-xs font-medium text-gray-700 mb-2">{label}</h3>}
      <div className={styles.gaugeWrapper}>
        <div
          className={`${styles.needle} ${getStatus(percent)}`}
          style={{ transform: `rotate(${angle}deg)` }}
          aria-label={`Status: ${rounded}%`}
        />
        <div className={styles.arc} />
      </div>
      <span className="text-xl font-bold text-blue-700 mt-2">{rounded}%</span>
    </div>
  );
}
