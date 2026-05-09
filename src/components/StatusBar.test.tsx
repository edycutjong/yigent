import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusBar } from './StatusBar';

describe('StatusBar', () => {
  it('renders system status correctly', () => {
    render(<StatusBar />);
    expect(screen.getByText(/SYSTEM ONLINE/i)).toBeDefined();
    expect(screen.getByText(/12ms/i)).toBeDefined();
    expect(screen.getByText(/99.9%/i)).toBeDefined();
  });
});
