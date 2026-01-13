import { render, screen } from '@testing-library/react';
import { HumidityCard } from './humidity-card';
import { describe, it, expect } from 'vitest';

describe('HumidityCard', () => {
  it('renders the humidity title and value', () => {
    render(<HumidityCard humidity={65} />);
    
    expect(screen.getByText(/Humidity/i)).toBeInTheDocument();
    
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('handles high humidity values correctly', () => {
    render(<HumidityCard humidity={100} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
  
  it('handles low humidity values correctly', () => {
    render(<HumidityCard humidity={0} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});