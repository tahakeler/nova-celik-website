import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HarmonicLineChart from '../HarmonicLineChart';

// Mock the required dependencies
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => children,
  AreaChart: ({ children }: any) => <div data-testid="area-chart">{children}</div>,
  Area: () => <div data-testid="area" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    g: ({ children, ...props }: any) => <g {...props}>{children}</g>,
    circle: ({ children, ...props }: any) => <circle {...props}>{children}</circle>,
    text: ({ children, ...props }: any) => <text {...props}>{children}</text>
  },
  AnimatePresence: ({ children }: any) => children
}));

describe('HarmonicLineChart', () => {
  const currentData = Array(30).fill(0).map((_, i) => i * 100);
  const previousData = Array(30).fill(0).map((_, i) => i * 80);

  test('renders without crashing', () => {
    render(<HarmonicLineChart current={currentData} previous={previousData} />);
    expect(screen.getByText(/Current/i)).toBeInTheDocument();
    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
  });

  test('renders correct number of data points for day', () => {
    render(<HarmonicLineChart current={currentData} previous={previousData} timePeriod="day" />);
    const dots = screen.getAllByTestId('area');
    expect(dots.length).toBeGreaterThanOrEqual(24);
  });

  test('renders correct number of data points for week', () => {
    render(<HarmonicLineChart current={currentData} previous={previousData} timePeriod="week" />);
    const dots = screen.getAllByTestId('area');
    expect(dots.length).toBeGreaterThanOrEqual(7);
  });

  test('renders correct number of data points for month', () => {
    render(<HarmonicLineChart current={currentData} previous={previousData} timePeriod="month" />);
    const dots = screen.getAllByTestId('area');
    expect(dots.length).toBeGreaterThanOrEqual(30);
  });
});
