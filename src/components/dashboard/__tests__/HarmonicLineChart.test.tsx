import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HarmonicLineChart from '../HarmonicLineChart';

// Mock the required dependencies
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => children,
  AreaChart: ({ children }: any) => (
    <div data-testid="area-chart">{children}</div>
  ),
  Area: () => <div data-testid="area" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    g: ({ children, ...props }: any) => <g {...props}>{children}</g>,
    circle: ({ children, ...props }: any) => (
      <circle {...props}>{children}</circle>
    ),
    text: ({ children, ...props }: any) => <text {...props}>{children}</text>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('HarmonicLineChart', () => {
  const currentData = Array(30)
    .fill(0)
    .map((_, i) => i * 100);
  const previousData = Array(30)
    .fill(0)
    .map((_, i) => i * 80);

  test('renders without crashing', () => {
    render(<HarmonicLineChart current={currentData} previous={previousData} />);
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
    expect(screen.getAllByTestId('area').length).toBe(2);
  });

  test('renders day view', () => {
    render(
      <HarmonicLineChart
        current={currentData}
        previous={previousData}
        timePeriod="day"
      />
    );
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });

  test('renders week view', () => {
    render(
      <HarmonicLineChart
        current={currentData}
        previous={previousData}
        timePeriod="week"
      />
    );
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });

  test('renders month view', () => {
    render(
      <HarmonicLineChart
        current={currentData}
        previous={previousData}
        timePeriod="month"
      />
    );
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });
});
