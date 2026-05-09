import { describe, it, expect } from 'vitest';
import { eitherwayService } from './eitherway';

describe('EitherwayService', () => {
  it('should initialize and parse intent', async () => {
    const result = await eitherwayService.parseIntent('test');
    expect(result.action).toBe('SWAP_AND_STAKE');
    // Call again to hit the initialized=true branch
    const result2 = await eitherwayService.parseIntent('test2');
    expect(result2.action).toBe('SWAP_AND_STAKE');
  });

  it('should get quicknode blockhash', async () => {
    const result = await eitherwayService.getQuicknodeBlockhash();
    expect(result).toBeDefined();
  });

  it('should get birdeye price', async () => {
    const result = await eitherwayService.getBirdeyePrice('SOL');
    expect(result).toBeDefined();
  });

  it('should get dflow route', async () => {
    const result = await eitherwayService.getDFlowRoute(100, 'USDC', 'SOL');
    expect(result).toBeDefined();
  });

  it('should get kamino vault', async () => {
    const result = await eitherwayService.getKaminoVault('SOL');
    expect(result).toBeDefined();
  });
});
