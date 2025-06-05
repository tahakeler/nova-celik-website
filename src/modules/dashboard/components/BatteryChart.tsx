'use client';

import React from 'react';
import styles from '@/styles/BatteryChart.module.css';
import type { BatteryChartProps } from '@/modules/dashboard/dashboard.types';
import { StepHealth } from '@/modules/dashboard/dashboard.constants';

/**
 * BatteryChart: Professional step status visualization using "battery" icons and clear color coding.
 */
export default function BatteryChart({
  healthy,
  risky,
  unhealthy,
}: Readonly<BatteryChartProps>): React.ReactElement {
  const bars = [
    { count: healthy, label: StepHealth.Healthy, color: 'green' },
    { count: risky, label: StepHealth.Risky, color: 'yellow' },
    { count: unhealthy, label: StepHealth.Unhealthy, color: 'red' },
  ];

  const format = (n: number) => Intl.NumberFormat().format(Math.round(n));

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex gap-4 items-end">
        {bars.map((bar, idx) => {
          let labelClass = '';
          if (idx === 0) {
            labelClass = 'text-green-700';
          } else if (idx === 1) {
            labelClass = 'text-yellow-700';
          } else {
            labelClass = 'text-red-700';
          }
          return (
            <div key={bar.label} className="flex flex-col items-center">
              <div className={`${styles.batteryOuter} ${styles[bar.color]} group`}>
                <div className={styles.batteryTip}></div>
                <div className={styles.batteryText} title={bar.label}>
                  {format(bar.count)}
                </div>
              </div>
              <span className={`text-xs mt-1 font-medium ${labelClass}`}>{bar.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
