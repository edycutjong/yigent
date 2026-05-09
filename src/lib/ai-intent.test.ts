import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AIIntentParser } from './ai-intent';

describe('AIIntentParser', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should simulate parsing when OPENAI_API_KEY is not set', async () => {
    delete process.env.OPENAI_API_KEY;
    const parser = new AIIntentParser();
    const result = await parser.parse("Test intent");
    expect(result.action).toBe("SWAP_AND_STAKE");
  });

  it('should return simulated data when OPENAI_API_KEY is set', async () => {
    process.env.OPENAI_API_KEY = "test_key";
    const parser = new AIIntentParser();
    const result = await parser.parse("Test intent");
    expect(result.action).toBe("SWAP_AND_STAKE");
  });
});
