import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BirdeyeClient } from './birdeye';

describe('BirdeyeClient', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    global.fetch = vi.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('should return simulated price when API key is missing', async () => {
    delete process.env.BIRDEYE_API_KEY;
    const client = new BirdeyeClient();
    expect(await client.getPrice('SOL')).toBe(184.22);
    expect(await client.getPrice('USDC')).toBe(1.0);
  });

  it('should fetch price when API key is present', async () => {
    process.env.BIRDEYE_API_KEY = "test_key";
    const client = new BirdeyeClient();
    (global.fetch as any).mockResolvedValue({
      json: vi.fn().mockResolvedValue({ data: { value: 150.5 } })
    });
    expect(await client.getPrice('SOL')).toBe(150.5);
    expect(global.fetch).toHaveBeenCalledWith('https://public-api.birdeye.so/public/price?address=SOL', {
      headers: { "X-API-KEY": "test_key" }
    });
  });

  it('should return default price if fetch fails', async () => {
    process.env.BIRDEYE_API_KEY = "test_key";
    const client = new BirdeyeClient();
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    expect(await client.getPrice('SOL')).toBe(184.22);
  });
});
