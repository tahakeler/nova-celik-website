import { render, screen, cleanup } from '@testing-library/react';
import { DashboardGrid } from '../components';

describe('DashboardGrid', () => {
  afterEach(() => cleanup());

  it('renders Energy Quality Report heading', () => {
    render(<DashboardGrid />);
    expect(screen.getByText(/Energy Quality Report/i)).toBeInTheDocument();
  });

  it('handles empty gauge list', () => {
    render(<DashboardGrid gauges={[]} />);
    expect(screen.queryByText(/Voltage Fluctuation/i)).not.toBeInTheDocument();
  });
});
