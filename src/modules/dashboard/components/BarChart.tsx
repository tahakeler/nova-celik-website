'use client';

import React, { JSX } from 'react';
import styles from '@/styles/BarChart.module.css';
import type { BarChartProps } from '@/modules/dashboard/dashboard.types';
import { DEFAULT_LABELS } from '@/modules/dashboard/dashboard.constants';

/**
 * BarChart visualizes monthly energy consumption comparison between current and previous periods.
 *
 * @param currentYear - Array of current year consumption values.
 * @param previousYear - Optional array of previous year consumption values.
 * @param labels - Optional month or period labels.
 */
export default function BarChart({
  currentYear,
  previousYear,
  labels = [...DEFAULT_LABELS],
}: Readonly<BarChartProps>): JSX.Element {
  const max = Math.max(
    ...currentYear,
    ...(previousYear?.length ? previousYear : [])
  );

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-sm font-semibold text-yellow-600 mb-3">
        Monthly Consumption
      </h3>
      <div className="flex gap-2 items-end h-32 w-full max-w-xl">
        {currentYear.map((val, i) => {
          const currentHeight = (val / max) * 100;
          const previousHeight =
            previousYear?.[i]
              ? (previousYear[i] / max) * 100
              : 0;

          return (
            <div
              key={`bar-${i}-${val}`}
              className="flex flex-col items-center gap-[2px]"
            >
              <div
                className={`${styles.bar} ${styles.current}`}
                style={
                  { '--bar-height': `${currentHeight}%` } as React.CSSProperties
                }
                aria-label={`Current: ${val} kWh`}
              />
              {previousYear && (
                <div
                  className={`${styles.bar} ${styles.previous}`}
                  style={
                    {
                      '--bar-height': `${previousHeight}%`,
                    } as React.CSSProperties
                  }
                  aria-label={`Previous: ${previousYear[i]} kWh`}
                />
              )}
            </div>
          );
       })}
      </div>
      <div className="flex gap-2 items-center justify-between w-full max-w-xl text-xs text-gray-500 mt-3">
        {labels.map((label) => (
          <span key={label} className="w-full text-center">{label}</span>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">kWh (Preview)</p>
    </div>
  );
}
