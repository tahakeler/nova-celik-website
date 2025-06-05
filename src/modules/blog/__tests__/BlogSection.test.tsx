import { render, screen, cleanup } from '@testing-library/react';
import { BlogSection } from '../components';

describe('BlogSection', () => {
  afterEach(() => cleanup());

  it('renders heading', () => {
    render(<BlogSection />);
    expect(screen.getByText(/Our Blog/i)).toBeInTheDocument();
  });
});
