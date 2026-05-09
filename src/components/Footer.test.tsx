import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders footer text correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/Built for Colosseum Frontier Hackathon 2026/i)).toBeDefined();
  });
});
