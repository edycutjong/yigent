import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RootLayout from './layout';

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: 'inter' }),
  JetBrains_Mono: () => ({ variable: 'jetbrains-mono' }),
}));

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(getByText('Test Child')).toBeDefined();
  });
});
