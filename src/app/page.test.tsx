import { render, screen, fireEvent, act } from '@testing-library/react';
import Home from './page';
import { eitherwayService } from '@/lib/eitherway';
import React from 'react';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

// Mock eitherwayService
vi.mock('@/lib/eitherway', () => ({
  eitherwayService: {
    parseIntent: vi.fn(),
  },
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it('renders landing page correctly', () => {
    render(<Home />);
    expect(screen.getByText(/Command DeFi/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Type your intent/i)).toBeDefined();
  });

  it('updates input value on change', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/Type your intent/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Swap SOL' } });
    expect(input.value).toBe('Swap SOL');
  });

  it('sets sample intent and executes when clicking try button', async () => {
    vi.mocked(eitherwayService.parseIntent).mockResolvedValue({
      action: 'SWAP_AND_STAKE',
      input: 'USDC',
      target: 'SOL',
      strategy: 'Lowest Risk Yield',
      plan: 'Step 1: Parsing\nStep 2: Done',
    });

    render(<Home />);
    const sampleBtn = screen.getByText(/Try: "/i);
    fireEvent.click(sampleBtn);
    
    // Wait for the async parseIntent to resolve
    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText('EXECUTION_TIMELINE')).toBeDefined();
    const input = screen.getByPlaceholderText(/Type your intent/i) as HTMLInputElement;
    expect(input.value).toContain('Put 50 USDC');
  });

  it('executes intent and shows timeline transitions', async () => {
    vi.mocked(eitherwayService.parseIntent).mockResolvedValue({
      action: 'SWAP_AND_STAKE',
      input: 'USDC',
      target: 'SOL',
      strategy: 'Lowest Risk Yield',
      plan: 'Step 1: Parsing\nStep 2: Done',
    });

    render(<Home />);
    const input = screen.getByPlaceholderText(/Type your intent/i);
    fireEvent.change(input, { target: { value: 'Swap USDC to SOL' } });
    
    const form = screen.getByRole('textbox').closest('form')!;
    fireEvent.submit(form);

    // Initial parsing stage
    // Wait for the async parseIntent to resolve
    await act(async () => {
      await Promise.resolve();
    });
    
    expect(screen.getByText('EXECUTION_TIMELINE')).toBeDefined();

    // Fast forward typing animation (20ms * ~30 chars + buffer)
    await act(async () => {
      vi.advanceTimersByTime(2000); 
    });

    // Check intermediate stages
    // The timers for stages are 500, 1500, 2500, 3500 from the end of typing
    
    // fetching stage (500ms)
    await act(async () => {
      vi.advanceTimersByTime(600);
    });
    // Check for Birdeye Price Feed which appears in 'fetching' stage
    expect(screen.getByText(/Birdeye Price Feed/i)).toBeDefined();

    // routing stage (1500ms from end of typing, so another 1000ms)
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/DFlow Optimal Route/i)).toBeDefined();

    // yielding stage (2500ms from end of typing, so another 1000ms)
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/Kamino Strategy Selected/i)).toBeDefined();

    // ready stage (3500ms from end of typing, so another 1000ms)
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/Ready to Execute via Solflare/i)).toBeDefined();
  });

  it('handles empty intent submission via form', () => {
    render(<Home />);
    const form = screen.getByRole('textbox').closest('form')!;
    
    // Manually trigger submit even if button is disabled
    fireEvent.submit(form);
    
    // Should not transition to parsing (plan box should not be present)
    // The plan box is in a div with stage !== 'idle'
    expect(screen.queryByText('_')).toBeNull(); // The pulse cursor '_' only appears when stage !== 'idle'
  });
});
