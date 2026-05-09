import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WalletConnect } from './WalletConnect';

describe('WalletConnect', () => {
  it('shows connect button initially', () => {
    render(<WalletConnect />);
    expect(screen.getByText('Connect Solflare')).toBeDefined();
  });

  it('shows connected state after click', () => {
    render(<WalletConnect />);
    const button = screen.getByText('Connect Solflare');
    fireEvent.click(button);
    expect(screen.getByText(/Connected \(Solflare\)/i)).toBeDefined();
  });
});
