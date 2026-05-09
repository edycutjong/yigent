import { describe, it, expect } from 'vitest';
import { DFlowClient } from './dflow';

describe('DFlowClient', () => {
  it('should return optimal route', async () => {
    const client = new DFlowClient();
    const result = await client.getOptimalRoute(184.22, 'USDC', 'SOL');
    expect(result.inAmount).toBe(184.22);
    expect(result.outAmount).toBe((184.22 / 184.22) * 0.999);
    expect(result.slippageBps).toBe(10);
    expect(result.route).toEqual(['Raydium', 'Orca']);
  });
});
