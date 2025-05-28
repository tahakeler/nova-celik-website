'use client';

import  React from 'react';
import styles from '@/styles/BatteryChart.module.css';
import type { BatteryChartProps } from '@/types/dashboard.types';
import { JSX } from 'react/jsx-dev-runtime';

export default function BatteryChart({
  healthy,
  risky,
  unhealthy,
}: Readonly<BatteryChartProps>): JSX.Element {
  const bars = [
    { count: healthy, label: 'Healthy Steps', color: 'green' },
    { count: risky, label: 'Risky Steps', color: 'yellow' },
    { count: unhealthy, label: 'Unhealthy Steps', color: 'red' },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-sm font-semibold text-blue-700 mb-3">Step Maintenance</h3>
      <div className="flex gap-6 items-end">
        {bars.map((bar) => (
          <div key={`${bar.label}`} className="flex flex-col items-center">
            <div className={`${styles.batteryOuter} ${styles[bar.color]}`}>
              <div className={styles.batteryTip}></div>
              <div className={styles.batteryText}>{bar.count}</div>
            </div>
            <p className="text-xs mt-1 text-center w-24 text-gray-700 leading-snug">{bar.label}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">{healthy + risky + unhealthy} Total Steps</p>
    </div>
  );
}
