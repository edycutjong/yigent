import { describe, it, expect } from 'vitest';
import { KaminoClient } from './kamino';

describe('KaminoClient', () => {
  it('should return highest APY vault', async () => {
    const client = new KaminoClient();
    const result = await client.getHighestApyVault('SOL');
    expect(result.name).toBe('JitoSOL-SOL Liquidity Vault');
    expect(result.apy).toBe(12.4);
    expect(result.risk).toBe('Lowest available');
    expect(result.tvl).toBe(45000000);
  });
});
