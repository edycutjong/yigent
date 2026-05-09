import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QuicknodeClient } from './quicknode';

describe('QuicknodeClient', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    global.fetch = vi.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('should fetch latest blockhash', async () => {
    const client = new QuicknodeClient();
    (global.fetch as any).mockResolvedValue({
      json: vi.fn().mockResolvedValue({ result: { value: { blockhash: 'fetched_blockhash' } } })
    });
    expect(await client.getLatestBlockhash()).toBe('fetched_blockhash');
  });

  it('should return mock blockhash if fetch fails', async () => {
    const client = new QuicknodeClient();
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    expect(await client.getLatestBlockhash()).toBe('mock_blockhash_123456789');
  });
  
  it('should use NEXT_PUBLIC_QUICKNODE_RPC from env', async () => {
    process.env.NEXT_PUBLIC_QUICKNODE_RPC = "https://custom.rpc";
    const client = new QuicknodeClient();
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    await client.getLatestBlockhash();
    expect(global.fetch).toHaveBeenCalledWith('https://custom.rpc', expect.any(Object));
  });
});
