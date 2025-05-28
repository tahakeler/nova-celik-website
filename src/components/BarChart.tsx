'use client';

import React, { JSX } from 'react';
import styles from '@/styles/BarChart.module.css';
import type { BarChartProps } from '@/types/dashboard.types';

export default function BarChart({
  currentYear,
  previousYear,
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}: Readonly<BarChartProps>): JSX.Element {
  const max = Math.max(...currentYear, ...(previousYear ?? []));

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-sm font-semibold text-yellow-600 mb-3">Consumption</h3>
      <div className="flex gap-2 items-end h-32 w-full max-w-xl">
        {currentYear.map((val, i) => {
          const currentHeight = (val / max) * 100;
          const previousHeight = previousYear ? (previousYear[i] / max) * 100 : 0;

          return (
            <div key={`${labels[i]}-${val}`} className="flex flex-col items-center gap-[2px]">
              <div
                className={`${styles.bar} ${styles.current}`}
                data-height={currentHeight}
                aria-label={`Current: ${val} kWh`}
              />
              {previousYear && (
                <div
                  className={`${styles.bar} ${styles.previous}`}
                  data-height={previousHeight}
                  aria-label={`Previous: ${previousYear[i]} kWh`}
                />
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-3">kWh (Preview)</p>
    </div>
  );
}
